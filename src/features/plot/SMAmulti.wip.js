import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

const SMAmulti = ({inputData,tx,ty, name,color, smaOneIn, smaTwoIn}) => {

  console.log("M: (SMAmulti) input data: ", inputData)

  const width = window.innerWidth
  const height = (1/5)*window.innerHeight
  const ref = useRef()
  let [data,setData] = useState(inputData)
  let [pointId,setPointId] = useState(0)

  const EDGES = inputData.filter(e => e.group == "dots")
  inputData = inputData.filter(e => e.group != "dots")
  // console.log("M: (SMAmulti) processed data: ", inputData.filter(e => e.group == "sma4").slice(-10))

  // Visualize ----------------------------------------------------------------------

  useEffect(() => {

    // Compute data ------------------------------------------------------------

    const X = inputData.map((e) => e.date * 10)
    const Y = inputData.map((e) => e.value)
    const Z = inputData.map((e) => e.group)
    const Yo = inputData.filter(e => e.group == "balance").map((e) => e.start)
    const Yc = inputData.filter(e => e.group == "balance").map((e) => e.value)
    console.log("BALANCE: ", inputData.filter(e => e.group == "balance"))
    console.log("BALANCE Yo: ", inputData.filter(e => e.group == "balance"))
    console.log("BALANCE: ", inputData.filter(e => e.group == "balance"))

    //Compute domains ----------------------------------------------------------
    const xDomain = d3.extent(X);
    const yDomain = [d3.min(Y) - 100, d3.max(Y) + 100]; //const yDomain = [0, d3.max(Y)];
    const zDomain = new d3.InternSet(Z);

    // Omit any data not present in the z-domain -------------------------------
    const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

    // Setup scale types -------------------------------------------------------
    const xType = d3.scaleLinear
    const yType = d3.scaleLinear

    // Setup ranges ------------------------------------------------------------
    const marginTop = 20 // the top margin, in pixels
    const marginRight = 40 // the right margin, in pixels
    const marginBottom = 30 // the bottom margin, in pixels
    const marginLeft = 40 // the left margin, in pixels
    const xRange = [marginLeft, width - marginRight]
    const yRange = [height - marginBottom, marginTop]

    // Construct scales and axes -----------------------------------------------
    const xScale = xType(xDomain, xRange);
    const xBandScale = d3.scaleBand(xDomain, xRange).padding(0.2);
    const yScale = yType(yDomain, yRange);
    // const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
    // const yAxis = d3.axisLeft(yScale).ticks(height / 60);

    // Construct a line generator ----------------------------------------------

    const line = d3.line()
    .curve(data.filter(e => e.group == "balance").length > 0 ? d3.curveStep : d3.curveCardinal)
    // .curve(d3.curveStep)
    .x(i => xScale(X[i]))
    .y(i => yScale(Y[i]));

    // Compute titles ----------------------------------------------------------

    const T = d3.map(data, (d) => JSON.stringify(d));
    const TT = d3.map(data, (d) => d);

    // clear svg nodes ---------------------------------------------------------

    // d3.selectAll(".SMAmulti" + name + " > *").remove()
    d3.selectAll("." + name + " > *").remove();

    // draw --------------------------------------------------------------------

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("class","SMAmulti" + name )
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "SMA" + name)
      .on("pointerenter", pointerentered)
      .on("pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("click", pointerclick)
      .on("touchstart", event => event.preventDefault())

    const tooltipDiv = d3
      .select(ref.current)
      .append("span")
      .attr("class","tooltip")

      if(name != "multiSMAchartBalances"){

    const path = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-opacity", 0.75)
      .selectAll("path")
      .data(d3.group(I, i => Z[i]))
      .join("path")
        .attr("stroke", (d,i) => {
          // console.log("Z data: ", d[0], i)
          switch(d[0]){
            case "rawData":
              return "grey"
            case "sma4":
              return "green"
            case "sma8":
              return "blue"
            case "cumsum":
              return "streetblue"
            case "dirs":
            case "dirZero":
              return "saramacgreen"
            case "dots":
              return "grey"
            case "profit":
              return "green"
            default:
              return "red"
          }
        })
        .attr("opacity", (d,i) => {
          // console.log("Z data: ", d[0], i)
          switch(d[0]){
            case "dots":
              return 0.2
            case "rawData":
              return 0.5
            default:
              return 1
          }
        })
        .attr("d", ([, I]) => line(I))

        // console.log("M: (dot drawing) Y: ", Y)

        svg.append("g")
        .selectAll("circle")
        .data(inputData)
        .join("circle")
        .attr("r", 0.5)
        .attr("cx", (d,i) => xScale(i * 10))
        .attr("cy", (d) => yScale(200))
        .attr("fill",(d) => {
          if(d.value < 0 ){
            return "red"
          }else if(d.value > 0){
            return "green"
          }
        })
        .attr("opacity",(d) => {
          if(d.value !== 0 ){
            return 0.5
          }else{
            return 0
          }
        })



        const priceDots = svg.append("g")
          // .attr("fill", "none")
          // .attr("stroke", "steelblue")
          // .attr("stroke-opacity", 0.75)
          .selectAll("priceDot")
          // .data(d3.group(I, i => Z[i]))
          // .data(data.filter(e => e.group == "rawData"))
          .data(inputData.filter(e => e.group == "rawData"))
          .join("circle")
          .attr("fill",
          // "grey"
          (d,i) => {
            // console.log("M: (dot drawing) Z data: ", d, i)
            // let signs = inputData.filter(e => e.group == "dots")
            let signs = EDGES
            // console.log("M: (dot drawing) signs data: ", signs)
            if(signs.length > 0){
              if(signs[i].value < 0){
                return "red"
              }else if(signs[i].value > 0){
                return "green"
              }else{
                  return "grey"
              }
            }else{
              return "grey"
            }
          }
          )
          .attr("r", 1)
          .attr("cx", (d) => xScale(d.date * 10))
          .attr("cy", (d) => yScale(d.value))

        }
          const OPENS = inputData.filter(e => e.group == "balance").map(e => e.start)
          // try{
          // if (OPENS.length > 0){
            console.log("OPENS: ", OPENS)
            console.log("OPENS length: ", OPENS.length)
            console.log("OPENS extent: ", d3.range(OPENS))

        //   const priceBars = svg.append("g")
        //     .attr("class","priceBars")
        //     .selectAll("priceBar")
        //     .data(OPENS)
        //     // .attr("stroke-opacity", 0.75)
        //     // .data(d3.group(I, i => Z[i]))
        //     // .data(data.filter(e => e.group == "rawData"))
        //     // .data(inputData.filter(e => e.group == "rawData"))
        //     .join("line")
        //     .attr("fill","red")
        //     .attr("x1",(d,i) => xScale(i*10))
        //     .attr("x2",(d,i) => xScale(i*10))
        //     .attr("y1",(d,i) => {
        //     //   console.log("OPEN[i]: for i: ", i, OPENS[i])
        //       return yScale(d)}
        //     )
        //     .attr("y2",(d) => yScale(d + 10))
        //     .attr("stroke-width",5)
        //     .attr("stroke", "steelblue")
        //   // }catch{
        //   //
        //   // }
        // // }

            // "grey"
            // (d,i) => {
            //   // console.log("M: (dot drawing) Z data: ", d, i)
            //   // let signs = inputData.filter(e => e.group == "dots")
            //   let signs = EDGES
            //   // console.log("M: (dot drawing) signs data: ", signs)
            //   if(signs.length > 0){
            //     if(signs[i].value < 0){
            //       return "red"
            //     }else if(signs[i].value > 0){
            //       return "green"
            //     }else{
            //         return "grey"
            //     }
            //   }else{
            //     return "grey"
            //   }
            // }
            // )
            // .attr("r", 1)
            // .attr("cx", (d) => xScale(d.date * 10))
            // .attr("cy", (d) => yScale(d.value))

          if(name == "multiSMAchartBalances"){

            // svg.append("g")
            // .selectAll("priceBar2")
            // .data(inputData.filter(e => e.group == "balance"))
            // .join("line")
            // .attr("stroke", "grey")
            // .attr("stroke-width", 0.01)
            // .attr("x1", xScale(0))
            // .attr("x2", window.innerWidth)
            // .attr("y1", yScale(inputData.filter(e => e.group == "balance")[0].value))
            // .attr("y2", yScale(inputData.filter(e => e.group == "balance")[0].value))
            // console.log("BALANCES: ", inputData.filter(e => e.group == "balance"))

            // const path = svg.append("g")
            //   .attr("fill", "none")
            //   .attr("stroke", "steelblue")
            //   .attr("stroke-opacity", 0.75)
            //   .selectAll("path")
            //   .data(d3.group(I, i => Z[i]))
            //   .join("path")
            //     .attr("stroke", (d,i) => {
            //       // console.log("Z data: ", d[0], i)
            //       switch(d[0]){
            //         case "rawData":
            //           return "grey"
            //         case "sma4":
            //           return "green"
            //         case "sma8":
            //           return "blue"
            //         case "cumsum":
            //           return "streetblue"
            //         case "dirs":
            //         case "dirZero":
            //           return "saramacgreen"
            //         case "dots":
            //           return "grey"
            //         case "profit":
            //           return "green"
            //         default:
            //           return "red"
            //       }
            //     })
            //     .attr("opacity", (d,i) => {
            //       // console.log("Z data: ", d[0], i)
            //       switch(d[0]){
            //         case "dots":
            //           return 0.2
            //         case "rawData":
            //           return 0.5
            //         default:
            //           return 1
            //       }
            //     })
            //     .attr("d", ([, I]) => line(I))


            const priceBars = svg.append("g")
              // .attr("fill", "none")
              // .attr("stroke", "steelblue")
              // .attr("stroke-opacity", 0.75)
              .attr("class","priceBars")
              .selectAll("priceBar")
              // .data(d3.group(I, i => Z[i]))
              // .data(data.filter(e => e.group == "rawData"))
              // .data(inputData.filter(e => e.group == "rawData"))
              .data(inputData.filter(e => e.group == "balance"))
              .join("line")
              // .join("line")
              .attr("stroke",
              // "grey"
              (d,i) => {
                let signs = EDGES
                if(signs.length > 0){
                  if(signs[i].value < 0){
                    return "red"
                  }else if(signs[i].value > 0){
                    return "green"
                  }else{
                      return "grey"
                  }
                }else{
                  return "grey"
                }
              }
              )
              // .attr("stroke", "grey")
              .attr("stroke-width", 1)
              .attr("x1", (d,i) => xScale(i * 10))
              .attr("x2", (d,i) => xScale(i * 10))
              .attr("y1", (d) => {
                if(d.start != 0){
                  console.log("BAR d value:", d)
                  console.log("BAR d value scaled:", yScale(d.start))
                }
                return yScale(d.start)
              })
              .attr("y2", (d) => {
                if(d.start != 0){
                  console.log("BAR d value:", d)
                  console.log("BAR d value scaled:", yScale(d.value))
                }
                return yScale(d.value)
              })
              console.log("BALANCES: ", inputData.filter(e => e.group == "balance"))

        }

        // add in5dex line
        const vs = svg
          .append("path")
          .attr("fill","none")
          .attr("stroke","grey")
          .attr("opacity",0.5)

        // balance BARS

        let colors = ["#4daf4a", "#999999", "#e41a1c"] // [up, no change, down]
        svg.append("line")
        .attr("y1", i => yScale(Yo[i]))
        .attr("y2", i => yScale(Yc[i]))
        .attr("stroke-width", xBandScale.bandwidth())
        .attr("stroke", i => colors[1 + Math.sign(Yo[i] - Yc[i])]);

        // const balanceBar = svg.append("g")
        // .selectAll("balanceBar")
        // .data(inputData.filter(e => e.group == "balance"))
        // // .data(balanceBarData)
        // .join("rect")
        // .attr("class","balanceBar")
        // .attr("fill",(d) => {
        //   console.log("BALANCE data: ", d)
        //   if(d.value > 0){
        //     return "green"
        //   }else if(d.value < 0){
        //     return "red"
        //   }else{
        //     return "grey"
        //   }
        // })
        // .attr("opacity",(d) => {
        //   console.log("BALANCE data: ", d)
        //   if(d.value == 0){
        //     return 0
        //   }else{
        //     return 0.7
        //   }
        // })
        // // .attr("y", (d) => yScale(d.value))
        // .attr("y", (d) => yScale(d.start))
        // .attr("x", (d,i) => xScale(i*10))
        // .attr("width",2)
        // .attr("height",(d) => yScale(d.value))



        // add title

        const dot = svg.append("g")
        .attr("display", "none");

        dot.append("circle")
            .attr("r", 2.5)
            .attr("fill","white")
            .attr("opacity",0.5)

        dot.append("text")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("y", -8);

        let ii
        function pointermoved(event,d) {
            const [xm, ym] = d3.pointer(event);
            const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym))
            ii = i// closest point
            vs.attr("d", `M${xScale(X[i])},0 v ${height + yScale(300)}`);
            // path.style("stroke", ([z]) => Z[i] === z ? null : "#ddd").filter(([z]) => Z[i] === z).raise();
            // if (T) dot.select("text").text(T[i])
            dot.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`)
            dot.select("text").text(T[i]).attr("fill","white").attr("opacity",0.5)
            // priceBars.select("text").text(T[i]).attr("fill","white").attr("opacity",0.5)
            // dot.select("p").html(`<strong>${JSON.stringify(inputData[i])}</strong>`)


            // tooltipDiv
            // .selectAll("p")
            // // .data(Object.entries({"a":"aa","b":"bb"}))
            // // .data(["a","b","c"
            // .data(Object.entries(data[i]))
            // .join("p")
            // // .filter(([key, value]) => value !== null && value !== undefined)
            // .html(
            //   ([key, value]) =>
            //
            //     // `<strong>${key} : ${JSON.parse(T[i]).date}</strong>`
            //     // `<strong>${key} : ${value}</strong>`
            //     `${key} : ${value}`
            // )
            // tooltipDiv
            // tooltipDiv.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`)

            const MOUSE_POS_OFFSET = 0
            tooltipDiv
            .style(
              "top",
              yScale(ym) < height / 2 ? `${yScale(ym) + MOUSE_POS_OFFSET}px` : "initial"
              // `-${yScale(ym)}px`

            )
            .style(
              "bottom",
              yScale(ym) > height / 2
                ? `${height - yScale(ym) + MOUSE_POS_OFFSET}px`
                : "initial"
              // `-${yScale(ym)}px`
            )
            .style(
              "right",
              xm > width / 2
                ? `${width - xm + MOUSE_POS_OFFSET}px`
                : "initial"
                // `-${xScale(xm)}px`
            )
            .style(
              "left",
              xm < width / 2 ? `${xm + MOUSE_POS_OFFSET}px` : "initial"
              // `${xScale(xm)}px`
            );
            // setPointId(i)

        }

        function pointerentered() {
          // path.style("mix-blend-mode", null).style("stroke", "#ddd");
          dot.attr("display", null)
          vs.attr("display", null)
          tooltipDiv.attr("display", null)

        }

        function pointerclick(e,i){
          // console.log("M: (pointerclick) input i:", ii)
          // console.log("M: (pointerclick) mod i II mod:", ii%60)
          // console.log("II:", (data.length/[...zDomain].length))
          // console.log("II data length: ", [...zDomain].length)
          setPointId(ii%60)
        }

        function pointerleft() {
          // path.style("mix-blend-mode", mixBlendMode).style("stroke", null);
          dot.attr("display", "none")
          vs.attr("display", "none")
          tooltipDiv.attr("display", "none")
        }

  },[inputData,data])

  // <div>{data.filter(e => e.date == (pointId%(data.length)))}</div>
  return (
      <>
        <div class="module centerRow" style={{"fontSize":"10px"}}>
        {
          data.filter(e => e.date == (pointId%(data.length)))
          .map(e => <div>{e.group} . <strong>{e.value}</strong> . {e.date}</div>)
        }
        </div>
        <div ref={ref} class={name}/>
        {
          // <>
          //   <div>{JSON.stringify(inputData.slice(-5))}</div>
          //   <div>{JSON.stringify(data.slice(-5))}</div>
          //   <div>{JSON.stringify(data.filter(e => e.group == "rawData").slice(-5))}</div>
          //   <div>{JSON.stringify(data.filter(e => e.group == "sma4").slice(-5))}</div>
          //   <div>{JSON.stringify(data.filter(e => e.group == "sma8").slice(-5))}</div>
          //   <div>{JSON.stringify(data.filter(e => e.group == "dirs").slice(-5))}</div>
          //   <div>{JSON.stringify(data.filter(e => e.group == "dots").slice(-5))}</div>
          // </>
        }
      </>
  )
}

export default SMAmulti
