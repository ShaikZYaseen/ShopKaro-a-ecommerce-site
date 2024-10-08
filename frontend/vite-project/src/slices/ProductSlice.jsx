import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProducts,
  fetchProductDetails,
  addReview,
  addCart,
  getCart,
  removeCart
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
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


// Define the initial state for product details
const initialaddcartState = {
  cart: null,
  status: 'idle',
  error: null,
};


// Create a slice for product details
const addCartP = createSlice({
  name: 'addCart',
  initialState: initialaddcartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



// Define the initial state for product details
const initialgetcartState = {
  cart: null,
  status: 'idle',
  error: null,
};


// Create a slice for product details
const getCartP = createSlice({
  name: 'getCart',
  initialState: initialgetcartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});




// Define the initial state for product details
const initialremovecartState = {
  cart: null,
  status: 'idle',
  error: null,
};


// Create a slice for product details
const removeCartP = createSlice({
  name: 'removeCart',
  initialState: initialremovecartState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});






// Export reducers for configuration
export const productReducer = productSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
export const addReviewReducer = addReviewSlice.reducer;
export const addCartReducer = addCartP.reducer;
export const getCartReducer = getCartP.reducer;
export const removeCartReducer = removeCartP.reducer;

