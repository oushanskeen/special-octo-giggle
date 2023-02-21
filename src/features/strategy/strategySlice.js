import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = {
  interval: 60,
  subInterval: 60,
  chain: 1,
  gainsThreshold: 0.01,
  perspectiveTokens: ["some","tokens"],
  perspectiveTokensFetchStatus: "idle",
  perspectiveTokensFetchError: ""
}

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    // const response = await userAPI.fetchById(userId)
    // return response.data
    const response = await fetch(BASE_URL)
    const data = await response.json()
    return data
  }
)

export const fetchPerspectiveTokens = createAsyncThunk("strategy/fetchPerspectiveTokens", async () => {
    console.log("FETCH")
    const response = await fetch(BASE_URL)
    console.log("FETCH ... 1")
    const data = await response.json()

    console.log("FETCH ... 1 .. ")

    return data
})

// export const getPerspectiveTokens = createAsyncThunk('strategy/getPerspectiveTokens', async () => {
//   // const response = await userAPI.fetchUser()
//   // return "some"
//   dispatch(savePerspectiveTokens(["some", "tokens"]))
// })

// export const fetchPerspectiveTokens = createAsyncThunk('strategy/fetchPerspectiveTokens', async () => {
//   // const response = await client.get('/fakeApi/todos')
//   console.log("Q:fetchPerspectiveTokens")
//   return ["some","tokens"]
// })

const strategySlice = createSlice({
  name: 'strategy',
  initialState,
  reducers: {
    setInterval: (state, action) => {
      state.interval = action.payload
    },
    setChain: (state, action) => {
      state.chain = action.payload
    },
    setGainsThreshold: (state, action) => {
      state.gainsThreshold = action.payload
    },
    setSubInterval: (state, action) => {
      state.subInterval = action.payload
    },
    savePerspectiveTokens: (state, action) => {
      state.perspectiveTokens = action.payload;
    },
    extraReducers: builder => {
      builder
        .addCase(fetchPerspectiveTokens.pending, (state, action) => {
          state.perspectiveTokensFetchStatus = 'loading'
          console.log("FETCH ... 2")
        })
        .addCase(fetchPerspectiveTokens.fulfilled, (state, action) => {
          state.perspectiveTokens = state.perspectiveTokens.concat(action.payload)
          state.perspectiveTokensFetchStatus = 'idle'

          console.log("FETCH ... 3")

          console.log("STATE: ", state)
        })
    }
  }
})

export const selectStrategyInterval = state => {
  return state.strategy.interval
}

export const { setInterval, setChain, setGainsThreshold, setSubInterval } = strategySlice.actions

export default strategySlice.reducer
