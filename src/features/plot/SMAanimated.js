import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

// const inputPool = [... new Array(60).fill(0)]


function* bblSort(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < (arr.length - i - 1); j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
            yield arr;
        }
    }
}

// const sort = bblSort([1,4,2,6,7,8])
// console.log("SORT VALUE", sort.next().value)

// const sort = bblSort([5,4,3,3,2,1])
const sort = bblSort([... new Array(60).fill(0).map(e => Math.random()*10)])

const SMAanimated = ({inputData, gen = sort}) => {

  const width = 600
  const height = 150
  const [data,setData] = useState(inputData.map((e,i) => ({
      buyDate: Math.random() * width,
      buyWeight: Math.random() * height,
      state: "inactive"
  })))
  const [inc,setInc] = useState(0)
  const [play,setPlay] = useState(false)
  const [bb, setBB] = useState([1,4,2,6,7,8])
  // console.log("SORT VALUE", sort.next().value)

  let store = [];

  // let inc = 0
  const createRandomArray = () => {
    let out = data.length == 0 ? [... new Array(60).fill(0)].map((e,i) => ({
        buyDate: Math.random() * width,
        buyWeight: Math.random() * height,
        state: "inactive"
    })) : [...data]
    out[inc].state = "active"
    setInc(inc + 1)
    console.log("INC: ", inc)
    console.log("NEW OUT: ", out)
    return [...out]
  }

  function setup(data) {
      let nd = gen.next().value
      console.log("NEW DATA: ", nd)
      // setBB(nd)
      setData([...nd].map((e,i) => ({
          buyDate: ((i + 1) * width)/10,
          buyWeight: (e * height - 10)/10,
          state: "inactive"
      })))
      // updateInc()
      // updateActiveStatus()
      // console.log("M: [setup] data", data)
      // setData(data)
  }

  function draw() {
    	d3.select('svg.smaAnimated')
    		.selectAll('circle')
    		.data(data)
    		.join('circle')
    		.attr('cy', 50)
    		.attr('r', 5)
    		// .transition()
    		// .duration(2000)
        .attr("fill",(d) => d.state == "active" ? "green" : "grey")
        .attr('cy', (d) => d.buyWeight)
    		.attr('cx', (d,i) => i * 20)
  }

  function updateInc(){
    setInc(inc + 1)
  }
  function updateActiveStatus(){
    let d = [...data]
    d = d.map(e => ({...e, state:"inactive"}))
    d[inc].state = "active"
    setData(d)
    // return d
  }

  // let counter = 0
  const render = () => {
      console.log('M: [render] call')
      // const d = data.length == 0 ? createRandomArray() : data
      // d[counter].state = "active"
      // const newData =
    	setup()
      // setup(data)
    	draw()
      // counter++
  }

  useEffect(() => {
      console.log("useEffect()")
      let timer
      play && (() => {
          timer = setTimeout(() => render(), 1)
      })()
      return () => clearTimeout(timer)
  },[data, play])

  return  (
      <div>
          <svg width="100%" height="180" transform="translate(0,0)" onClick={() => render() } class="smaAnimated"/>
          <button onClick={() => setPlay(!play)}>{play ? "pause" : "play"}</button>
      </div>
  )
}

export default SMAanimated
