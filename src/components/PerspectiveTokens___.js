import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import * as d3 from "d3";

// class Token {
//   constructor(name){
//     this.name = name;
//     this.data = {};
//     this.isLoaded = false;
//     this.isTrading = false;
//   }
//   async populate(payload){
//     console.log("POPULATE TRIGGERED FOR ", payload[0]);
//     let t = await fetch("https://api.dex.guru/v3/tokens", {
//       "body": "{\"ids\":[\"" + payload[0] + "-eth\"],\"limit\":1,\"network\":\"eth,optimism,bsc,gnosis,polygon,fantom,arbitrum,celo,avalanche\"}",
//       "method": "POST",
//     });
//     let tt = await t.json();
//     this.data = tt;
//     console.log("NEW TOKEN DATA ", this.data);
//   }
//   interface(){
//     return (<>ME TOKEN</>)
//   }
// }
// class TokensStore {
//   constructor(){
//       this.storage = [];
//     }
//   addToken(token){
//     this.storage = [...this.storage,token];
//   }
//   getToken(tokenId){
//     console.log("GET TOKEN ", tokenId);
//     return this.storage.filter(t => t.name = tokenId)[0];
//   }
//   getTokens(){
//     console.log("GET TOKENS");
//     return this.storage;
//   }
// }

