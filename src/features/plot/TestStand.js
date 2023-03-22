import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"
import { useGetTokenCandlesTimeBoundQuery } from '../../services/pokemon'

const TestStand = ({token}) => {
  const myRefs= useRef([]);
  const ref = useRef();

  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)

  // let {data,isFetching} = useGetTokenCandlesQuery(token)
  console.log("Call useGetTokenCandlesTimeBoundQuery")
  let {data,isFetching} = useGetTokenCandlesTimeBoundQuery({
    token:token,
    network:"eth",
    start:Math.round((Date.now() - (1*1*4*60*60*1000))/1000),
    end:Math.round(Date.now()/1000),
    resolution:1
  })

  // let data = [3, 5, 7, 2, 9, 2, 10, 18, 4, 9, 3, 2, 1,7, 10, 23];

  useEffect(() => {

    if(!isFetching){

      const {t,c} = data
      data = c
      setStartDate(t[0]*1000)
      setEndDate(t.slice(-1)[0]*1000)
      const I = d3.range(t.length);
      const humanDates = t.map(date => new Date(date*1000))
      console.log("Human dates: ", humanDates)

      let txScale = d3.scaleTime().domain([
        humanDates[0],
        humanDates.slice(-1)[0]
      ]).range([0,400]).nice()

      let tAxis = d3.axisBottom(txScale).ticks(5)
      console.log("txAxis: ", tAxis)

      let xScale = d3.scaleLinear().domain([d3.min(t), d3.max(t)]).range([0, 400])//.nice();
      let yScale = d3.scaleLinear().domain([d3.max(data), d3.min(data)]).range([0, 100])//.nice();

      let axisLeft = d3.axisLeft(yScale).ticks(5);
      let axisLeftLong = d3.axisLeft(yScale).ticks(420);

      let axisRight = d3.axisRight(yScale);
      let axisTop = d3.axisTop(xScale).ticks(2);
      let axisBottom = d3.axisBottom(xScale).ticks(10);

      // Construct a line generator.
      const line = d3.line()
        .curve(d3.curveNatural)
        .x((e,i) => xScale(t[i]))
        .y((e) => yScale(e))(data);
        // Construct an area generator.
      const area = d3.area()
        // .defined(i => D[i])
        .curve(d3.curveNatural)
        .x((e,i) => xScale(t[i]))
        .y0(100)
        .y1((e) => yScale(e))(c.slice(d3.minIndex(c),c.length));

        // console.log("")

      console.log("T: ", t)
      console.log("C: ", c)
      console.log("LINE: ", line)
      console.log("LINE DATA: " )

      const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", 600)
      .attr("height", 300)
      .attr("viewBox", [0, 0, 300, 300])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

     svg
       .append("g")
       .attr("id","left")
       .attr("transform","translate(30, 30)")
       .call(axisLeft)
     // d3.select(ref.current)
     //   .append("g")
     //   .attr("id","right")
     //   .attr("transform","translate(430, 30)")
     //   .call(axisRight)
     // d3.select(ref.current)
     //   .append("g")
     //   .attr("id","top")
     //   .attr("transform","translate(30, 30)")
     //   .call(axisTop)
     // d3.select(ref.current)
     //   .append("g")
     //   .attr("id","bottom")
     //   .attr("transform","translate(30, 130)")
     //   .call(axisBottom)

       svg
         .append("g")
         .attr("id","bottom")
         .attr("transform","translate(30, 130)")
         .call(tAxis)
     // d3.select(ref.current)
     //     .append("path")
     //     .attr("transform","translate(0, 30)")
     //     .attr("fill","none")
     //     .attr("stroke","#999")
     //     .attr('d', d3
     //        .line()
     //        .defined(d => d !== null)
     //        .curve(d3.curveCardinal)([3, 5, 7, 2, 9, 2, 10, 4, 9, 5].map((d,i) => [(i*50)+39,110-(d*10)])))
    svg
    .append("path")
    .attr("transform","translate(" + (xScale(t[d3.minIndex(c)]) + 30) + ", 30)")
    .attr("fill", "blue")
    .attr("fill-opacity","0.1")
    .attr("d", area);
    svg
    .append("path")
    .attr("transform","translate(30, 30)")
    .attr("fill","none")
    .attr("stroke","#999")
    .attr('d', line)
    // d3.select(ref.current)
    // .append("circle")
    // .attr("transform","translate(30, 30)")
    // .attr("fill","black")
    // .attr("cx",xScale(t[d3.minIndex(c)]))
    // .attr("r",5)

       //  d3.select(ref.current)
       //    .append("g")
       //    .attr("class","axis")
       //    .attr("transform","translate(420, 20)")
       //    .call(axisLeftLong)
       //    .select("g.axis path")
       //    .attr("display","none")
       // d3.select(ref.current)
       //   .selectAll("g.axis g line")
       //   .attr("stroke-width", "0.075")
         // .attr("stroke-width", "1")


       }

  },[data])
  return (
    <div style={{background: "lightGrey",justifyContent:"center"}}>
      {
        <div>
            <div>start: {startDate} {JSON.stringify(new Date(startDate))}</div>
            <div>end: {endDate} {JSON.stringify(new Date(endDate))}</div>
        </div>
      }
      <svg ref={ref} width="100%" height="180" transform="translate(0,0)"/>
    </div>);
}

export default TestStand
