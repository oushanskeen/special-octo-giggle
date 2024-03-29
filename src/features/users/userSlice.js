import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  // const response = await userAPI.fetchUser()
  return "some"
})

const initialState = {
  name: 'No user',
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // fetchUser: state => {
    //   state;
    // }
  },
  // extraReducers: builder => {
  //   builder.addCase(fetchUser.pending, (state, action) => {
  //     state.status = 'loading'
  //   })
  //   builder.addCase(fetchUser.fulfilled, (state, action) => {
  //     state.status = 'complete'
  //     state.name = action.payload
  //   })
  // }
})

export const selectUserName = state => state.user.name
export const selectUserFetchStatus = state => state.user.status
// export const fetchUser = state => state

export default userSlice.reducer
