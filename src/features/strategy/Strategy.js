import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectStrategyInterval, setInterval, setChain, setGainsThreshold, setSubInterval, fetchPerspectiveTokens, savePerspectiveTokens, fetchPerspectiveToken, savePerspectiveToken } from './strategySlice'
import { useGetPokemonByNameQuery, useGetTokenByNameQuery } from '../../services/pokemon'


export default function Strategy(){

  const dispatch = useDispatch()

  const IntervalSlider = () => {

    const interval = useSelector(state => state.strategy.interval)
    const intervals = [60, 300, 600, 1800, 3600]

    return(
      <div class="module sliderbox">
          <div id="intervalValue">
              interval: {interval}
          </div>
           <input
              type="range"
              min="0"
              max="4"
              value={intervals.indexOf(interval)}
              onChange={(e) => dispatch(setInterval(intervals[e.target.value]))}
              class="slider"
              id="intervalSlider"
              step="1"
            />
      </div>
    )
  }

  const ChainsSlider = () => {

    const chain = useSelector(state => state.strategy.chain)

    let chains = {
      1: "eth",
      10: "optimism",
      56: "bsc",
      137: "polygon",
      250: "fantom",
      42161: "arbitrum",
      43114: "avalanche",
      100: "gnosis",
      42220: "celo"
    }
    let chainIds = Object.keys(chains)

    return(
      <div class="module sliderbox">
          <div id="chainValue">
              chain: {chain} {chains[chain]}
          </div>
           <input
              type="range"
              min="0" max="8"
              value={chainIds.indexOf(chain)}
              onChange={(e) => dispatch(setChain(chainIds[e.target.value]))}
              class="slider"
              id="chainSlider"
              step="1"
            />
      </div>
    )
  }

  const GainsThresholdSlider = () => {
    const gainsThreshold = useSelector(state => state.strategy.gainsThreshold)
    return(
      <div class="module sliderbox">
          <div id="gainsThresholdValue">
              gains threshold: {gainsThreshold}
          </div>
           <input
              type="range"
              min="0.01" max="1"
              value={gainsThreshold}
              onChange={(e) => dispatch(setGainsThreshold(e.target.value))}
              class="slider"
              id="gainsThresholdSlider"
              step="0.01"
            />
      </div>
    )
  }

  const SubIntervalSlider = () => {

    const subInterval = useSelector(state => state.strategy.subInterval)
    const interval = useSelector(state => state.strategy.interval)
    const intervals = [60, 300, 600, 1800, 3600]

    return(
      <div class="module sliderbox">
         <div id="subIntervalValue">
            sub interval: {subInterval}
         </div>
         <input
            type="range"
            min="0" max={intervals.indexOf(interval) - 1}
            value={intervals.indexOf(subInterval)}
            onChange={(e) => dispatch(setSubInterval(intervals[e.target.value]))}
            class="slider"
            id="subIntervalValueSlider"
            step="1"
          />
      </div>
    )
  }

  const GetPerspectiveTokensButton = () => {

    const interval = useSelector(state => state.strategy.interval)
    const chainId = useSelector(state => state.strategy.chain)
    const gainsThreshold = useSelector(state => state.strategy.gainsThreshold)
    const subInterval = useSelector(state => state.strategy.subInterval)

    const state = useSelector(state => state)

    const fetchTokens = () => {
        // const tokens = await
        dispatch(fetchPerspectiveTokens({
          interval: interval,
          chainId: chainId,
          gainsThreshold: gainsThreshold,
          subInterval: subInterval
        }))
        // console.log("READY TO SAVE")
        // dispatch(savePerspectiveTokens(tokens.payload))
    }

    const perspectiveTokens = useSelector(state => state.strategy.perspectiveTokens)
    const perspectiveTokensStatus = useSelector(state => state.strategy.perspectiveTokensFetchStatus)

    useEffect(() => {
      console.log("USEEFFECT HOOK IS TRIGGERED")
      console.log("perspectiveTokensStatus: ", perspectiveTokens)
      if (perspectiveTokensStatus === 'idle') {
        console.log("TOKENS FETCH IS TRIGGERED")
        fetchTokens()
        // dispatch(fetchPerspectiveTokens({
        //   interval: interval,
        //   chainId: chainId,
        //   gainsThreshold: gainsThreshold,
        //   subInterval: subInterval
        // }))
      }
    }, [perspectiveTokensStatus, dispatch])

    return (<>
        <button onClick={(e) => fetchTokens()}>
            get perspective tokens
        </button>
        <div>TOKENS</div>
        <div>{JSON.stringify(perspectiveTokens)}</div>
      </>
    )
  }

  const PerspectiveTokenTable = () => {

    const strategyState = useSelector(state => state.strategy)
    let {interval, chain, gainsThreshold, subInterval} = strategyState

    const { refetch, data, error, isLoading, isFetching } = useGetPokemonByNameQuery({
      interval: interval,
      chainId: chain,
      gainThreshold: gainsThreshold,
      subInterval: subInterval
    })

    let tokens = data && data.tokens
    console.log("TOKENS: ", tokens)

    const PerspectiveToken = ({tokenData}) => {

      console.log("TOKENDATA")

      const handleBuy = (payload) => {
          console.log("HANDLE BUY: ", payload);
      }

      let chainId = useSelector(state => state.strategy.chain)

      const { refetch, data, error, isLoading, isFetching } = useGetTokenByNameQuery({
        // interval: interval,
        tokenId: tokenData,
        chainId: chain,
        // gainThreshold: gainsThreshold,
        // subInterval: subInterval
      })

      data && console.log("DATA: ", data)
      let name, volume, liquidity, price, delta
      if(data){
        // let {name, volume24hUSD, liquidityUSD} = data.data[0]
        name = data.data[0].name
        volume = data.data[0].volume24hUSD
        liquidity = data.data[0].liquidityUSD
        price = data.data[0].priceUSD
        delta = data.data[0].priceUSDChange24h
      }

      return (<div class="perspectiveTokenRecord module box">
        <>
          {
            isFetching
            ? <td>...token data is fetching</td>
            : <>
                <td>{tokenData}</td>
                <td>{name}</td>
                <td>{volume}</td>
                <td>{liquidity}</td>
                <td>{price}</td>
                <td>{delta}</td>
                <td>strategy</td>
                <td><div class="btn">buy</div></td>
              </>
          }
        </>
      </div>)
    }


    return (<>
        <div>GET PERSPECTIVE TOKENS {isFetching && <p>...is loading</p>}</div>
        <div class="perspectiveTokenRecord module box">
          {
            ["id","name","volume","liquidity","price","delta","strategy",""].map(head => (
              <td>
                {head}
              </td>)
            )
          }
      </div>
        {
          tokens && tokens.map(tokenData => <PerspectiveToken tokenData={tokenData}/>)
        }
      </>
    )
  }

  const Pokemon = () => {

    // const strategyState = useSelector(state => state.strategy)
    // let {interval, chain, gainsThreshold, subInterval} = strategyState
    //
    //
    // const { refetch, data, error, isLoading, isFetching } = useGetPokemonByNameQuery({
    //   interval: interval,
    //   chainId: chain,
    //   gainThreshold: gainsThreshold,
    //   subInterval: subInterval
    // })
    //
    // console.log("QUERY PARAMS: ", useGetPokemonByNameQuery)
    //
    // const doRefetch = () => {
    //   console.log("BEFORE REFATCH PARAMS: ", strategyState)
    //   // console.log("BEFORE REFATCH LOCAL PARAMS: ", myState)
    //   refetch()
    // }
    //
    //
    // return (<>
    //     <div>
    //       {
    //         isFetching
    //         ? <h1>...perspective tokens pending for default strategy</h1>
    //         :
    //           data.tokens.length == 0
    //           ? <h1>seems nothing interesting for default strategy</h1>
    //           : <div>{data.tokens.map((token,id) => <div>id:{id} token:{token}</div>)}</div>
    //           // <button onClick={() => doRefetch()}>recalculate</button>
    //       }
    //     </div>
    //   </>)
  }

  return (<>
        <div class="module box">
            <IntervalSlider/>
            <SubIntervalSlider/>
            <ChainsSlider/>
            <GainsThresholdSlider/>
            {
              // <GetPerspectiveTokensButton/>
            }
          </div>
          <Pokemon/>
          <div>
            <PerspectiveTokenTable/>
          </div>
    </>
  );
}