import * as d3 from "d3";
import {useEffect, useRef, useState,useLayoutEffect} from "react";

const data =
  [
      {"source":"a1","target":"b1","value":1},
      {"source":"a2","target":"a2","value":0.1},
      {"source":"b2","target":"c2","value":1},
      {"source":"c1","target":"c1","value":0.1},
      {"source":"c3","target":"d3","value":1},
      {"source":"a3","target":"a3","value":0.1},
      {"source":"b3","target":"b3","value":0.1},
      {"source":"d1","target":"d1","value":0.1},
      {"source":"d2","target":"d2","value":0.1},
]

const data2 =
  [
      {"source":"a1","target":"a1","value":1.2},
      {"source":"b1","target":"b1","value":2.1},
      {"source":"c1","target":"c1","value":2.2},
      {"source":"d1","target":"d1","value":1.2},
]



export default function TimeSeriesRibbon(){

  const ref = useRef()

  const width = 600
  const height = 600
  const innerRadius = Math.min(width, height) * 0.5 - 90
  const outerRadius = innerRadius + 10

  const names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)
  const names2 = Array.from(new Set(data2.flatMap(d => [d.source, d.target]))).sort(d3.ascending)

  const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))

  const ribbon = d3
    .ribbonArrow()
    .radius(innerRadius - 1)
    .padAngle(1 / innerRadius)

  const arc = (innerRadius, outerRadius) => d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  const chord = d3.chordDirected()
    .padAngle(10 / innerRadius)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending)

  // const nameGroups = () => [... new Set(names.map(e => e[0]))]

  const matrix = (() => {
      const index = new Map(names.map((name, i) => [name, i]));
      const matrix = Array.from(index, () => new Array(names.length).fill(0));
      for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
      return matrix;
  })()

  const matrix2 = (() => {
      const index = new Map(names2.map((name, i) => [name, i]));
      const matrix = Array.from(index, () => new Array(names2.length).fill(0));
      for (const {source, target, value} of data2) matrix[index.get(source)][index.get(target)] += value;
      return matrix;
  })()

  const rename = name => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))

  useEffect(() => {

      const svg = d3
          .select(ref.current)
          .attr("viewBox", [-width / 2, -height / 2, width, height]);

      const chords = chord(matrix);
      const chords2 = chord(matrix2);

      const group = svg.append("g")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .selectAll("g")
          .data(chords.groups)
          .join("g");

      const group2 = svg.append("g")
          .attr("font-size", 10)
          .attr("font-family", "sans-serif")
          .selectAll("g")
          .data(chords2.groups)
          .join("g");

      group.append("path")
        .attr("fill", d => color(names[d.index]))
        .attr("d", arc(innerRadius, outerRadius));

        group2.append("path")
          .attr("fill", d => color(names2[d.index]))
          .attr("d", arc(innerRadius + 30, outerRadius + 30));

      group.append("text")
          .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
          .attr("dy", "0.35em")
          .attr("transform", d => `
            rotate(${(d.angle * 180 / Math.PI - 90)})
            translate(${outerRadius + 5})
            ${d.angle > Math.PI ? "rotate(180)" : ""}
          `)
          .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
          .text(d => names[d.index]);

          group.append("title")
        .text(d => `${names[d.index]}
        ${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
        ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);

    svg.append("g")
        .attr("fill-opacity", 0.75)
      .selectAll("path")
      .data(chords)
      .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("fill", d => color(names[d.target.index]))
        .attr("d", ribbon)
      .append("title")
        .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

  },[])

  return (
    <div style={{background: "lightGrey"}} class="timeSeriesRibbon">
    {
      <>
          <svg class="chart SVG" ref={ref} width="800" height="700" />
          {
            // <div>
            // <h3>data</h3>
            // <div>{JSON.stringify(data)}</div>
            // </div>

          }
      </>
    }
    </div>);
}
