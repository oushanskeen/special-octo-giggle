import React from "react";
import {useEffect, useRef, useState,useLayoutEffect} from "react";


const PerspectiveTokens = () => {

  class Bob{
      changeInterval(value){
          dispatcher("SET_INTERVAL", value);
      }
      changeChain(value){
          dispatcher("SET_CHAIN", value);
      }
      changeGainsThreshold(value){
          dispatcher("SET_GAINS_THRESHOLD", value);
      }
      changeTrendingInterval(value){
          dispatcher("SET_TRENDING_INTERVAL", value);
      }
      askForTokens(){
          dispatcher("GET_PERSPECTIVE_TOKENS");
      }
      waitForTokens(){
          dispatcher("WAIT_FOR_PERSPECTIVE_TOKENS");
      }
      receivingTokens(){
          dispatcher("RECEIVE_PERSPECTIVE_TOKENS");
      }
      askForWallet(){
          dispatcher("GET_WALLET");
      }
      waitForWallet(){
          dispatcher("WAIT_FOR_WALLET");
      }
      receivingWallet(){
        dispatcher("RECEIVE_WALLET");
      }
      buyToken(token){
        dispatcher("BUY_TOKEN", token);
      }
  }

  //   const [STATE, SET_STATE] = useState({
  //       setStrategy:{
  //           interval: 60,
  //           chainId: 1,
  //           gainsThreshold: 0.01,
  //           trendingInterval:60
  //       },
  //       perspectiveTokens:[],
  //       tradingTokens:[]
  //   });
  //
  //   const dispatcher = async (msg, payload) => {
  //     let response, data;
  //     switch(msg){
  //         case "GET_PERSPECTIVE_TOKENS":
  //
  //             SET_STATE({...STATE, setStrategy:payload});
  //
  //             // console.log("M: GET_PERSPECTIVE_TOKENS WITH STRATEGY: ", payload);
  //
  //             let request =
  //                 "https://api-stage-lax.dexguru.biz/v1/deals/find?interval="
  //                 + payload.interval
  //                 + "&chain_id="
  //                 + payload.chainId
  //                 + "&gain_threshold="
  //                 + payload.gainsThreshold
  //                 + "&trending_interval="
  //                 + payload.trendingInterval;
  //
  //             console.log("M: GET TOKENS REQUEST: ", request);
  //
  //             response = await fetch(request);
  //             data = await response.json();
  //
  //             SET_STATE({...STATE, perspectiveTokens:[...STATE.perspectiveTokens, ...data.tokens],setStrategy:payload});
  //             // console.log("Data: ", data);
  //             // console.log("STATE: ", STATE.perspectiveTokens);
  //
  //             break;
  //         case "SAVE_TRADING_TOKEN":
  //             console.log("M: SAVE_TRADING_TOKEN: ", payload);
  //             SET_STATE({...STATE,tradingTokens:[...STATE.tradingTokens, payload]});
  //         // case "GET_PERSPECTIVE_TOKEN":
  //             // console.log("M: GET_PERSPECTIVE_TOKEN: ", payload);
  //             // response = await fetch("https://api-stage.dex.guru/v3/tokens", {
  //             //     "body": "{\"ids\":[\"" + payload + "-eth\"],\"limit\":1,\"network\":\"eth,optimism,bsc,polygon,fantom,arbitrum,celo,avalanche,gnosis,canto,osmosis,nova,meter\"}",
  //             //     "method": "POST",
  //             // });
  //             // data = await response.json();
  //             // console.log("TOKEN DATA: ", data.data[0]);
  //             // SET_STATE({...STATE,tradingTokens:[...STATE.tradingTokens, data]});
  //             break;
  //         default:
  //             break;
  //     }
  //
  // }
  //
  //
  // const Strategy = () => {
  //
  //     const [state,setState] = useState(STATE.setStrategy);
  //     const [msg,setMsg] = useState("...");
  //
  //     let frameOptions = [60,300,600,1800,3600];
  //     let chains = [1,10,56,137,250,42161,43114,100,42220];
  //     const [intervalValue, setIntervalValue] = useState(frameOptions.indexOf(STATE.setStrategy.interval));
  //     const [chainId, setChainId] = useState(chains.indexOf(STATE.setStrategy.chainId));
  //     const [gainsThreshold, setGainsThreshold] = useState(STATE.setStrategy.gainsThreshold);
  //     const [trendingInterval, setTrendingInterval] = useState(frameOptions.indexOf(STATE.setStrategy.trendingInterval));
  //     const [strategy, setStrategy] = useState([frameOptions[intervalValue],chains[chainId],+gainsThreshold,frameOptions[trendingInterval]]);
  //     useEffect(() => {
  //         setStrategy({
  //           interval:frameOptions[intervalValue],
  //           chainId:chains[chainId],
  //           gainsThreshold:+gainsThreshold,
  //           trendingInterval:frameOptions[trendingInterval]
  //         });
  //     },[intervalValue,chainId,gainsThreshold,trendingInterval]);
  //
  //   return (
  //       <>
  //           <div>
  //             {
  //            <div class="module box">
  //         <div class="module sliderbox">
  //           <div id="intervalRangeValue">interval: {frameOptions[intervalValue]}</div>
  //           <input id="intervalRange" type="range" min="0" max={frameOptions.length - 1} value={intervalValue} onChange={(e) => setIntervalValue(e.target.value)} class="slider" step="1"/>
  //
  //         </div>
  //         <div class="module sliderbox">
  //            <div id="chainRangeValue">chain: {chains[chainId]}</div>
  //            <input type="range" min="0" max={chains.length - 1} value={chainId} onChange={(e) => setChainId(e.target.value)} class="slider" id="chainRange" step="1"/>
  //          </div>
  //
  //          <div class="module sliderbox">
  //            <div id="gainsThresholdRangeValue">gains threshold: {gainsThreshold}</div>
  //            <input type="range" min="0.01" max="1" value={gainsThreshold} onChange={(e) => setGainsThreshold(e.target.value)} class="slider" id="gainsThresholdRange" step="0.01"/>
  //          </div>
  //          <div class="module sliderbox">
  //            <div id="trendingIntervalRangeValue">trending interval: {frameOptions[trendingInterval]}</div>
  //            <input type="range" min="0" max={frameOptions.length - 1} value={trendingInterval} onChange={(e) => setTrendingInterval(e.target.value)} class="slider" id="trendingIntervalRange" step="1"/>
  //
  //          </div>
  //            <div id="getPerspectiveTokensButton" class="btn" onClick={() => dispatcher("GET_PERSPECTIVE_TOKENS",strategy)}>
  //              get tokens
  //            </div>
  //
  //          </div>
  //        }
  //       </div>
  //     </>
  //   );
  // }
  //
  // const PerspectiveTokensTable = () => {
  //
  //     const [state,setState] = useState({});
  //     const [perspectiveTokens,savePerspectiveTokens] = useState(
  //       // [
  //         STATE.perspectiveTokens
  //
  //   );
  //
  //     useEffect(() => {},[STATE.perspectiveTokens]);
  //
  //     const handleBuy = (payload) => {
  //         console.log("HANDLE BUY: ", payload);
  //         dispatcher("SAVE_TRADING_TOKEN", payload);
  //     }
  //
  //     const PerspectiveToken = ({tokenName,chainId}) => {
  //
  //         console.log("Perspective token got tokenName: ", tokenName);
  //
  //         const [tokenData,setTokenData] = useState(
  //             {
  //                 name: tokenName,
  //                 data:[],
  //                 strategy:STATE.setStrategy
  //             }
  //         );
  //
  //         let chains = {
  //           "1": "eth",
  //           "10": "optimism",
  //           "56": "bsc",
  //           "137": "polygon",
  //           "250": "fantom",
  //           "42161": "arbitrum",
  //           "43114": "avalanche",
  //           "100": "gnosis",
  //           "42220": "celo"
  //         }
  //
  //         useEffect(() => {
  //             console.log("TOKEN NAME RECEIVED: ", tokenData.name);
  //
  //         tokenData.data.length == 0 && (async() => {
  //
  //           let requestBody = "{\"ids\":[\"" + tokenData.name + "-" + chains[chainId] + "\"],\"limit\":1,\"network\":\"" + chains[chainId] + "\"}";
  //           console.log("TOKEN REQUEST BODY: ", requestBody);
  //           let response = await fetch("https://api-stage.dex.guru/v3/tokens", {
  //                 "body": requestBody,
  //                 "method": "POST",
  //             });
  //           let data = await response.json();
  //             console.log("DATA: ", data);
  //             if(data.data){
  //               const {name, id, volume24hUSD, liquidityUSD, priceUSD, priceUSDChange24h} = data.data[0];
  //               setTokenData({
  //                 ...tokenData,
  //                 data: {
  //                   id:id,
  //                   name:name,
  //                   volume:volume24hUSD,
  //                   liquidity:liquidityUSD,
  //                   price: priceUSD,
  //                   delta: priceUSDChange24h,
  //                   strategy: Object.values(STATE.setStrategy).join(","),
  //                   button:"button",
  //                 }
  //               })
  //           }else{
  //             setTokenData({
  //               ...tokenData,
  //               data: {
  //                 id:tokenName + "-" + chains[chainId],
  //                 name:"RNF",
  //                 volume:"RNF",
  //                 liquidity:"RNF",
  //                 price: "RNF",
  //                 delta: "RNF",
  //                 strategy: "RNF",
  //                 button:"button",
  //               }
  //             })
  //           }
  //         })()
  //       },[tokenData]);
  //
  //         return(
  //             <div class="perspectiveTokenRecord module box">
  //                 {
  //                   Object.entries(tokenData.data)
  //                   .map((record,i) => (<td>
  //                     {
  //                       record[1] == "button"
  //                       ? <div class="btn" onClick={() => handleBuy(tokenData.id)}>buy</div>
  //                       : record[0] == "strategy"
  //                         ? <div class="strategy">{record[1]}</div>
  //                         : record[0] == "id"
  //                           ? <a href={"https://dex.guru/token/" + record[1]}>{record[1]}</a>
  //                           : record[1]
  //                     }
  //                     </td>))
  //                 }
  //             </div>
  //         );
  //     }
  //
  //     return (
  //         <>
  //               <h3>perspective tokens</h3>
  //             {
  //               perspectiveTokens.length > 0 ?
  //               <div class="perspectiveTokenRecord module box">
  //                 {
  //                   ["id","name","volume","liquidity","price","delta","strategy",""].map(head => (
  //                     <td>
  //                       {head}
  //                     </td>)
  //                   )
  //                 }
  //             </div>
  //             : <div>...not tokens received, please ask for them above</div>
  //             }
  //             <div class="perspectiveTokenTable module">
  //             {perspectiveTokens.map(tokenName => <PerspectiveToken tokenName={tokenName} chainId={STATE.setStrategy.chainId}/>)}
  //             </div>
  //         </>
  //     );
  // }
  //
  // const TraderProfile = () => {
  //   const [state,setState] = useState({
  //
  //   });
  //
  //   !state.wallet && (async() => {
  //           // let data;
  //           let response = await fetch("https://api.dex.guru/v3/wallets/0xa0942d8352ffabcc0f6dee32b2b081c703e726a5/totals?is_verified=true")
  //           let data = await response.json();
  //           // setState({...state, wallet: data});
  //           let filteredData = data.balances.map(({tokenID, symbols, balanceUSD, change7Days, dealsAVGPrice, marketPrice, inAmountWeekSum, outAmountWeekSum}) =>
  //             ({tokenID, symbols, balanceUSD, change7Days, dealsAVGPrice, marketPrice, inAmountWeekSum, outAmountWeekSum}));
  //           console.log("DATA: ", filteredData);
  //           setState({...state, wallet: filteredData});
  //           // const {tokenId, symbols, balanceUSD, change7Days, dealsAVGPrice, marketPrice, inAmountWeekSum, outAmountWeekSum} = token;
  //       })()
  //       // })
  //   useEffect(() => {
  //     console.log("\nWALLET: \n ", state.wallet);
  //   },[state]);
  //
  //
  //   const [tokenProfileTokens,setTokenProfileTokens] = useState([
  //       {
  //           id:"id",
  //           asset:"asset",
  //           currentBalance:"currentBalance",
  //           change7d:"change7d",
  //           avrAckPrice:"avrAckPrice",
  //           currentPrice:"currentPrice",
  //           inOutMOney:"inOutMOney",
  //           buyButton:"chartButton"
  //       },
  //       {
  //         id:"id",
  //         asset:"asset",
  //         currentBalance:"currentBalance",
  //         change7d:"change7d",
  //         avrAckPrice:"avrAckPrice",
  //         currentPrice:"currentPrice",
  //         inOutMOney:"inOutMOney",
  //         buyButton:"chartButton"
  //       },
  //       {
  //         id:"id",
  //         asset:"asset",
  //         currentBalance:"currentBalance",
  //         change7d:"change7d",
  //         avrAckPrice:"avrAckPrice",
  //         currentPrice:"currentPrice",
  //         inOutMOney:"inOutMOney",
  //         buyButton:"chartButton"
  //       }
  //   ]);
  //
  //
  //   const TokenProfileToken = ({data}) => {
  //
  //       const [tokenData,setTokenData] = useState(data);
  //
  //       return(
  //           <div class="perspectiveToken module box">
  //               {Object.entries(tokenData).map((record,i) => <td>{JSON.stringify(record[1])}</td>)}
  //           </div>
  //       );
  //   }
  //
  //   return (
  //       <div class="perspectiveToken module">
  //           <h3>wallet</h3>
  //           {state.wallet &&
  //             ["tokenID", "symbols", "balanceUSD", "change7Days", "dealsAVGPrice", "marketPrice", "inAmountWeekSum", "outAmountWeekSum"].map(head => (
  //               <td>
  //                 {head}
  //               </td>)
  //             )
  //           }
  //
  //         <div>
  //           {state.wallet ? state.wallet.map(token => <TokenProfileToken data={token}/>) : <div>...loading wallet</div>}
  //         </div>
  //       </div>
  //   )
  // }

  return (
      <div class="perspectiveTokens module">
      {
        // <Strategy/>
        // <PerspectiveTokensTable/>
        // <TraderProfile/>
      }
      </div>
  );
}


export default PerspectiveTokens;
