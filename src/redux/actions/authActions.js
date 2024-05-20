import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../utils/apiConfig";

const { apiUrl } = config;

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, userData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
});
