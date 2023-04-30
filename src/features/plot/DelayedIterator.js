import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
  setSmaOneValue,
  setSmaTwoValue,
  setCandleValue
} from './plotSlice'
import * as d3 from "d3"

const resolutions = [
  "5",
  "10",
  "60",
  "240",
  "1D"
]

const step = 5

function* iterator(arr) {
  console.log("M: [DelayedIterator/iterator] [arr[i],arr[j],resolutions[k]] call()")
  for (let resolution in resolutions){
    for (let i = 0; i < arr.length - 1; i+=step) {
        for (let j = i; j < arr.length; j+=step){
            console.log("M: [DelayedIterator/iterator] [arr[i],arr[j],resolutions[k]] ", [arr[i],arr[j],resolutions[resolution]])
            // console.log("M: [DelayedIterator/iterator] resolutions ", resolutions)
            yield [arr[i],arr[j],resolutions[resolution]]
        }
    }
  }
}
const input = iterator([... new Array(step*10*2).fill(0).map((e,i) => i)])

const DelayedIterator = ({gen = input}) => {
  // const [data, setData] = useState("")
  const [play, setPlay] = useState(false)
  const smaOneValue = useSelector(state => state.plot.smaOneValue)
  const smaTwoValue = useSelector(state => state.plot.smaTwoValue)
  const isDataReady = useSelector(state => state.plot.isDataReady)
  const dispatch = useDispatch()

  function setup() {
      // setData("M: ")
      const genValue = gen.next()
      dispatch(setSmaOneValue(genValue.value[0]))
      dispatch(setSmaTwoValue(genValue.value[1]))
      dispatch(setCandleValue(genValue.value[2]))
  }

  const handleReset = () => {
    setPlay(false)
    dispatch(setSmaOneValue(0))
    dispatch(setSmaTwoValue(1))
    dispatch(setCandleValue(0))
  }

  useEffect(() => {
      let timer
      // isDataReady &&
      play && (() => {
          timer = setTimeout(() => setup(), 100)
      })()
      return () => clearTimeout(timer)
  },[smaOneValue, smaTwoValue, play])

  return  (
      <div>
          <div id="dataIterator-data" class="module">
            smaOneValue: {smaOneValue}<br/>
            smaTwoValue: {smaTwoValue}
          </div>
          <button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</button>
          <button onClick={handleReset}>reset</button>
      </div>
  )
}

export default DelayedIterator
