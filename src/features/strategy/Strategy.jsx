import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectStrategyInterval, setInterval, setChain, setGainsThreshold, setSubInterval, fetchPerspectiveTokens } from './strategySlice'

export default function Strategy(){

  const dispatch = useDispatch()

  const IntervalSlider = () => {

    const interval = useSelector(state => state.strategy.interval)
    const intervals = [60, 300, 600, 1800, 3600]

    return(
      <div class="module sliderbox">
          <div id="intervalValue">
              interval: {interval}
          </div>
           <input
              type="range"
              min="0"
              max="4"
              value={intervals.indexOf(interval)}
              onChange={(e) => dispatch(setInterval(intervals[e.target.value]))}
              class="slider"
              id="intervalSlider"
              step="1"
            />
      </div>
    )
  }

  const ChainsSlider = () => {

    const chain = useSelector(state => state.strategy.chain)

    let chains = {
      1: "eth",
      10: "optimism",
      56: "bsc",
      137: "polygon",
      250: "fantom",
      42161: "arbitrum",
      43114: "avalanche",
      100: "gnosis",
      42220: "celo"
    }
    let chainIds = Object.keys(chains)

    return(
      <div class="module sliderbox">
          <div id="chainValue">
              chain: {chain} {chains[chain]}
          </div>
           <input
              type="range"
              min="0" max="8"
              value={chainIds.indexOf(chain)}
              onChange={(e) => dispatch(setChain(chainIds[e.target.value]))}
              class="slider"
              id="chainSlider"
              step="1"
            />
      </div>
    )
  }

  const GainsThresholdSlider = () => {
    const gainsThreshold = useSelector(state => state.strategy.gainsThreshold)
    return(
      <div class="module sliderbox">
          <div id="gainsThresholdValue">
              gains threshold: {gainsThreshold}
          </div>
           <input
              type="range"
              min="0.01" max="1"
              value={gainsThreshold}
              onChange={(e) => dispatch(setGainsThreshold(e.target.value))}
              class="slider"
              id="gainsThresholdSlider"
              step="0.01"
            />
      </div>
    )
  }

  const SubIntervalSlider = () => {

    const subInterval = useSelector(state => state.strategy.subInterval)
    const interval = useSelector(state => state.strategy.interval)
    const intervals = [60, 300, 600, 1800, 3600]

    return(
      <div class="module sliderbox">
         <div id="subIntervalValue">
            sub interval: {subInterval}
         </div>
         <input
            type="range"
            min="0" max={intervals.indexOf(interval) - 1}
            value={intervals.indexOf(subInterval)}
            onChange={(e) => dispatch(setSubInterval(intervals[e.target.value]))}
            class="slider"
            id="subIntervalValueSlider"
            step="1"
          />
      </div>
    )
  }

  const GetPerspectiveTokensButton = () => {

    const tokens = useSelector(state => state)

    useEffect(() => {},[tokens])

    // const some  = await
    console.log("STATE: ", tokens)

    return (<>
        <button onClick={async (e) => await dispatch(fetchPerspectiveTokens()).unwrap()}>
            get perspective tokens
        </button>
        <div>{JSON.stringify(tokens)}</div>
      </>
    )
  }

  return (<>
        <div class="module box">
            <IntervalSlider/>
            <SubIntervalSlider/>
            <ChainsSlider/>
            <GainsThresholdSlider/>
            <GetPerspectiveTokensButton/>
       </div>
    </>
  );
}
