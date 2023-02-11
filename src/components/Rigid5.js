import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

const Rigid = () => {

  const myRefs= useRef([]);
  console.log("MY REFS: ", myRefs);

  const ref = useRef();

  const drawXAxis = (rootElement,data,name,tx,ty) => {
      let scale = d3.scaleLinear()
        .domain(d3.extent(data))
        .range([0, 600])
        .nice();
      rootElement
        .append('g')
        .attr("transform", "translate(100, 500)")
        .call(d3.axisBottom(scale))
  }
  const drawYAxis = (rootElement,data,name,tx,ty) => {
      var scale = d3.scaleLinear()
        .domain(d3.extent(data))
        .range([400, 0])
        .nice();
      rootElement
        .append("g")
        .attr("transform", "translate(50, 50)")
        .call(d3.axisLeft(scale))
  }

  useEffect(() => {
    d3.selectAll("svg > *").remove();
    const svgElement = d3.select(ref.current);
    drawXAxis(svgElement,[0.243, 0.584, 0.987, 0.153, 0.433],"bottomAxis" + new Date(),30,40);
    drawYAxis(svgElement,[0.243, 0.584, 0.987, 0.153, 0.433],"leftAxis" + new Date(),30,50);
  },[])

  return (
    <div>
      <svg ref={ref} width="100%" height="650" id={Date.now()}/>
    </div>);
}


export default Rigid;
