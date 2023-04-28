import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import PrepareData from "./PrepareData"

// import axios from "axios"
// import { useSelector, useDispatch } from 'react-redux'

const initialState = {
  sma: {},
  tokenCandles: [],
  tradingPoints: [],
  smaOneData: [],
  smaTwoData: [],
  // tradePoints: [],
  smaOneValue: 2,
  smaTwoValue: 4,
  prepareDataInstance: {}
  // perspectiveTokensFetchStatus: "idle"
}

// export const fetchTokenTradingData = createAsyncThunk('plot/fetchTokenTradingData', async ({
//    symbol = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth",
//    resolutionScope = "1",
//    resolutionDimension = "D",
//    start = "1656374400",
//    stop = "1682380800"
// }) => {
//   let request =
//       "https://api.dex.guru/v1/tradingview/history"
//     + "?symbol=" + symbol +  "_USD-indicators"
//     + "&resolution=" + resolutionScope + resolutionDimension
//     + "&from=" + start
//     + "&to=" + stop
//    let response = await fetch(request)
//    let data = await response.json()
//    return data
// })

const plotSlice = createSlice({
  name: 'plot',
  initialState,
  reducers: {
    getSMA: (state, action) => {
      // console.log("M: [plotSlice.js] getSMA state: ", state)
      console.log("M: [plotSlice.js] getSMA action: ", action)
      state.sma[action.payload] = action.payload
      console.log("M: [plotSlice.js] getSMA state: ", state.sma)
      // state = state
      // state.tokenId = action.payload.tokenId
      // state.tokenTradingData = action.payload.tokenTradingData
    },
    storeTokenCandles: (state, action) => {
        state.tokenCandles = action.payload && action.payload.t
            .map((e,i) => (
            {
                date: e,
                value: action.payload.o[i],
                group:"rawValue"
            }
        ))
      // console.log("M: [plotSlice.js] storeTokenCandles(", state.tokenCandles, ")")
    },
    countTradingPoints: (state, action) => {
      // console.log("M: [plotSlice.js/countTradingPoints] input", state.prepareDataInstance.getTradingDots())
      state.tradingPoints = state.prepareDataInstance.getTradingDots()
      state.smaOverlapAreasDiff = state.prepareDataInstance.smaOverlapAreasDiff
      console.log("M: [plotSlice.js/countTradingPoints] output ", state.tradingPoints)
    },
    countSMAData: (state, action) => {
      const prepareData = new PrepareData(
        action.payload.tokenCandles,
        action.payload.smaOneValue,
        action.payload.smaTwoValue
      )
      state.smaOneData = prepareData.getSMAOne()
      state.smaTwoData = prepareData.getSMATwo()
      state.prepareDataInstance = prepareData;
    },
    // countTradePoints: (state, action) => {
    //   state.tradingPoints = state;
    //   console.log("M: [plotSlice/countTradePoints] state: ", state)
    // },
    setSmaOneValue: (state, action) => {
        state.smaOneValue = action.payload
    },
    setSmaTwoValue: (state, action) => {
        state.smaTwoValue = action.payload
    },

    // extraReducers:
    // {
    //   [fetchTokenTradingData.pending]:(state,action) => console.log("me some", state, action)
    // }
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

// console.log("\n\nstrategySlice\n\n", strategySlice)

// export const selectStrategyInterval = state => {
//   return state.strategy.interval
// }

// export const { setType, setName, setInterval, setGainInterval, setChain, setGainsThreshold, setSellThreshold, setSubInterval, savePerspectiveTokens, savePerspectiveToken, setStartBalance } = plotSlice.actions
export const { getSMA, countTradingPoints, storeTokenCandles, countSMAData, setSmaOneValue, setSmaTwoValue, countTradePoints } = plotSlice.actions
export default plotSlice.reducer
