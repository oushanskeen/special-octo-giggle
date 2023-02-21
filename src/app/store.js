import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/users/userSlice'
import strategyReducer from '../features/strategy/strategySlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    strategy: strategyReducer
  }
})
