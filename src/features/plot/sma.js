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
      console.log(`
        M: (sma) window value: ", ${newPool[windowSize + i]}
        M: (sma) i: ${i}
        M: (sma) windowSize: ${windowSize}
        M: (sma) output pool length: ${newPool.length}
      `)
    }
  }
  console.log(`
    M: (sma) output pool length: ${newPool.length}
    M: (sma) windowSize: ${windowSize}
  `)
  return newPool
}

// console.log("new pool: ", sma([1,2,3,4,5,6],2))//[0,0,1,5,2.5,3.5,4.5,]

// console.log("new pool: ", sma(pool,4))
export default sma
