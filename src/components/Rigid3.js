import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";

let myScale = 0;

const Rigid = () => {

  const ref = useRef();
  let data = [0.243, 0.584, 0.987, 0.153, 0.433];
  // let data = [1,2,3,4,5,6,7,8,9];
  let extent = d3.extent(data);
  const makeScale = () => {
    myScale = d3.scaleLinear()
      .domain(extent)
      .range([0, 600])
      .nice();
  }

  const drawCircles = (rootElement,scale,name,tx,ty) => {
      rootElement
        .append('svg')
        .attr("class",name)
        .attr("width","100%")
        .attr("height","100")
        .attr("transform","translate(" + tx + ", " + ty + ")")
        .attr("padding","20")
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 4)
        .attr('cx', (d) => scale(d))
        .attr('cy', 20);

      rootElement
        .select("." + name)
      	.selectAll('text')
      	.data(data)
      	.join('text')
      	.attr('x',(d) => scale(d))
      	.attr('y', 11)
      	.text((d) => d);
  }
  const drawScale = (rootElement,data,name,tx,ty) => {
      let scale = d3.scaleLinear()
        .domain(d3.extent(data))
        .range([0, 600])
        .nice();

      rootElement
        .append('svg')
        .attr("class",name)
        .attr("width","100%")
        .attr("height","100")
        .attr("transform","translate(" + tx + ", " + ty + ")")
        .attr("padding","20")
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('r', 4)
        .attr('cx', (d) => scale(d))
        .attr('cy', 20);
  }

  // const drawAxis = (rootElement,data,name,tx,ty) => {
  //   // let data = [0.243, 0.584, 0.987, 0.153, 0.433];
  //   // let data = [1,2,3,4,5,6,7,8,9];
  //   // let extent = d3.extent(data);
  //   // const scale = () => {
  //   let scale = d3.scaleLinear()
  //       .domain(d3.extent(data))
  //       .range([0, 600])
  //       .nice();
  //   // }
  //     rootElement
  //       .append('svg')
  //       .attr("class",name)
  //       .attr("transform","translate(" + tx + ", " + ty + ")")
  //       .call(d3.axisBottom(scale));
  // }


  useEffect(() => {
    d3.selectAll("svg > *").remove();
    const svgElement = d3.select(ref.current);
    // svgElement
    //   .append("circle")
    //   .attr("cx", 150)
    //   .attr("cy", 70)
    //   .attr("r",  50)

      // var data = [ 0, 2, 3, 5, 7.5, 9, 10 ];

      // var myScale = d3.scaleLinear()
      //   .domain(extent)
      // 	.range([0, 600])
      //   .nice();

      makeScale();
      drawScale(svgElement,[0.243, 0.584, 0.987, 0.153, 0.433],"simpleLinearScale",30,40);
      // drawCircles(svgElement,myScale, "chartOne",30,40);
      // drawCircles(svgElement,myScale, "chartTwo",30,80);
      // drawCircles(svgElement,myScale, "chartThree",30,120);
      // drawCircles(svgElement,myScale, "chartFour",30,160);
      // drawAxis(svgElement,myScale, "axis",30,200)

     //  var axis = d3.axisBottom(myScale);
     // d3.
     // select('.axis')
	   // .call(axis);

      // svgElement
      //   .append('svg')
      //   .attr("class","chart")
      //   .attr("width","700")
      //   .attr("height","100")
      // 	.selectAll('circle')
      // 	.data(data)
      // 	.join('circle')
      // 	.attr('r', 4)
      // 	.attr('cx', (d) => myScale(d))
      //   .attr('cy', 20);

      // d3.select('svg .inner')
      // svgElement
      // 	.selectAll('text')
      // 	.data(data)
      // 	.join('text')
      // 	.attr('x',(d) => myScale(d))
      // 	.attr('y', 11)
      // 	.text((d) => d);

        var myData = [40, 10, 20, 60, 30];
        //
        // d3.select('.chart'
         // svgElement
         //  .append('svg')
         //  .attr("class","chart2")
         //  .selectAll('circle')
         //  .data(myData)
         //  .join('circle')
         //  .attr('cx', function(d, i) {
         //    return i * 100;
         //  })
         //  .attr('cy', 50)
         //  .attr('r', function(d) {
         //    return 0.5 * d;
         //  })
         //  .style('fill', 'orange');

  },[])

  return (
    <div>
      <svg ref={ref} width="100%" height="400"/>
    </div>);
}


export default Rigid;
