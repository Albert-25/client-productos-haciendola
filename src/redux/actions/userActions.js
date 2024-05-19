import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk('users/register', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post('http://localhost:3001/users', userData);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});


export const fetchLoggedInUser = createAsyncThunk(
  'users/fetchLoggedInUser',
  async (_, { getState, rejectWithValue }) => {
    try {

      const token = getState().auth.token;

      const res = await axios.get('http://localhost:3001/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);