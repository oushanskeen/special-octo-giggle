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

  if (isLoading || isFetching) {
    return <div>loading...</div>;
  }

  if (isError) {
    console.log({ error });
    return <div>{error.status}</div>;
  }

  return (
    <>
      <AddStrategy/>
      { data &&
        ["type","name","wallet","gain threshold","sell thld","gain int","trend int","start blns","balances","delete"].map(head => (
          <td style={{width:"10.71%"}}>
            {head}
          </td>)
        )
         // : isFetching ? "" : <div class="module" style={{width:"100%"}}>no strategies found</div>
      }
      {
          data?.map(strategy => <StrategyRecord data={strategy}/>)
      }
    </>
  )
}
