import * as d3 from "d3"
import sma from "./sma"
import profitFromBalance from "./profitFromBalance"
import smoother from "./smoother"

class PrepareData {

    constructor(inputData,smaScopeOne,smaScopeTwo){
        this.inputData = inputData
        this.smaScopeOne = smaScopeOne
        this.smaScopeTwo = smaScopeTwo
    }

    getSMAOne(){
        console.log("M: [PrepareData/getSMAOne] inputData: ", JSON.stringify(this.inputData?.slice(3,8)))
        // console.log("M: [PrepareData/getSMAOne] smaScopeOne: ", this.smaScopeOne)
        this.smaOneData = this.inputData &&
        sma(this.inputData.map(e => e.value), this.smaScopeOne)
        .map((e,i) => ({date:this.inputData[i].date,value:e,group:"smaOne"}))
        console.log("M: [PrepareData/getSMAOne] ", this.getSMAOneData)
        return this.smaOneData
    }

    getSMATwo(){
        console.log("M: [PrepareData/getSMATwo] inputData: ", JSON.stringify(this.inputData?.slice(3,8)))
        // console.log("M: [PrepareData/getSMATwo] smaScopeOne: ", this.smaScopeTwo)
        this.smaTwoData = this.inputData &&
        sma(this.inputData.map(e => e.value), this.smaScopeTwo)
        .map((e,i) => ({date:this.inputData[i].date,value:e,group:"smaTwo"}))
        console.log("M: [PrepareData/getSMATwo] ", this.getSMATwoData)
        return this.smaTwoData
    }

    #getSMAOverlapAreasDiff(){
      console.log("M: [PrepareData/#getSMAOverlapAreasDiff] call");
      const firstNonNull = this.smaOneData?.find(e => e.value !== 0)?.value
      this.smaOverlapAreasDiff = this.smaOneData?.map((e,i) =>
          ({
            value: (this.smaOneData[i].value == 0 || this.smaTwoData[i].value == 0) ? 0 : this.smaOneData[i].value - this.smaTwoData[i].value,
            date: e.date,
            group: "smaOverlapAreasDiff"
          })
      )
      // const firstNonNull = this.smaOverlapAreasDiff.find(e => e.value !== 0)?.value
      // this.smaOverlapAreasDiff = this.smaOverlapAreasDiff.map(e => e.value == 0 ? ({...e,value:firstNonNull}) : e)
      // .filter(e => e.value !== 0)
      console.log("M: [PrepareData/#getSMAOverlapAreasDiff] this.smaOverlapAreasDiff: ", this.smaOverlapAreasDiff);
    }

    getTradingDots(){
        console.log("M: [PrepareData/getTradingDots] call");
        this.#getSMAOverlapAreasDiff()
        this.smaOverlapAreasDiff && (() => {

        const pool = this.smaOverlapAreasDiff
        const firstNonNull = pool.find(e => e.value !== 0)?.value
        let acc = []
        for(let i = 0;i < pool.length; i++){
            if(i == 0){
                acc.push({value:firstNonNull,date:pool[i].date,group:"tradingDots"})
                continue
            }else if(pool[i - 1].value <= 0 && pool[i].value > 0){
                acc.push({value:pool[i].value,date:pool[i].date,group:"tradingDots"})
            }else if(pool[i - 1].value > 0 && pool[i].value < 0){
                acc.push({value:pool[i].value,date:pool[i].date,group:"tradingDots"})
            }else{
                acc.push({value:firstNonNull,date:pool[i].date,group:"tradingDots"})
            }
        }
        this.tradingDots = acc
        // .filter(e => e.value !== 0)
        console.log("M: [PrepareData/getTradingDots] tradingDots: ", this.tradingDots);
        // return acc
        })()
        return this.tradingDots
    }
}

