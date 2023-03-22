import React from "react"
import {useEffect, useRef, useState, useContext, createContext } from "react"
import * as d3 from "d3"
import sma from "./sma"
import SimpleSMA from "./SimpleSMA"
import { useGetTokenCandlesTimeBoundQuery } from '../../services/pokemon'
import edges from "./edges"
import SMAanimated from "./SMAanimated"
import MatrixDots from "./MatrixDots"
import TestStand from "./TestStand"
import MovingDots from "./MovingDots"
import InteractiveNodes from "./InteractiveNodes"
import TestBubble from "./TestBubble"
import SimpleInteratuve from "./SimpleInteratuve"
import WeightFrequencySpread from "./WeightFrequencySpread"
import WeightFrequencySpreadTimeTracked from "./WeightFrequencySpreadTimeTracked"
import prepareData from "./prepareData"
import SMAmulti from "./SMAmulti"

    const width = 700
    const height = 200
    const  data = [... new Array(100).fill(0)].map((e,i) => ({
    // id: i,
    buyDate: Math.random() * width,
    buyWeight: Math.random() * height,
    // sellFrequency: Math.random() * width,
    // sellWeight: Math.random() * height,
    // r: 1 + Math.random() * 20,
    // buyHistory:[... new Array(4).fill(0)].map(e => [Math.random() * width,Math.random() * height]),
    // sellHistory:[... new Array(4).fill(0)].map(e => [Math.random() * width,Math.random() * height]),
    // iconLink:tokens[i]
}))



// let smaMultiData = prepareData(data,smaOne,smaTwo)
// accumulatedData = smaMultiData

console.log()

const SMA = ({inputData,tx,ty, name,color}) => {

  // console.log("input data: ", inputData)

  const width = 700
  const height = 200
  const ref = useRef()
  // console.log("ref: ", ref)
  const [data,setData] = useState(inputData)

  // console.log("data: ", data)

  const X = data.map((e,i) => i * 10)
  const Y = data.map((e,i) => e)

  // console.log("X: ", X)

  let xScale = d3
      .scaleLinear()
      .domain([d3.min(X), d3.max(X)])
      .range([0, width]).nice();
  let yScale = d3
      .scaleLinear()
      .domain([d3.min(Y), d3.max(Y)])
      .range([0, height]).nice();

  // Construct a line generator.
  let line = d3.line()
    // .curve(d3.curveNatural)
    .curve(d3.curveNatural)
    .x((e,i) => xScale(i * 10))
    .y((e) => yScale(e))(data);

  const lines = [line]

  useEffect(() => {

    // clear svg nodes --------------------------------------------------------
    d3.selectAll("svg.SMA" + name + " > *").remove();

    // draw --------------------------------------------------------------------
    const svg = d3.select(ref.current)

    // for(line in lines){
      svg
      .append("path")
      .attr("transform","translate(30, 30)")
      .attr("fill","none")
      .attr("stroke",color)
      .attr('d', line)
    // }

  },[inputData])

  return (
            <svg ref={ref} width="100%" height="300" class={"SMA"} transform={"translate(" + tx + "," + ty + ")"}/>
            // <h3>hoveredId: {hoveredId}</h3>
            // <div>filtered: {data && selectedId ? data.map(e => e.id).filter(e => e == selectedId) : JSON.stringify(data.map(e => e.id))}</div>

  )
}

const SMAdots = ({inputData,tx,ty, name,color}) => {

  // Prepare global variables
  const width = 700
  const height = 200
  const ref = useRef()
  const [data,setData] = useState(inputData)

  // Compute valuees
  const X = data.map((e,i) => i * 10)
  const Y = data.map((e,i) => e)

  // Prepare scale tagTypes
  const xType = d3.scaleBand
  const yType = d3.scaleLinear

  //Compute domains
  const xDomain = X
  const yDomain = [d3.min(Y),d3.max(Y)]

  // Compute ranges
  const xRange = [0,width]
  // const yRange = [height,0]
  const yRange = [height,0]

  // Compute  scales
  const xPadding = 0.1
  const xScale = xType(xDomain,xRange).padding(xPadding)
  const yScale = yType(yDomain,yRange)

  useEffect(() => {

    // clear svg nodes --------------------------------------------------------
    d3.selectAll("svg.SMA" + name + " > *").remove();

    // draw --------------------------------------------------------------------
    const svg = d3.select(ref.current)
    .append("g")
    .attr("fill", color)
    .attr("transform","translate(30,30)")
  .selectAll("rect")
  .data(Y)
  .join("rect")
    .attr("x", (e,i) => {
      // console.log("X: ", e, i)
      return xScale(i * 10)
    })
    .attr("y", (e) => {
      // return yScale(height - e)
      return yScale(height - e)
    })
    .attr("height", (e) => yScale(e))
    .attr("width", xScale.bandwidth())
    .attr("opacity",0.3)


  },[data])

  return (
            <svg ref={ref} width="100%" height="300" class={"SMA" + name} transform={"translate(" + tx + "," + ty + ")"}/>

  )
}

