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
  isDataReady: false,
  smaOneValue: 2,
  smaTwoValue: 4,
  prepareDataInstance: {},
  tradeTriggerValues: [],
  tradeResults: [],
  medianTradeValues: [],
  averageTradeValues: [],
  msgLog: [],
  candleSize: "5"
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
      state.msgLog.push("getSma")
      // console.log("M: [plotSlice.js] getSMA state: ", state)
      console.log("M: [plotSlice.js] getSMA action: ", action)
      state.sma[action.payload] = action.payload
      console.log("M: [plotSlice.js] getSMA state: ", state.sma)
      // state = state
      // state.tokenId = action.payload.tokenId
      // state.tokenTradingData = action.payload.tokenTradingData
    },
    storeTokenCandles: (state, action) => {
        state.tokenCandles = action.payload?.data && action.payload.data.t
            .map((e,i) => (
            {
                date: e,
                value: action.payload.data.o[i],
                candleSize: action.payload.candleSize,
                group:"rawValue"
            }
        ))

        // state.msgLog.push("storeTokenCandles: ", state.tokenCandles?.slice(0,5))
      // console.log("M: [plotSlice.js] storeTokenCandles(", state.tokenCandles, ")")
    },
    countTradingPoints: (state, action) => {
      state.msgLog.push("countTradingPoints")
      // console.log("M: [plotSlice.js/countTradingPoints] input", state.prepareDataInstance.getTradingDots())
      state.tradingPoints = state.prepareDataInstance.getTradingDots()[0]
      state.tradeTriggerValues = state.prepareDataInstance.getTradingDots()[1]
      state.smaOverlapAreasDiff = state.prepareDataInstance.smaOverlapAreasDiff
      console.log("M: [plotSlice.js/countTradingPoints] output ", state.tradingPoints)
    },
    countSMAData: (state, action) => {
      state.msgLog.push("countSMAData")
      let prepareData = this && this.prepareDataInstance || new PrepareData(
        action.payload.tokenCandles,
        action.payload.smaOneValue,
        action.payload.smaTwoValue
      )
      console.log("M: [plotSlice.js/countSMAData] this.prepareDataInstance: ", prepareData)
      state.smaOneData = prepareData.getSMAOne()
      state.smaTwoData = prepareData.getSMATwo()
      state.prepareDataInstance = prepareData;
    },
    // countTradePoints: (state, action) => {
    //   state.tradingPoints = state;
    //   console.log("M: [plotSlice/countTradePoints] state: ", state)
    // },
    setSmaOneValue: (state, action) => {
        state.msgLog.push("setSmaOneValue")
        state.smaOneValue = action.payload
    },
    setSmaTwoValue: (state, action) => {
        state.msgLog.push("setSmaTwoValue")
        state.smaTwoValue = action.payload
    },
    countTradeResults: (state, action) => {
        state.msgLog.push("countTradeResults")
        state.tradeResults = state.prepareDataInstance.countTradeResults()
    },
    countMedianTradeValues: (state, action) => {
        state.msgLog.push("countMedianTradeValues")

        const sells = action.payload?.filter(e => e.action == "sell")

        console.log("M: [plotSlice.js/countMedianTradeValues] sells: ", sells)

        const sellsAmount = sells?.length
        const sellsMedian = sells && sells[Math.round(sells.length/2)]
        const buys = action.payload?.filter(e => e.action == "buy")
        const buysAmount = buys?.length
        const buysMedian = buys && buys[Math.round(buys.length/2)]
        const expectedProfitFromMedian = sellsMedian && buysMedian &&
          (sellsAmount * -sellsMedian.value) + (buysAmount * buysMedian.value)
          || Math.random()

        const sellsAverage = sells && sells.map(e => e.value)
        // .reduce((sum,acc) => sum + acc,0).map(e => -e)/sellsAmount
        // const buysAverage = sells && buys.reduce((sum,acc) => sum + acc,0)/buysAmount
        // const expectedProfitFromAverage = sellsAverage && buysAverage &&
        //   (sellsAmount * sellsAverage.value) + (buysAmount * buysAverage.value)
        //   || Math.random()

        // console.log("M: [plotSlice.js/countMedianTradeValues] prepareDataInstance ", state.prepareDataInstance)
        // console.log("M: [plotSlice.js/countMedianTradeValues] msgLog ", state.plot)
        state.medianTradeValues = [...state.medianTradeValues,{value:expectedProfitFromMedian,date:state.medianTradeValues.length,group:"countMedianTradeValues"}]
        // state.averageTradeValues = [...state.averageTradeValues,{value:expectedProfitFromAverage,date:state.medianTradeValues.length,group:"averageTradeValues"}]

        // state.prepareDataInstance = state.prepareDataInstance
    },
    setCandleValue: (state, action) => {
        state.msgLog.push("setCandleValue: " + action.payload)
        console.log("M: [plotSlice.js/setCandleValue] candleSize: ", action.payload)
        state.candleSize = action.payload
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
export const { getSMA, countTradingPoints, storeTokenCandles, countSMAData, setSmaOneValue, setSmaTwoValue, countTradePoints, countTradeResults,countMedianTradeValues, setCandleValue } = plotSlice.actions
export default plotSlice.reducer
