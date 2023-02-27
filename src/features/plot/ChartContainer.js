import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"

import { useGetTokenCandlesQuery } from '../../services/pokemon'

const setDateToSec = (date) => +date.toString().slice(0,10);
const setDateToHum = (date) => new Date(date);
const setDateHourShift = (date, shift = 1) => new Date(date - shift*3600*1000);
const getTime = (date) => date.split("T")[1].split(".")[0];


const ChartDataProviderDecorator = (Component) => (apiSlice) => {
    return <Component apiSlice={apiSlice}/>
}

const ChartUIProviderDecorator = (UIComponent, ChildComponent) => {

    const ThemeContext = createContext(null);

    const [theme, setTheme] = useState('light');

  const [name, setName] = useState("initialValue");

    console.log("render");
    console.log("state: ", name);

    const handleChange = (event) => {
      const value = event.target.value;
      setName(value);
    };

  return (
      <ThemeContext.Provider>
          {
            // <Form />
          }

          <div style={{background:"white"}}>
              <input
                  type="text"
                  value={name}
                  onChange={handleChange}
                  />
          </div>
          <div>
            <h2>Form</h2>
            <pre>Type in the input...</pre>
            <form>
              <input type="text" onChange={handleChange} value={name} />
            </form>
            <pre>state: {name}</pre>
          </div>
      </ThemeContext.Provider>
    )

}



const CandleChartContainer = ({apiSlice, token}) => {

  const [chartData, setChartData] = useState([{}]);

const {data,isFetching} = apiSlice(token)
let items = data

useEffect(() => {
  if(data){
    const {t,o,c,h,l} = items;
    let acc = [];
    t.map((e,i) => {
      const item = {"Date":new Date(e*1000),"Open":o[i],"High":h[i],"Low":l[i],"Close":c[i]};
      acc = [...acc, item];
    })
    setChartData(acc);
  }
},[items]);

const ref = useRef();
useEffect(() => {

const mapping = {
  date: d => d.Date,
  open: d => d.Open,
  close: d => d.Close,
  high: d => d.High,
  low: d => d.Low,
}

  console.log("CHART DATA: ", chartData)

  let {date,open,close,high,low} = mapping;

  let
  title, // given d in data, returns the title text
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 1240, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values (defaults to every weekday)
  xRange = [marginLeft, width - marginRight], // [left, right]
  xPadding = 0.2,
  xTicks, // array of x-values to label (defaults to every other Monday)
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  xFormat = "%b %-d", // a format specifier for the date on the x-axis
  yFormat = "~f", // a format specifier for the value on the y-axis
  yLabel, // a label for the y-axis
  stroke = "currentColor", // stroke color for the daily rule
  strokeLinecap = "round", // stroke line cap for the rules
  colors = ["#4daf4a", "#999999", "#e41a1c"];

  console.log("INITIAL DATA: ", chartData);

  const X = d3.map(chartData, date);
  console.log("X: ", X);
  const Yo = d3.map(chartData, open);
  console.log("Yo: ", Yo);
  const Yc = d3.map(chartData, close);
  console.log("Yc: ", Yc);
  const Yh = d3.map(chartData, high);
  console.log("Yh: ", Yh);
  const Yl = d3.map(chartData, low);
  console.log("Yl: ", Yl);
  const I = d3.range(X.length);
  console.log("I: ", I);

  const weeks = (start, stop, stride) => {
    console.log("START, STOP, STRIDE ", start, stop, stride)
    // let out = d3.utcMonday.every(stride).range(start, +stop + 1)
    let out = d3.utcHour.every(stride).range(start, +stop + 1)
    console.log("weeks OUT: ", out)
    return out
  };
  console.log("weeks: ", weeks);
  const weekdays = (start, stop) => {
      console.log("START: ", start);
      console.log("STOP: ", stop);
      console.log("d3.utcDays(start, stop): ", d3.utcMinute.range(start, stop));
      return d3.utcMinute.range(start, stop);
    };

  console.log("weekdays: ", weekdays);

  // Compute default domains and ticks.
  if (xDomain === undefined) xDomain = weekdays(d3.min(X), d3.max(X));
  console.log("xDomain: ", xDomain);
  if (yDomain === undefined) yDomain = [d3.min(Yl), d3.max(Yh)];
  console.log("yDomain: ", yDomain);
  if (xTicks === undefined) xTicks = weeks(d3.min(xDomain), d3.max(xDomain), 2);
  console.log("xTicks: ", xTicks);


  const xScale = d3.scaleBand(xDomain, xRange).padding(xPadding);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.utcFormat(xFormat)).tickValues(xTicks);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatDate = d3.utcFormat("%B %-d, %Y");
    const formatValue = d3.format(".2f");
    const formatChange = (f => (y0, y1) => f((y1 - y0) / y0))(d3.format("+.2%"));
    title = i => `${formatDate(X[i])}
    Open: ${formatValue(Yo[i])}
    Close: ${formatValue(Yc[i])} (${formatChange(Yo[i], Yc[i])})
    Low: ${formatValue(Yl[i])}
    High: ${formatValue(Yh[i])}`;
  } else if (title !== null) {
    const T = d3.map(chartData, title);
    title = i => T[i];
  }
//
//



    d3.selectAll("svg > *").remove();
    const svgElement = d3.select(ref.current);

    svgElement
        .attr("class", "chartRoot")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

    // svgElement
    //     .append("g")
    //     .attr("class", "xAxis")
    //     .attr("transform", `translate(0,${height - marginBottom})`)
    //     .call(xAxis)
    //     .call(g => g.select(".domain").remove());

    svgElement
        .append("g")
        .attr("class", "yAxis")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
        .attr("stroke-opacity", 0.2)
        .attr("x2", width - marginLeft - marginRight))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(yLabel));

    const g =
      svgElement
        .append("g")
        .attr("class","chart")
        .attr("stroke", stroke)
        .attr("stroke-linecap", strokeLinecap)
        .selectAll("g")
        .data(I)
        .join("g")
        .attr("transform", i => `translate(${xScale(X[i])},0)`);

      g
        .append("line")
        .attr("class","candleSticks")
        .attr("y1", i => yScale(Yl[i]))
        .attr("y2", i => yScale(Yh[i]));

      g
        .append("line")
        .attr("class","candles")
        .attr("y1", i => yScale(Yo[i]))
        .attr("y2", i => yScale(Yc[i]))
    // .attr("stroke-width", xScale.bandwidth())
        .attr("stroke-width", 2)
        .attr("stroke", i => colors[1 + Math.sign(Yo[i] - Yc[i])]);

    if (title) g
      .append("title")
      .text(title);

  },[chartData]
)


  console.log("API SLICE: ", apiSlice)

  return (
    <div>
    <div style={{background:"lightGrey"}}>
      <svg
        ref={ref}
        style={{
          height: 800,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px"
        }}
      />
      </div>
    {
      isFetching ? <div>...is fetching</div> : <div>{JSON.stringify(data)}</div>
    }
    </div>
  )
}

const TextBox = ({text="zero"}) => {
  return (
    <div>value: {text}</div>
  )
}

const Ui = (Object) => {

  const [value, setValue] = useState(10)

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <>
      local value: {value}
      <input type="range" min="0" max="20" step="1" onChange={handleChange} value={value}/>
      <Object text={value }/>
    </>
  )
}



const ChartContainer = () => {

  // {Ui(TextBox)}
    return (
      <div class="module">
        {
          <CandleChartContainer apiSlice={useGetTokenCandlesQuery} token="0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"/>
        }
      </div>
    )
}


export default ChartContainer;
