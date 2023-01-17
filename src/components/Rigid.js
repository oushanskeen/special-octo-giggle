import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
// import {InternSet} from "d3";
//
// const setDateToSec = (date) => +date.toString().slice(0,10);
// const setDateToHum = (date) => new Date(date);
// const setDateHourShift = (date, shift = 1) => new Date(date - shift*3600*1000);
// const getTime = (date) => date.split("T")[1].split(".")[0];

// const Rigid = ({data, mapping}) => {


const Rigid = () => {
  let [width,setWidth]= useState(100);
  let [x,setX]= useState(10);
  let [y,setY]= useState(10);
  let [state,setState] = useState({})

  const ref = useRef();

useEffect(() => {

  d3.selectAll("svg > *").remove();

  const svgElement = d3.select(ref.current);
  svgElement
    .append("svg")
    .attr("width", 200)
    .attr("height", 200)
    .attr("viewBox", [0, 0, 200, 200])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Add the path using this helper function
  svgElement.append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', width)
    .attr('stroke', 'black')
    .attr('fill', '#69a3b2');
},[width,x,y])

  return (
    <>
     <div>Hello me rigid</div>
     <svg ref={ref}/>
     <form>
       <label>
         size:
         <input type="text" name="name" value={width} onChange={(e) => setWidth(e.target.value)}/>
       </label>
       <input type="range" min="0" max="100" onChange={(e) => setWidth(e.target.value)} value={width}/>
       <input type="range" min="0" max="100" onChange={(e) => setX(e.target.value)} value={x}/>
       <input type="range" min="0" max="100" onChange={(e) => setY(e.target.value)} value={y}/>
       <div>x: {x}</div>
       <div>y: {y}</div>
     </form>
    </>);
}


export default Rigid;
