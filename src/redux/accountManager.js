import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profileObject: null,
  token: null,
  displayName: "",
}

export const accountManagerSlice = createSlice({
  name: 'accountManager',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setProfileObject: (state, action) => {
      state.profileObject = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setDisplayName, setProfileObject } = accountManagerSlice.actions

export default accountManagerSlice.reducer