const SMAdoubleSidedBar = ({inputData,tx,ty, name,color}) => {

  // Prepare global variables
  const width = 700
  const height = 200
  const ref = useRef()
  const [data,setData] = useState(inputData)

  // Compute valuees
  const X = data.map((e,i) => i * 10)
  const Y = data.map((e,i) => e)

  // Prepare scale tagTypes
  const xType = d3.scaleBand
  const yType = d3.scaleLinear

  //Compute domains
  const xDomain = X
  const yDomain = [d3.min(Y),d3.max(Y)]

  // Compute ranges
  const xRange = [0,width]
  // const yRange = [height,0]
  const yRange = [height,0]

  // Compute  scales
  const xPadding = 0.1
  const xScale = xType(xDomain,xRange).padding(xPadding)
  const yScale = yType(yDomain,yRange)

  useEffect(() => {

    // clear svg nodes --------------------------------------------------------
    d3.selectAll("svg.SMA" + name + " > *").remove();

    // draw --------------------------------------------------------------------
    const svg = d3.select(ref.current)
    .append("g")
    .attr("transform","translate(30,30)")
  .selectAll("rect")
  .data(Y)
  .join("rect")
    .attr("x", (e,i) => {
      // console.log("X: ", e, i)
      return xScale(i * 10)
    })
    .attr("y", (e) => {
      return yScale(height/2 + e)
      // return yScale(height/2 + e/2)
    })
    .attr("height", (e) => Math.abs(yScale(e)/5))
    .attr("width", xScale.bandwidth())
    .attr("opacity", 0.3)
    .attr("fill", (e) => e > 0 ? "green" : "red")


  },[data])

  return (
      <div class="module">
            <svg ref={ref} width="100%" height="300" class={"SMA" + name} transform={"translate(" + tx + "," + ty + ")"}/>
      </div>
  )
}



