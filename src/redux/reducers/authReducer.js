import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../actions/authActions';

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token);
      state.isAuthenticated = action.payload.success;
      state.token = action.payload.token;
    });
    builder.addCase(login.rejected, (state, action) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.token = action.payload.token;
    });
    builder.addCase(logout.fulfilled, (state) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      state.token = '';
    });
  },
});

export default authSlice.reducer;
