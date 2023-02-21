import React from "react";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import PerspectiveTokensPureComponent from "./PerspectiveTokensPureComponent"
import Accounts from "./Accounts";

const dispatcher = async (msg,payload,state={}) => {

  switch(msg){
    case "SET_INTERVAL":
    console.log("C: (dispatcher) SET INTERVAL IS TRIGGERED WITH STATE MSG PAYLOAD: ", state, msg, payload);
      return {...state, interval: payload}
      break;
    case "SET_CHAIN":
      return {...state, chain: payload};
      break;
    case "SET_GAINS_THRESHOLD":
      return {...state, gainsThreshold: payload};
      break;
    case "SET_SUB_INTERVAL":
      return {...state, subInterval: payload};
      break;
    case "GET_TOKENS":
      let apiQueryPath = "https://api-stage-lax.dexguru.biz/v1/deals/find?interval="
      + state.interval
      + "&chain_id="
      + state.chain
      + "&gain_threshold="
      + state.gainsThreshold
      + "&trending_interval="
      + state.subInterval;

      let response = await fetch(apiQueryPath);
      let data = await response.json();
      let tokenData = data.tokens.map(token => ({
        id: token,
        strategy: payload.join(" ")
      }))
      return {...state, oracleCall: apiQueryPath, perspectiveTokens:tokenData};

    case "GET_WALLET":

      break;

    case "GET_STRATEGIES":
      let strategies = await fetch("https://deals-stage-lax.dexguru.biz/v1/deals/accounts?chain_id=1");
      let strategiesData = await strategies.json();
      return {...state, strategies: strategiesData.virtual};
      break;

    // case "GET_TRADER_PROFILE":
    //   return {...state, strategies: strategiesData.virtual};
    //   break;

    default:
      break;
  }

}

const TradingGame = () => {

  const [state,setState] = useState({
    interval:0,
    chain:0,
    gainsThreshold:0,
    subInterval:0
  });

    // console.log("M: PerspectiveTokensPureComponent INPUT STATE: ", state);

    // const [_state,_setState] = useState(state);

    return (<>
        <div id="tradingGameMainComponent" class="module">Trading Game, hello</div>
        {
          // <PerspectiveTokensPureComponent state={state} dispatcher={dispatcher}/>
          // <Accounts/>
        }
      </>
    );
}

export default TradingGame;
