import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const SimpleInteratuve = () => {

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
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1 + Math.random() * 20
      })))
  })()

  const update = () => {
      d3.select(ref.current)
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', (d) =>  d.id === hoveredId ? 20 : 10)
        .style('fill', (d) => d.id === hoveredId ? 'red' : null)
        .on('mouseover', (e, d) => setHoveredId(d.id))
        .on('mouseout', () => setHoveredId(undefined))
      }

  useEffect(() => {

    // clear svg nodes --------------------------------------------------------
    d3.selectAll("svg.simpleInteratuve > *").remove();

    // draw --------------------------------------------------------------------
    update()

  },[data,hoveredId,sizeId])

  return (
      <div class="module">
          <h3>hover</h3>
          <svg ref={ref} class="simpleInteratuve" width="100%" height="300"/>
      </div>
  )
}

export default SimpleInteratuve
