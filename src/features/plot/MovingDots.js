import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const MovingDots = () => {

  const ref = useRef()
  const [data,setData] = useState([])

let store = [];
function updateData() {
	store = [];
	for(let i=0; i<5; i++) {
		store.push(Math.random() * 800);
	}
  setData(store)
}

function update() {
	d3.select('svg')
		.selectAll('circle')
		.data(data)
		.join('circle')
		.attr('cy', 50)
		.attr('r', 5)
		.transition()
		.duration(1000)
    .attr("fill","grey")
		.attr('cx', function(d) {
			return d;
		});
}

function updateAll() {
	updateData();
	update();
}

useEffect(() => {
  const timer = setTimeout(() => updateAll(), 1000);
  return () => clearTimeout(timer);
},[data])

  return  (
    <div>
      <div>data: {JSON.stringify(data)}</div>
      <svg ref={ref} width="100%" height="180" transform="translate(0,0)" onClick={() => update() } class="movingDots"/>
    </div>
  )

}

export default MovingDots
