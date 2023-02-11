import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import * as d3 from "d3";

const sendRequest = async (request) => {
    console.log("REQUEST: ", request);
    const response = await fetch(request);
    const data = await response.json();
    return data;
}

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
//       this.storage = {};
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
//     return [JSON.stringify(this.storage)];
//   }
//   async populate(){
//     console.log("C: (TokensStore) populate");
//     const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.01&trending_interval=1800`;
//        let d = await sendRequest(request)
//        console.log("DATA: ", d);
//        d.tokens.map(tokenName => this.storage[tokenName] = new Token(tokenName))
//        console.log("NEW STORAGE: ", this.storage);
//   }
//   isEmpty(){
//     return Object.keys(this.storage) == 0;
//   }
// }
//

// const populate = async () => {
//         const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.01&trending_interval=1800`;
//          let d = await sendRequest(request)
//          console.log("DATA: ", d);
//          d.tokens.map(tokenName => UPDATE_STORE({...STORE, [tokenName]:<Token name={tokenName}/>}))
//        // this.data = tt;
//    //     console.log("NEW TOKEN DATA ", this.data);
//
// }

const Token = (name) => {
  console.log("RENDER ME")
  return <>Me Token: {name}</>;
}

class TokensStore{
  constructor(){
    this.fullState = true;
    this.storage = {};
  }
  isEmpty(){
    console.log("C: (TokensStore) isEmpty")
    return this.fullState;
  }
  getTokens(){
    console.log("C: (TokensStore) getTokens")
    return this.storage;
  }
  async populate(){
    console.log("C: (TokensStore) populate")
    const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.01&trending_interval=1800`;
    let d = await sendRequest(request)
    console.log("DATA: ", d);
    let pool = d.tokens.map(tokenName => ({[tokenName]:<Token name={tokenName}/>}));
    console.log("NEW STORAGE: ", pool);
  }
}

const PerspectiveTokens = () => {
//
  let [STORE,UPDATE_STORE] = useState({});
  const isEmpty = () => Object.keys(STORE).length == 0;
  const getTokens = () => isEmpty(STORE) && [] || Object.values(STORE);

  useEffect(() => {
    isEmpty(STORE) && (async() => {
      console.log("C: (TokensStore) populate")
      const request = `https://api-stage-lax.dexguru.biz/v1/deals/find?interval=3600&chain_id=1&gain_threshold=0.01&trending_interval=1800`;
      let d = await sendRequest(request)
      console.log("DATA: ", d);
      d.tokens.forEach(tokenName => UPDATE_STORE({...STORE,[tokenName]:<Token name={tokenName}/>}))
      // let pool = d.tokens.map(tokenName => ({[tokenName]:<Token name={tokenName}/>}));
      // console.log("NEW STORAGE: ", pool);
    })()
  },[STORE])


  // let [STORE,UPDATE_STORE] = useState(new TokensStore());




  // STORE.isEmpty() && STORE.populate();
  // UPDATE_STORE(STORE);

//
//   // let STORE = new TokensStore();
//
//   useEffect(() => {
//     console.log("STORE UPDATE");
//   },[STORE]);

  const TokenTokens = () => {
    return (
      <div>
        <h3>TOKEN TOKENS CONTAINER</h3>
        <div>
          {
            !isEmpty(STORE) && getTokens(STORE).map(token => ({token}))
          }
        </div>
      </div>
    );
  }

  return (
    <div style={{background: "#202020",border:"1px solid grey",color:"lightGrey"}}>
      <TokenTokens/>
    </div>
  );
}


export default PerspectiveTokens;
