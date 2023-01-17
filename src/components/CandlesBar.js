import React from "react";
import {useEffect, useRef, useState} from "react";
import * as d3 from "d3";
import {InternSet} from "d3";

const setDateToSec = (date) => +date.toString().slice(0,10);
const setDateToHum = (date) => new Date(date);
const setDateHourShift = (date, shift = 1) => new Date(date - shift*3600*1000);
const getTime = (date) => date.split("T")[1].split(".")[0];

const CandlesBar = ({data, mapping}) => {

  const [chartData, setChartData] = useState(data);

  const [balance, setBalance] = useState(12000);
  const [stack, setStack] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(100);
  const [stackValue, setStackValue] = useState(stack * tokenPrice);
  const [buyValue, setBuyValue] = useState(0);
  const [sellValue, setSellValue] = useState(0);

  // gain+loss
  const [gainLoss, setGainLoss] = useState(0);
  const [previousPrice,setPreviousPrice] = useState(0);

  useEffect(() => {
    setGainLoss((stackAmount * tokenPrice) - (stackAmount * previousPrice));
  },[tokenPrice]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [items, setItems] = useState(JSON.stringify({data:"no data"}));

  const [startDate, setStartDate] = useState(Date.now() - 2*24*3600*1000);
  const [endDate, setEndDate] = useState(Date.now() - 1*24*3600*1000);

//-------------------------------------------------------------

const [tempBalance, setTempBalance] = useState(0);
const [tempStackAmount, setTempStackAmount] = useState(0);
const [tempStackValue, setTempStackValue] = useState(0);
// const [balance, setBalance] = useState();
const [stackAmount, setStackAmount] = useState(0);

const [gameStarted, setGameStarted] = useState(false);
// const [stackValue, setStackValue] = useState();
// const [buyValue, setBuyValue] = useState('');
// const [sellValue, setSellValue] = useState('');

useEffect(() => {
  if(!JSON.parse(items)["data"]){
    const {t,o,c,h,l} = JSON.parse(items);
    let acc = [];
    console.log("ITEMS CHANGED: ", items);
    console.log("T: ", t);
    console.log("T: ", t.map(e => new Date(e*1000)));
    console.log("O: ", o);
    console.log("C: ", c);
    console.log("H: ", h);
    console.log("L: ", l);
    t.map((e,i) => {
      const item = {"Date":new Date(e*1000),"Open":o[i],"High":h[i],"Low":l[i],"Close":c[i]};
      console.log(item);
      acc = [...acc, item];
    })
    console.log("ACC: ", acc);
    setChartData(acc);
    setTokenPrice(c[c.length - 1]);
    // setDataset(acc);
  }
},[items]);

const inputBuy = (e) => {
  setTempBalance(balance - +e.target.value*tokenPrice);// until 0
  setBuyValue(+e.target.value);
  setTempStackAmount(+e.target.value);
  if(buyValue == 0){
      setTempStackValue(0);
  }
  setTempStackValue(tempStackAmount + +e.target.value*tokenPrice)
};
const confirmBuy = () => {
  if (!buyValue == 0){
    setBalance(tempBalance);
  }
  setStackAmount(stackAmount + tempStackAmount);
  setStackValue(stackValue + tempStackValue);
  setPreviousPrice(tokenPrice);

  setTempBalance(0);
  setBuyValue(0);
  setTempStackAmount(0);
  setTempStackValue(0)

};
const inputSell = (e) => {
  setSellValue(+e.target.value);
  setTempBalance(tempBalance + +e.target.value*tokenPrice);
  // setTempStackAmount(tempStackAmount - +e.target.value);
  // setTempStackValue(tempStackAmount - +e.target.value*tokenPrice);
};
useEffect(() => {
  setTempStackAmount(stackAmount - sellValue);
  setTempStackValue(stackValue - sellValue*tokenPrice);
  setTempBalance(balance + sellValue*tokenPrice);
},[sellValue]);
useEffect(() => {
  if(stackAmount == 0){
    setStackValue(0);
  }
},[stackAmount]);

const confirmSell = () => {
  setBalance(tempBalance)
  setStackAmount(tempStackAmount)
  setStackValue(tempStackValue)

  setSellValue(0)
  setTempStackAmount(0);
  setTempStackValue(0);
  setTempBalance(0);
  setGainLoss(0);
  setPreviousPrice(0);
};

//-------------------------------------------------------------

  const setBuy = () => {
    setStackValue(stack * tokenPrice);
    setBalance(balance - stack);
    setBuyValue("");
  }
  const setSell = () => {
    setStackValue(stack * tokenPrice);
    setBalance(balance - stack);
    setBuyValue("");
  }
  const handleStackBuy = (event) => {
    setBuyValue(event.target.value);
    setStack(event.target.value);
  }
  const handleStackSell = (event) => {
    setSellValue(event.target.value);
    event.target.value == ""
    ? setStack(stack)
    : stack <= 0
      ? setStack(0)
      : setStack(stack - event.target.value);
  }


  const sendRequest = async () => {
      // if(!gameStarted){
      //   setGameStarted(true);
      // }
      !gameStarted && setGameStarted(true);
      setStartDate(startDate + 3600*1000);
      setEndDate((endDate + 3600*1000));
      const request = `https://api-stage.dex.guru/v1/tradingview/history?symbol=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth_USD&resolution=10&from=${setDateToSec(startDate)}&to=${setDateToSec(endDate)}`;
      console.log("REQUEST: ", request);
      fetch(request)
          .then(res => res.json())
          .then(
              (result) => {
                  setIsLoaded(true);
                  setItems(JSON.stringify(result));
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )

  }

  const [dataset, setDataset] = useState({});
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

  const weeks = (start, stop, stride) => d3.utcMonday.every(stride).range(start, +stop + 1);
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

  const ref = useRef();

  useEffect(() => {
    d3.selectAll("svg > *").remove();
    const svgElement = d3.select(ref.current);
    svgElement
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svgElement.append("g")
  .attr("transform", `translate(0,${height - marginBottom})`)
  .call(xAxis)
  .call(g => g.select(".domain").remove());

  svgElement.append("g")
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
        .attr("stroke", stroke)
        .attr("stroke-linecap", strokeLinecap)
        .selectAll("g")
        .data(I)
        .join("g")
        .attr("transform", i => `translate(${xScale(X[i])},0)`);

      g
        .append("line")
        .attr("y1", i => yScale(Yl[i]))
        .attr("y2", i => yScale(Yh[i]));

      g
        .append("line")
        .attr("y1", i => yScale(Yo[i]))
        .attr("y2", i => yScale(Yc[i]))
    // .attr("stroke-width", xScale.bandwidth())
        .attr("stroke-width", 4)
        .attr("stroke", i => colors[1 + Math.sign(Yo[i] - Yc[i])]);

    if (title) g
      .append("title")
      .text(title);
  }, [chartData]
);

  return (
    <>
      <svg
        ref={ref}
        style={{
          height: 800,
          width: "100%",
          marginRight: "0px",
          marginLeft: "0px",
        }}
      />
      <div>
        {
          gameStarted
          ?
          <>
            <p style={{color: "red", border: '2px solid white', width: '100px', whiteSpace: 'break-word'}}>
              {//items
              }
            </p>
            <div style={{display:"flex"}}>
              <button onClick={confirmBuy}>buy</button>
              <input onChange={event => inputBuy(event)} value={buyValue}/>
              <button onClick={confirmSell}>sell</button>
              <input onChange={event => inputSell(event)} value={sellValue}/>
            </div>
            <div>
              <div style={{display:"flex"}}>
                <p>current balance: {balance}</p>
                <p style={{color: "lightGrey"}}>new balance: {tempBalance}</p>
              </div>
              <div style={{display:"flex"}}>
                <p>stack amount: {stackAmount}</p>
                <p style={{color: "lightGrey"}}>new stack amount: {tempStackAmount}</p>
              </div>
              <div style={{display:"flex"}}>
                <p>stack value: {stackValue}</p>
                <p style={{color: "lightGrey"}}>new stack value: {tempStackValue}</p>
              </div>
              <div style={{display:"flex"}}>
                <p>current token price: {tokenPrice}</p>
                <p>gain/loss:{gainLoss}</p>
                <p> prev price: {previousPrice}</p>
              </div>
            </div>
          </>
          : ""
        }
        <button onClick={sendRequest}>{gameStarted ? "next" : "start"}</button>
      </div>
    </>);
}


export default CandlesBar;
