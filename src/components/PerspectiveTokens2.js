import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import * as d3 from "d3";


const PerspectiveTokens = () => {

  let [store,updateStore] = useState({});
  let [STATE,SET_STATE] = useState({
    currentStrategy:{
      interval:3600,
      chainId:1,
      gainsThreshold:0.1,
      trendingIinteval:1800
    },
    perspectiveTokens:[{
      "timestamp":"stubTimestamp",
      "strategy":[],
      "tokens":[]
    }],
    interestingTokens:[],
    tradingTokens:[]
  });

  const sendRequest = async (request) => {
      console.log("REQUEST: ", request);
      const response = await fetch(request);
      const data = await response.json();
      return data;
  }

  const getPerspectiveTokens = async () => {
    // const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=${STATE.currentStrategy.interval}&chain_id=${STATE.currentStrategy.chainId}&gain_threshold=${STATE.currentStrategy.gainThreshold}&trending_interval=${STATE.currentStrategy.trendingInterval}`;
    const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.09&trending_interval=1800`;

    // if(STATE.perspectiveTokens.tokens.length == 0){
       let d = await sendRequest(request)
       console.log("DATA: ", d);

       // d = ["0x04c17b9d3b29a78f7bd062a57cf44fc633e71f85-eth","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-eth"];
       // setPerspectiveTokensList(d);
     // };
  }

  const dispatcher = async (msg, payload) => {
    switch(msg){
      case "DISPLAY_CURRENT_STRATEGY":
      case "GET_PERSPECTIVE_TOKENS":
        console.log("GET_PERSPECTIVE_TOKENS");
        let d = await getPerspectiveTokens();
        dispatcher("SAVE_PERSPECTIVE_TOKENS", d);
        break;
      case "GET_PERSPECTIVE_TOKENS_DETAILS":
      case "SAVE_PERSPECTIVE_TOKENS":
        console.log("SAVE_PERSPECTIVE_TOKENS");
        SET_STATE({...STATE,perspectiveTokens:[payload]});
        break;
      case "SAVE_CURRENT_STRATEGY":
        console.log("SAVE_CURRENT_STRATEGY");
        break;
      case "REMOVE_INTERESTING_TOKEN":
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
      <div style={{background: "lightGrey",border:"1px solid grey"}}>
        <div>
          STRATEGY CONTAINER
        </div>
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
  const PerspectiveTokens = () => {

    useEffect(() => {
      console.log("NEW PERSPECTIVE TOKENS ARRIVED");
    },[STATE.perspectiveTokens]);

    return (
      <div style={{background: "lightGrey",border:"1px solid grey"}}>
        <div>
          PERSPECTIVE TOKENS CONTAINER
        </div>
        <div>
          {JSON.stringify(STATE.perspectiveTokens)}
        </div>
        <button onClick={() => dispatcher("GET_PERSPECTIVE_TOKENS")}>GET TOKENS</button>
      </div>
    );
  }
  const State = () => {
    return (
      <div style={{background: "lightGrey",border:"1px solid grey"}}>
        STATE CONTAINER
        <div>
          {JSON.stringify(STATE)}
        </div>
      </div>
    );
  }
  const InterestingTokens = () => {
    return (
      <div style={{background: "lightGrey",border:"1px solid grey"}}>
        INTERESTING TOKENS CONTAINER
      </div>
    );
  }
  const TradingTokens = () => {
    return (
      <div style={{background: "lightGrey",border:"1px solid grey"}}>
        TRADING TOKENS CONTAINER
      </div>
    );
  }

  const PerspectiveTokensList = () => {
      let [perspectiveTokensList, setPerspectiveTokensList] = useState([]);
      let [params, setParams] = useState({
        "interval":18000000,
        "chainId":1,
        "gainThreshold":0.01,
        "trendingInterval":60
      });

      const getPerspectiveTokens = async () => {
        const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=${params.interval}&chain_id=${params.chainId}&gain_threshold=${params.gainThreshold}&trending_interval=${params.trendingInterval}`;
        if(perspectiveTokensList.length == 0){
           let d = await sendRequest(request)
           console.log("DATA: ", d);
           d = ["0x04c17b9d3b29a78f7bd062a57cf44fc633e71f85-eth","0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-eth"];
           setPerspectiveTokensList(d);
         };
      }

      getPerspectiveTokens();

      useEffect(() => {
        console.log("GET TOKEN DETAIL");
      },[perspectiveTokensList])

      const getTokenData = async (token) => {
        console.log("GET TOKEN DATA FOR: ", token);

        let d = await fetch("https://api.dex.guru/v3/tokens", {
          "body": "{\"ids\":[\"0x04c17b9d3b29a78f7bd062a57cf44fc633e71f85-eth\"],\"limit\":1,\"network\":\"eth,optimism,bsc,gnosis,polygon,fantom,arbitrum,celo,avalanche\"}",
          "method": "POST",
        });
        let dd = await d.json();
        if(store.token[token]){
          store.token[token] = dd.data[0];
        }else{
          store.token = {};
          store.token[token] = dd.data[0];
        }
        console.log("DATA STORE: ", store);
      }

      return (
        <div style={{background: "lightGrey",display:"flex",flexGrow:"1"}}>
          <div>
            <h3>research:</h3>
            <p>Perspective tokens search params:</p>
            <p>{JSON.stringify(params)}</p>
            <p>Perspective tokens:</p>
            {
              perspectiveTokensList.map(token =>
                <>
                  <p style={{border: "0.1px solid Grey"}} onClick={() => getTokenData(token)}>{JSON.stringify(token)}</p>
                  <button onClick={() => console.log("Save token")}>save me</button>

                </>
              )
            }
          </div>
          <div>
            <h3>trade:</h3>
          </div>
          <div>
            <h3>state:</h3>
            <div>{JSON.stringify(STATE)}</div>
            </div>
        </div>);
  }

  return (
    <>
      <Strategy/>
      <PerspectiveTokens/>
      <InterestingTokens/>
      <TradingTokens/>
      <State/>
    </>
  );
}


export default PerspectiveTokens;
