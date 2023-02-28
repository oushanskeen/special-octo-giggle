import { useDeleteStrategyMutation, useGetAllStrategiesQuery } from '../../services/pokemon'
import {useState} from 'react'

export default function StrategyRecord({data}){

  const [updatePost, { isLoading: isDeleting }] = useDeleteStrategyMutation()
  const { refetch, isFetching, isLoading } = useGetAllStrategiesQuery()
  const handleDeleteSrategy = async () => {
    await updatePost(data.strategy_name)
    .unwrap()
    .then(() => {
      refetch()
    })
  }
  const [balanceUnfold, setBalanceUnfold ] = useState(false)

  // const handleDeleteSrategy = async () => {
  //   const d = await fetch("https://deals-stage-lax.dexguru.biz/v1/deals/strategies/delete/?strategy_name=" + data.strategy_name,{
  //     method:"DELETE"
  //   })
  // }

  console.log("STRATEGY NAME: ", data.strategy_name)

  const StrategyItem = () => {
    return (
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
    )
  }

  // { balanceUnfold &&
  //   data.balance_token.map(balance =>
  //     <div>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td></td>
  //     <td>{balance.chain_id}</td>
  //     <td class="bullet">{balance.token_address}</td>
  //     </div>
  //   )
  // }
  return (
    <div class="module">
      {
        isFetching || isLoading
        ? <div>...is loading</div>
          : isDeleting
            ? <div>...is deleting</div>
            :
            <StrategyItem/>
      }
    </div>
  )
}
