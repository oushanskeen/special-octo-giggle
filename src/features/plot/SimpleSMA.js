import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

import { useGetTokenCandlesQuery } from '../../services/pokemon'

const SimpleSMA = ({token}) => {

  const myRefs= useRef([]);
  const ref = useRef();
  let xStep = 20;

  const {data,isFetching} = useGetTokenCandlesQuery(token)

  useEffect(() => {

     if(!isFetching){

       console.log("DATA: ", data)
     const {t,c} = data

     // set ref
     let root = d3.select(ref.current)

     // clear canvas
     root.select(".singleChart > *").remove();

     let width = 150
     let height = 100

     // Compute values.
     const X = t;
     const Y = c;
     const I = d3.range(X.length);
     // if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
     // const D = d3.map(data, defined);

     // Compute least lowest
     console.log("LEAST LOWEST: ", d3.least(X))
     console.log("LEAST LOWEST: ", X)
     console.log("LEAST LOWEST INDEX: ", d3.leastIndex(X))

     // Compute default domains.
    const xDomain = d3.extent(X);
    const yDomain = [0, d3.max(Y)];

    const xRange = [0,width] // [left, right]
    const yRange = [0,height] // [bottom, top]

    // Construct scales and axes.
    const xScale = d3.scaleLinear(xDomain, xRange);
    const yScale = d3.scaleLinear(yDomain, yRange);
    console.log("XSCALE: ", xScale)
    console.log("XSCALE: ", xScale(d3.leastIndex(X)))

    const xAxis = d3.axisBottom(xScale).ticks(width / 200).tickSizeOuter(10);
    const yAxis = d3.axisLeft(yScale).ticks(height / 40);

    // Construct a line generator.
    const line = d3.line()
      .x(x => xScale(X[x]))
      .y(y => yScale(Y[y]));

    // Set view
     const svg = root.append("svg")
     .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    // .attr("style", "max-width: 100%;")
    // .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    // .attr("transform","translate(0,-10)")

    // Add x-axis
    svg.append("g")
    .attr("transform", `translate(0,10`)
    .call(xAxis);

    // Add y-axis
    svg.append("g")
     .attr("transform", `translate(10,0)`)
     .call(yAxis)
     // .call(g => g.select(".domain").remove())
     // .call(g => g.selectAll(".tick line").clone()
     //     .attr("x2", width - marginLeft - marginRight)
     //     .attr("stroke-opacity", 0.1))
     // .call(g => g.append("text")
     //     .attr("x", -marginLeft)
     //     .attr("y", 10)
     //     .attr("fill", "currentColor")
     //     .attr("text-anchor", "start")
     //     .text(yLabel));

     // Add path
     svg.append("path")
    .attr("fill", "none")
    .attr("stroke", "black")
    // .attr("stroke-width", strokeWidth)
    // .attr("stroke-linecap", strokeLinecap)
    // .attr("stroke-linejoin", strokeLinejoin)
    // .attr("stroke-opacity", strokeOpacity)
    .attr("d", line(I));

    console.log("Y: ", Y)
    console.log("Min Y: ", Math.min(...Y))
    console.log("Min Y: ", d3.min(Y))
    console.log("Min Y index: ", Y.indexOf(d3.min(Y)))

    // Add least lowest marker
    svg.append("circle")
    // .attr("cx",Y.indexOf(d3.min(Y)))
    .attr("cy", yScale(Y.indexOf(d3.min(Y))))
    .attr("cx","10")
    .attr("r",10)

    // // Add least lowest marker
    // svg.append("circle")
    // // .attr("cx",Y.indexOf(d3.min(Y)))
    // .attr("cx",(d) => {
    //   console.log("CX data: ", d)
    //   return yScale(Y.indexOf(d3.max(Y))
    //   // return yScale(0.001)
    // })
    // .attr("cy","100")
    // .attr("r",10)
    // .attr("fill","red")

    // svg.on("mousemove", (mouse) => {
    //   const [x_cord,y_cord] = d3.pointer(mouse)
    //   console.log("XCORD: ", x_cord)
    //   console.log("XCORD scaled: ", yScale(x_cord))
    //   console.log("YCORD: ", y_cord)
    //   console.log("YCORD scaled: ", yScale(y_cord))
    //   svg.append("circle")
    //   .attr("class","onMousePoiner")
    //   .attr("cx",x_cord)
    //   .attr("cy",y_cord)
    //   .attr("r",5)
    //   // .remove()
    //   // svg.selectAll(".onMousePoiner > *").remove()
    // })
    // svg.on("mouseout", function(mouse) {
      // mouse_g.style('display', 'none');
    // });

      }
  },[data])
  return (
    <div style={{background: "lightGrey"}}>
      <svg ref={ref} class="singleChart"/>
    </div>);
}


export default SimpleSMA;
