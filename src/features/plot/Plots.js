import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import { useSelector, useDispatch } from 'react-redux'
import * as d3 from "d3"
import sma from "./sma"
import SimpleSMA from "./SimpleSMA"
import { useGetTokenCandlesTimeBoundQuery } from '../../services/pokemon'
import edges from "./edges"
import SMAanimated from "./SMAanimated"
import MatrixDots from "./MatrixDots"
import TestStand from "./TestStand"
import MovingDots from "./MovingDots"
import InteractiveNodes from "./InteractiveNodes"
import TestBubble from "./TestBubble"
import SimpleInteratuve from "./SimpleInteratuve"
import WeightFrequencySpread from "./WeightFrequencySpread"
import WeightFrequencySpreadTimeTracked from "./WeightFrequencySpreadTimeTracked"
import prepareData from "./prepareData"
import SMAmulti from "./SMAmulti"
import SMAstrategy from "./SMAstrategy"
import SMASliders from "./SMASliders"
import DelayedIterator from "./DelayedIterator"

import {
  storeTokenCandles,
  countTradingPoints,
  countSMAData,
  countTradeResults,
  countMedianTradeValues
} from './plotSlice'

import {
  useGetTokenCandlesQuery
} from '../../services/pokemon'

const Plots = () => {

    const dispatch = useDispatch()

    const candleSize = useSelector(state => state.plot.candleSize)
    const { refetch, data, error, isLoading, isFetching } = useGetTokenCandlesQuery({
      candleSize:candleSize
    })

    let tokenCandles = useSelector(state => state.plot.tokenCandles)
    let smaOneData = useSelector(state => state.plot.smaOneData)
    let smaTwoData = useSelector(state => state.plot.smaTwoData)
    let smaOneValue = useSelector(state => state.plot.smaOneValue)
    let smaTwoValue = useSelector(state => state.plot.smaTwoValue)
    let tradingPoints = useSelector(state => state.plot.tradingPoints)
    let smaOverlapAreasDiff = useSelector(state => state.plot.smaOverlapAreasDiff)
    let tradeTriggerValues = useSelector(state => state.plot.tradeTriggerValues)
    let tradeResults = useSelector(state => state.plot.tradeResults)
    let medianTradeValues = useSelector(state => state.plot.medianTradeValues)
    let msgLog = useSelector(state => state.plot.msgLog)

    useEffect(() => {
        console.log("S: [Plots.js] candles received: ", data)
        dispatch(storeTokenCandles({data:data,candleSize:candleSize}))
        // dispatch(setDataLoadState())
    },[data])

    useEffect(() => {
        console.log("S: [Plots.js/useEffect(candleSize)] candles received: ", data)
        refetch()
        dispatch(storeTokenCandles(data))
    },[candleSize])

    useEffect(() => {
        dispatch(countSMAData({
          tokenCandles:tokenCandles,
          smaOneValue:smaOneValue,
          smaTwoValue:smaTwoValue
        }))
    },[smaOneValue,smaTwoValue,tokenCandles])

    useEffect(() => {
        console.log("M: [Plot] useEffect(smaOneData,smaTwoData)")
        dispatch(countTradingPoints())
    },[smaOneData,smaTwoData])

    useEffect(() => {
        console.log("M: [Plot] useEffect(tradePoints) tradePoints: ", tradingPoints)
        dispatch(countTradeResults())
    },[tradingPoints])

    useEffect(() => {
        console.log("M: [Plot] useEffect(tradeTriggerValues) tradeTriggerValues: ", tradeTriggerValues)
        console.log("M: [Plot] useEffect(tradeResults) tradeResults: ", tradeResults)
        // console.log("M: [Plot] useEffect(medianTradeValues) medianTradeValues: ", medianTradeValues)
    },[tradeResults])

    useEffect(() => {
        console.log("M: [Plot] medianTradeValues: " , medianTradeValues)
        dispatch(countMedianTradeValues(tradeTriggerValues))
        // console.log("M: [Plot] useEffect(medianTradeValues) medianTradeValues: ", medianTradeValues)
    },[tradeTriggerValues])

    useEffect(() => {
        console.log("M: [Plot] medianTradeValues: " , medianTradeValues)
        // console.log("M: [Plot] useEffect(medianTradeValues) medianTradeValues: ", medianTradeValues)
    },[medianTradeValues])

    // useEffect(() => {
    //   console.log("M: [Plot/useEffect(candleSize)]: " , candleSize)
    //     refetch()
    //     // console.log("M: [Plot] useEffect(medianTradeValues) medianTradeValues: ", medianTradeValues)
    // },[candleSize])

    console.log("M: [Plot]: msgLog" , msgLog)

    // useEffect(() => {
    //     console.log("M: [Plot] useEffect(tradeTriggerValues) tradeTriggerValues: ", tradeTriggerValues)
    //     console.log("M: [Plot] useEffect(tradeResults) tradeResults: ", tradeResults)
    //     dispatch(countMedianTradeValues())
    //     // console.log("M: [Plot] useEffect(medianTradeValues) medianTradeValues: ", medianTradeValues)
    // },[tradeTriggerValues,tradeResults])

    // useEffect(() => {
    //     console.log("SMA DATA UPDATED TO: ", JSON.stringify(smaOneData.slice(3,7)))
    // },[smaOneData,smaTwoData])

    // useEffect(() => {
    //     dispatch(smaOneScope(smaOneScopeValue))
    //     dispatch(smaTwoScope(smaTwoScopeValue))
    // },[smaOneScopeValue,smaOneScopeValue])

    // {rawData:tokenCandles.o.map((e,i) => (
    //   {
    //     data: i + 1,
    //     value: e,
    //     group: "rawData"
    //   }
    // ))}

    // [...smaOneData,...smaTwoData,...tradePointsData,...tokenCandles]

    return (
        <>
            <div id="Plot" class="module">
                <h3>Plot.js</h3>
            </div>
            <div id="smaValues" class="module">
              <span>{smaOneValue}</span>
              <span>{smaTwoValue}</span>
            </div>
            <div class="btn pointer" style={{width:"30%"}}>
              {"Get All Available Candles"}
            </div>
            {
                tokenCandles && smaOneData && smaTwoData &&
                <SMAmulti name="smaOne_smaTwo_tokenCandles" inputData={
                  [...smaOneData, ...smaTwoData, ...tokenCandles]
                }/>
            }
            {
                smaOverlapAreasDiff &&
                <SMAmulti name="smaOverlapAreasDiff" inputData={
                  [...smaOverlapAreasDiff]
                }/>
            }
            {
                tradingPoints &&
                <SMAmulti name="tradingPoints" inputData={
                  [...tradingPoints]
                }/>
            }
            {
                tradeTriggerValues &&
                <SMAmulti name="tradeTriggerValues" inputData={
                  [...tradeTriggerValues]
                }/>
            }
            {
                tradeResults &&
                <SMAmulti name="tradeResults" inputData={
                  [...tradeResults]
                }/>
            }
            {
                medianTradeValues &&
                <SMAmulti name="medianTradeValues" inputData={
                  [...medianTradeValues]
                }/>
            }

            <SMASliders/>
            <DelayedIterator/>
        </>
    )
}
// {
  //     medianTradeValues &&
  //     <SMAmulti name="medianTradeValues" inputData={
    //       [...medianTradeValues]
    //     }/>
    // }

export default Plots;
