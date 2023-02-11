import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import * as d3 from "d3";

class Token {
  constructor(name){
    this.name = name;
    this.data = {};
    this.isLoaded = false;
    this.isTrading = false;
  }
  async populate(payload){
    console.log("POPULATE TRIGGERED FOR ", payload[0]);
    let t = await fetch("https://api.dex.guru/v3/tokens", {
      "body": "{\"ids\":[\"" + payload[0] + "-eth\"],\"limit\":1,\"network\":\"eth,optimism,bsc,gnosis,polygon,fantom,arbitrum,celo,avalanche\"}",
      "method": "POST",
    });
    let tt = await t.json();
    this.data = tt;
    console.log("NEW TOKEN DATA ", this.data);
  }
  interface(){
    return (<>ME TOKEN</>)
  }
}
class TokensStore {
  constructor(){
      this.storage = [];
    }
  addToken(token){
    this.storage = [...this.storage,token];
  }
  getToken(tokenId){
    console.log("GET TOKEN ", tokenId);
    return this.storage.filter(t => t.name = tokenId)[0];
  }
  getTokens(){
    console.log("GET TOKENS");
    return this.storage;
  }
}

const PerspectiveTokens = () => {

  let [TOKENS_STORE,UPDATE_TOKENS_STORE] = useState(new TokensStore());
  let STORE = new TokensStore();
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

  const sendRequest = async (request) => {
      console.log("REQUEST: ", request);
      const response = await fetch(request);
      const data = await response.json();
      return data;
  }

  const getPerspectiveTokens = async () => {
    const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.01&trending_interval=1800`;
       let d = await sendRequest(request)
       // console.log("DATA: ", d);
       return d;
  }

  const dispatcher = async (msg, payload) => {
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
        pp[payload[0]] = {...tt.data[0],isInteresting:false};

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
        payload.tokens.map(token => {
          STORE.addToken(token);
          STORE.getToken(token).populate(token);
        });
        console.log("\nTOKENS INSTANCES: ", STORE, "\n");

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
        break;

      case "SAVE_CURRENT_STRATEGY":
        console.log("SAVE_CURRENT_STRATEGY");
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

      case "BUY_TOKEN":
      case "SELL_TOKEN":
        console.log("M: DISPATCHED: " + msg);
        break;

      default:
        break;
    }
  }

  const Strategy = () => {
    let options = [10,20,30];
    return (
      <div>
        <h3>STRATEGY CONTAINER</h3>
        <div>
          {JSON.stringify(STATE.currentStrategy)}
        </div>
        <form>
          <label>interval:</label>
            <select>
              {
                options.map(option => <option>{option}</option>)
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

 const showStatus = (tokenId) => {
   try{
     // return STATE.perspectiveTokens[tokenId].isInteresting  && "👀" || "☠️";
     return STATE.perspectiveTokens[tokenId].isInteresting;
   }catch{
     return false;
   }
 }

  const PerspectiveTokens = () => {

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
          {Object.entries(STATE.perspectiveTokens).map(token => (
            <>
            {STATE.perspectiveTokens[token]}
            <div onClick={() => dispatcher("GET_PERSPECTIVE_TOKEN_DETAILS",token)}>
              🪙{JSON.stringify(token)}
            </div>
            <button onClick={() => dispatcher("SAVE_INTERESTING_TOKEN",token[0])}>add</button>
            <div>
                INTEREST: {showStatus(token[0])}
            </div>
            {  showStatus(token[0]) &&
                <>
                  <button onClick={() => dispatcher("BUY_INTERESTING_TOKEN",token[0])}>buy</button>
                  <button onClick={() => dispatcher("REMOVE_INTERESTING_TOKEN",token[0])}>remove</button>
                </>
            }
            </>
          ))}
        </div>
        <button onClick={() => dispatcher("GET_PERSPECTIVE_TOKENS")}>GET TOKENS</button>
      </div>
    );
  }

  const State = () => {
    return (
      <div>
        STATE CONTAINER
        <div>
          {JSON.stringify(STATE)}
        </div>
      </div>
    );
  }

  const InterestingTokens = () => {
    return (
      <div>
        <h3>INTERESTING TOKENS CONTAINER</h3>
        <div>
          {Object.entries(STATE.interestingTokens).map(token => (
            <>
            {STATE.perspectiveTokens[token]}
            <div onClick={() => dispatcher("GET_PERSPECTIVE_TOKEN_DETAILS",token)}>
              🪙{JSON.stringify(token)}
            </div>
            <button onClick={() => dispatcher("BUY_INTERESTING_TOKEN",token[0])}>buy</button>
            <button onClick={() => dispatcher("REMOVE_INTERESTING_TOKEN",token[0])}>remove</button>
            </>
          ))}
        </div>
      </div>
    );
  }

  const TradingTokens = () => {
    return (
      <div>
        <h3>TRADING TOKENS CONTAINER</h3>
        <div>
          {Object.entries(STATE.tradingTokens).map(token => (
            <>
            {STATE.tradingTokens[token]}
            <div onClick={() => dispatcher("GET_PERSPECTIVE_TOKEN_DETAILS",token)}>
              🪙{JSON.stringify(token)}
            </div>
            <button onClick={() => dispatcher("SELL_INTERESTING_TOKEN",token[0])}>sell</button>
            <button onClick={() => dispatcher("GET_TOKEN_CURRENT_PRICE",token[0])}>price</button>
            </>
          ))}
        </div>
      </div>
    );
  }

  const TokenTokens = () => {
    return (
      <div>
        <h3>TOKEN TOKENS CONTAINER</h3>
        <div>
          {
            STORE.getTokens().map(token => <>TOKEN</>)
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{background: "#202020",border:"1px solid grey",color:"lightGrey"}}>
      <Strategy/>
      <TokenTokens/>
      <PerspectiveTokens/>
      <InterestingTokens/>
      <TradingTokens/>
      <State/>
    </div>
  );
}


export default PerspectiveTokens;
