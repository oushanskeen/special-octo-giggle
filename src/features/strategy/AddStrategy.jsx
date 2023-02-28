import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setType, setName, setInterval, setGainInterval, setChain, setGainsThreshold, setSellThreshold, setSubInterval, savePerspectiveTokens, savePerspectiveToken, setStartBalance } from './strategySlice'
import { useGetAllStrategiesQuery, usePatchStrategyMutation } from '../../services/pokemon'

export default function AddStrategy(){

  const [localStrategyState, setLocalStrategyState] = useState({})
  // "strategy_type": "string",
  // "strategy_name": "string",
  // "gain_threshold": 0,
  // "sell_threshold": 0,
  // "gain_interval": 0,
  // "trending_interval": 0,
  // "minimum_stable_starting_balance": 0

  const saveStubStrategy = async () => {
      const send = await fetch('https://deals-stage-lax.dexguru.biz/v1/deals/strategies',{
         method: "POST",
         body: JSON.stringify({
            "strategy_type": "string",
            "strategy_name": "" + Date.now(),
            "gain_threshold": 0,
            "sell_threshold": 0,
            "gain_interval": 0,
            "trending_interval": 0,
            "minimum_stable_starting_balance": 0
        })
      })
  }



  const { refetch, isLoading} = useGetAllStrategiesQuery()
  const [addStrategy, { isLoading: isUpdating }, isError, error ] = usePatchStrategyMutation()
  const handleAdd = (data) => {
    console.log("ON HANDLE ADD DATA: ", data)
    addStrategy(data)
  }

  const useStrategyAdd = () => {
    const [state, setState ] = useState({
      strategyType:"",
      strategyName:"",
      sellThreshold: 0.01,
      gainInterval: 0,
      startBalance: 1000
    })

    const handleStrategyTypeInput = (event) => {
      setState({...state, strategyType: event.target.value})
    }
    const handleStrategyNameInput = (event) => {
      setState({...state, strategyName: event.target.value})
    }
    const handleSellThresholdInput = (event) => {
      setState({...state, sellThreshold: event.target.value})
    }
    const handleGainIntervalInput = (event) => {
      setState({...state, gainInterval: event.target.value})
    }
    const handleStartBalanceInput = (event) => {
      setState({...state, startBalance: event.target.value})
    }

    const { strategyType, strategyName, sellThreshold, gainInterval, startBalance } = state
    // setLocalStrategyState(state)
    return {
        strategyType, handleStrategyTypeInput,
        strategyName, handleStrategyNameInput ,
        sellThreshold, handleSellThresholdInput,
        gainInterval, handleGainIntervalInput,
        startBalance, handleStartBalanceInput
    }
  }

  const StrategyTypeInput = () => {

    const dispatch = useDispatch()
    const strategyType = useSelector(state => state.strategy.type)

    return(
      <div class="module strategyTab">
         <div id="strategyType">
         </div>
         <input
            type="input"
            value={strategyType}
            onChange={(e) => dispatch(setType(e.target.value))}
            placeholder="strategy type"
            id="strategyTypeInput"
          />
      </div>
    )
  }

  const StrategyNameInput = () => {

    const dispatch = useDispatch()
    const strategyName = useSelector(state => state.strategy.name)

    return(
      <div class="module strategyTab">
         <div id="strategyName">
         </div>
         <input
            type="input"
            value={strategyName}
            onChange={(e) => dispatch(setName(e.target.value))}
            placeholder="strategy name"
            id="strategyNameInput"
          />
      </div>
    )
  }

  const GainThresholdInput = () => {

    const gainsThreshold = useSelector(state => state.strategy.gainsThreshold)

    return(
      <div class="module strategyTab">
        gains threshold: <br/>{gainsThreshold}
      </div>
    )
  }

  const SellThresholdInput = () => {

    const dispatch = useDispatch()
    const sellThreshold = useSelector(state => state.strategy.sellThreshold)

    return(
      <div class="module strategyTab" style={{flexWrap:"wrap"}}>
          <div id="sellThresholdValue">
              sell threshold: {sellThreshold} <br/>
          </div>
           <input
              type="range"
              min="1" max="10"
              value={sellThreshold}
              onChange={(e) => dispatch(setSellThreshold(e.target.value))}
              class="slider"
              id="sellThresholdSlider"
              step="1"
            />
      </div>
    )
  }

  const GainIntervalInput = () => {

    // const { gainInterval, handleGainIntervalInput } = useStrategyAdd()
    const intervals = [60, 300, 600, 1800, 3600]

    const dispatch = useDispatch()
    const gainInterval = useSelector(state => state.strategy.gainInterval)

    return(
      <div class="module strategyTab" style={{flexWrap:"wrap"}}>
          <div id="gainIntervalValue">
              gain interval: {gainInterval} {intervals.indexOf(gainInterval)}
          </div>
           <input
              type="range"
              min="0"
              max="4"
              value={intervals.indexOf(gainInterval)}
              onChange={(e) => dispatch(setGainInterval(intervals[e.target.value]))}
              class="slider"
              id="gainIntervalSlider"
              step="1"
            />
      </div>
    )
  }

  const TrendingIntervalInput = () => {
    const trendingInterval = useSelector(state => state.strategy.subInterval)
    return(
      <div class="module strategyTab">
        trending interval: <br/> {trendingInterval}
      </div>
    )
  }

  const StartBalanceInput = () => {

    // const { startBalance, handleStartBalanceInput } = useStrategyAdd()
    const dispatch = useDispatch()
    const startBalance = useSelector(state => state.strategy.startBalance)

    return(
      <div class="module strategyTab">
      <div id="startBalance">
      </div>
      <input
      type="input"
      value={startBalance}
      onChange={(e) => dispatch(setStartBalance(e.target.value))}
      placeholder="start balance"
      id="startBalanceInput"
      />
      </div>
    )
  }

  const SubmitButton = () => {



    const strategyType = useSelector(state => state.strategy.type)
    const strategyName = useSelector(state => state.strategy.name)
    const gainsThreshold = useSelector(state => state.strategy.gainsThreshold)
    const sellThreshold = useSelector(state => state.strategy.sellThreshold)
    const gainInterval = useSelector(state => state.strategy.gainInterval)
    const trendingInterval = useSelector(state => state.strategy.subInterval)
    const startBalance = useSelector(state => state.strategy.startBalance)

    return(
      <div class="module strategyTab btn" onClick={() => handleAdd({
            type: strategyType,
            name: strategyName,
            gainsThreshold: gainsThreshold,
            sellThreshold: +sellThreshold,
            gainInterval: gainInterval,
            trendingInterval: trendingInterval,
            startBalance: startBalance
      })}>
        submit
      </div>
    )
  }

  if (isUpdating) {
    return <div class="module">updating...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return (
    <div class="module">
      <div class="module box">
        <StrategyTypeInput/>
        <StrategyNameInput/>
        <GainThresholdInput/>
        <SellThresholdInput/>
        <GainIntervalInput/>
        <TrendingIntervalInput/>
        <StartBalanceInput/>
        <SubmitButton/>
      </div>
    </div>
  )
}
