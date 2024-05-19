import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from '../actions/authActions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('token', action.payload.token);
        state.isAuthenticated = action.payload.success;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
        state.token = null;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('token');
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export default authSlice.reducer;
