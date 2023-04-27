const smoother = (pool) => {

  for(let i = 1; i < pool.length - 1;i++){
    console.log("M: (smoother) pool[i] ", pool[i])
    // if(i == 0){
    //   continue
    // }else{
      pool[i] = (pool[i-1] + pool[i+1])/2
      console.log("M: (smoother) out pool" , pool)
    // }
  }
  return pool
}

// console.log("M: (smoother) smooth: ", smoother([1,8,3,8,5,8,7,8,9]))//[1,2,3,4,5,6,7,8,9]
export default smoother
