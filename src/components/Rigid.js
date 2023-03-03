import React from "react";
import ReactSlider from "react-slider";
import {useEffect, useRef, useState,useLayoutEffect} from "react";
import * as d3 from "d3";
import { ResponsiveAreaBump } from '@nivo/bump'
// import {SlopeChart} from "@d3/slope-chart"
import TimeSeriesRibbon from '../features/charts/TimeSeriesRibbon'
import LinksTree from '../features/charts/LinksTree'


const Rigid = () => {

  const SimpleArray = () => {
      const myRefs= useRef([]);
      const ref = useRef();
      let x = 10;
      useEffect(() => {
         d3.select(ref.current)
          .selectAll("div")
          .data([3, 5, 7, 2, 9, 2, 10, 4, 9, 3])
          .join('text')
          .attr('x', () => x+=40)
          .attr('y', 50)
          .text(d => d);
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const SimpleArrayAsDots = () => {
      const myRefs= useRef([]);
      const ref = useRef();
      let x = 10;
      useEffect(() => {
         d3.select(ref.current)
          .selectAll("div")
          .data([3, 5, 7, 2, 9, 2, 10, 4, 9, 3])
          .join('circle')
          .attr('cx', () => x+=40)
          .attr('cy', 50)
          .attr('r',5);
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const SimpleArrayAsDotsSized = () => {
      const myRefs= useRef([]);
      const ref = useRef();
      let x = 10;
      useEffect(() => {
         d3.select(ref.current)
          .selectAll("div")
          .data([3, 5, 7, 2, 9, 2, 10, 4, 9, 3])
          .join('circle')
          .attr('cx', () => x += 40)
          .attr('cy', 50)
          .attr('r', (d) => d);
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const SimpleArrayAsDotsSizedHeight = () => {
      const myRefs= useRef([]);
      const ref = useRef();
      let x = 10;
      useEffect(() => {
         d3.select(ref.current)
          .selectAll("div")
          .data([3, 5, 7, 2, 9, 2, 10, 4, 9, 3])
          .join('circle')
          .attr('cx', () => x += 40)
          .attr('cy', (d) => 70 - d*5)
          .attr('r', (d) => d);
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const SimpleArrayAsDotsSizedHeightBars = () => {
      const myRefs= useRef([]);
      const ref = useRef();
      let x = 10;
      useEffect(() => {
         d3.select(ref.current)
          .selectAll("div")
          .data([3, 5, 7, 2, 9, 2, 10, 4, 9, 3])
          .join('rect')
          .attr('x', () => x += 40)
          .attr('y', 20)
          .attr('width', 10)
          .attr('height', (d) => d * 5)
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const BarsViaPath= () => {
      const myRefs= useRef([]);
      const ref = useRef();
      let xStep = 20;
      useEffect(() => {
         d3.select(ref.current)
          .selectAll("div")
          .data([3, 5, 7, 2, 9, 2, 10, 4, 9, 3].map(d => [xStep+=39,110-(d*10)]))
          .join("path")
          .attr('transform', (d) => 'translate(' + d + ')')
	        .attr('d', d3.symbol().type(d3.symbolStar).size(80));
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const SimpleAngLine = () => {
    const myRefs= useRef([]);
    const ref = useRef();
    let xStep = 20;
    useEffect(() => {
       d3.select(ref.current)
           .append("path")
           .attr("fill","none")
           .attr("stroke","#999")
           .attr('d', d3
              .line()
              .defined(d => d !== null)
              ([3, 5, 7, 2, 9, 2, 10, 4, 9, 5].map(d => [xStep+=39,110-(d*10)])));
    },[])
    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="500" height="100" />
      </div>);
  }

  const SimpleCurveLine = () => {
    const myRefs= useRef([]);
    const ref = useRef();
    let xStep = 20;
    useEffect(() => {
       d3.select(ref.current)
           .append("path")
           .attr("fill","none")
           .attr("stroke","#999")
           .attr('d', d3
              .line()
              .defined(d => d !== null)
              .curve(d3.curveCardinal)([3, 5, 7, 2, 9, 2, 10, 4, 9, 5].map(d => [xStep+=39,110-(d*10)])));
    },[])
    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="500" height="100" />
      </div>);
  }

  const SimpleDoubleCurveLine = () => {
    const myRefs= useRef([]);
    const ref = useRef();
    let xStep = 20;
    useEffect(() => {
       d3.select(ref.current)
           .append("path")
           .attr("fill","none")
           .attr("stroke","#999")
           .attr('d', d3
              .line()
              .defined(d => d !== null)
              .curve(d3.curveCardinal)([3, 5, 7, 2, 9, 2, 10, 4, 9, 5].map((d,i) => [(i*50)+39,110-(d*10)])))
      d3.select(ref.current)
          .append("path")
          .attr("fill","none")
          .attr("stroke","#999")
          .attr('d', d3
             .line()
             .defined(d => d !== null)
             .curve(d3.curveCardinal)([6, 7, 3, 2, 1, 2, 8, 6, 7,3].map((d,i) => [(i*50)+39,110-(d*10)])))
    },[])
    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="500" height="100" />
      </div>);
  }

  const SimpleDonut = () => {
    const myRefs= useRef([]);
    const ref = useRef();
    let xStep = 20;

    var arcGenerator = d3.arc()
    	.innerRadius(10)
    	.outerRadius(40)
    	.padAngle(.02)
    	.padRadius(100)
    	// .cornerRadius(4);

    var arcData = [
    	{startAngle: 0, endAngle: 0.2},
    	{startAngle: 0.2, endAngle: 0.6},
    	{startAngle: 0.6, endAngle: 1.4},
    	{startAngle: 1.4, endAngle: 3},
    	{startAngle: 3, endAngle: 2* Math.PI}
    ];

    useEffect(() => {
       d3.select(ref.current)
       	.selectAll('path')
       	.data(arcData)
       	.join('path')
        .attr("transform","translate(250, 50)")
        .attr("fill","grey")
       	.attr('d', arcGenerator);
    },[])
    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="500" height="100" />
      </div>);
  }

  const SomeFancy = () => {
    const myRefs= useRef([]);
    const ref = useRef();
    let xStep = 20;

    var arcGenerator = d3.arc()
      .innerRadius(10)
      .outerRadius(40)
      .padAngle(.02)
      .padRadius(100)
      // .cornerRadius(4);

    var arcData = [
      {startAngle: 0, endAngle: 0.2},
      {startAngle: 0.2, endAngle: 0.6},
      {startAngle: 0.6, endAngle: 1.4},
      {startAngle: 1.4, endAngle: 3},
      {startAngle: 3, endAngle: 2* Math.PI}
    ];

    useEffect(() => {

        var colors = ['#5a5a5a', '#696969', '#808080'];

          var data = [
            {day: 'Mon', apricots: 120, blueberries: 180, cherries: 100},
            {day: 'Tue', apricots: 60, blueberries: 185, cherries: 105},
            {day: 'Wed', apricots: 100, blueberries: 215, cherries: 110},
            {day: 'Thu', apricots: 80, blueberries: 230, cherries: 105},
            {day: 'Fri', apricots: 120, blueberries: 240, cherries: 105}
          ];

        var g =
          d3.select(ref.current)
          .append('g')
          .attr("transform","translate(50,10)")
        	.selectAll('g.series')
        	.data(d3.stack().keys(['apricots', 'blueberries', 'cherries'])(data))
          	.join('g')
          	.classed('series', true)
          	.style('fill', (d, i) => colors[i])
              .selectAll('rect')
            	.data((d) => d)
              	.join('rect')
              	.attr('width', (d) => d[1] - d[0])
              	.attr('x', (d) => d[0])
              	.attr('y', (d, i) => i * 20)
              	.attr('height', 19);
    },[])
    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="500" height="100" />
      </div>);
  }

  const XAxis = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      let data = [3, 5, 7, 2, 9, 2, 10, 4, 9, 3];
      let xScale = d3.scaleLinear().domain([0, 10]).range([0, 400]);
      let axisBottom = d3.axisBottom(xScale);
      // let scale = d3.scaleLinear().domain([0, data.sort((a,b) => a - b).slice(-1)]).range([0, 450]);

      useEffect(() => {
        d3.select(ref.current)
          .append("g")
          .attr("id","bottom")
          .attr("transform","translate(40, 50)")
          .call(axisBottom)
      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="100" />
        </div>);
  }

  const YAxis = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      let data = [3, 5, 7, 2, 9, 2, 10, 4, 9, 3];
      // let scale = d3.scaleLinear().domain([0, data.sort((a,b) => a - b).slice(-1)]).range([0, 50]);

      let xScale = d3.scaleLinear().domain([0, 10]).range([0, 400]);
      let yScale = d3.scaleLinear().domain([0, 10]).range([0, 100]);

      let axisLeft = d3.axisLeft(yScale);
      let axisRight = d3.axisRight(yScale);
      let axisTop = d3.axisTop(xScale);
      let axisBottom = d3.axisBottom(xScale);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("id","left")
           .attr("transform","translate(30, 40)")
           .call(axisLeft)
         d3.select(ref.current)
           .append("g")
           .attr("id","right")
           .attr("transform","translate(450, 40)")
           .call(axisRight)
         d3.select(ref.current)
           .append("g")
           .attr("id","top")
           .attr("transform","translate(40, 30)")
           .call(axisTop)
         d3.select(ref.current)
           .append("g")
           .attr("id","bottom")
           .attr("transform","translate(40, 150)")
           .call(axisBottom)

      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="180" />
        </div>);
  }

  const XYCurve = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      let data = [3, 5, 7, 2, 9, 2, 10, 4, 9, 3];
      // let scale = d3.scaleLinear().domain([0, data.sort((a,b) => a - b).slice(-1)]).range([0, 50]);

      let xScale = d3.scaleLinear().domain([0, 10]).range([0, 400]);
      let yScale = d3.scaleLinear().domain([0, 10]).range([0, 100]);

      let axisLeft = d3.axisLeft(yScale);
      let axisRight = d3.axisRight(yScale);
      let axisTop = d3.axisTop(xScale);
      let axisBottom = d3.axisBottom(xScale);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("id","left")
           .attr("transform","translate(30, 30)")
           .call(axisLeft)
         d3.select(ref.current)
           .append("g")
           .attr("id","right")
           .attr("transform","translate(430, 30)")
           .call(axisRight)
         d3.select(ref.current)
           .append("g")
           .attr("id","top")
           .attr("transform","translate(30, 30)")
           .call(axisTop)
         d3.select(ref.current)
           .append("g")
           .attr("id","bottom")
           .attr("transform","translate(30, 130)")
           .call(axisBottom)
         d3.select(ref.current)
             .append("path")
             .attr("transform","translate(0, 30)")
             .attr("fill","none")
             .attr("stroke","#999")
             .attr('d', d3
                .line()
                .defined(d => d !== null)
                .curve(d3.curveCardinal)([3, 5, 7, 2, 9, 2, 10, 4, 9, 5].map((d,i) => [(i*50)+39,110-(d*10)])))

      },[])
      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="180" transform="translate(10,10)"/>
        </div>);
  }

  const YDetailed = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      let data = [3, 5, 7, 2, 9, 2, 10, 4, 9, 3];
      // let scale = d3.scaleLinear().domain([0, data.sort((a,b) => a - b).slice(-1)]).range([0, 50]);

      let yScale = d3.scaleLinear().domain([0, 10]).range([0, 100]);

      let axisLeft = d3.axisLeft(yScale).tickSize(420);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("class","axis")
           .attr("transform","translate(450, 20)")
           .call(axisLeft)
           .select("g.axis path")
           .attr("display","none")
        d3.select(ref.current)
          .selectAll("g.axis g line")
          .attr("stroke-width", "0.075")
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="180" transform="translate(10,10)"/>
        </div>);
  }

  const Area = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      var areaGenerator = d3.area().y0(150);
      var points = [
      	[0, 80],
      	[100, 100],
      	[200, 30],
      	[300, 50],
      	[400, 40],
      	[500, 80]
      ];

      var area = areaGenerator(points);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("transform","translate(0, 0)")
           .append("path")
           .attr("fill","grey")
           .attr("d", area)
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="180"/>
        </div>);
  }

  const FloatingArea = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      var yScale = d3.scaleLinear().domain([0, 100]).range([200, 0]);

      var points = [
      	{x: 0, low: 30, high: 80},
      	{x: 100, low: 80, high: 100},
      	{x: 200, low: 20, high: 30},
      	{x: 300, low: 20, high: 50},
      	{x: 400, low: 10, high: 40},
      	{x: 500, low: 50, high: 80}
      ];

      var areaGenerator = d3.area()
      	.x((d) => d.x)
      	.y0((d) => yScale(d.low))
      	.y1((d) => yScale(d.high));

      var area = areaGenerator(points);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("transform","translate(0, 0)")
           .append("path")
           .attr("fill","grey")
           .attr("d", area)
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="180"/>
        </div>);
  }

  const StackedArea = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      var yScale = d3.scaleLinear().domain([0, 400]).range([200, 0]);

      var areaGenerator = d3.area()
      	.x((d, i) => i * 100)
      	.y0((d) => yScale(d[0]))
      	.y1((d) => yScale(d[1]));

      var colors = ['#5a5a5a', '#696969', '#808080'];

      var data = [
      	{day: 'Mon', apricots: 120, blueberries: 100, cherries: 10},
      	{day: 'Tue', apricots: 100, blueberries: 110, cherries: 25},
      	{day: 'Wed', apricots: 80, blueberries: 115, cherries: 30},
      	{day: 'Thu', apricots: 60, blueberries: 130, cherries: 50},
      	{day: 'Fri', apricots: 20, blueberries: 140, cherries: 55}
      ];

      var stack = d3.stack().keys(['apricots', 'blueberries', 'cherries']);

      var stackedSeries = stack(data);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("transform","translate(50, 0)")
           .selectAll('path')
           .data(stackedSeries)
         	 .join('path')
        	 .style('fill', (d, i) => colors[i])
        	 .attr('d', areaGenerator)
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="280"/>
        </div>);
  }

  const StackedAreaWithAxis = () => {
      const myRefs= useRef([]);
      const ref = useRef();

      var yScale = d3.scaleLinear().domain([0, 400]).range([200, 0]);

      var areaGenerator = d3.area()
      	.x((d, i) => i * 105)
      	.y0((d) => yScale(d[0]))
      	.y1((d) => yScale(d[1]));

      var colors = ['#5a5a5a', '#696969', '#808080'];

      var data = [
      	{day: 'Mon', apricots: 120, blueberries: 100, cherries: 10},
      	{day: 'Tue', apricots: 100, blueberries: 110, cherries: 25},
      	{day: 'Wed', apricots: 80, blueberries: 115, cherries: 30},
      	{day: 'Thu', apricots: 60, blueberries: 130, cherries: 50},
      	{day: 'Fri', apricots: 20, blueberries: 140, cherries: 55}
      ];

      var stack = d3.stack().keys(['apricots', 'blueberries', 'cherries']);

      var stackedSeries = stack(data);

      let axisLeft = d3.axisLeft(yScale).tickSize(420);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("transform","translate(30, 20)")
           .selectAll('path')
           .data(stackedSeries)
         	 .join('path')
        	 .style('fill', (d, i) => colors[i])
        	 .attr('d', areaGenerator)
         d3.select(ref.current)
           .append("g")
           .attr("class","axis")
           .attr("transform","translate(450, 20)")
           .call(axisLeft)
           .select("g.axis path")
           .attr("display","none")
        d3.select(ref.current)
          .selectAll("g.axis g line")
          .attr("stroke-width", "0.2")
          .attr("mix-blend-mode","overlay")
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="280" transform="translate(20,10)"/>
        </div>);
  }

  const LinksLinear = () => {
      const ref = useRef();

      let data = {
        "nodes": [
          { "id": 1, "name": "A" },
          { "id": 2, "name": "B" },
          { "id": 3, "name": "C" },
          { "id": 4, "name": "D" },
          { "id": 5, "name": "E" },
          { "id": 6, "name": "F" },
          { "id": 7, "name": "G" },
          { "id": 8, "name": "H" },
          { "id": 9, "name": "I" },
          { "id": 10, "name": "J"}
        ],
        "links": [
          { "source": 1, "target": 2 },
          { "source": 1, "target": 5 },
          { "source": 1, "target": 6 },
          { "source": 2, "target": 3 },
          { "source": 2, "target": 7 },
          { "source": 3, "target": 4 },
          { "source": 8, "target": 3 },
          { "source": 4, "target": 5 },
          { "source": 4, "target": 9 },
          { "source": 5, "target": 10 }
        ]
      }

      // List of node names
      let allNodes = data.nodes.map(d => d.name);
      // A linear scale to position the nodes on the X axis
      var xScale = d3.scalePoint()
       .range([0, 400])
       .domain(allNodes);

      // var stack = d3.stack().keys(['apricots', 'blueberries', 'cherries']);
      //
      // var stackedSeries = stack(data);
      //
      // let axisLeft = d3.axisLeft(yScale).tickSize(420);
      //

      // Add links between nodes. Here is the tricky part.
      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      var idToNode = {};
      data.nodes.forEach((n) => idToNode[n.id] = n);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("transform","translate(30, 20)")
           .selectAll("mynodes")
           .data(data.nodes)
           .enter()
           .append("circle")
             .attr("cx", (d) => xScale(d.name))
             .attr("cy", 100-30)
             .attr("r", 8)
             .style("fill", "grey")
         d3.select(ref.current)
          .selectAll("mylabels")
          .data(data.nodes)
          .enter()
          .append("text")
            .attr("x", (d) => xScale(d.name) + 30)
            .attr("y", 110 + 5)
            .text((d) => d.name)
            .style("text-anchor", "middle")
            .style("fill", "grey")
        d3.select(ref.current)
          .selectAll('mylinks')
          .data(data.links)
          .enter()
          .append('path')
          .attr("transform","translate(30, 0)")
          .attr('d', (d) => {
            let height = 80;
            let start = xScale(idToNode[d.source].name)    // X position of start node on the X axis
            let end = xScale(idToNode[d.target].name)      // X position of end node
            return ['M', start, height,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
              'A',                            // This means we're gonna build an elliptical arc
              (start - end)/1.9, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
              (start - end)/2, 1, 0, ',',
              start < end ? 1 : 0, end, ',', height] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
              .join(' ');
          })
          .style("fill", "none")
          .attr("stroke", "grey")
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="280" transform="translate(20,10)"/>
        </div>);
  }

  const LinksLinearwWeighted = () => {
      const ref = useRef();

      let data = {
        "nodes": [
          { "id": 1, "name": "A.t1", "weight":20 },
          { "id": 2, "name": "B.t1", "weight":10 },
          { "id": 3, "name": "C.t1", "weight":10 },
          { "id": 4, "name": "A.t2", "weight":10 },
          { "id": 5, "name": "B.t2", "weight":20 },
          { "id": 6, "name": "C.t2", "weight":10 },
          { "id": 7, "name": "A.t3", "weight":10 },
          { "id": 8, "name": "B.t3", "weight":10 },
          { "id": 9, "name": "C.t3", "weight":20 }
        ],
        "links": [
          { "source": 1, "target": 5 },
          { "source": 5, "target": 9 }
        ]
      }

      // List of node names
      let allNodes = data.nodes.map(d => d.name);
      // A linear scale to position the nodes on the X axis
      var xScale = d3.scalePoint()
       .range([0, 400])
       .domain(allNodes);

      // var stack = d3.stack().keys(['apricots', 'blueberries', 'cherries']);
      //
      // var stackedSeries = stack(data);
      //
      // let axisLeft = d3.axisLeft(yScale).tickSize(420);
      //

      // Add links between nodes. Here is the tricky part.
      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      var idToNode = {};
      data.nodes.forEach((n) => idToNode[n.id] = n);

      useEffect(() => {
         d3.select(ref.current)
           .append("g")
           .attr("transform","translate(30, 20)")
           .selectAll("mynodes")
           .data(data.nodes)
           .enter()
           // .append("circle")
           //   .attr("cx", (d) => xScale(d.name))
           //   .attr("cy", 100-30)
           //   .attr("r", 8)
           //   .style("fill", "grey")
           .append('rect')
           .attr('x', (d) => xScale(d.name) - 5)
           .attr('y', 100 - 35)
           .attr('width', (d) => d.weight)
           .attr('height', (d) => d.weight)
           .style("fill","grey")
         d3.select(ref.current)
          .selectAll("mylabels")
          .data(data.nodes)
          .enter()
          .append("text")
            .attr("x", (d) => xScale(d.name) + 30)
            .attr("y", 110 + 10)
            .text((d) => d.name)
            .style("text-anchor", "middle")
            .style("fill", "grey")
        d3.select(ref.current)
          .selectAll('mylinks')
          .data(data.links)
          .enter()
          .append('path')
          .attr("transform","translate(30, 0)")
          .attr('d', (d) => {
            let height = 80;
            let start = xScale(idToNode[d.source].name)    // X position of start node on the X axis
            let end = xScale(idToNode[d.target].name)      // X position of end node
            return ['M', start, height,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
              'A',                            // This means we're gonna build an elliptical arc
              (start - end)/1.9, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
              (start - end)/2, 1, 0, ',',
              start < end ? 1 : 0, end, ',', height] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
              .join(' ');
          })
          .style("fill", "none")
          .attr("stroke", "grey")
        d3.select(ref.current)
         .selectAll("lines")
         .data([10,20,30])
         .join('rect')
         .attr('x', (d) => -125)
         .attr('y', d => 75)
         .attr("transform", d => "translate(" + (d * 15) +  ", 10)")
         .attr('width', 110)
         .attr('height', 5)
         .style("fill","grey");
      },[])

      return (
        <div style={{background: "lightGrey"}}>
          <svg ref={ref} width="500" height="280" transform="translate(20,10)"/>
        </div>);
  }

  const SomeWeightedFancy = () => {
    const ref = useRef();

    var arcData = [
      {startAngle: 0, endAngle: 0.2},
      {startAngle: 0.2, endAngle: 0.6},
      {startAngle: 0.6, endAngle: 1.4},
      {startAngle: 1.4, endAngle: 3},
      {startAngle: 3, endAngle: 2* Math.PI}
    ];

    var arcGenerator = d3.arc()
    .innerRadius(10)
    .outerRadius(40)
    .padAngle(.02)
    .padRadius(100)

    useEffect(() => {
       d3.select(ref.current)
        .selectAll('path')
        .data(arcData)
        .join('path')
        .attr("transform","translate(250, 50)")
        .attr("fill","grey")
        .attr('d', arcGenerator);
        // .attr("d", (d) => "M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 z")
    },[])
    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="500" height="100" />
      </div>);
  }

  const SimpleRibbon = () => {
    // source:https://d3-graph-gallery.com/graph/chord_basic.html
    const ref = useRef();

    // Returns an array of tick angles and values for a given group and step.
    function groupTicks(d, step) {
      var k = (d.endAngle - d.startAngle) / d.value;
      return d3.range(0, d.value, step).map(function(value) {
        return {value: value, angle: value * k + d.startAngle};
      });
    }

    // create input data: a square matrix that provides flow between entities
    var matrix = [
      [0, 10, 0, 0, 0],
      [0, 0, 10, 10, 10],
      // [0, 0, 11, 11],
      [0,  0, 0, 10, 10],
      [0,  0, 0, 0, 0],
      [0,  0, 0, 0, 0]
    ];
    // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
    var res = d3.chordDirected()
      .padAngle(0.1)     // padding between entities (black arc)
      // .sortSubgroups(d3.descending)
      (matrix)

    useEffect(() => {

      let root = d3.select(ref.current)
        .append("svg")
        .attr("class","#my_dataviz")
        .attr("width", 400)
        .attr("height", 400)
        .append("g")
        .attr("transform", "translate(250,120)")

        root
          .datum(res)
          .append("g")
          .selectAll("g")
          .data((d) => d.groups)
          .enter()
          .append("g")
          .append("path")
            .style("fill", "grey")
            .style("stroke", "black")
            .attr("d", d3.arc()
              .innerRadius(100)
              .outerRadius(110))

              // Add the links between groups
        root
          .datum(res)
          .append("g")
          .selectAll("path")
          .data((d) => d)
          .enter()
          .append("path")
            .attr("d", d3.ribbon()
              .radius(100)
            )
            .style("fill", "grey")
            .style("stroke", "#404040");

            // this group object use each group of the data.groups object
            var group = root
              .datum(res)
              .append("g")
              .selectAll("g")
              .data(function(d) { return d.groups; })
              .enter()
            group.append("g")
              .append("path")
              .attr("class","tick?")
              .style("fill", "grey")
              .style("stroke", "black")
              .attr("d", d3.arc()
                .innerRadius(115)
                .outerRadius(120))
            // Add the ticks
            // group
            //   .selectAll(".group-tick")
            //   .data(function(d) { return groupTicks(d, 25); })    // Controls the number of ticks: one tick each 25 here.
            //   .enter()
            //   .append("g")
            //     .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + 120 + ",0)"; })
            //   .append("line")               // By default, x1 = y1 = y2 = 0, so no need to specify it.
            //     .attr("x2", 6)
            //     .attr("stroke", "black")

    // Add the labels of a few ticks:
// group
//   .selectAll(".group-tick-label")
//   .data(function(d) { return groupTicks(d, 25); })
//   .enter()
//   .filter(function(d) { return d.value % 25 === 0; })
//   .append("g")
//     .attr("transform", function(d) { return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + 110 + ",0)"; })
//   .append("text")
//     .attr("x", 8)
//     .attr("dy", ".35em")
//     .attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180) translate(-16)" : null; })
//     .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
//     .text(function(d) { return d.value })
//     .style("font-size", 9)


    },[]);
    // <svg ref={ref}/>
    return (
      <div style={{background: "lightGrey"}}>
      <svg ref={ref} width="500" height="500" />
      </div>
    );
  }

  const SomeWeightedFancyRibbon = () => {
    // https://observablehq.com/@d3/chord-dependency-diagram
    const [render,reRender] = useState(false);

    const ref = useRef();

    let width = 500;
    let height = 500;
    let innerRadius = Math.min(width, height) * 0.5 - 50;
    // let innerRadius = 100 * 0.5 - 10;
    let outerRadius = innerRadius + 10;
    let names = ["analytics.cluster", "analytics.graph", "analytics.optimization", "animate", "animate.interpolate", "data", "data.converters", "display", "flex", "physics", "query", "query.methods", "scale", "util", "util.heap", "util.math", "util.palette", "vis", "vis.axis", "vis.controls"];
    let color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length));
    let ribbon = d3
      .ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    const data =
