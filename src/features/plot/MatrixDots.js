import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const MatrixDots = () => {

  const ref  = useRef()
  const data = [10,20,30,40,50,60]


  const getRoot = () => {
    const root = d3
    .select(ref.current)
    .append("svg")
    .attr("class","matrixDots")
    .attr("width", 600)
    .attr("height", 300)
    .attr("viewBox", [0, 0, 300, 300])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("transform","translate(50,50)")
    return root
  }

  const clearTree = () => {
    d3.selectAll("svg.matrixDots > *").remove();
  }

  const addCircle = (node,x,y) => {
    node.append("circle")
    .attr("cx",x)
    .attr("cy",y)
    .attr("r",5)
    .attr("fill","grey")
  }

  const addLine = (root,data) => {
    // return
      root
      .selectAll(".someClass")
      .data(data)
      .join('circle')
      .attr("fill","grey")
      .attr('r', 5)
      .attr('cx', (_,i) => i*10)
      .attr('cy', 50)
  }

  const add = (child,root) => {
    root.append(child)
  }

  useEffect(() => {

    clearTree()
    const root = getRoot()

    // addLine(root,data)
    // add(line(root,data),root)

    const pool = [
      {
          id: "a1t1",
          x:0,
          y:0,
          link:{
              source:[0,0],
              target:[30,30],
              transfer:3,
          },
          balance:6
      },
      {
        id: "a1t2",
        x:30,
        y:0,
        balance:6-3
      },
      {id: "a1t3",x:60,y:0,
        balance:3
      },
      {id: "a1t4",x:90,y:0},
      {id: "b1t1",x:0,y:30},
      {id: "b1t2",x:30,y:30,
        link:{
            source:[30,30],
            target:[60,60],
            transfer:2

        },
        balance:3
      },
      {id: "b1t3",x:60,y:30,
        balance:1
      },
      {id: "b1t4",x:90,y:30,
        balance:2
      },
      {id: "c1t1",x:0,y:60},
      {id: "c1t2",x:30,y:60},
      {id: "c1t3",x:60,y:60,
        link:{
            source:[60,60],
            target:[90,30],
            transfer:1
        },
        balance:2
      },
      {id: "c1t4",x:90,y:60,
        balance:1
      },
      {id: "d1t1",x:0,y:90},
      {id: "d1t2",x:30,y:90},
      {id: "d1t3",x:60,y:90},
      {id: "d1t4",x:90,y:90},
    ]

    const distance = 30

    var linkGen = d3.linkHorizontal();

    let matrixNodeRoot = root
    .append("g")
    .attr("transform","translate(15,15)")
    .attr("class","matrixNodeRoot")

    matrixNodeRoot
    .selectAll(".someClass")
    .data(pool)
    .join('circle')
    .attr("fill","grey")
    .attr('r', (d) => {
      return d.balance
      ? d.balance
      : 0.5
    })
    .attr('cx', (d) => d.x )
    .attr('cy', (d) => d.y)
    root
    .selectAll(".someClass")
    .data(pool)
    .join('text')
    .attr("transform","translate(6,8)")
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr("fill","grey")
    .attr("font-size","10px")
    .text(d => d.id)
    // .attr('r', 5)

    const linkData = pool.map(record => record.link).filter(record => record != undefined)
    console.log("LINK DATA: ", linkData)
    // d3.select("#multiLink")
    matrixNodeRoot
    .selectAll("path")
    .data(linkData)
    .join("path")
    .attr("d", linkGen)
    .attr("fill", "none")
    .attr("stroke", "grey");

    // data.forEach((tokenData,index) => {
    //   data.forEach(index =>
    //     addCircle(root,index,index*10)
    //   )
    // })
    // data.forEach((tokenData,index) => addCircle(root,10,index*10))
    // data.forEach((tokenData,index) => addCircle(root,20,index*10))
    // data.forEach((tokenData,index) => addCircle(root,30,index*10))
    // data.forEach((tokenData,index) => addCircle(root,40,index*10))

    // addCircle(root)

    // const left = svg
    // .append("g")
    // .attr("class","left")
    // svg
    // .select(".left")
    // .append("g")
    // .attr("class","link")
    // .append("circle")
    // .attr("cx",10)
    // .attr("cy",10)
    // .attr("r",5)
    // .attr("fill","grey")
    //
    // left
    // .append("g")
    // .attr("class","node")
    // // .data(data)
    // .append("circle")
    // .attr("cx", d => d)
    // .attr("cy", d => d)
    // .attr("r", 10)
    // .attr("fill","grey")

  },[data])

  return (
    <svg ref={ref} width="100%" height="180" transform="translate(0,0)" class="matrixDots"/>
  )
}

export default MatrixDots