const PerspectiveTokens = () => {

  // let [TOKENS_STORE,UPDATE_TOKENS_STORE] = useState(new TokensStore());
  // let STORE = new TokensStore();
  let [store,updateStore] = useState({});
  let [STATE,SET_STATE] = useState({
    currentStrategy:{
      interval:3600,
      chainId:1,
      gainsThreshold:0.1,
      trendingIinteval:1800
    },
    perspectiveTokens:[],
    interestingTokens:{},
    tradingTokens:{}
  });
  let [TOKENS,UPDATE_TOKENS] = useState({});
  let [INTERSTING_TOKENS,UPDATE_TOKENS_INTEREST] = useState({});
  let [CURRENT_STRATEGY, UPDATE_CURRENT_STRATEGY] = useState({
    interval:3600,
    chain_id:1,
    gain_threshold:0.01,
    trending_interval:1800
  });

  const sendRequest = async (request) => {
      console.log("REQUEST: ", request);
      const response = await fetch(request);
      const data = await response.json();
      return data;
  }

  const getPerspectiveTokens = async () => {
    const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=${CURRENT_STRATEGY.interval}&chain_id=${CURRENT_STRATEGY.chain_id}&gain_threshold=${CURRENT_STRATEGY.gain_threshold}&trending_interval=${CURRENT_STRATEGY.trending_interval}`;
       let d = await sendRequest(request)
       return d;
  }

  const dispatcher = async (msg, payload) => {
    let out  = "";
    switch(msg){
      case "DISPLAY_CURRENT_STRATEGY":
      case "GET_PERSPECTIVE_TOKENS":
        // console.log("GET_PERSPECTIVE_TOKENS");
        let d = await getPerspectiveTokens();
        // console.log("TOKENS: ", d)
        dispatcher("SAVE_PERSPECTIVE_TOKENS", d);
        break;

      case "GET_PERSPECTIVE_TOKEN_DETAILS":
        console.log("GET_PERSPECTIVE_TOKEN_DETAILS FOR ", payload[0]);
        let t = await fetch("https://api.dex.guru/v3/tokens", {
          "body": "{\"ids\":[\"" + payload[0] + "-eth\"],\"limit\":1,\"network\":\"eth,optimism,bsc,gnosis,polygon,fantom,arbitrum,celo,avalanche\"}",
          "method": "POST",
        });
        let tt = await t.json();

        let pp = {...STATE.perspectiveTokens};
        pp[payload[0]] = {...tt.data[0],isInteresting:false,strategy:dispatcher("GET_CURRENT_STRATEGY")};

        console.log("DATA: ", pp);
        // SET_STATE({...STATE,);
        SET_STATE({...STATE,perspectiveTokens:pp});
        // UPDATE_TOKENS(...TOKENS,[payload]:tt.data[0]);
        // console.log("TOKENS: ", JSON.stringify(TOKENS));
        break;

      case "SAVE_PERSPECTIVE_TOKENS":
        console.log("SAVE_PERSPECTIVE_TOKENS FOR ", payload.tokens);
        let pool = {};
        let tokens = payload.tokens.map(token => pool[token] = {});
        // let toksPool = {};
        // payload.tokens.map(token => {
        //   STORE.addToken(token);
        //   STORE.getToken(token).populate(token);
        // });
        // console.log("\nTOKENS INSTANCES: ", STORE, "\n");

        console.log("TOKENS TO RECORD: ", pool);
        SET_STATE({...STATE,perspectiveTokens:pool});
        // console.log("PAYLOAD: ", payload);
        console.log("STATE: ", JSON.stringify(STATE));
        break;

      case "SAVE_INTERESTING_TOKEN":
        console.log("SAVE_INTERESTING_TOKEN FOR ", payload);
        let interestingTokens = {...STATE.interestingTokens,[payload]:STATE.perspectiveTokens[payload]}
        interestingTokens[payload].isInteresting = true;
        SET_STATE({...STATE,interestingTokens:interestingTokens});
        INTERSTING_TOKENS[payload] = false;
        break;

      case "SAVE_CURRENT_STRATEGY":
        console.log("SAVE_CURRENT_STRATEGY");
        break;
      case "GET_CURRENT_STRATEGY":
        console.log("GET_CURRENT_STRATEGY");
        out = "currentStrategy";
        break;

      case "REMOVE_INTERESTING_TOKEN":
        console.log("REMOVE_INTERESTING_TOKEN FOR ", payload);
        let iinterestingTokens = {...STATE.interestingTokens};
        delete iinterestingTokens[payload]
        let tradingTokens2 = {...STATE.tradingTokens};
        delete tradingTokens2[payload]
        SET_STATE({...STATE,interestingTokens:iinterestingTokens,tradingTokens:tradingTokens2});
        break;

      case "BUY_INTERESTING_TOKEN":
        console.log("BUY_INTERESTING_TOKEN FOR ", payload);
        let tradingTokens = {...STATE.tradingTokens,[payload]:STATE.interestingTokens[payload]};
        SET_STATE({...STATE,tradingTokens:tradingTokens});
        break;

      case "GET_TOKEN_CURRENT_PRICE":
        console.log("GET_TOKEN_CURRENT_PRICE FOR TOKEN ", payload);
        break;

      case "UPDATE_TOKEN_INTEREST_STATUS":
        console.log("UPDATE_TOKEN_INTEREST_STATUS FOR ", payload);
        INTERSTING_TOKENS[payload] = !INTERSTING_TOKENS[payload];
        console.log("INTERESTING TOKENS: ", INTERSTING_TOKENS);
        break;

      case "BUY_TOKEN":
      case "SELL_TOKEN":
        console.log("M: DISPATCHED: " + msg);
        break;
      case "SET_STRATEGY_INTERVAL":
        console.log("SET_STRATEGY_INTERVAL TO ", payload);
        UPDATE_CURRENT_STRATEGY({...CURRENT_STRATEGY, interval:payload})
        break;

      default:
        break;
    }
    console.log("DISPATCHER OUT ", out);
    return out;
  }

  const Strategy = () => {
    let options = [,10,20,30];
    const [interval, setInterval] = useState(10);

    return (
      <div>
        <h3>STRATEGY CONTAINER</h3>
        <div>
          {JSON.stringify(CURRENT_STRATEGY)}
        </div>
        <form>
          <label>interval:</label>
            <select value ={interval} onChange={(e) => dispatcher("SET_STRATEGY_INTERVAL",e.target.value)}>
              {
                options.map(option => <option value={option}>{option}</option>)
              }
            </select>
          <label>chain:</label>
            <select>
              {
                options.map(option => <option>{option}</option>)
              }
            </select>
          <label>threshold:</label>
            <select>
              {
                options.map(option => <option>{option}</option>)
              }
            </select>
          <label>interval:</label>
            <select>
              {
                options.map(option => <option>{option}</option>)
              }
            </select>
            <button onClick={() => dispatcher("SAVE_CURRENT_STRATEGY")}>save</button>
        </form>
      </div>
    );
  }

  const PerspectiveTokens = () => {

    const [strategy, setStrategy] = useState("some stub strategy");

    const Token = ({name,onCreationStrategy}) => {

      let tokenName = name;
      let [data,getData] = useState({});
      let [isInteresting, setInterest] = useState(false);
      let [isHold, setHold] = useState(false);
      let [currentStrategy,setCurrentStrategy] = useState(onCreationStrategy)

      useEffect(() => {
        console.log("UPDATE DATA")
        Object.keys(data).length == 0 && (async() => {
          console.log("DATA IS FRESH")
          let t = await fetch("https://api.dex.guru/v3/tokens", {
            "body": "{\"ids\":[\"" + tokenName + "-eth\"],\"limit\":1,\"network\":\"eth,optimism,bsc,gnosis,polygon,fantom,arbitrum,celo,avalanche\"}",
            "method": "POST",
          });
          let tt = await t.json();
          // getData({...tt.data[0],strategy:dispatcher("GET_CURRENT_STRATEGY")});
          // getData({...tt.data[0],strategy:CURRENT_STRATEGY});
          getData({...tt.data[0],strategy:"CURRENT_STRATEGY"});
          // UPDATE_TOKENS_INTEREST({...INTERSTING_TOKENS,[tokenName]:false})
          console.log("DATA IS UPDATED ", data)
        })()
      },[data])

      useEffect(() => {
        dispatcher("UPDATE_TOKEN_INTEREST_STATUS",tokenName);
      },[isInteresting])

      useEffect(() => {

      },[isHold]);

      let s = {
        // flex:"flex",
        border: "5px solid #303030",
        padding: "10px",
        // width: "10px",
        overflowWrap: "break-word"
      }

      const PriceTracker = () => {
        const [countDown, setCountDown] = useState(5);
        const [price,setPrice] = useState([]);

        useEffect(() => {
             isHold && (countDown <= 0) && (async() => {
             setCountDown(5);

             let priceRequest = await fetch("https://api-stage.dex.guru/v1/tradingview/history?symbol=" + tokenName + "-eth_USD&resolution=10&from=1675678424&to=" + Math.round(Date.now()/1000));
             let pricee = await priceRequest.json();
             setPrice([...price,pricee.c.slice(-1)[0]]);


           })();
           const interval = setInterval(() => {
             setCountDown(countDown - 1);
           }, 1000);
           return () => clearInterval(interval);
         }, [countDown]);

        // setInterval(console.log(setCounter(counter--)),1000);

        return (<div>
            <h3>PRICE TRACKER: {countDown}</h3>
            <p>price:{price}</p>
            <p>profit:{price.slice(-1)[0] - data.priceUSD}</p>
          </div>);
      }

      return (<>
          <div style={isInteresting ? {...s,background: "#303030"} : {...s,background: "#202020"} }>
          <div>
            name: {name}
          </div>
          <div>
            data: {data.name}
          </div>
          <div>
            price: {JSON.stringify(data.priceUSD)}
          </div>
          <div>
            strategy: {JSON.stringify(data.strategy)}
          </div>
          <div onClick={() => setInterest(!isInteresting)}>
            interest: {isInteresting ? "👀" : "☠️"}
          </div>
          {  isInteresting &&
            <button onClick={() => setHold(!isHold)}>
              { !isHold ? "BUY" : "SELL" }
            </button>
          }
          <div>
          { !isHold ? "" : <PriceTracker/> }
          </div>
          </div>
        </>)
    }

    useEffect(() => {
      console.log("NEW PERSPECTIVE TOKENS ARRIVED");
    },[STATE.perspectiveTokens]);

    const showData = (data) => {
      return (
        <>
          {
            Object.entries(data).map(record => <div>{record[0]} : {record[1]}</div>)
          }
        </>
      )
    }

    return (
      <div>
        <h3>PERSPECTIVE TOKENS CONTAINER</h3>
        <div>
          {Object.keys(STATE.perspectiveTokens).map(token => (
            <>
            <div>
              <Token name={token} onCreationStrategy={strategy}/>
            </div>
            </>
          ))}
        </div>
        <button onClick={() => dispatcher("GET_PERSPECTIVE_TOKENS")}>GET TOKENS</button>
      </div>
    );
  }

  return (
    <div style={{background: "#202020",border:"1px solid grey",color:"lightGrey"}}>
      <Strategy/>
      <PerspectiveTokens/>
    </div>
  );
}


export default PerspectiveTokens;