[{"source":"analytics.cluster","target":"animate","value":2},{"source":"analytics.cluster","target":"vis.data","value":8},{"source":"analytics.cluster","target":"util.math","value":2},{"source":"analytics.cluster","target":"analytics.cluster","value":5},{"source":"analytics.cluster","target":"util","value":3},{"source":"analytics.cluster","target":"vis.operator","value":1},{"source":"analytics.graph","target":"animate","value":5},{"source":"analytics.graph","target":"vis.data","value":14},{"source":"analytics.graph","target":"util","value":5},{"source":"analytics.graph","target":"vis.operator","value":6},{"source":"analytics.graph","target":"analytics.graph","value":1},{"source":"analytics.graph","target":"util.heap","value":2},{"source":"analytics.graph","target":"vis","value":1},{"source":"analytics.optimization","target":"animate","value":1},{"source":"analytics.optimization","target":"util","value":2},{"source":"analytics.optimization","target":"vis.data","value":1},{"source":"analytics.optimization","target":"scale","value":1},{"source":"analytics.optimization","target":"vis.axis","value":1},{"source":"analytics.optimization","target":"vis","value":1},{"source":"analytics.optimization","target":"vis.operator","value":1},{"source":"animate","target":"animate","value":30},{"source":"animate","target":"util","value":9},{"source":"animate.interpolate","target":"util","value":2},{"source":"animate.interpolate","target":"animate.interpolate","value":16},{"source":"animate","target":"animate.interpolate","value":1},{"source":"data.converters","target":"data.converters","value":7},{"source":"data.converters","target":"data","value":17},{"source":"data.converters","target":"util","value":1},{"source":"data","target":"data","value":7},{"source":"data","target":"util","value":1},{"source":"data","target":"data.converters","value":2},{"source":"display","target":"display","value":3},{"source":"display","target":"util","value":1},{"source":"flex","target":"display","value":1},{"source":"flex","target":"data","value":1},{"source":"flex","target":"vis","value":1},{"source":"flex","target":"vis.axis","value":2},{"source":"flex","target":"vis.data","value":1},{"source":"physics","target":"physics","value":22},{"source":"query","target":"query","value":61},{"source":"query","target":"util","value":6},{"source":"query.methods","target":"query.methods","value":39},{"source":"query.methods","target":"query","value":32},{"source":"scale","target":"scale","value":19},{"source":"scale","target":"util","value":14},{"source":"util","target":"util","value":23},{"source":"util.heap","target":"util.heap","value":2},{"source":"util.math","target":"util.math","value":2},{"source":"util.palette","target":"util.palette","value":3},{"source":"util.palette","target":"util","value":2},{"source":"vis.axis","target":"animate","value":3},{"source":"vis.axis","target":"vis","value":2},{"source":"vis.axis","target":"scale","value":4},{"source":"vis.axis","target":"util","value":3},{"source":"vis.axis","target":"display","value":5},{"source":"vis.axis","target":"vis.axis","value":7},{"source":"vis.controls","target":"vis.controls","value":12},{"source":"vis.controls","target":"vis","value":3},{"source":"vis.controls","target":"vis.operator.layout","value":1},{"source":"vis.controls","target":"vis.events","value":4},{"source":"vis.controls","target":"util","value":3},{"source":"vis.controls","target":"vis.data","value":2},{"source":"vis.controls","target":"animate","value":2},{"source":"vis.controls","target":"display","value":1},{"source":"vis.data","target":"vis.data","value":26},{"source":"vis.data","target":"util","value":17},{"source":"vis.data","target":"vis.events","value":4},{"source":"vis.data","target":"data","value":3},{"source":"vis.data","target":"animate","value":2},{"source":"vis.data","target":"util.math","value":2},{"source":"vis.data","target":"display","value":1},{"source":"vis.data","target":"vis.data.render","value":4},{"source":"vis.data.render","target":"vis.data","value":5},{"source":"vis.data.render","target":"vis.data.render","value":3},{"source":"vis.data.render","target":"util","value":3},{"source":"vis.data","target":"scale","value":9},{"source":"vis.data","target":"util.heap","value":2},{"source":"vis.events","target":"vis.data","value":6},{"source":"vis.events","target":"vis.events","value":1},{"source":"vis.events","target":"animate","value":1},{"source":"vis.legend","target":"animate","value":1},{"source":"vis.legend","target":"vis.data","value":1},{"source":"vis.legend","target":"util.palette","value":5},{"source":"vis.legend","target":"scale","value":4},{"source":"vis.legend","target":"vis.legend","value":4},{"source":"vis.legend","target":"display","value":6},{"source":"vis.legend","target":"util","value":6},{"source":"vis.operator.distortion","target":"vis.operator.distortion","value":2},{"source":"vis.operator.distortion","target":"animate","value":1},{"source":"vis.operator.distortion","target":"vis.data","value":2},{"source":"vis.operator.distortion","target":"vis.events","value":1},{"source":"vis.operator.distortion","target":"vis.axis","value":2},{"source":"vis.operator.distortion","target":"vis.operator.layout","value":1},{"source":"vis.operator.encoder","target":"animate","value":3},{"source":"vis.operator.encoder","target":"scale","value":3},{"source":"vis.operator.encoder","target":"vis.operator.encoder","value":4},{"source":"vis.operator.encoder","target":"util.palette","value":7},{"source":"vis.operator.encoder","target":"vis.data","value":8},{"source":"vis.operator.encoder","target":"vis.operator","value":2},{"source":"vis.operator.encoder","target":"util","value":3},{"source":"vis.operator.filter","target":"animate","value":3},{"source":"vis.operator.filter","target":"vis.data","value":10},{"source":"vis.operator.filter","target":"vis.operator","value":3},{"source":"vis.operator.filter","target":"util","value":1},{"source":"vis.operator","target":"animate","value":7},{"source":"vis.operator","target":"vis","value":3},{"source":"vis.operator","target":"vis.operator","value":11},{"source":"vis.operator.label","target":"animate","value":1},{"source":"vis.operator.label","target":"vis.data","value":6},{"source":"vis.operator.label","target":"display","value":3},{"source":"vis.operator.label","target":"vis.operator","value":1},{"source":"vis.operator.label","target":"util","value":5},{"source":"vis.operator.label","target":"vis.operator.label","value":2},{"source":"vis.operator.layout","target":"scale","value":6},{"source":"vis.operator.layout","target":"vis.data","value":34},{"source":"vis.operator.layout","target":"vis.axis","value":4},{"source":"vis.operator.layout","target":"util","value":20},{"source":"vis.operator.layout","target":"vis.operator.layout","value":14},{"source":"vis.operator.layout","target":"animate","value":6},{"source":"vis.operator.layout","target":"vis.operator","value":2},{"source":"vis.operator.layout","target":"vis.data.render","value":1},{"source":"vis.operator.layout","target":"physics","value":3},{"source":"vis.operator.layout","target":"vis","value":1},{"source":"vis.operator","target":"util","value":5},{"source":"vis.operator","target":"vis.data","value":1},{"source":"vis","target":"animate","value":3},{"source":"vis","target":"vis.operator","value":2},{"source":"vis","target":"vis.events","value":2},{"source":"vis","target":"vis.data","value":2},{"source":"vis","target":"vis.axis","value":2},{"source":"vis","target":"util","value":1},{"source":"vis","target":"vis.controls","value":1}]

    let chord = d3
      .chordDirected()
      .padAngle(10 / innerRadius)
      // .sortSubgroups(d3.descending)
      // .sortChords(d3.descending);
    // let matrix = {
    const index = new Map(names.map((name, i) => [name, i]));
      let matrix = Array.from(index, () => new Array(names.length).fill(0));
       for (const {source, target, value} of data) {
         try{
           matrix[index.get(source)][index.get(target)] += value;
           console.log("Matrix: ", matrix)
         }catch{
         }
       }
    //
    //   names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)
    //   let rename = name => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))

    useEffect(() => {

      const chords = chord(matrix);

      const root =
        d3.select(ref.current)
          .append("svg")
          .attr("viewBox", [-width / 2, -height / 2, width, height]);

      const group = root.append("g")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .selectAll("g")
        .data(chords.groups)
        .join("g");
      group.append("path")
       .attr("fill", d => color(names[d.index]))
       .attr("d", arc);

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




      // setInterval(() => {
        root.append("g")
        .attr("fill-opacity", 0.75)
        .selectAll("path")
        .data(chords)
        .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("fill", d => color(names[d.target.index]))
        .attr("d", ribbon)
        .append("title")
        .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);
      // },1000);

    },[])

    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="800" height="800" />
        <div>
          <h3>data</h3>
          <div>
            {JSON.stringify(data)}
          </div>
        </div>
        <div>
          <h3>matrix</h3>
          <div>
            {JSON.stringify(matrix)}
          </div>
        </div>
      </div>);
  }

  const SomeWeightedFancyRibbonDexguruData = () => {
    // https://observablehq.com/@d3/chord-dependency-diagram
    const [render,reRender] = useState(false);

    const ref = useRef();

    let width = 500;
    let height = 500;
    let innerRadius = Math.min(width, height) * 0.5 - 50;
    // let innerRadius = 100 * 0.5 - 10;
    let outerRadius = innerRadius + 10;
    let names = ["analytics.cluster", "analytics.graph", "analytics.optimization", "animate", "animate.interpolate", "data", "data.converters", "display", "flex", "physics", "query", "query.methods", "scale", "util", "util.heap", "util.math", "util.palette", "vis", "vis.axis", "vis.controls"];
    let color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length));
    let ribbon = d3
      .ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);
    let arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
    const dataStub =
