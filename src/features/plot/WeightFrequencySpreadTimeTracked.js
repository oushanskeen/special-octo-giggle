import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const tokens = [
		"https://assets-stage.dex.guru/icons/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-eth.png",
    "https://assets-stage.dex.guru/icons/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth.png",
    "https://assets-stage.dex.guru/icons/0xbe9895146f7af43049ca1c1ae358b0541ea49704-eth.png",
    "https://assets-stage.dex.guru/icons/0x6b175474e89094c44da98b954eedeac495271d0f-eth.png",
    "https://assets-stage.dex.guru/icons/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599-eth.png",
    "https://assets-stage.dex.guru/icons/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984-eth.png",
    "https://assets-stage.dex.guru/icons/0x1bbf25e71ec48b84d773809b4ba55b6f4be946fb-eth.png",
    "https://assets-stage.dex.guru/icons/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39-eth.png",
    "https://assets-stage.dex.guru/icons/0x9813037ee2218799597d83d4a5b6f3b6778218d9-eth.png",
    "https://assets-stage.dex.guru/icons/0x853d955acef822db058eb8505911ed77f175b99e-eth.png"
]

const WeightFrequencySpreadTimeTracked = () => {

  const width = 800, height = 300
  const [hoveredId, setHoveredId] = useState(undefined)
  const [selectedId, setSelectedId] = useState(undefined)
  const [sizeId, setSizeId] = useState(undefined)
  const [data, setData] = useState([])

  // setup ref
  const ref = useRef()

  // prepare data
	data.length == 0 && (() => {
      let data = [... new Array(10).fill(0)].map((e,i) => ({
          id: i,
          buyFrequency: Math.random() * width,
          buyWeight: Math.random() * height,
          sellFrequency: Math.random() * width,
          sellWeight: Math.random() * height,
          r: 1 + Math.random() * 20,
          buyHistory:[... new Array(4).fill(0)].map(e => [Math.random() * width,Math.random() * height]),
          sellHistory:[... new Array(4).fill(0)].map(e => [Math.random() * width,Math.random() * height]),
          iconLink:tokens[i]
      }))
      data = data.map(record => ({...record,buyHistory:[...record.buyHistory,[record.buyFrequency,record.buyWeight]]}))
      data = data.map(record => ({...record,sellHistory:[...record.sellHistory,[record.sellFrequency,record.sellWeight]]}))
      setData(data)
  })()

  // // colors for foo
  // var fooColors = d3.scale
  //     .linear()
  //     .domain([0, 50])
  //     .range(["#87CEFF", "#0000FF"]);

  const handleBrush = () => {
    console.log("Brush me!")
  }
  let brush = d3.brush()
  .on("brush", handleBrush)

  const update = () => {

    d3.select(ref.current)
    .append("path")
    .attr("d",d3.line()([[0,height/2],[width,height/2]]))
    .attr("stroke", "grey")
    .attr("opacity", 0.2)
    d3.select(ref.current)
    .append("path")
    .attr("d",d3.line()([[width/2,0],[width/2,height]]))
    .attr("stroke", "grey")
    .attr("opacity", 0.2)

    // var defs = d3.select(ref.current).append("defs");

    let mask =
        d3.select(ref.current)
       .append("mask")
       .attr("id", "dotMask")
       .append("circle")
       .attr("rx", "5")
       .attr("ry", "5")
       .attr("r", "3")
       // .attr("fill", "black")

    var buyGradient =
       d3.select(ref.current)
      .append("linearGradient")
      .attr("id", "svgBuyGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      buyGradient.append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", "#0033CC")
      .attr("stop-opacity", 1);
      buyGradient.append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "green")
      .attr("stop-opacity", 1);

    var sellGradient =
       d3.select(ref.current)
       .append("linearGradient")
      .attr("id", "svgSellGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
      sellGradient.append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", "blue")
      .attr("stop-opacity", 1);
      sellGradient.append("stop")
      .attr("class", "end")
      .attr("offset", "100%")
      .attr("stop-color", "red")
      .attr("stop-opacity", 1);

      // -----------------------------------------------------------------------

      d3.select(ref.current)
      .selectAll('.buyTracks')
      .data(data)
      .join("path")
      .attr("d", d => d3.line()(d.buyHistory))
      .attr("fill","none")
      .attr("stroke", "url(#svgBuyGradient)")
      .style("opacity",(d) =>  hoveredId == undefined
                               ? 0.2
                               : d.id === hoveredId
                                 ? 1
                                 : 0.1)

      d3.select(ref.current)
      .selectAll('.sellTracks')
      .data(data)
      .join("path")
      .attr("d", d => d3.line()(d.sellHistory))
      .attr("fill","none")
      .attr("stroke", "url(#svgSellGradient)")
      .style("opacity", (d) =>  hoveredId == undefined
                               ? 0.2
                               : d.id === hoveredId
                                 ? 1
                                 : 0.1)

      const node = d3.select(ref.current)
        .append("g")
        .selectAll('.icon')
        .data(data)
        .call(brush)

        const arc = d3.arc()
             .innerRadius(50)
             .outerRadius(100)
             .startAngle(0)
             .endAngle(200)

        const buyCircle = node.join('circle')
        .attr('cx', (d) => d.buyFrequency)
        .attr('cy', (d) => d.buyWeight)
        .attr('r', (d) =>  d.id === hoveredId ? 23 : 17)
        .style('fill', (d) => d.id === hoveredId ? 'green' : "green")
        // .attr("opacity", (d) => d.id === hoveredId ? 0.7 : 0.5)
        .style("opacity", (d) =>  hoveredId == undefined
                                 ? 0.2
                                 : d.id === hoveredId
                                   ? 1
                                   : 0.1)
        const buyIcon = node
          .join('image')
          .attr('xlink:href', (d) => d.iconLink)
          .attr("alt","eth_icon")
          .style("opacity", (d) =>  hoveredId == undefined
                                   ? 0.7
                                   : d.id === hoveredId
                                     ? 1
                                     : 0.1)
          .attr('width', 20)
          .attr('height', 20)
          .attr('x', (d) => d.buyFrequency - 10)
          .attr('y', (d) => d.buyWeight - 10)
          .on('mouseover', (e, d) => setHoveredId(d.id))
          .on('mouseout', () => setHoveredId(undefined))
          .on('click', (e,d) => setSelectedId(d.id))

          const sellCircle = node.join('circle')
          .attr('cx', (d) => d.sellFrequency)
          .attr('cy', (d) => d.sellWeight)
          .attr('r', (d) =>  d.id === hoveredId ? 20 : 15)
          .style('fill', (d) => d.id === hoveredId ? 'red' : "red")
          .style("opacity", (d) =>  hoveredId == undefined
                                   ? 0.2
                                   : d.id === hoveredId
                                     ? 1
                                     : 0.1)
          const sellIcon = node
            .join('image')
            .attr('xlink:href', (d) => d.iconLink)
            .attr("alt","eth_icon")
            .style("opacity", (d) =>  hoveredId == undefined
                                     ? 0.7
                                     : d.id === hoveredId
                                       ? 1
                                       : 0.1)
            .attr('width', 20)
            .attr('height', 20)
            .attr('x', (d) => d.sellFrequency - 10)
            .attr('y', (d) => d.sellWeight - 10)
            .on('mouseover', (e, d) => setHoveredId(d.id))
            .on('mouseout', () => setHoveredId(undefined))
            .on('click', (e,d) => setSelectedId(d.id))

      }



    useEffect(() => {

      // clear svg nodes --------------------------------------------------------
      d3.selectAll("svg.weightFrequencySpreadTimeTracked > *").remove();

      // draw --------------------------------------------------------------------
      update()

    },[data,hoveredId,sizeId])

  return (
      <div class="module">
          <h3>eth pools weight-frequency spread</h3>
          <svg ref={ref} width="100%" height="300" class="weightFrequencySpreadTimeTracked"/>
          <h3>hoveredId: {hoveredId}</h3>
          <div>filtered: {data && selectedId ? data.map(e => e.id).filter(e => e == selectedId) : JSON.stringify(data.map(e => e.id))}</div>
      </div>
  )
}

export default WeightFrequencySpreadTimeTracked
