let pool = [1,2,1,-1,-2,-1,1,2,1,-1,-2,-1]

const edges = (pool) => {
  let poolIndices = []
  for(let i = 0; i < pool.length -2; i++){
    // console.log("i: ", i)
    // console.log("pool[i]: ", pool[i])
    if(pool[i] <= 0 && pool[i + 1] > 0){
      poolIndices.push(10)
      poolIndices.push(10)
      console.log("go up")
    }else if(pool[i] >= 0 && pool[i + 1] < 0){
      poolIndices.push(-10)
      poolIndices.push(-10)
      console.log("go down")
    }else{
      poolIndices.push(0)
    }
  }
  return poolIndices
}

console.log(edges(pool))

export default edges
