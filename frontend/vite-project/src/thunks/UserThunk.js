import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Signup
export const signup = createAsyncThunk(
  'users/signup',
  async (form) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/register', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Return the response data to be used in the slice
      return response.data;
    } catch (error) {
      // Return the error message or custom error object
      return error.response.data || 'An error occurred.';
    }
  }
);



//Login
export const login = createAsyncThunk(
  'users/login',
  async (form) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', form);
      // Return the response data to be used in the slice
      return response.data
    } catch (error) {
      // Return the error message or custom error object
      return error.response.data || 'An error occurred.';
    }
  }
);