[
  {"source":"analytics.cluster","target":"animate","value":2},
  {"source":"analytics.cluster","target":"vis.data","value":8},
  {"source":"analytics.cluster","target":"util.math","value":2},
  {"source":"analytics.cluster","target":"analytics.cluster","value":5},
  {"source":"analytics.cluster","target":"util","value":3},
  {"source":"analytics.cluster","target":"vis.operator","value":1},
  {"source":"analytics.graph","target":"animate","value":5},
  {"source":"analytics.graph","target":"vis.data","value":14},
  {"source":"analytics.graph","target":"util","value":5},
  {"source":"analytics.graph","target":"vis.operator","value":6},
  {"source":"analytics.graph","target":"analytics.graph","value":1},
  {"source":"analytics.graph","target":"util.heap","value":2},
  {"source":"analytics.graph","target":"vis","value":1},
  {"source":"analytics.optimization","target":"animate","value":1},
  {"source":"analytics.optimization","target":"util","value":2},
  {"source":"analytics.optimization","target":"vis.data","value":1},
  {"source":"analytics.optimization","target":"scale","value":1},
  {"source":"analytics.optimization","target":"vis.axis","value":1},
  {"source":"analytics.optimization","target":"vis","value":1},
  {"source":"analytics.optimization","target":"vis.operator","value":1},
  {"source":"animate","target":"animate","value":30},
  {"source":"animate","target":"util","value":9},
  {"source":"animate.interpolate","target":"util","value":2},
  {"source":"animate.interpolate","target":"animate.interpolate","value":16},
  {"source":"animate","target":"animate.interpolate","value":1},
  {"source":"data.converters","target":"data.converters","value":7},
  {"source":"data.converters","target":"data","value":17},
  {"source":"data.converters","target":"util","value":1},
  {"source":"data","target":"data","value":7},
  {"source":"data","target":"util","value":1},
  {"source":"data","target":"data.converters","value":2},
  {"source":"display","target":"display","value":3},
  {"source":"display","target":"util","value":1},
  {"source":"flex","target":"display","value":1},
  {"source":"flex","target":"data","value":1},
  {"source":"flex","target":"vis","value":1},
  {"source":"flex","target":"vis.axis","value":2},
  {"source":"flex","target":"vis.data","value":1},
  {"source":"physics","target":"physics","value":22},
  {"source":"query","target":"query","value":61},
  {"source":"query","target":"util","value":6},
  {"source":"query.methods","target":"query.methods","value":39},
  {"source":"query.methods","target":"query","value":32},
  {"source":"scale","target":"scale","value":19},
  {"source":"scale","target":"util","value":14},
  {"source":"util","target":"util","value":23},
  {"source":"util.heap","target":"util.heap","value":2},
  {"source":"util.math","target":"util.math","value":2},
  {"source":"util.palette","target":"util.palette","value":3},
  {"source":"util.palette","target":"util","value":2},
  {"source":"vis.axis","target":"animate","value":3},
  {"source":"vis.axis","target":"vis","value":2},
  {"source":"vis.axis","target":"scale","value":4},
  {"source":"vis.axis","target":"util","value":3},
  {"source":"vis.axis","target":"display","value":5},
  {"source":"vis.axis","target":"vis.axis","value":7},
  {"source":"vis.controls","target":"vis.controls","value":12},
  {"source":"vis.controls","target":"vis","value":3},
  {"source":"vis.controls","target":"vis.operator.layout","value":1},
  {"source":"vis.controls","target":"vis.events","value":4},
  {"source":"vis.controls","target":"util","value":3},
  {"source":"vis.controls","target":"vis.data","value":2},
  {"source":"vis.controls","target":"animate","value":2},
  {"source":"vis.controls","target":"display","value":1},
  {"source":"vis.data","target":"vis.data","value":26},
  {"source":"vis.data","target":"util","value":17},
  {"source":"vis.data","target":"vis.events","value":4},
  {"source":"vis.data","target":"data","value":3},
  {"source":"vis.data","target":"animate","value":2},
  {"source":"vis.data","target":"util.math","value":2},
  {"source":"vis.data","target":"display","value":1},
  {"source":"vis.data","target":"vis.data.render","value":4},
  {"source":"vis.data.render","target":"vis.data","value":5},
  {"source":"vis.data.render","target":"vis.data.render","value":3},
  {"source":"vis.data.render","target":"util","value":3},
  {"source":"vis.data","target":"scale","value":9},
  {"source":"vis.data","target":"util.heap","value":2},
  {"source":"vis.events","target":"vis.data","value":6},
  {"source":"vis.events","target":"vis.events","value":1},
  {"source":"vis.events","target":"animate","value":1},
  {"source":"vis.legend","target":"animate","value":1},
  {"source":"vis.legend","target":"vis.data","value":1},
  {"source":"vis.legend","target":"util.palette","value":5},
  {"source":"vis.legend","target":"scale","value":4},
  {"source":"vis.legend","target":"vis.legend","value":4},
  {"source":"vis.legend","target":"display","value":6},
  {"source":"vis.legend","target":"util","value":6},
  {"source":"vis.operator.distortion","target":"vis.operator.distortion","value":2},
  {"source":"vis.operator.distortion","target":"animate","value":1},
  {"source":"vis.operator.distortion","target":"vis.data","value":2},
  {"source":"vis.operator.distortion","target":"vis.events","value":1},
  {"source":"vis.operator.distortion","target":"vis.axis","value":2},
  {"source":"vis.operator.distortion","target":"vis.operator.layout","value":1},
  {"source":"vis.operator.encoder","target":"animate","value":3},
  {"source":"vis.operator.encoder","target":"scale","value":3},
  {"source":"vis.operator.encoder","target":"vis.operator.encoder","value":4},
  {"source":"vis.operator.encoder","target":"util.palette","value":7},
  {"source":"vis.operator.encoder","target":"vis.data","value":8},
  {"source":"vis.operator.encoder","target":"vis.operator","value":2},
  {"source":"vis.operator.encoder","target":"util","value":3},
  {"source":"vis.operator.filter","target":"animate","value":3},
  {"source":"vis.operator.filter","target":"vis.data","value":10},
  {"source":"vis.operator.filter","target":"vis.operator","value":3},
  {"source":"vis.operator.filter","target":"util","value":1},
  {"source":"vis.operator","target":"animate","value":7},
  {"source":"vis.operator","target":"vis","value":3},
  {"source":"vis.operator","target":"vis.operator","value":11},
  {"source":"vis.operator.label","target":"animate","value":1},
  {"source":"vis.operator.label","target":"vis.data","value":6},
  {"source":"vis.operator.label","target":"display","value":3},
  {"source":"vis.operator.label","target":"vis.operator","value":1},
  {"source":"vis.operator.label","target":"util","value":5},
  {"source":"vis.operator.label","target":"vis.operator.label","value":2},
  {"source":"vis.operator.layout","target":"scale","value":6},
  {"source":"vis.operator.layout","target":"vis.data","value":34},
  {"source":"vis.operator.layout","target":"vis.axis","value":4},
  {"source":"vis.operator.layout","target":"util","value":20},
  {"source":"vis.operator.layout","target":"vis.operator.layout","value":14},
  {"source":"vis.operator.layout","target":"animate","value":6},
  {"source":"vis.operator.layout","target":"vis.operator","value":2},
  {"source":"vis.operator.layout","target":"vis.data.render","value":1},
  {"source":"vis.operator.layout","target":"physics","value":3},
  {"source":"vis.operator.layout","target":"vis","value":1},
  {"source":"vis.operator","target":"util","value":5},
  {"source":"vis.operator","target":"vis.data","value":1},
  {"source":"vis","target":"animate","value":3},
  {"source":"vis","target":"vis.operator","value":2},
  {"source":"vis","target":"vis.events","value":2},
  {"source":"vis","target":"vis.data","value":2},
  {"source":"vis","target":"vis.axis","value":2},
  {"source":"vis","target":"util","value":1},
  {"source":"vis","target":"vis.controls","value":1}
]

