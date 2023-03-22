import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const TestBubble = () => {


    const [xyforce,setXYforce] = useState(1)

    var width = 800, height = 300
    const ref = useRef()


    let nodes = [
      	{id: 'A'},
      	{id: 'B'},
      	{id: 'C'},
      	{id: 'D'},
      	{id: 'E'},
      	{id: 'F'},
      	{id: 'G'},
      	{id: 'H'},
        {id: 'I'},
        {id: 'J'},
        {id: 'K'},
        {id: 'L'},
        {id: 'M'}
    ]

    let links = [
      	{source: "A", target: "B"},
      	{source: "A", target: "C"},
        {source: "A", target: "D"},
        {source: "A", target: "E"},
        {source: "A", target: "F"},
        {source: "A", target: "G"},
        {source: "B", target: "E"},
        {source: "B", target: "H"},
        {source: "B", target: "I"},
        {source: "B", target: "J"},
        {source: "J", target: "K"},
        {source: "J", target: "L"},
        {source: "J", target: "M"},
    ]

    // const profiles = [
    //     {name:"A",target:["B","C","D"]},
    //     {name:'B',target:[]},
    //     {name:'C',target:[]},
    //     {name:"D",target:["E","F","G"]},
    //     {name:'E'},
    //     {name:'F'},
    //     {name:'G'},
    //     {name:'H'},
    //     {name:'I'},
    //     {name:'G'},
    // ]



    // nodes = profiles.map(profile => ({name:profile.name}))
    // // let newlinks = profiles.map(profile => ({
    // //   source:profile.name,
    // //   target:profiles.findIndex(link => link.name == profile.target)
    // // }))
    // // (() => {
    //   // console.log("LINKS",
    // links = profiles.map(profile => {
    //       return profile.target?.map(p => ({source:profile.name, target:p}))
    //     })
    //     .filter(e => e !== undefined)
    //     .filter(e => e.length > 0)
    //     .flatMap(e => e)
    //     .map(e => (
    //       {
    //         source:profiles.findIndex(p => e.source == p.name),
    //         target:profiles.findIndex(p => e.target == p.name)
    //       }))

      // )
    // })()
    // console.log("NEW LINKS: ", newlinks)

    // Compute values.
    const N = d3.map(nodes, (d) => d.id)
    const LS = d3.map(links, (d) => d.source)
    const LT = d3.map(links, (d) => d.target)

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
    links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({index: i}) => N[i])
    // const forceLink = d3.forceLink(links).charge(-500)
    //     .linkDistance(100);
			  // .linkDistance(100);

    useEffect(() => {

        d3.forceSimulation(nodes)
          .force("x", d3.forceX(width / 2).strength(xyforce))
          .force("y", d3.forceY(height / 2).strength(xyforce))
          .force("link", forceLink)
          .force("charge1", forceNode)
          // .force("charge", d3.forceManyBody().strength((d, i) => i ? 1 : -width * 2 / 3))
          .force("charge", d3.forceManyBody().strength((d, i) => i ? 1 : -width * 2 / 3))
          .force('enter', d3.forceCenter(width / 2, height / 2).strength(0.1))
          .force("x", d3.forceX())
          .force("y", d3.forceY())
          // .force("collide", d3.forceCollide().radius(d => d.r + 1).iterations(3))
          // .force("collide", d3.forceCollide().radius(30).iterations(10))


          // .on("tick", ticked);
            // .force('charge', d3.forceManyBody().strength(-100))
            // .force('link', d3.forceLink(links).id(({index: i}) => {
            //     console.log("LINKS after force:",links)
            //     console.log("N[i]",nodes[i])
            //
            //     return nodes[i]
            //   }).strength(1))
            .on('tick', (d) => {

                // clear svg nodes -----------------------------------------------

                d3.selectAll("svg.testBubble > *").remove();

                // add circle node -----------------------------------------------

                d3.select(ref.current)
                    .selectAll('.circleNode')
                    .data(nodes)
                    .join('circle')
                    .attr("class","dot")
                    .attr('r', 5)
                    .attr("fill","grey")
                    .attr('cx', (d) => d.x)
                    .attr('cy', (d) => d.y)
                    .call((d) => {
                        console.log("PREV NODE: ", d)
                        console.log("PREV NODE X: ", d.x)
                    })

                // setup text title ----------------------------------------------

                d3.select(ref.current)
                    .selectAll('.circleNodeText')
                    .data(nodes)
                    .join('text')
                    .attr("fill","grey")
                    .attr('x', (d) => d.x - 5)
                    .attr('y', (d) => d.y - 7)
                    .attr("font-size","10px")
                    .text((d) => d.name)
                    .style("display","flex")
                    .attr("width","10px")

                // add links -----------------------------------------------------

                d3.select(ref.current)
              		.selectAll('link')
              		.data(links)
              		.join('line')
                  .attr("stroke","grey")
              		.attr('x1', (d) => d.source.x)
              		.attr('y1', (d) => d.source.y)
              		.attr('x2', (d) => d.target.x)
              		.attr('y2', (d) => d.target.y);

        });
    },[xyforce])

    return  (
        <div>
            <input type="range" min="0" max="10" step="0.1" value={xyforce} onChange={(e) => setXYforce(e.target.value)}/>
            <svg ref={ref} class="testBubble" width="100%" height="300" transform="translate(0,0)"/>
        </div>
    )
}

export default TestBubble
