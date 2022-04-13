import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
}

export const tokenManagerSlice = createSlice({
  name: 'tokenManager',
  initialState,
  reducers: {
    setToken: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = tokenManagerSlice.actions

export default tokenManagerSlice.reducer