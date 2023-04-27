import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
  setSmaOneValue,
  setSmaTwoValue
} from './plotSlice'
import * as d3 from "d3"

function* iterator(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length; j++){
          yield [arr[i],arr[j]]
        }
    }
}
const input = iterator([... new Array(50).fill(0).map((e,i) => i)])

const DelayedIterator = ({gen = input}) => {

  // const [data, setData] = useState("")
  const [play, setPlay] = useState(false)
  const smaOneValue = useSelector(state => state.plot.smaOneValue)
  const smaTwoValue = useSelector(state => state.plot.smaTwoValue)
  const dispatch = useDispatch()

  function setup() {
      // setData(gen.next().value)
      dispatch(setSmaOneValue(gen.next().value[0]))
      dispatch(setSmaTwoValue(gen.next().value[1]))
  }

  const handleReset = () => {
    setPlay(false)
    dispatch(setSmaOneValue(0))
    dispatch(setSmaTwoValue(1))
  }

  useEffect(() => {
      let timer
      play && (() => {
          timer = setTimeout(() => setup(), 10)
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
