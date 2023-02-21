import React from "react"
import {useEffect, useRef, useState,useLayoutEffect} from "react"

// import { useAppDispatch, useAppSelector } from '../../app/hooks'

import { useSelector, useDispatch } from 'react-redux'
// import { selectStrategyInterval, setInterval } from '../features/strategy/strategySlice'

import UserDisplay from "../features/users/UserDisplay"
import { Counter } from "../features/counter/Counter"
import Strategy from "../features/strategy/Strategy"

const PerspectiveTokens = () => {

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
          <p>...element is out of order...</p>
          {
            <div>
              // <Strategy/>
              // <UserDisplay/>
              <Counter/>
            </div>
            // <PerspectiveTokensTable/>
            // <TraderProfile/>
          }
      </div>
  );
}


export default PerspectiveTokens;