let data =
[{
  "source": "A",
  "target": "B",
  "value": 100
},
{
  "source": "B",
  "target": "C",
  "value": 50
},
{
  "source": "B",
  "target": "D",
  "value": 50
},
{
  "source": "D",
  "target": "E",
  "value": 25
},
{
  "source": "D",
  "target": "F",
  "value": 25
},
{
  "source": "C",
  "target": "E",
  "value": 25
},
{
  "source": "C",
  "target": "F",
  "value": 25
},
{
  "source": "E",
  "target": "G",
  "value": 10
},
{
  "source": "F",
  "target": "G",
  "value": 10
},
{
  "source": "G",
  "target": "A",
  "value": 10
},
{
  "source": "A",
  "target": "G",
  "value": 10
},
{
  "source": "E",
  "target": "G",
  "value": 10
},
{
  "source": "F",
  "target": "G",
  "value": 10
},
{
  "source": "F",
  "target": "B",
  "value": 10
},
{
  "source": "E",
  "target": "B",
  "value": 10
}
]

// names = data.map({source,target})
let newNames = [];
for (const {source, target} of data) {
  newNames.push(source);
  newNames.push(target);
  // try{
  //   matrix[index.get(source)][index.get(target)] += value;
  //   console.log("Matrix: ", matrix)
  // }catch{
}
newNames = new Set(newNames);
names = [...newNames];

    let chord = d3
      .chordDirected()
      .padAngle(10 / innerRadius)
      // .sortGrouops()
      // .sortSubgroups(d3.descending)
      .sortChords(d3.descending);
    // let matrix = {
    const index = new Map(names.map((name, i) => [name, i]));
      let matrix = Array.from(index, () => new Array(names.length).fill(0));
       for (const {source, target, value} of data) {
         try{
           matrix[index.get(source)][index.get(target)] += value;
           console.log("Matrix: ", matrix)
         }catch{
         }
       }
    //
    //   names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)
    //   let rename = name => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))

    useEffect(() => {

      const chords = chord(matrix);

      const root =
        d3.select(ref.current)
          .append("svg")
          .attr("viewBox", [-width / 2, -height / 2, width, height]);

      const group = root.append("g")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .selectAll("g")
        .data(chords.groups)
        .join("g");
      group.append("path")
       .attr("fill", d => color(names[d.index]))
       .attr("d", arc);

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




      // setInterval(() => {
        let delayed = root.append("g")
        .attr("fill-opacity", 0.75)
        .selectAll("path")
        .data(chords)

        // function printTime2(elapsed){
            // d3.select("#demo2").text(Math.round(elapsed) + "ms")
            delayed
            .join("path")
            .style("mix-blend-mode", "multiply")
            .attr("fill", d => color(names[d.target.index]))
            .attr("d", ribbon)
        // }

        // d3.interval(printTime2, 1000);
          // .append("title")
          // .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);
      // },1000)   ;


      console.log('RIBBON: ', ribbon);

    },[])

    return (
      <div style={{background: "lightGrey"}}>
        <svg ref={ref} width="800" height="800" />
        <div>
          <h3>data</h3>
          <div>
            {JSON.stringify(data)}
          </div>
        </div>
        <div>
          <h3>matrix</h3>
          <div>
            {JSON.stringify(matrix)}
          </div>
        </div>
      </div>);
  }

  const DevModule = ({name="...", state ="...state",msg="...msg"}) => {
    return (
      <div class="dev_module">
        <div>
          name: {name}
        </div>
        <div>
          state: {Object.entries(state).map(data => <div class="bullet">{data[0]}:{JSON.stringify(data[1])}</div>)}
        </div>
        <div>
          msg:
          <div class="bullet">
            from: {msg.from}
          </div>
          <div class="bullet">
            to: {msg.to}
          </div>
          <div class="bullet">
            payload: {msg.payload}
          </div>
        </div>
      </div>
    )
  }

  const ManyMarkets = () => {

    const ref = useRef();
    const [state,setState] = useState({});
    const [msg,setMsg] = useState("...");

    useState(() => {
      // setInterval(() => setMsg("..."), 3000);
    },[state,msg])

    setState({
      ...state,
      marginTop: 20, // top margin, in pixels
      marginRight: 30, // right margin, in pixels
      marginBottom: 30, // bottom margin, in pixels
      marginLeft: 40, // left margin, in pixels
      width: 500,
      height: 500
    })
    let x = (d) => d.date;
    let y = (d) => d.unemployment;
    let z = (d) => d.division;
    let yLabel = "↑ Unemployment (%)";
    let color = "steelblue";
    // let defined, xDomain,yDomain;
    // let xType = d3.scaleUtc; // type of x-scale
    // let xRange = [marginLeft, width - marginRight]; // [left, right]
    // let yType = d3.scaleLinear; // type of y-scale
    // let yRange = [height - marginBottom, marginTop]; // [bottom, top]
    // let yFormat;
    // let curve = d3.curveLinear; // method of interpolation between points
    // let zDomain;

    let data = [{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-01-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-02-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-03-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-04-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-05-01T00:00:00.000Z","unemployment":2.7},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-06-01T00:00:00.000Z","unemployment":2.7},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-07-01T00:00:00.000Z","unemployment":2.7},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-08-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-09-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-10-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-11-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2000-12-01T00:00:00.000Z","unemployment":2.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-01-01T00:00:00.000Z","unemployment":2.7},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-02-01T00:00:00.000Z","unemployment":2.7},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-03-01T00:00:00.000Z","unemployment":2.8},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-04-01T00:00:00.000Z","unemployment":2.8},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-05-01T00:00:00.000Z","unemployment":2.9},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-06-01T00:00:00.000Z","unemployment":3},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-07-01T00:00:00.000Z","unemployment":3.1},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-08-01T00:00:00.000Z","unemployment":3.3},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-09-01T00:00:00.000Z","unemployment":3.4},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-10-01T00:00:00.000Z","unemployment":3.5},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-11-01T00:00:00.000Z","unemployment":3.5},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2001-12-01T00:00:00.000Z","unemployment":3.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-01-01T00:00:00.000Z","unemployment":3.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-02-01T00:00:00.000Z","unemployment":3.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-03-01T00:00:00.000Z","unemployment":3.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-04-01T00:00:00.000Z","unemployment":3.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-05-01T00:00:00.000Z","unemployment":3.6},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-06-01T00:00:00.000Z","unemployment":3.5},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-07-01T00:00:00.000Z","unemployment":3.5},{"division":"Bethesda-Rockville-Frederick, MD Met Div","date":"2002-08-01T00:00:00.000Z","unemployment":3.4}];


    //  // Compute default domains, and unique the z-domain.
    // if (xDomain === undefined) xDomain = d3.extent(X);
    // if (yDomain === undefined) yDomain = [0, d3.max(Y, d => typeof d === "string" ? +d : d)];
    // if (zDomain === undefined) zDomain = Z;
    // zDomain = new Set(zDomain);

    useEffect(() => {
          d3.selectAll(".multiTokens").remove();

          const rootSvg = d3
              .select(ref.current)
              .attr("class","multiTokens")

          // Construct a line generator.

      //     .attr("width", width)
      //     .attr("height", height)
      //     .attr("viewBox", [0, 0, width, height])
      //     .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      //     .style("-webkit-tap-highlight-color", "transparent")
      //
      const extractData = (data) => {
        // Compute values.
        const X = d3.map(data, x);
        const Y = d3.map(data, y);
        const Z = [...new Set(d3.map(data, z))];
        // // const O = d3.map(data, d => d);
        // let defined;
        // if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
        // const D = d3.map(data, defined);
        // return [X,Y,Z,D];
        setState({...state,X:X,Y:Y,Z:Z});
      }
      // const [X,Y,Z,D,defined] =
      extractData(data);
      //
      const drawAxis = () => {

          const {width,height,marginLeft,marginTop,marginRight,marginBottom} = state;
          let xType = d3.scaleUtc; // type of x-scale
          let yType = d3.scaleLinear; // type of y-scale
          let xDomain = d3.extent(state.X);
          let yDomain = [0, d3.max(state.Y, d => typeof d === "string" ? +d : d)];
          let xRange = [marginLeft, width - marginRight]; // [left, right]
          let yRange = [height - marginBottom, marginTop]; // [bottom, top]




      //
      //   const xScale = xType(xDomain, xRange);
      //   const yScale = yType(yDomain, yRange);
      //
      //   const xAxis = d3
      //     .axisBottom(xScale)
      //     .ticks(width / 80)
      //     // .tickSizeOuter(0);
      //   const yAxis = d3
      //     .axisLeft(yScale)
      //     .ticks(height / 60, yFormat);
      //
      //   svg
      //     .append("g")
      //     .attr("id","x_axis")
      //     .attr("transform", `translate(0,${height - marginBottom})`)
      //     .call(xAxis);
      //   svg
      //     .append("g")
      //     .attr("id","y_axis")
      //     .attr("transform", `translate(${marginLeft},0)`)
      //     .call(yAxis);
      //
      //   return [xScale,yScale];
      //
      }

      // const  [xScale,yScale] = drawAxis();
      //
      // const line = d3.line()
      // .defined(i => D[i])
      // .curve(curve)
      // .x(i => xScale(X[i]))
      // .y(i => yScale(Y[i]));

    // .call(g => g.select(".domain").remove())
    // .call(g => g.append("text")
    //     .attr("x", -marginLeft)
    //     .attr("y", 10)
    //     .attr("fill", "currentColor")
    //     .attr("text-anchor", "start")
    //     .text(yLabel));

    //     const path = svg.append("g")
    // .attr("fill", "none")
    // .attr("stroke", typeof color === "string" ? color : null)
    // .attr("stroke-linecap", strokeLinecap)
    // .attr("stroke-linejoin", strokeLinejoin)
    // .attr("stroke-width", strokeWidth)
    // .attr("stroke-opacity", strokeOpacity)
  // .selectAll("path")
  // .data(d3.group(I, i => Z[i]))
  // .join("path")
  //   .style("mix-blend-mode", mixBlendMode)
  //   .attr("stroke", typeof color === "function" ? ([z]) => color(z) : null)
  //   .attr("d", ([, I]) => line(I));


    },[])
    return (
      <div class="module">
        hello
        <svg ref={ref}/>
        <DevModule name="Anatomy" state={state} msg={msg}/>
      </div>
    );
  }


  function SlopeChart(data, {
  // x = ([x]) => x, // given d in data, returns a (ordinal) column name
  // y = ([, y]) => y, // given d in data, returns a (quantitative) value
  // z = () => 1, // given d in data, returns a (categorical) series name
  defined, // for gaps in data
  curve = d3.curveLinear, // method of interpolation between points; try d3.curveBumpX
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 20, // bottom margin, in pixels
  marginLeft = 30, // left margin, in pixels
  inset, // additional margins
  insetTop = inset === undefined ? 20 : inset, // separation between y-axis and top line
  insetBottom = inset === undefined ? 0 : inset, // additional bottom margin
  labelPadding = 3, // padding from the start or end of the line to label, in pixels
  labelSeparation = 10, // separation in pixels for avoiding label collisions
  width = 1000, // outer width, in pixels
  height = 600, // outer height, in pixels
  xDomain, // array of x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  xPadding = 0.5, // padding for the x-scale (for first and last column)
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom - insetBottom, marginTop + insetTop], // [bottom, top]
  yFormat, // a format for the value in the label
  zDomain, // array of z-values
  color = "currentColor", // alias for stroke
  stroke = color, // stroke color of line
  strokeLinecap, // stroke line cap of line
  strokeLinejoin, // stroke line join of line
  strokeWidth, // stroke width of line
  strokeOpacity, // stroke opacity of line
  mixBlendMode, // blend mode of lines
  halo = "#fff", // color of label halo
  haloWidth = 4, // padding around the labels
} = {}) {

  const ref = useRef();
//
console.log("Slope data: ", data.data);
//   x: d => d.year,
// y: d => d.receipts,
// z: d => d.country,

  // Compute values.
  // const X = d3.map(data, x);
  const X = data.data.map(e => e.year)
  const Y = data.data.map(e => e.receipts)
  const Z = data.data.map(e => e.country)
  // const Y = d3.map(data, y);
  // const Z = d3.map(data, z);
  if (defined === undefined) defined = (d, i) => !isNaN(Y[i]);
  const D = d3.map(Object.values(data), defined);

  // Compute default domains, and unique the x- and z-domains.
  if (xDomain === undefined) xDomain = X;
  if (yDomain === undefined) yDomain = d3.extent(Y);
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the x- and z-domain.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // Construct scales, axes, and formats.
  const xScale = d3.scalePoint(xDomain, xRange).padding(xPadding);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisTop(xScale).tickSizeOuter(0);
  yFormat = yScale.tickFormat(100, yFormat);

  // Construct a line generator.
  const line = d3.line()
      // .defined(i => D[i])
      // .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

  useEffect(() => {

    var linkGen = d3.linkHorizontal();
    var singleLinkData = { source: [265,433.0108991825613], target: [735,484.50953678474116] } ;

      const svg = d3
          .select(ref.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10);

          svg
          .append("svg")
          .attr("class","link")
          // .select("#multiLink")
        .join("path")
        .data(singleLinkData)
        .join("path")
        .attr("d", linkGen)
        .attr("fill", "none")
        .attr("stroke", "black");

      svg.append("g")
          .attr("transform", `translate(0,${marginTop})`)
          .call(xAxis)
          .call(g => g.select(".domain").remove());

      svg.append("g")
          .attr("fill", "none")
          .attr("stroke", stroke)
          .attr("stroke-linecap", strokeLinecap)
          .attr("stroke-linejoin", strokeLinejoin)
          .attr("stroke-width", strokeWidth)
          .attr("stroke-opacity", strokeOpacity)
        .selectAll("path")
        .data(d3.group(I, i => Z[i]))
        .join("path")
          // .style("mix-blend-mode", mixBlendMode)
          .attr("d", ([, I]) => {
            console.log("I:", I)
            console.log("Line I:", line(I))
            return line(I);

          })

      const Ix = d3.group(I, i => X[i]);

      // Iterates over each column, applying the dodge heuristic on inline labels.
      for (const [i, x] of [...xDomain].entries()) {
    const text = svg.append("g")
        .attr("text-anchor", i === 0 ? "end"
            : i === xDomain.size - 1 ? "start"
            : "middle")
      .selectAll("text")
      .data(Ix.get(x))
      .join("text")
        .attr("x", xScale(x))
        .call(dodgeAttr, "y", i => yScale(Y[i]), labelSeparation)
        .attr("dy", "0.35em")
        .attr("dx", i === 0 ? -1
            : i === xDomain.size - 1 ? 1
            : 0 * labelPadding)
        .text(i === 0 ? i => `${Z[i]} ${yFormat(Y[i])}`
            : i === xDomain.size - 1 ? i => `${yFormat(Y[i])} ${Z[i]}`
            : i => yFormat(Y[i]))
        .call(text => text.clone(true))
        .attr("fill", "none")
        .attr("stroke", halo)
        .attr("stroke-width", haloWidth);
  }
},[data])

  // Sets the specified named attribution on the given selection to the given values,
  // after applying the dodge heuristic to those values to ensure separation. Note
  // that this assumes the selection is not nested (only a single group).
  function dodgeAttr(selection, name, value, separation) {
    const V = dodge(selection.data().map(value), separation);
    selection.attr(name, (_, i) => V[i]);
  }

  // Given an array of positions V, offsets positions to ensure the given separation.
  function dodge(V, separation, maxiter = 10, maxerror = 1e-1) {
    const n = V.length;
    if (!V.every(isFinite)) throw new Error("invalid position");
    if (!(n > 1)) return V;
    let I = d3.range(V.length);
    for (let iter = 0; iter < maxiter; ++iter) {
      I.sort((i, j) => d3.ascending(V[i], V[j]));
      let error = 0;
      for (let i = 1; i < n; ++i) {
        let delta = V[I[i]] - V[I[i - 1]];
        if (delta < separation) {
          delta = (separation - delta) / 2;
          error = Math.max(error, delta);
          V[I[i - 1]] -= delta;
          V[I[i]] += delta;
        }
      }
      if (error < maxerror) break;
    }
    return V;
  }

  // return svg.node();
  return (
    <div ref={ref} style={{background: "lightGrey"}} class="slope">
    </div>);
}

