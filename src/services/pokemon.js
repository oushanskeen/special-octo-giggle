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
  }),
})
export const { useGetPokemonByNameQuery } = pokemonApi
