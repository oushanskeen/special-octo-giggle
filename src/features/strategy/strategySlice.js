import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux'

const initialState = {
  interval: 60,
  subInterval: 60,
  chain: 1,
  gainsThreshold: 0.01,
  perspectiveTokens: {0:0},
  perspectiveTokensFetchStatus: "idle",
  perspectiveTokensFetchError: ""
}

// export const fetchPerspectiveTokens = createAsyncThunk("strategy/fetchPerspectiveTokens", async ({
//   interval, chainId, gainsThreshold, subInterval
// }) => {
//     let request =
//         "https://api-stage-lax.dexguru.biz/v1/deals/find?interval="
//        + interval
//        + "&chain_id="
//        + chainId
//        + "&gain_threshold="
//        + gainsThreshold
//        + "&trending_interval="
//        + subInterval
//      console.log("M: GET TOKENS REQUEST: ", request)
//
//      let response = await fetch(request)
//      let data = response.json()
//
//     return data
// })

export const fetchPerspectiveTokens = createAsyncThunk('strategy/fetchPerspectiveTokens', async ({
   interval, chainId, gainsThreshold, subInterval
}) => {

  let request =
      "https://api-stage-lax.dexguru.biz/v1/deals/find?interval="
     + interval
     + "&chain_id="
     + chainId
     + "&gain_threshold="
     + gainsThreshold
     + "&trending_interval="
     + subInterval
   console.log("M: GET TOKENS REQUEST: ", request)

   let response = await fetch(request)
   let data = await response.json()
   console.log("TOKENS: ", data.tokens)

   console.log("fetchPerspectiveTokens: ", fetchPerspectiveTokens)

   return data
//
//    // return data.data.tokens
//
//  // })
//
// // export const fetchPerspectiveToken = createAsyncThunk('strategy/fetchPerspectiveToken', async ({tokenId, chainId}) => {
//
//   let pool = {}
//   let chains = {
//       1: "eth",
//       10: "optimism",
//       56: "bsc",
//       137: "polygon",
//       250: "fantom",
//       42161: "arbitrum",
//       43114: "avalanche",
//       100: "gnosis",
//       42220: "celo"
//   }
//     for (const token in data.tokens){
//         let tokenId = data.tokens[token]
//         // console.log("TOKEN: ", tokenId)
//       //   // pool[tokenId] = {};
//
//       console.log("TOKEN ID: ", tokenId)
//       console.log("CHAIN ID: ", chainId)
//   //     //
//       let tokenResponse = await fetch("https://api-stage.dex.guru/v3/tokens", {
//           "body": "{\"ids\":[\"" + tokenId + "-" + chains[chainId] + "\"],\"limit\":1,\"network\":\"" + chains[chainId] + "\"}",
//           "method": "POST",
//       });
//       let tokenResponseData = await tokenResponse.json();
//       console.log("TOKEN DATA: ", tokenResponseData.data[0]);
//       pool[tokenId] = tokenResponseData.data[0];
//   }
//   return pool
})




   // dispatch(savePerspectiveTokens(pool))

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    setInterval: (state, action) => {
      state.interval = action.payload
    },
    setChain: (state, action) => {
      state.chain = action.payload
    },
    setGainsThreshold: (state, action) => {
      state.gainsThreshold = action.payload
    },
    setSubInterval: (state, action) => {
      state.subInterval = action.payload
    },
    savePerspectiveTokens: (state, action) => {
      console.log("SAVE PERSPECTIVE TOKEN ", action.payload)
      // let tokensPool = {}
      // for (const token in action.payload){
      //   tokensPool[action.payload[token]] = {}
      // }
      state.perspectiveTokens = {}
      state.perspectiveTokens = action.payload
    },
    // getPerspectiveToken: (state, action) => {
    //
    // },
    savePerspectiveToken: (state, action) => {
        console.log("SAVE PERSPECTIVE TOKEN ", action.payload)
        // let tokenData = action.payload.data[0]
        // state.perspectiveTokens[tokenData.address] = tokenData
    },
    extraReducers:
    {
      [fetchPerspectiveTokens.pending]:(state,action) => console.log("me some", state, action)
    }
    // (builder) => {
    //   builder
    //     .addCase(fetchPerspectiveTokens.pending, () => {
    //       // state.perspectiveToknsFetchStatus = 'loading'
    //     })
    //     .addCase(fetchPerspectiveTokens.fulfilled, (state, action) => {
    //       state.perspectiveTokens = action.payload.data
    //       // useDispatch(savePerspectiveTokens(action.payload.data))
    //       state.perspectiveTokensFetchStatus = 'idle...'
    //       // strategySlice.reducer()
    //     })
    // }
  }
})

console.log("\n\nstrategySlice\n\n", strategySlice)

export const selectStrategyInterval = state => {
  return state.strategy.interval
}

export const { setInterval, setChain, setGainsThreshold, setSubInterval, savePerspectiveTokens, savePerspectiveToken } = strategySlice.actions

export default strategySlice.reducer
