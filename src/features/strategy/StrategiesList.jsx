import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { selectStrategyInterval, setInterval, setChain, setGainsThreshold, setSubInterval, fetchPerspectiveTokens, savePerspectiveTokens, fetchPerspectiveToken, savePerspectiveToken } from './strategySlice'
import { useGetAllStrategiesQuery } from '../../services/pokemon'
import AddStrategy from './AddStrategy'

export default function StrategiesList(){

  const { refetch, data, error, isLoading, isFetching } = useGetAllStrategiesQuery()

  const StrategyRecord = ({data}) => {

    const [balanceUnfold, setBalanceUnfold ] = useState(false)

    const handleDeleteSrategy = async () => {
      const d = await fetch("https://deals-stage-lax.dexguru.biz/v1/deals/strategies/delete/?strategy_name=" + data.strategy_name,{
        method:"DELETE"
      })
    }

    console.log("STRATEGY NAME: ", data.strategy_name)

    return (
      <div class="module">
        <div class="box">
          <td>{data.strategy_type}</td>
          <td>{data.strategy_name}</td>
          <td>{data.wallet_address}</td>
          <td>{data.gain_threshold}</td>
          <td>{data.sell_threshold}</td>
          <td>{data.gain_interval}</td>
          <td>{data.trending_interval}</td>
          <td>{data.minimum_stable_starting_balance}</td>
          <td class="pointer" onClick={() => setBalanceUnfold(!balanceUnfold)}>balances</td>
          <td><div class='btn' onClick={handleDeleteSrategy}>x</div></td>
          </div>
          { balanceUnfold &&
            data.balance_token.map(balance =>
              <div>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>{balance.chain_id}</td>
                <td class="bullet">{balance.token_address}</td>
              </div>
            )
          }
      </div>
    )
  }


  const [isFormVisible,setFormVisibility] = useState(false)
  const handleStrategyFormVisibility = () => {
      setFormVisibility(!isFormVisible)
  }

  return (
    <>
      <div class="module box center">
          <h3>strategies list</h3>
          <div class="btn" onClick={handleStrategyFormVisibility}>+</div>
      </div>
      {
        isFormVisible && <AddStrategy/>
      }
      { data &&
        ["type","name","wallet","gain threshold","sell thld","gain int","trend int","start blns","balances","delete"].map(head => (
          <td style={{width:"10.71%"}}>
            {head}
          </td>)
        )
         // : isFetching ? "" : <div class="module" style={{width:"100%"}}>no strategies found</div>
      }
      {
        isFetching
        ? <div>...is fetching</div>
        : data.map(strategy => <StrategyRecord data={strategy}/>)

      }
    </>
  )
}
