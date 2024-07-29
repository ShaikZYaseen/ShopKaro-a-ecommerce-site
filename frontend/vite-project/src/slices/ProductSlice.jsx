import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductDetails,
  addReview
} from '../thunks/ProductThunk.js';

// Define the initial state for products
const initialProductsState = {
  products: [],
  status: 'idle', 
  error: null,
};

// Create a slice for products
const productSlice = createSlice({
  name: 'products',
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Define the initial state for product details
const initialProductDetailsState = {
  productDetails: null,
  status: 'idle',
  error: null,
};

// Create a slice for product details
const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: initialProductDetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



// Define the initial state for product details
const initialReviewState = {
  reviews: null,
  status: 'idle',
  error: null,
};


// Create a slice for product details
const addReviewSlice = createSlice({
  name: 'productDetails',
  initialState: initialReviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reviews = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});






// Export reducers for configuration
export const productReducer = productSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const addReviewReducer = addReviewSlice.reducer;

