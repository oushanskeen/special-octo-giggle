import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

let myScale = 0;

const Rigid = () => {

  let [locData,setLocData] = useState("")
  let [data, setData] = useState([0.243, 0.584, 0.987, 0.153, 0.433]);
  let [res,setRes] = useState([])

  const ref = useRef();
  // data = [0.243, 0.584, 0.987, 0.153, 0.433];
  // setData([0.243, 0.584, 0.987, 0.153, 0.433]);
  // let data = [1,2,3,4,5,6,7,8,9];
  let extent = d3.extent(data);
  const makeScale = () => {
    myScale = d3.scaleLinear()
      .domain(extent)
      .range([0, 600])
      .nice();
  }

  const drawAxis = () => {
    var data = [0.243, 0.584, 0.987, 0.153, 0.433];
    var extent = d3.extent(data);

    var linearScale = d3.scaleLinear()
    	.domain(extent)
    	.range([0, 600])
    	.nice();

    var axis = d3.axisBottom(linearScale);

    d3.select('.axis')
	 .call(axis);
  }

  useEffect(() => {
    d3.selectAll("svg > *").remove();
    const svgElement = d3.select(ref.current);
      // makeScale();
      // drawAxis();
      var data = [0.243, 0.584, 0.987, 0.153, 0.433];
      var extent = d3.extent(data);

      var linearScale = d3.scaleLinear()
      	.domain(extent)
      	.range([0, 600])
      	.nice();

      var axis = d3.axisBottom(linearScale);

      svgElement.append()select('.axis')
      	.call(axis);
  },[])

  return (
    <div>
      <svg ref={ref} width="100%" height="400"/>
    </div>);
}


export default Rigid;
