import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../../utils/apiConfig";

const { apiUrl } = config;

export const registerUser = createAsyncThunk('users/register', async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${apiUrl}/users`, userData);
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

      const res = await axios.get(`${apiUrl}/users/me`, {
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

export const changeUserPassword = createAsyncThunk(
  'users/changePassword',
  async ({ currentPassword, newPassword }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const id = getState().user.userInfo.id;

      const res = await axios.put(
        `${apiUrl}/users/change-password/${id}`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);