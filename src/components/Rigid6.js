import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

const Rigid = () => {




  // ------------------------------------------------------------------

  const myRefs= useRef([]);
  console.log("MY REFS: ", myRefs);

  const ref = useRef();



  useEffect(() => {
    d3.selectAll("svg > *").remove();
    const svgElement = d3.select(ref.current);
    const data = [3, 5, 7, 2, 9, 2, 10, 4, 9, 3];
const height = 500;
const width = 200;
const barWidth = width / data.length;
const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, height]);
const svg = d3
  .select("body")
  .style("text-align", "center")
  .append("svg")
  .style("border", "1px solid black")
  .attr("width", 200)
  .attr("height", height);

const bars = svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("height", d => yScale(d))
  .attr("width", barWidth)
  .attr("x", (d, i) => i * barWidth)
  .attr("y", d => height - yScale(d))
  .attr("stroke", "white")
  .attr("fill", "steelblue");
  },[])

  return (
    <div>
      <svg ref={ref} width="100%" height="650" id={Date.now()}/>
    </div>);
}


export default Rigid;
