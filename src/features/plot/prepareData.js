import * as d3 from "d3"
import sma from "./sma"
import profitFromBalance from "./profitFromBalance"

const prepareData = (data,smaOne,smaTwo,xScale,yScale) => {

    console.log("M: (prepareData) input data: ", data)

    let rawData = data.map((e,i) => ({date:i,value:e.buyWeight}))
    const sma4Data = sma(data.map(e => e.buyWeight), smaOne).map((e,i) => ({date:i,value:e}))
    for(let i = 0; i < smaOne; i++){
      sma4Data[i].value = rawData[i].value
    }
    // console.log("M: (prepareData) sma4Data: ", sma4Data)
    const sma8Data = sma(data.map(e => e.buyWeight), smaTwo).map((e,i) => ({date:i,value:e}))
    for(let i = 0; i < smaTwo; i++){
      sma8Data[i].value = rawData[i].value
    }
    // console.log("M: (prepareData) sma8Data: ", sma8Data)

    // const sma16Data = sma(data.map(e => e.buyWeight), 16).map((e,i) => ({date:i,value:e}))
    // const sma32Data = sma(data.map(e => e.buyWeight), 32).map((e,i) => ({date:i,value:e}))
    //
    // // const sma3Data = sma(data.map(e => e.buyWeight),3)
    //
    // const directions = sma4Data.map((e,i) => e - sma8Data[i])
    // const nills = edges(directions)
    //
    const dirs = sma4Data.map((e,i) => (e.value - sma8Data[i].value)).map((e,i) => ({date:i,value:e}))
    const dirZero = dirs.map((e,i) => ({date:i,value:0 - 200}))
    const cs = d3.cumsum(sma4Data.map((e,i) => (e.value - sma8Data[i].value)))
    const cumsum = [].slice.call(cs).map((e,i) => ({date:i,value:e/10 - 200}))
    //
    // // const dots = dirs.map(e => e.value)
    const dots = ((pool,stopLossValue=0) => {
        // console.log("M: (dots) input pool length", pool.length)
        let acc = []
        const min = data.sort((a,b) => a - b)[data.length/2].buyWeight
        for(let i = 0;i < pool.length; i++){
          if(i == 0){
            acc.push(0)
            continue
          }
          if(pool[i - 1] <= 0 && pool[i] > 0){
            acc.push(pool[i])
            // acc.push(pool[i + 1])
          }else if(pool[i - 1] > 0 && pool[i] < 0){
            acc.push(pool[i])
            // acc.push(pool[i + 1])
          }else{
            acc.push(0)
          }
          // console.log("M: (dots) pool[i] ", pool[i])
        }
        // console.log("M: (dots) out acc length ", acc.length)
        // console.log("M: (dots) out acc ", acc)
        // console.log("M: (dots) out min ", min)
        return acc
    })(sma4Data.map((e,i) => (e.value - sma8Data[i].value)))
    .map((e,i) => ({date:i,value:e}))

    // const belowZeroLossStop = ((pool,stopLossValue=100) => {
    //     console.log("M: (dots) input pool length", pool.length)
    //     let acc = []
    //     for(let i = 0;i < pool.length; i++){
    //       if(i == 0){
    //         acc.push(0)
    //         continue
    //       }
    //       if(pool[i - 1] <= 0 && pool[i] > 0){
    //         acc.push(pool[i])
    //         // acc.push(pool[i + 1])
    //       }else if(pool[i - 1] > 0 && pool[i] < 0){
    //         acc.push(pool[i])
    //         // acc.push(pool[i + 1])
    //       }else{
    //         acc.push(0)
    //       }
    //     }
    //     console.log("M: (dots) out acc length", acc.length)
    //     return acc
    // })(sma4Data.map((e,i) => (e.value - sma8Data[i].value)))
    // .map((e,i) => ({date:i,value:e}))
    //
    // console.log("Edges pool: ", dots)
    //
    const edgePrices = dots.map((value,index) => ({
      ...value,
      index:index,
      price:rawData[index].value,
    }))

    //
    // console.log("Edges prices: ", edgePrices)
    //
    // // accumulatedDots -------------------------------------------------------------
    //
    // // const accumulatedDots =
    // //   [].slice.call(d3.cumsum(dots.map((e,i) => e.value)))
    // //   .map((e,i) => ({date:i,value:e + 300}))
    //
    // let accumulatedDots =
    //   [].slice.call(d3.cumsum(edgePrices.map((e,i) => e.value > 0 ? -e.price/100 : e.price/100)))
    //   .map((e,i) => ({date:i,value:e}))
    // console.log("accumulatedDots: ", accumulatedDots)
    //
    const balanceChange =
      [].slice.call(d3.cumsum(
        edgePrices.map((e,i) => {
          let out = 0
          // console.log("M: (balanceChange) PRICES: ", e)
          if(e.value > 0){
            out = -e.price
            // console.log("M: (balanceChange) TTLEAVE with out: ", out)
          }else if(e.value < 0){
            out = e.price
            // console.log("M: (balanceChange) TTENTER with out: ", out)
          }else{
            out = 0
            // console.log("M: (balanceChange) TTSKIP with out: ", out)
          }
          return out
        })
      )
      )
      .map((e,i) => ({date:i,value:e}))

    const profit = profitFromBalance(balanceChange.map(e => e.value)).map((e,i) => ({date:i,value:e}))

    const balanceChangeLessLoss =
      [].slice.call(d3.cumsum(
        edgePrices.map((e,i) => {
          let out = 0
          // console.log("M: (balanceChange) PRICES: ", e)
          if(e.value > 0){
            out = -e.price
            // console.log("M: (balanceChange) TTLEAVE with out: ", out)
          }else if(e.value < 0){
            out = e.price
            // console.log("M: (balanceChange) TTENTER with out: ", out)
          }else{
            out = 0
            // console.log("M: (balanceChange) TTSKIP with out: ", out)
          }
          return out
        })
      )
      )
      .map((e,i) => ({date:i,value:e/1000}))

    const safeBalanceChange =
        (() => {
          for(const price in balanceChange){
            // console.log("M: (safeBalanceChange) price: ", balanceChange[price])
          }
          return edgePrices
        })()
        .map((e,i) => ({date:i,value:e}))
    // console.log(`
    //       balance change: ${JSON.stringify(balanceChange)}
    //   `)
    //   // sum: ${balanceChange.reduce((sum,cur) => sum + cur,0)}
    let accumulatedDots = balanceChange
    // // const profitDots = dots.filter(dot => dot.value > 0)
    // // const totalProfit = profitDots.reduce((sum,cur) => sum + cur.value,0)
    // // const percentOfProfitDots = profitDots.length / dots.filter(dot => dot.value != 0).length
    // // const lossDots = dots.filter(dot => dot.value < 0)
    // // const totalLoss = lossDots.reduce((sum,cur) => sum + cur.value,0)
    // // const percentOfLossDots = lossDots.length / dots.filter(dot => dot.value != 0).length
    // // const outputProfit = totalProfit + totalLoss
    // //
    // // const averageGainPerTrade = totalProfit / profitDots.length
    // // const averageLossPerTrade = totalLoss / lossDots.length
    // // const expectedLongtermGainlossValue =
    // //   (averageGainPerTrade * percentOfProfitDots) +
    // //   (averageLossPerTrade * percentOfLossDots)
    //
    const profitDots = edgePrices.filter(dot => dot.value > 0)
    const totalProfit = profitDots.reduce((sum,cur) => sum + cur.price,0)
    const percentOfProfitDots = profitDots.length / dots.filter(dot => dot.value != 0).length
    const lossDots = edgePrices.filter(dot => dot.value < 0)
    const totalLoss = lossDots.reduce((sum,cur) => sum - cur.price,0)
    const percentOfLossDots = lossDots.length / dots.filter(dot => dot.value != 0).length
    const outputProfit = totalProfit + totalLoss

    const averageGainPerTrade = totalProfit / profitDots.length
    const averageLossPerTrade = totalLoss / lossDots.length
    const expectedLongtermGainlossValue =
      (averageGainPerTrade * percentOfProfitDots) +
      (averageLossPerTrade * percentOfLossDots)
    //
    console.log(`TRADE REPORT:
      profitDots: ${profitDots.map(e => e.value)}
      totalProfit: ${totalProfit}
      percentOfProfitDots: ${percentOfProfitDots}

      lossDots: ${lossDots.map(e => e.value)}
      totalLoss: ${totalLoss}
      percentOfLossDots: ${percentOfLossDots}

      outputProfit: ${outputProfit}

      averageGainPerTrade: ${averageGainPerTrade}
      averageLossPerTrade: ${averageLossPerTrade}

      expectedLongtermGainlossValue: ${expectedLongtermGainlossValue}

      `)
    //
    // // -----------------------------------------------------------------------------
    //
    // console.log("DIRS: ", dirs)
    // console.log("CUMSUM: ", cumsum)
    // // console.log("BARS:", directions)
    // // console.log("BARS AV:", sma4Data.map((e,i) => (e+sma8Data[i])/2))
    // // console.log("EDGES: ", nills)
    //
    // console.log("sma 4 data: ", sma4Data)



    const map = [
      "rawData",
      "sma4",
      "sma8",
      "dirs",
      "dirZero",
      "cumsum",
      "dots",
      "balance",
      "profit"
    ]
    // console.log("POOLS LENGTHS: ", [
    //   rawData
    //   // ,sma4Data,sma8Data,dirs,dirZero,cumsum,dots,accumulatedDots
    // ].map(e => e.length))
    const accumulatedData = [
      rawData,
      sma4Data,
      sma8Data,
      dirs,
      dirZero,
      cumsum,
      dots,
      accumulatedDots,
      profit
    ]
      .map((g,i) => g.map(record => ({...record,group:map[i]})))
      .flatMap(e => e)

    console.log("M: (prepareData) accumulated data: ", accumulatedData)

    return accumulatedData

}

export default prepareData
