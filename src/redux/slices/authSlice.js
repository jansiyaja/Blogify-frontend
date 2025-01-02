import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: '',
  refreshToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState ,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      
    },
    setUser(state, action) { 
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const { setCredentials, logout,setUser } = authSlice.actions;
export default authSlice.reducer;
