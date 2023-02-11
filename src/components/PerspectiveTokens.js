import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import * as d3 from "d3";

const DevModule = ({name="...", state ="...state",msg="...msg"}) => {
  return (
    <div class="dev_module">
      <div>
        name: {name}
      </div>
      <div>
        state: {state}
      </div>
      <div>
        msg: {msg}
        {
          // <div class="bullet">
          //   from: {msg.from}
          // </div>
          // <div class="bullet">
          //   to: {msg.to}
          // </div>
          // <div class="bullet">
          //   payload: {msg.payload}
          // </div>
        }
      </div>
    </div>
  )
}

const PerspectiveTokens = () => {

    const [STATE, SET_STATE] = useState({
        setStrategy:[],
        tradingTokens:[]
    });

    const dispatcher = (msg, payload) => {
      switch(msg){
          case "SAVE_STRATEGY":
              console.log("M: SAVE_STRATEGY: ", payload);
              SET_STATE({...STATE,setStrategy:payload});
              break;
          case "SAVE_TRADING_TOKEN":
              console.log("M: SAVE_TRADING_TOKEN: ", payload);
              SET_STATE({...STATE,tradingTokens:[...STATE.tradingTokens, payload]});
              break;
          default:
              break;
      }

  }


  const Strategy = () => {

      const [state,setState] = useState({});
      const [msg,setMsg] = useState("...");

      useState(() => {
        console.log("REGISTER MESSAGE");
        // switch(msg){
          // case "SET_CHOSEN_STRATEGY":
            msg == "SET_CHOSEN_STRATEGY" && dispatcher("SET_CHOSEN_STRATEGY",{from:"StrategyComponent",to:"TokensTableComponent",payload:state});
            // break;
          // default:
            // break;
        // };
        setInterval(() => setMsg("..."), 3000);
      },[state,msg])

      let frameOptions = [60,300,600,1800,3600];
      let chains = [1,2,3,4,5];
      const [intervalValue, setIntervalValue] = useState(0);
      const [chainId, setChainId] = useState(0);
      const [gainsThreshold, setGainsThreshold] = useState(0.01);
      const [trendingInterval, setTrendingInterval] = useState(0);
      const [strategy, setStrategy] = useState([frameOptions[intervalValue],chains[chainId],+gainsThreshold,frameOptions[trendingInterval]]);
      useEffect(() => {
          // setState()
          // dispatcher("SAVE_CURRENT_STRATEGY",[[frameOptions[intervalValue],chains[chainId],+gainsThreshold,frameOptions[trendingInterval]]]);
          setState([frameOptions[intervalValue],chains[chainId],+gainsThreshold,frameOptions[trendingInterval]]);
      },[intervalValue,chainId,gainsThreshold,trendingInterval]);

    return (
      <>
        <div class="module">
          {
          <div class="module box">
          <div class="module sliderbox">
            <div>{frameOptions[intervalValue]}</div>
            <input type="range" min="0" max={frameOptions.length - 1} value={intervalValue} onChange={(e) => setIntervalValue(e.target.value)} class="slider" id="myRange" step="1"/>
            <div>interval</div>
          </div>
          <div class="module sliderbox">
             <div>{chains[chainId]}</div>
             <input type="range" min="0" max={chains.length - 1} value={chainId} onChange={(e) => setChainId(e.target.value)} class="slider" id="myRange2" step="1"/>
             <div>chain</div>
           </div>
           <div class="module sliderbox">
             <div>{gainsThreshold}</div>
             <input type="range" min="0.01" max="1" value={gainsThreshold} onChange={(e) => setGainsThreshold(e.target.value)} class="slider" id="myRange" step="0.01"/>
             <div>gains threshold</div>
           </div>
           <div class="module sliderbox">
             <div>{frameOptions[trendingInterval]}</div>
             <input type="range" min="0" max={frameOptions.length - 1} value={trendingInterval} onChange={(e) => setTrendingInterval(e.target.value)} class="slider" id="myRange" step="1"/>
             <div>trending interval</div>
           </div>
             <div class="module sliderbox btn" onClick={() => setMsg("SET_CHOSEN_STRATEGY")}>
               get tokens
             </div>
             {
               // <h4 class="caption">STRATEGY</h4>
             }
           </div>
         }
        </div>
      </>
    );
  }

  const PerspectiveTokensTable = () => {

      const [state,setState] = useState({});
      const [perspectiveTokens,savePerspectiveTokens] = useState([
          {
              id:"id",
              name:"name",
              volume:"volume",
              liquidity:"liquidity",
              price:"price",
              delta:"delta",
              buyButton:"button"
          },
          {
              id:"id",
              name:"name",
              volume:"volume",
              liquidity:"liquidity",
              price:"price",
              delta:"delta",
              buyButton:"button"
          },
          {
              id:"id",
              name:"name",
              volume:"volume",
              liquidity:"liquidity",
              price:"price",
              delta:"delta",
              buyButton:"button"
          }
      ]);

      useEffect(() => {},[perspectiveTokens]);

      const handleBuy = (payload) => {
          console.log("HANDLE BUY: ", payload);
          dispatcher("SAVE_TRADING_TOKEN", payload);
      }

      const PerspectiveToken = ({data}) => {

          const [tokenData,setTokenData] = useState(data);

          return(
              <div class="perspectiveToken module box">
                  {Object.entries(data).map((record,i) => <td>{record[1] == "button" ? <div class="btn" onClick={() => handleBuy(tokenData.id)}>buy</div> : record[1]}</td>)}
              </div>
          );
      }

      return (
          <>
              <div class="perspectiveTokenTable module">
              {perspectiveTokens.map(token => <PerspectiveToken data={token}/>)}
              </div>
          </>
      );
  }

  const TraderProfile = () => {
    const [state,setState] = useState({});
    const [tokenProfileTokens,setTokenProfileTokens] = useState([
        {
            id:"id",
            asset:"asset",
            currentBalance:"currentBalance",
            change7d:"change7d",
            avrAckPrice:"avrAckPrice",
            currentPrice:"currentPrice",
            inOutMOney:"inOutMOney",
            buyButton:"chartButton"
        },
        {
          id:"id",
          asset:"asset",
          currentBalance:"currentBalance",
          change7d:"change7d",
          avrAckPrice:"avrAckPrice",
          currentPrice:"currentPrice",
          inOutMOney:"inOutMOney",
          buyButton:"chartButton"
        },
        {
          id:"id",
          asset:"asset",
          currentBalance:"currentBalance",
          change7d:"change7d",
          avrAckPrice:"avrAckPrice",
          currentPrice:"currentPrice",
          inOutMOney:"inOutMOney",
          buyButton:"chartButton"
        }
    ]);

    const TokenProfileToken = ({data}) => {

        const [tokenData,setTokenData] = useState(data);

        return(
            <div class="perspectiveToken module box">
                {Object.entries(data).map((record,i) => <td>{record[1]}</td>)}
            </div>
        );
    }

    return (
        <div class="perspectiveToken module">
          {tokenProfileTokens.map(token => <TokenProfileToken data={token}/>)}
        </div>
    )
  }

  return (
      <div class="perspectiveTokens module">
            <Strategy/>
            <PerspectiveTokensTable/>
            <TraderProfile/>
      </div>
  );
}


export default PerspectiveTokens;
