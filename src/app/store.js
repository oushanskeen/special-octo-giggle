import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/users/userSlice'
import strategyReducer from '../features/strategy/strategySlice'
import plotReducer from '../features/plot/plotSlice'
import { pokemonApi } from '../services/pokemon'
import { jsonServerApi } from '../services/jsonServerApi'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    strategy: strategyReducer,
    plot: plotReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [jsonServerApi.reducerPath]: jsonServerApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(pokemonApi.middleware)
    .concat(thunkMiddleware)
    .concat(jsonServerApi.middleware),
})

setupListeners(store.dispatch);
