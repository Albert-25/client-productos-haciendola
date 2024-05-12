import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { getState }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post('http://localhost:3000/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return {...response.data, isJustCreated: true };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ productId, updatedProductData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.put(`http://localhost:3000/products/${productId}`, updatedProductData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
