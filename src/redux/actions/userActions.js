import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('users/register', async (userData) => {
  const res = await axios.post('http://localhost:3000/users', userData);
  return res.data;
});
