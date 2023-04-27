import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let BASE_URL = "https://deals-stage-lax.dexguru.biz"

// const send = await fetch('https://deals-stage-lax.dexguru.biz/v1/deals/strategies',{
//    method: "POST",
// })
// const strategy =  JSON.stringify({
//   "strategy_type": "string",
//   "strategy_name": "" + Date.now(),
//   "gain_threshold": 0,
//   "sell_threshold": 0,
//   "gain_interval": 0,
//   "trending_interval": 0,
//   "minimum_stable_starting_balance": 0
// })

export const pokemonApi = createApi({
  reducerPath: 'strategyApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 0,
  tagTypes: ['Post','Patch','Delete'],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: ({interval,chainId,gainThreshold,subInterval}) => {
        console.log("QUERY: ", `/v1/deals/find?interval=${interval}&chain_id=${chainId}&gain_threshold=${gainThreshold}&trending_interval=${subInterval}`)
        return `/v1/deals/find?interval=${interval}&chain_id=${chainId}&gain_threshold=${gainThreshold}&trending_interval=${subInterval}`
      },
    }),
    getTokenByName: builder.query({
      query: ({tokenId,chainId}) => {
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
        let requestBody = "{\"ids\":[\"" + tokenId + "-" + chains[chainId] + "\"],\"limit\":1,\"network\":\"" + chains[chainId] + "\"}";
        console.log("TOKEN REQUEST BODY: ", requestBody);
        return ({
          url: "/v3/tokens/",
          method: "POST",
          body: requestBody,
        })
      },
    }),
    getAllStrategies: builder.query({
      query: () => {
        console.log("QUERY: ", `/v1/deals/strategies`)
        return `/v1/deals/strategies`
      },
      providesTags: ['Post']
    }),
    getTokenCandles: builder.query({
      query: (
       // token = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
       // resolutionScope = "1",
       // resolutionDimension = "D",
       // start = "1656374400",
       // stop = "1682380800"
      ) => {
        console.log('M: [pokemon.js] getTokenCandles')
        // console.log('M: [pokemon.js] getTokenCandles: ' + `v1/tradingview/history?symbol=${token}-eth_USD&resolution=${resolutionScope}${resolutionDimension}&from=${start}&to=${stop}`)
        // return `v1/tradingview/history?symbol=${token}-eth_USD&resolution=${resolutionScope}${resolutionDimension}&from=${start}&to=${stop}`
        return "v1/tradingview/history?symbol=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth_USD-indicators&resolution=60&from=1676903524&to=1677983524"
      },
    }),
    getTokenCandlesTimeBound: builder.query({
      query: ({token,network,start,end,resolution}) => {
        console.log("START END: ", token, network,start, end)
        return `v1/tradingview/history?symbol=${token}-${network}_USD&resolution=${resolution}&from=${start}&to=${end}`
        // v1/tradingview/history?symbol=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth_USD-indicators&resolution=60&from=1676903524&to=1677983524
      },
    }),
    patchStrategy: builder.mutation({
      query: (strategy) => ({
        url: "/v1/deals/strategies",
        method: 'POST',
        body:
          {
              "strategy_type": strategy.type,
              "strategy_name": strategy.name,
              "gain_threshold": strategy.gainsThreshold,
              "sell_threshold": strategy.sellThreshold,
              "gain_interval": strategy.gainInterval,
              "trending_interval": strategy.trendingInterval,
              "minimum_stable_starting_balance": strategy.startBalance
          },
      }),
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled
        // let payload = await data
        // console.log("QUERY FILLED: ", data)
        setTimeout(() => {
          dispatch(pokemonApi.util.invalidateTags(['Post']))
        }, 1000)
      },
      transformResponse: (response) => {
        console.log("PATCH RESPONSE: ", response)
        console.log("pokemonApi: ", pokemonApi)
      },
      // invalidatesTags: ['Post']
    }),
    deleteStrategy: builder.mutation({
      query: (strategyName) => {
        console.log("DELETE MUTATION strategyName, ", strategyName)
        console.log("QUERY: ", "/v1/deals/strategies/delete/?strategy_name=" + strategyName)
        return {
          url: "/v1/deals/strategies/delete/?strategy_name=" + strategyName,
          method: 'DELETE'
        }
      },
      async onQueryStarted(props, { dispatch, queryFulfilled }) {
        await queryFulfilled
        // let payload = await data
        // console.log("QUERY FILLED: ", data)
        setTimeout(() => {
          dispatch(pokemonApi.util.invalidateTags(['Post']))
        }, 1000)
      },
      // transformResponse: (response) => {
      //   console.log("DELETE RESPONSE: ", response)
      //   console.log("pokemonApi: ", pokemonApi)
      // },
      // invalidatesTags: ['Post']

      // providesTags: ['Post']
    }),
  }),
})
export const { useGetPokemonByNameQuery, useGetTokenByNameQuery, useGetAllStrategiesQuery, useGetTokenCandlesQuery, usePatchStrategyMutation, useDeleteStrategyMutation, useGetTokenCandlesTimeBoundQuery } = pokemonApi
