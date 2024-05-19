import { createSlice } from '@reduxjs/toolkit';
import { registerUser, fetchLoggedInUser, changeUserPassword } from '../actions/userActions';

const initialState = {
  loading: false,
  userInfo: {
    id: 0,
    userName: '',
    email: '',
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