const ethData = [
    3341549555.0623,
    3294317410.2555,
    3326124790.9956,
    3323666889.3095,
    3338468431.8431,
    3326573801.0083,
    3324068787.5074,
    3351566747.987,
    3303116912.2642,
    3350491725.3867,
    3320744960.5521,
    3326676713.0578,
    3297837851.3525,
    3239616744.1277,
    3117999621.1948,
    3120629544.7198,
    3121348689.3904,
    3120276836.9014,
    3099782494.146,
    3121391140.8189,
    3105831484.3859,
    3104995176.1414,
    3082325267.3066,
    3088844940.5409,
    3065214390.7179,
    3066016972.8066,
    3068637894.9603,
    3062539412.3288,
    3007265317.8938,
    3006789135.0476,
    3046581542.3897,
    3085667242.2971,
    3070551507.7565,
    3088779318.4451,
    3100863697.1601,
    3089734159.8281,
    3080355269.0842,
    3112330178.5493,
    3110771502.1975,
    3114804130.4753,
    3127257452.3246,
    3145628022.1248,
    3151430309.57,
    3254918694.2207,
    3178259248.6514,
    3264610450.447,
    3312325053.155,
    3360594890.1018,
    3370328864.4741,
    3303667387.2083,
    3244110426.68,
    3180513176.3901,
    3166332745.564,
    3155336757.9887,
    3146867337.8632,
    3155247477.7596,
    3044288686.4859,
    3013972136.9498,
    3020227753.9322,
    3062269131.6179,
    3062426307.632,
    3044592215.8536,
    3022624100.8322,
    3051875444.6545,
    3066152687.8614,
    3068258267.6852,
    3055174854.5209,
    3026209859.4349,
    3065274244.5181,
    3068374498.2267,
    3063405285.449,
    3030037360.7961,
    3045779115.4269,
    3050694121.4123,
    3029135388.5879,
    3037378714.5603,
    3024005953.1947,
    3054144191.2062,
    3021075566.7475,
    3036184823.3021,
    3042063440.2775,
    3043078422.4175,
    3060818455.6631,
    3127903847.8815,
    3168108714.0574,
    3137822481.8229,
    3153277869.3524,
    3127517206.0325,
    3125035835.6732,
    3121312104.1847,
    3189506656.1067,
    3249055781.7566,
    3235061008.5177,
    3239699287.3582,
    3248335993.0503,
    3242466362.516,
    3255298435.4694,
    3269599563.1436,
    3235952470.1147,
    3302055902.2686,
    3320758433.2118,
    3292546107.3527,
    3299487750.8724,
    3288857562.6345,
    3359971782.7188,
    3400920106.3351,
    3402484977.7391,
    3416916746.1158,
    3431542716.052,
    3387313019.1431,
    3374317193.6814,
    3385684496.4282,
    3407454151.4439,
    3401758446.5493,
    3393268010.8742,
    3391746707.6356,
    3384519145.4426,
    3397694878.5521,
    3393646455.9614,
    3359318672.6054,
    3383258465.5014,
    3366007659.5231,
    3360530443.544,
    3365648924.1053,
    3372152680.829,
    3396330671.0184,
    3413909562.7374,
    3418884561.1758,
    3486259602.4754,
    3516033729.6648,
    3504502336.712,
    3495008342.0165,
    3463950509.7661,
    3435909122.0485,
    3400831419.7813,
    3400380528.0761,
    3410098276.1572,
    3419273219.1194,
    3411987444.6403,
    3431122754.2162,
    3432155552.6691,
    3434907424.2462,
    3431037552.8771,
    3429689866.9886,
    3425817895.2137,
    3436843237.6769,
    3437899645.1895,
    3423578136.5867,
    3384246508.3664,
    3377126353.94,
    3365200645.1575,
    3330534593.5273,
    3300848392.7866,
    3204519547.806,
    3215523851.0634,
    3225832586.9684,
    3255195576.3582,
    3254220152.5141,
    3266736331.6125,
    3252162273.9063,
    3265462543.1891,
    3266388342.5797,
    3252913693.3815,
    3257900146.0583,
    3264395220.5314,
    3236464650.1126,
    3247267309.5863,
    3273940860.8557,
    3279298227.1834,
    3291184717.7267,
    3279073408.8031,
    3330611537.0982,
    3360616886.944,
    3362146050.1899,
    3338606295.041,
    3335808998.0859,
    3326068586.8373,
    3353864925.9383,
    3330782971.9863,
    3347727443.0077,
    3338695935.8774,
    3389787365.4687,
    3359902963.78,
    3359703337.6024,
    3376842083.9751,
    3363580380.7153,
    3342036845.8464,
    3355096108.1482,
    3396591269.4223,
    3400010595.7274,
    3389980617.442,
    3410628860.3562,
    3437670334.0925,
    3420422181.0073,
    3397150981.8109,
    3421824697.8417,
    3460353184.5196,
    3478676514.8786,
    3456781305.2436,
    3431781354.4379,
    3409534947.7732,
    3412371833.3482,
    3401842490.5713,
    3421507402.4812,
    3419042341.5571,
    3450096693.6395,
    3454002914.6412,
    3481271938.9041,
    3505682936.4122,
    3554286041.596,
    3599793713.7011,
    3622557379.4071,
    3609381029.8736,
    3610117685.1815,
    3578798604.2829,
    3583646499.2607,
    3581771363.0388,
    3612278761.9206,
    3606806066.5356,
    3607625319.4352,
    3595949899.7416,
    3585562902.433,
    3628138668.692,
    3613720617.7311,
    3599628737.0879,
    3544181403.8615,
    3558537063.8897,
    3541910723.6537,
    3559267364.5685,
    3559429043.6202,
    3566616941.2614,
    3539761959.2369,
    3495995850.6725,
    3493719863.1572,
    3522191351.3833,
    3530862049.0931,
    3536300381.7253,
    3520188292.7029,
    3515145416.8077,
    3514585513.7252,
    3517080033.3027,
    3519381566.9797,
    3528992608.4789,
    3511287908.9755,
    3524145849.1646,
    3528216443.0413,
    3527266511.8088,
    3527509517.9001,
    3545077579.8289,
    3565139033.59,
    3600500699.4083,
    3604801308.9797,
    3612019280.3921,
    3597837003.9467,
    3560642349.2539,
    3554560260.0836,
    3568522857.0232,
    3531716174.0808,
    3507948326.4639,
    3507309268.8757,
    3491443642.1933,
    3478887831.212,
    3482108981.1306,
    3483004505.1038,
    3485554336.116,
    3524118334.0473,
    3500627229.8753,
    3503714504.4945,
    3516229209.7478,
    3496772703.4377,
    3511474763.0327,
    3490166937.3824,
    3506010912.7713,
    3496381933.4116,
    3479120243.3518,
    3457135525.4373,
    3613189163.6541,
    3590588775.8898,
    3576439907.6864,
    3569975774.4093,
    3563265083.4454,
    3523488017.616,
    3542249267.7095,
    3546585895.4433,
    3546478139.5439,
    3556139259.9984,
    3542710122.7076,
    3542003158.8102,
    3546190681.0116,
    3523251493.3181,
    3525603914.8366,
    3538333877.2096,
    3569197861.588,
    3578232142.2929,
    3641139551.7157,
    3679904478.1978,
    3677113814.7299,
    3692239334.1001,
    3683586233.3421,
    3684953278.9349
]
const makeData = () => {
  // console.log("MAKE NEW DATA")
  // let out = [... new Array(100).fill(0)].map((e,i) => ({
  let out = ethData.map((e,i) => ({
    buyDate: Math.random() * width,
    // buyWeight: Math.random() * height
    buyWeight: e
  }))
  // console.log("MAKE NEW DATA D: ", out)
  return out
}

