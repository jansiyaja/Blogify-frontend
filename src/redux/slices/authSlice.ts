import { createSlice } from '@reduxjs/toolkit';

export interface User {
  id:string
  name: string;
  email: string;
  about?: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string;
  refreshToken: string;
}
const initialState: AuthState = {
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
      state.accessToken = action.payload.accessToken;
      state.refreshToken=action.payload.refreshToken
      
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
