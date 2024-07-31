import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Signup
export const signup = createAsyncThunk(
  'users/signup',
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/register', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Return the response data to be used in the slice
      return response.data;
    } catch (error) {
      // Use rejectWithValue to properly handle errors in the thunk
      return rejectWithValue(error.response.data || 'An error occurred.');
    }
  }
);

// Login
export const login = createAsyncThunk(
  'users/login',
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', form,{ withCredentials: true });
      // Return the response data to be used in the slice
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log(response.data)
      return response.data;
    } catch (error) {
      // Use rejectWithValue to properly handle errors in the thunk
      return rejectWithValue(error.response.data || 'An error occurred.');
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      console.log("Hello")
      const response = await axios.get('http://localhost:8080/api/v1/logout');
      // Return the response data to be used in the slice
      console.log(response.data)
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      // Use rejectWithValue to properly handle errors in the thunk
      return rejectWithValue(error.response.data || 'An error occurred.');
    }
  }
);
