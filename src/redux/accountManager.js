import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  profileId: null,
  userName: "",
  displayName: "",
}

export const accountManagerSlice = createSlice({
  name: 'accountManager',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setProfileId, setUserName, setDisplayName } = accountManagerSlice.actions

export default accountManagerSlice.reducer