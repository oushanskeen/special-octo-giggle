import {useEffect, useRef, useState, useContext, createContext } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
  setSmaOneValue,
  setSmaTwoValue
} from './plotSlice'
import * as d3 from "d3"

const SMASliders = () => {

  const dispatch = useDispatch()
  const smaOneValue = useSelector(state => state.plot.smaOneValue)
  const smaTwoValue = useSelector(state => state.plot.smaTwoValue)
  const candleSize = useSelector(state => state.plot.candleSize)

  const handleSmaOneSliderChange = (event) => {
    dispatch(setSmaOneValue(event.target.value))
  }
  const handleSmaTwoSliderChange = (event) => {
    dispatch(setSmaTwoValue(event.target.value))
  }

return (
    <>
      <h3>HEY</h3>
        <div class="module">
          {
            // <label>max window: {` ${60} `} </label>
            // <label>step: {1}</label>
          }
          <label>candle size: {candleSize}</label>
        </div>
        <div class="module box smaSliders">
          <label>{smaOneValue}</label>
          <input type="range" class="slider" min="0" max="10" step="1" value={smaOneValue} onChange={handleSmaOneSliderChange}/>
          <label>{smaTwoValue}</label>
          <input type="range" class="slider" min="0" max="10" step="1" value={smaTwoValue} onChange={handleSmaTwoSliderChange}/>
        </div>
    </>
  )
}

export default SMASliders
