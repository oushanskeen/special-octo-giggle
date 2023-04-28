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
  countSMAData
} from './plotSlice'

import {
  useGetTokenCandlesQuery
} from '../../services/pokemon'

const Plots = () => {

    const dispatch = useDispatch()

    const { refetch, data, error, isLoading, isFetching } = useGetTokenCandlesQuery()

    let tokenCandles = useSelector(state => state.plot.tokenCandles)
    let smaOneData = useSelector(state => state.plot.smaOneData)
    let smaTwoData = useSelector(state => state.plot.smaTwoData)
    let smaOneValue = useSelector(state => state.plot.smaOneValue)
    let smaTwoValue = useSelector(state => state.plot.smaTwoValue)
    let tradingPoints = useSelector(state => state.plot.tradingPoints)
    let smaOverlapAreasDiff = useSelector(state => state.plot.smaOverlapAreasDiff)

    useEffect(() => {
        console.log("S: [Plots.js] candles received: ", data)
        dispatch(storeTokenCandles(data))
    },[data])

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
    },[tradingPoints])

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
            {
                !isLoading && tokenCandles && smaOneData && smaTwoData && tradingPoints &&
                <SMAmulti name="1" inputData={
                  [...smaOneData, ...smaTwoData, ...tokenCandles]
                  // [...smaOverlapAreasDiff]
                }/>
            }
            {
                !isLoading && tokenCandles && smaOneData && smaTwoData && tradingPoints &&
                <SMAmulti name="2" inputData={
                  // [...smaOneData, ...smaTwoData, ...tokenCandles, ...tradingPoints]
                  [...smaOverlapAreasDiff]
                }/>
            }
            {
                !isLoading && tokenCandles && smaOneData && smaTwoData && tradingPoints &&
                <SMAmulti name="3" inputData={
                  // [...smaOneData, ...smaTwoData, ...tokenCandles, ...tradingPoints]
                  [...tradingPoints]
                }/>
            }
            <SMASliders/>
            <DelayedIterator/>
        </>
    )
}

export default Plots;
