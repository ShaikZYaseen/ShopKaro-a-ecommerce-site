import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ minPrice , maxPrice , category } ) => {
    try {
      // Construct URL with proper encoding
      let link = `http://localhost:8080/api/v1/products?minprice=${encodeURIComponent(minPrice)}&maxprice=${encodeURIComponent(maxPrice)}`;
      if (category) {
        link += `&category=${encodeURIComponent(category)}`;
      }
      
      console.log("Request URL:", link);
      
      const response = await axios.get(link);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }
);


export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',async({id})=>{
    try {
      let link = `http://localhost:8080/api/v1/product/${id}`;
      const response = await axios.get(link);
      
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
)


export const addReview = createAsyncThunk(
  'product/addReview',
  async (review, { rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:8080/api/v1/review',review,{ withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



export const addCart = createAsyncThunk(
  'product/addCart',
  async (form, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/cart',form,{ withCredentials: true });
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);