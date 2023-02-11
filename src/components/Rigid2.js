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

var data = [ 0, 2, 3, 5, 7.5, 9, 10 ];

useEffect(() => {

  var myScale = d3.scaleLinear()
	.domain([0, 10])
	.range([0, 600]);


  d3.selectAll("svg > *").remove();

  const svgElement = d3.select(ref.current);
  svgElement.select('svg .inner')
  .selectAll('text')
  .data(data)
  .join('text')
  .attr('x', (d) => myScale(d))
  .attr('y', -8)
  .text((d) => d);

},[data])

  return (
    <>
     <div>Hello me rigid</div>
     <svg ref={ref} width="700" height="40">
       <g class="inner" transform="translate(40, 30)">
       </g>
     </svg>
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
