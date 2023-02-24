import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { selectStrategyInterval, setInterval, setChain, setGainsThreshold, setSubInterval, fetchPerspectiveTokens, savePerspectiveTokens, fetchPerspectiveToken, savePerspectiveToken } from './strategySlice'
import { useGetAllStrategiesQuery } from '../../services/pokemon'

export default function StrategiesList(){

  const { refetch, data, error, isLoading, isFetching } = useGetAllStrategiesQuery()

  const StrategyRecord = ({data}) => {

    const [balanceUnfold, setBalanceUnfold ] = useState(false)

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

  return (
    <>
      <h3>strategies list</h3>
      {
        isFetching
        ? <div>...is fetching</div>
        : data.map(strategy => <StrategyRecord data={strategy}/>)

      }
    </>
  )
}
