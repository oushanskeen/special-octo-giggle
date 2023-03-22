import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const WeightFrequencySpread = () => {

  const width = 800, height = 300
  const [hoveredId, setHoveredId] = useState(undefined)
  const [sizeId, setSizeId] = useState(undefined)
  const [data, setData] = useState([])

  // setup ref
  const ref = useRef()

  // prepare data
	data.length == 0 && (() => {
      setData([... new Array(50).fill(0)].map((e,i) => ({
          id: i,
          frequency: Math.random() * width,
          weight: Math.random() * height,
          r: 1 + Math.random() * 20
      })))
  })()

  const update = () => {
      d3.select(ref.current)
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d) => d.frequency)
        .attr('cy', (d) => d.weight)
        .attr('r', (d) =>  d.id === hoveredId ? 20 : 10)
        .style('fill', (d) => d.id === hoveredId ? 'red' : null)
        .on('mouseover', (e, d) => {
          setHoveredId(d.id)
          e.append("text")
        })
        .on('mouseout', () => setHoveredId(undefined))
      }

  useEffect(() => {

    // clear svg nodes --------------------------------------------------------
    d3.selectAll("svg.weightFrequencySpread > *").remove();

    // draw --------------------------------------------------------------------
    update()
    d3.select(ref.current)
    .append("path")
    .attr("d",d3.line()([[0,height/2],[width,height/2]]))
    .attr("stroke", "black")
    d3.select(ref.current)
    .append("path")
    .attr("d",d3.line()([[width/2,0],[width/2,height]]))
    .attr("stroke", "black")

  },[data,hoveredId,sizeId])

  return (
      <div class="module">
          <h3>weight frequency spread</h3>
          <svg ref={ref} class="weightFrequencySpread" width="100%" height="300"/>
      </div>
  )
}

export default WeightFrequencySpread