// const prepareData = (data,smaOne,smaTwo,xScale,yScale) => {
//
//     console.log( `
//       M: (prepareData)
//
//       input data: ${data}
//       smaOne: ${smaOne}
//       smaTwo: ${smaTwo}
//
//     `)
//
//     let rawData = data.map((e,i) => ({date:i,value:e.buyWeight}))
//
//     const sma4Data = sma(data.map(e => e.buyWeight), smaOne).map((e,i) => ({date:i,value:e}))
//     for(let i = 0; i < smaOne; i++){
//       sma4Data[i].value = rawData[i].value
//     }
//     console.log("M: (prepareData) sma4Data smaOne: ", smaOne)
//     console.log("M: (prepareData) sma4Data: ", sma4Data.slice(0,10))
//
//     const smoothSma4Data =
//         smoother(
//           sma(data.map(e => e.buyWeight), smaOne)
//         ).map((e,i) => ({date:i,value:e}))
//         for(let i = 0; i < smaOne; i++){
//           smoothSma4Data[i].value = rawData[i].value
//         }
//
//     const sma8Data = sma(data.map(e => e.buyWeight), smaTwo).map((e,i) => ({date:i,value:e}))
//     for(let i = 0; i < smaTwo; i++){
//       sma8Data[i].value = rawData[i].value
//     }
//     // console.log("M: (prepareData) sma8Data: ", sma8Data)
//
//     // const sma16Data = sma(data.map(e => e.buyWeight), 16).map((e,i) => ({date:i,value:e}))
//     // const sma32Data = sma(data.map(e => e.buyWeight), 32).map((e,i) => ({date:i,value:e}))
//     //
//     // // const sma3Data = sma(data.map(e => e.buyWeight),3)
//     //
//     // const directions = sma4Data.map((e,i) => e - sma8Data[i])
//     // const nills = edges(directions)
//     //
//     const dirs = sma4Data.map((e,i) => (e.value - sma8Data[i].value)).map((e,i) => ({date:i,value:e}))
//     const dirZero = dirs.map((e,i) => ({date:i,value:0 - 200}))
//     const cs = d3.cumsum(sma4Data.map((e,i) => (e.value - sma8Data[i].value)))
//     const cumsum = [].slice.call(cs).map((e,i) => ({date:i,value:e/10 - 200}))
//     //
//     // // const dots = dirs.map(e => e.value)
//     const dots = ((pool,stopLossValue=0) => {
//         console.log("M: (dots) input pool length", pool.length)
//         let acc = []
//         const min = data.sort((a,b) => a - b)[data.length/2].buyWeight
//         for(let i = 0;i < pool.length; i++){
//           if(i == 0){
//             acc.push(0)
//             continue
//           }
//           if(pool[i - 1] <= 0 && pool[i] > 0){
//             acc.push(pool[i])
//             // acc.push(pool[i + 1])
//           }else if(pool[i - 1] > 0 && pool[i] < 0){
//             acc.push(pool[i])
//             // acc.push(pool[i + 1])
//           }else{
//             acc.push(0)
//           }
//           // console.log("M: (dots) pool[i] ", pool[i])
//         }
//         // console.log("M: (dots) out acc length ", acc.length)
//         // console.log("M: (dots) out acc ", acc)
//         // console.log("M: (dots) out min ", min)
//         return acc
//     })(sma4Data.map((e,i) => (e.value - sma8Data[i].value)))
//     .map((e,i) => ({date:i,value:e}))
//
//     // const belowZeroLossStop = ((pool,stopLossValue=100) => {
//     //     console.log("M: (dots) input pool length", pool.length)
//     //     let acc = []
//     //     for(let i = 0;i < pool.length; i++){
//     //       if(i == 0){
//     //         acc.push(0)
//     //         continue
//     //       }
//     //       if(pool[i - 1] <= 0 && pool[i] > 0){
//     //         acc.push(pool[i])
//     //         // acc.push(pool[i + 1])
//     //       }else if(pool[i - 1] > 0 && pool[i] < 0){
//     //         acc.push(pool[i])
//     //         // acc.push(pool[i + 1])
//     //       }else{
//     //         acc.push(0)
//     //       }
//     //     }
//     //     console.log("M: (dots) out acc length", acc.length)
//     //     return acc
//     // })(sma4Data.map((e,i) => (e.value - sma8Data[i].value)))
//     // .map((e,i) => ({date:i,value:e}))
//     //
//     // console.log("Edges pool: ", dots)
//     //
//     const edgePrices = dots.map((value,index) => ({
//       ...value,
//       index:index,
//       price:rawData[index].value,
//     }))
//
//     //
//     // console.log("Edges prices: ", edgePrices)
//     //
//     // // accumulatedDots -------------------------------------------------------------
//     //
//     // // const accumulatedDots =
//     // //   [].slice.call(d3.cumsum(dots.map((e,i) => e.value)))
//     // //   .map((e,i) => ({date:i,value:e + 300}))
//     //
//     // let accumulatedDots =
//     //   [].slice.call(d3.cumsum(edgePrices.map((e,i) => e.value > 0 ? -e.price/100 : e.price/100)))
//     //   .map((e,i) => ({date:i,value:e}))
//     // console.log("accumulatedDots: ", accumulatedDots)
//     //
//     const balanceChange =
//       [].slice.call(d3.cumsum(
//         edgePrices.map((e,i) => {
//           let out = 0
//           // console.log("M: (balanceChange) PRICES: ", e)
//           if(e.value > 0){
//             out = -e.price
//             // console.log("M: (balanceChange) TTLEAVE with out: ", out)
//           }else if(e.value < 0){
//             out = e.price
//             // console.log("M: (balanceChange) TTENTER with out: ", out)
//           }else{
//             out = 0
//             // console.log("M: (balanceChange) TTSKIP with out: ", out)
//           }
//           return out
//         })
//       )
//       )
//       .map((e,i) => ({date:i,value:e}))
//
//     const priceApplicationChange = (() => {
//       let nonNull = dots.filter(e => e.value != 0)
//       let cumsum = [...nonNull.map(e => ({...e,value:e.value * -1}))]
//       console.log("M: (prepareData) priceApplicationChange cumsum input: ", cumsum)
//       for(let i = 0;i < cumsum.length; i++){
//         console.log("M: (prepareData) priceApplicationChange cumsum dot: ", cumsum[i])
//         if(i == 0){
//           cumsum[i].value = cumsum[i].value
//         }else{
//           cumsum[i].value = cumsum[i-1].value + cumsum[i].value
//         }
//       }
//       console.log("M: (prepareData) priceApplicationChange cumsum: ", cumsum)
//       return cumsum
//     })()
//       // [].slice.call(d3.cumsum(dots.filter(e => e.value != 0)))
//       // .map((e,i) => ({date:i,value:e}))
//
//     const profit = profitFromBalance(balanceChange.map(e => e.value)).map((e,i) => ({date:i,value:e}))
//
//     const balanceChangeLessLoss =
//       [].slice.call(d3.cumsum(
//         edgePrices.map((e,i) => {
//           // let out = 0
//           // // console.log("M: (balanceChange) PRICES: ", e)
//           // if(e.value > 0){
//           //   out = -e.price
//           //   // console.log("M: (balanceChange) TTLEAVE with out: ", out)
//           // }else if(e.value < 0){
//           //   out = e.price
//           //   // console.log("M: (balanceChange) TTENTER with out: ", out)
//           // }else{
//           //   out = 0
//           //   // console.log("M: (balanceChange) TTSKIP with out: ", out)
//           // }
//           // return out
//           return e
//         })
//       )
//       )
//       .map((e,i) => ({date:i,value:e/1000}))
//
//     const safeBalanceChange =
//         (() => {
//           for(const price in balanceChange){
//             // console.log("M: (safeBalanceChange) price: ", balanceChange[price])
//           }
//           return edgePrices
//         })()
//         .map((e,i) => ({date:i,value:e}))
//     // console.log(`
//     //       balance change: ${JSON.stringify(balanceChange)}
//     //   `)
//     //   // sum: ${balanceChange.reduce((sum,cur) => sum + cur,0)}
//
//     // let accumulatedDots = balanceChange
//
//
//             let previousNonZeroHeight = 0
//             const balanceBarData = rawData.map((e,i) => {
//               if(i == 0){
//                 previousNonZeroHeight = e.value
//                 return {start: 0, value: e.value}
//               }else{
//                 if(dots[i].value == 0){
//                   return {
//                     start: 0,
//                     value: 0
//                   }
//                 }else{
//                   console.log("previousNonZeroHeight before: ", previousNonZeroHeight)
//                   let sign = 1
//                   if(dots[i].value < 0){
//                     sign = -1
//                   }else if(dots[i].value > 0){
//                     sign = 1
//                   }
//                   let out = {
//                     start: previousNonZeroHeight,
//                     value: e.value * sign
//                   }
//                   previousNonZeroHeight = out.value
//                   console.log("previousNonZeroHeight out: ", out)
//                   console.log("previousNonZeroHeight out: ", out.height)
//                   console.log("previousNonZeroHeight after: ", previousNonZeroHeight)
//                   return out
//                 }
//               }
//             })
//
//             console.log("balanceBarData ", balanceBarData)
//             // console.log(`
//             //   EDGES: ${JSON.stringify(dots)}
//             //   dots: ${JSON.stringify(inputData)}
//               // `)
//
//     // let accumulatedDots = priceApplicationChange
//     let accumulatedDots = balanceBarData
//     // // const profitDots = dots.filter(dot => dot.value > 0)
//     // // const totalProfit = profitDots.reduce((sum,cur) => sum + cur.value,0)
//     // // const percentOfProfitDots = profitDots.length / dots.filter(dot => dot.value != 0).length
//     // // const lossDots = dots.filter(dot => dot.value < 0)
//     // // const totalLoss = lossDots.reduce((sum,cur) => sum + cur.value,0)
//     // // const percentOfLossDots = lossDots.length / dots.filter(dot => dot.value != 0).length
//     // // const outputProfit = totalProfit + totalLoss
//     // //
//     // // const averageGainPerTrade = totalProfit / profitDots.length
//     // // const averageLossPerTrade = totalLoss / lossDots.length
//     // // const expectedLongtermGainlossValue =
//     // //   (averageGainPerTrade * percentOfProfitDots) +
//     // //   (averageLossPerTrade * percentOfLossDots)
//     //
//     const profitDots = edgePrices.filter(dot => dot.value > 0)
//     const lossDots = edgePrices.filter(dot => dot.value < 0)
//     const trades = priceApplicationChange
//     // profitDots.map((e,i) => lossDots[i] ? (e.value + lossDots[i].value) : e.value)
//     // const totalProfit = profitDots.reduce((sum,cur) => sum + cur.price,0)
//     const totalProfit = edgePrices.reduce((sum,cur) => sum + cur.price,0)
//     const percentOfProfitDots = profitDots.length / dots.filter(dot => dot.value != 0).length
//     const totalLoss = lossDots.reduce((sum,cur) => sum - cur.price,0)
//     const percentOfLossDots = lossDots.length / dots.filter(dot => dot.value != 0).length
//     const outputProfit = totalProfit + totalLoss
//
//     const averageGainPerTrade = totalProfit / profitDots.length
//     const averageLossPerTrade = totalLoss / lossDots.length
//     const expectedLongtermGainlossValue =
//       (averageGainPerTrade * percentOfProfitDots) +
//       (averageLossPerTrade * percentOfLossDots)
//
//     console.log("M: (prepareData) edgePrices ", edgePrices)
//     console.log("M: (prepareData) dots ", dots.filter(e => e.value != 0))
//
//     console.log(`M: (prepareData) TRADE REPORT:
//       profitDots: ${profitDots.map(e => e.value)}
//       lossDots: ${lossDots.map(e => e.value)}
//       trades: ${trades.map(e => e.value)}
//
//       totalProfit: ${totalProfit}
//       percentOfProfitDots: ${percentOfProfitDots}
//
//       totalLoss: ${totalLoss}
//       percentOfLossDots: ${percentOfLossDots}
//
//       outputProfit: ${outputProfit}
//
//       averageGainPerTrade: ${averageGainPerTrade}
//       averageLossPerTrade: ${averageLossPerTrade}
//
//       expectedLongtermGainlossValue: ${expectedLongtermGainlossValue}
//
//       `)
//     //
//     // // -----------------------------------------------------------------------------
//     //
//     // console.log("DIRS: ", dirs)
//     // console.log("CUMSUM: ", cumsum)
//     // // console.log("BARS:", directions)
//     // // console.log("BARS AV:", sma4Data.map((e,i) => (e+sma8Data[i])/2))
//     // // console.log("EDGES: ", nills)
//     //
//     // console.log("sma 4 data: ", sma4Data)
//
//
//
//     const map = [
//       "rawData",
//       "sma4",
//       "smoothSma4Data",
//       "sma8",
//       "dirs",
//       "dirZero",
//       "cumsum",
//       "dots",
//       "balance",
//       "profit"
//     ]
//     // console.log("POOLS LENGTHS: ", [
//     //   rawData
//     //   // ,sma4Data,sma8Data,dirs,dirZero,cumsum,dots,accumulatedDots
//     // ].map(e => e.length))
//     const accumulatedData = [
//       rawData,
//       sma4Data,
//       smoothSma4Data,
//       sma8Data,
//       dirs,
//       dirZero,
//       cumsum,
//       dots,
//       accumulatedDots,
//       profit
//     ]
//       .map((g,i) => g.map(record => ({...record,group:map[i]})))
//       .flatMap(e => e)
//
//     console.log(`
//       M: (prepareData)
//       accumulated data: ${accumulatedData}
//       `)
//
//     return accumulatedData
//
// }

export default PrepareData
