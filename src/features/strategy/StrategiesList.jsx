import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { selectStrategyInterval, setInterval, setChain, setGainsThreshold, setSubInterval, fetchPerspectiveTokens, savePerspectiveTokens, fetchPerspectiveToken, savePerspectiveToken } from './strategySlice'
import { useGetAllStrategiesQuery, usePatchStrategyMutation, useDeleteStrategyMutation } from '../../services/pokemon'
import AddStrategy from './AddStrategy'
import StrategyRecord from './StrategyRecord'

export default function StrategiesList(){

  const { refetch, data, error, isLoading, isFetching, isError } = useGetAllStrategiesQuery()
  // const [updatePost, { isLoading: isUpdating }] = usePatchStrategyMutation()

  // if (isUpdating) {
  //   return <div>updating...</div>;
  // }

  const [isAddStrategyFormVisible, setStrategyFormVisibility] = useState(false)

  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }


  return (
    <>
     <div class="module" style={{margin:"auto", padding:"17px", justifyContent:"center",alignItems:"center"}}>
        <h3 style={{margin:"auto"}}>STRATEGIES </h3>
        <div class="btn" style={{height:"20px",padding:"0px",margin:"auto"}} onClick={() => setStrategyFormVisibility(!isAddStrategyFormVisible)}>+</div>
    </div>
      {
        isAddStrategyFormVisible && <AddStrategy/>
      }
      <div class="module box">
      { data &&
        ["type","name","wallet","gain threshold","sell thld","gain int","trend int","start blns","balances","delete"].map(head => (
          <th>
            {head}
          </th>)
        )
         // : isFetching ? "" : <div class="module" style={{width:"100%"}}>no strategies found</div>
      }
      </div>
      {
          data?.map(strategy => <StrategyRecord data={strategy}/>)
      }
    </>
  )
}
