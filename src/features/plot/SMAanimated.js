import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const SMAanimated = () => {

  const [data,setData] = useState([])
  const [play,setPlay] = useState(false)
  const width = 700
  const height = 200

  let store = [];

  function setup() {
      const  data = [... new Array(60).fill(0)].map((e,i) => ({
          buyDate: Math.random() * width,
          buyWeight: Math.random() * height
      }))
      setData(data)
  }

  function draw() {
    	d3.select('svg.smaAnimated')
    		.selectAll('circle')
    		.data(data)
    		.join('circle')
    		.attr('cy', 50)
    		.attr('r', 5)
    		.transition()
    		.duration(1100)
        .attr("fill","grey")
        .attr('cy', (d) => d.buyWeight)
    		.attr('cx', (d,i) => i * 20)
  }

  const render = () => {
    	setup()
    	draw()
  }

  useEffect(() => {
      let timer
      play && (() => {
          timer = setTimeout(() => render(), 800)
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