const ChartContainer = () => {

    const [data,setData] = useState([])

    data.length  == 0 && setData(makeData())

    useEffect(() => {
      // console.log("RE-RENDER")
      // const timer = setTimeout(() => setData(makeData()), 1000);
      // return () => clearTimeout(timer);
    },[data])

    let counter = 1
    // while(counter > 0){
    //    setData(makeData)
    //    counter--
    // }

    console.log("DATA: ", data)

    const tokens = [
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "0x24da31e7bb182cb2cabfef1d88db19c2ae1f5572",
        "0x15d4c048f83bd7e37d49ea4c83a07267ec4203da",
        "0xae7ab96520de3a18e5e111b5eaab095312d7fe84"
    ]

    // <WeightFrequencySpread/>

    const ref = useRef()
    // console.log("REF ON CREATE: ", ref)

    // <SMA inputData={data.map(e => e.buyWeight)} tx='10' ty="-300" name="main" color="#999"/>
    // <SMAdoubleSidedBar inputData={directions} tx='0' ty="-1350" name="nills" color="red"/>

    // <SMA inputData={sma4Data} tx='0' ty="-300" name="sma4" color="blue"/>
    // <SMA inputData={sma8Data} tx='0' ty="-600" name="sma8" color="green"/>
    // <SMAdots inputData={data.map(e => e.buyWeight)} tx='0' ty="-900" name="bars" color="grey"/>
    // <SMAdots inputData={sma4Data} tx='0' ty="-900" name="sma4_2" color="red"/>
    // <SMAdots inputData={sma8Data} tx='0' ty="-1200" name="sma8_2" color="blue"/>
    // <MovingDots/>
    // <SMA inputData={data.length > 0 && data.map(e => e.buyWeight)} name="main" color="#999"/>

    // <TestStand/>

    // let [smaOne,smaTwo] = spaces()

    return (
        <div class="module">
                {

                }
                <SMAmulti inputData={prepareData(data, 4, 8)} name="multiSMAchart" smaOneIn={4} smaTwoIn={8}/>
                <SMAmulti inputData={prepareData(data, 4, 8)} name="multiDataChart" smaOneIn={4} smaTwoIn={8}/>

                {
                  // tokens.map(token => <TestStand token={token}/>)
                  // <MovingDots/>
                }
                {
                  // <>
                  //   <MatrixDots/>
                  //   <InteractiveNodes/>
                  //   <TestBubble/>
                  //   <SimpleInteratuve/>
                  //   <WeightFrequencySpread/>
                  //   <WeightFrequencySpreadTimeTracked/>
                  //   <SMAanimated/>
                  // </>
                }
        </div>
    )
}

export default ChartContainer;
