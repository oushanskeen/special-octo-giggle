import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/users/userSlice'
import strategyReducer from '../features/strategy/strategySlice'
import { pokemonApi } from '../services/pokemon'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    strategy: strategyReducer,
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(pokemonApi.middleware)
    .concat(thunkMiddleware),
})