let receipts = [
  {"year":1970,"country":"Sweden","receipts":46.9},
  {"year":1970,"country":"Netherlands","receipts":44},
  {"year":1970,"country":"Norway","receipts":43.5},
  {"year":1970,"country":"Britain","receipts":40.7},
  {"year":1970,"country":"France","receipts":39},
  {"year":1970,"country":"Germany","receipts":37.5},
  {"year":1970,"country":"Belgium","receipts":35.2},
  {"year":1970,"country":"Canada","receipts":35.2},
  {"year":1970,"country":"Finland","receipts":34.9},
  {"year":1970,"country":"Italy","receipts":30.4},
  {"year":1970,"country":"United States","receipts":30.3},
  {"year":1970,"country":"Greece","receipts":26.8},
  {"year":1970,"country":"Switzerland","receipts":26.5},
  {"year":1970,"country":"Spain","receipts":22.5},
  {"year":1970,"country":"Japan","receipts":20.7},
  {"year":1979,"country":"Sweden","receipts":57.4},
  {"year":1979,"country":"Netherlands","receipts":55.8},
  {"year":1979,"country":"Norway","receipts":52.2},
  {"year":1979,"country":"Britain","receipts":39},
  {"year":1979,"country":"France","receipts":43.4},
  {"year":1979,"country":"Germany","receipts":42.9},
  {"year":1979,"country":"Belgium","receipts":43.2},
  {"year":1979,"country":"Canada","receipts":35.8},
  {"year":1979,"country":"Finland","receipts":38.2},
  {"year":1979,"country":"Italy","receipts":35.7},
  {"year":1979,"country":"United States","receipts":32.5},
  {"year":1979,"country":"Greece","receipts":30.6},
  {"year":1979,"country":"Switzerland","receipts":33.2},
  {"year":1979,"country":"Spain","receipts":27.1},
  {"year":1979,"country":"Japan","receipts":26.6}
]

  return (
    <>
      <SimpleArray/>
      <SimpleArrayAsDots/>
      <SimpleArrayAsDotsSized/>
      <SimpleArrayAsDotsSizedHeight/>
      <SimpleArrayAsDotsSizedHeightBars/>
      <BarsViaPath/>
      <SimpleAngLine/>
      <SimpleCurveLine/>
      <SimpleDoubleCurveLine/>
      <SimpleDonut/>
      <SomeFancy/>
      <XAxis/>
      <YAxis/>
      <XYCurve/>
      <YDetailed/>
      <Area/>
      <FloatingArea/>
      <StackedArea/>
      <StackedAreaWithAxis/>
      <LinksLinear/>
      <LinksLinearwWeighted/>
      <SimpleRibbon/>
      <SomeWeightedFancyRibbon/>
      <SomeWeightedFancyRibbonDexguruData/>
      <SlopeChart data={receipts}/>
      {
        // <ManyMarkets/>

      }
      <TimeSeriesRibbon/>
    </>
  );
}

export default Rigid;
