import { configureStore } from '@reduxjs/toolkit';
import {productReducer,productDetailsReducer} from '../slices/ProductSlice.jsx'; 

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails:productDetailsReducer,
  },
  devTools: true, 
});

export default store;
