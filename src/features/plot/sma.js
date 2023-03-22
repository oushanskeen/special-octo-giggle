const sma = (pool,windowSize) => {
  console.log(`
    M: (sma) input pool length: ${pool.length}
    M: (sma) windowSize: ${windowSize}
  `)
  let newPool = new Array(pool.length).fill(0)
  if(windowSize == 0){
    newPool = pool
  }else{
    for(let i = 0; i < (pool.length - windowSize); i++){
      newPool[windowSize + i] = pool.slice(i,windowSize + i).reduce((sum,cur) => sum + cur,0)/windowSize
    }
  }
  console.log("M: (sma) out pool length: ", newPool.length)
  return newPool
}

// console.log("new pool: ", sma(pool,4))
export default sma
