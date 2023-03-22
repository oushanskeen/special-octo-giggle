import * as d3 from "d3"

const profitFromBalance = (balanceFlow) => {
  const acc = []
  for(let i = 0;i < balanceFlow.length - 2 + 1; i += 2){
    // acc.pushbalanceFlow[i]
    // acc.push(balanceFlow[i])
    let start = balanceFlow[0]
    let first = start + balanceFlow[i] + balanceFlow[i + 1]
    let second = (balanceFlow[i] + balanceFlow[i + 1])
    let max = d3.max(balanceFlow.slice(0,i+1))
    // balanceFlow[i+1] = max

    balanceFlow[i] = start
    balanceFlow[i+1] = start

    // balanceFlow[i+1] =
    // balanceFlow[i] = 0
    // balanceFlow[i + 1] = 0
    console.log("M: (profitFromBalance) balanceFlow: " + balanceFlow)
  }
  return balanceFlow
}

// console.log("Balance acc: ", profitFromBalance([-2,3,-2,3,-5,8,-4,8]))
export default profitFromBalance
