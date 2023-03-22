import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const InteractiveNodes = () => {

  var width = 800, height = 300
  const ref = useRef()

  var nodes = [
    	{id:0, name: 'automated crypto trading landscapes'},
    	{id:1, name: 'robo-advisers'},
    	{id:2, name: 'social and copy trading platforms'},
    	{id:3, name: 'trading bot marketplaces'},
    	{id:4, name: 'defi asset management protocols'},
    	{id:5, name: 'defi trading protocols'},
    	{id:6, name: 'strategy development frameworks'},
    	{id:7, name: 'etoro'},
      {id:8, name: 'bybit'},
      {id:9, name: 'zygnaly'},
  ]

  var links = [
    	{source: 0, target: 0},
    	{source: 0, target: 1},
    	{source: 0, target: 2},
      {source: 0, target: 3},
      {source: 0, target: 4},
      {source: 0, target: 5},
      {source: 0, target: 6},
      {source: 3, target: 7},
      {source: 3, target: 8},
      {source: 3, target: 9},
  ]

  useEffect(() => {

      d3.forceSimulation(nodes)
          .force("x", d3.forceX(width / 2))
          .force("y", d3.forceY(height / 2))
          .force('charge', d3.forceManyBody().strength(-50))
          .force('center', d3.forceCenter(width / 2, height / 2))
          .force('link', d3.forceLink().strength(0.001).links(links))
          .on('tick', (d) => {

              // clear svg nodes -----------------------------------------------

              d3.selectAll("svg.interactiveNodes > *").remove();

              // add circle node -----------------------------------------------

              d3.select(ref.current)
                  .selectAll('.circleNode')
                  .data(nodes)
                  .join('circle')
                  .attr("class","dot")
                  .attr('r', 5)
                  .attr("fill","grey")
                  .attr('cx', (d) => d.x)
                  .attr('cy', (d) => d.y)
                  .call((d) => {
                      console.log("PREV NODE: ", d)
                      console.log("PREV NODE X: ", d.x)
                  })

              // setup text title ----------------------------------------------

              d3.select(ref.current)
                  .selectAll('.circleNodeText')
                  .data(nodes)
                  .join('text')
                  .attr("fill","grey")
                  .attr('x', (d) => d.x - 5)
                  .attr('y', (d) => d.y - 7)
                  .attr("font-size","10px")
                  .text((d) => d.name)
                  .style("display","flex")
                  .attr("width","10px")

              // add links -----------------------------------------------------

              d3.select(ref.current)
            		.selectAll('link')
            		.data(links)
            		.join('line')
                .attr("stroke","grey")
            		.attr('x1', (d) => d.source.x)
            		.attr('y1', (d) => d.source.y)
            		.attr('x2', (d) => d.target.x)
            		.attr('y2', (d) => d.target.y);

      });
  },[])


  return  (
      <div>
          <svg ref={ref} class="interactiveNodes" width="100%" height="300" transform="translate(0,-200)"/>
      </div>
  )
}

export default InteractiveNodes
