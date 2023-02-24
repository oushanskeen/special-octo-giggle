import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

let BASE_URL = "https://api-stage-lax.dexguru.biz"

export const pokemonApi = createApi({
  reducerPath: 'strategyApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 0,
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
        // let response = await fetch("https://api-stage.dex.guru/v3/tokens", {
        //       "body": requestBody,
        //       "method": "POST",
        //   });

        return ({
          url: "/v3/tokens/",
          method: "POST",
          body: requestBody,

        })
        // console.log("QUERY: ", `/v1/deals/find?interval=${interval}&chain_id=${chainId}&gain_threshold=${gainThreshold}&trending_interval=${subInterval}`)
        // return `/v1/deals/find?interval=${interval}&chain_id=${chainId}&gain_threshold=${gainThreshold}&trending_interval=${subInterval}`
      },
    }),
  }),
})
export const { useGetPokemonByNameQuery, useGetTokenByNameQuery } = pokemonApi
