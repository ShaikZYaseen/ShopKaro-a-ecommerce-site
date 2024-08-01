import { configureStore } from '@reduxjs/toolkit';
import {productReducer,productDetailsReducer,addReviewReducer, addCartReducer,getCartReducer} from '../slices/ProductSlice.jsx';
import { signupReducer,loginReducer,logoutReducer } from '../slices/UserSlice.jsx'; 

const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails:productDetailsReducer,
    reviews:addReviewReducer,
    signup:signupReducer,
    login:loginReducer,
    logout:logoutReducer,
    cart:addCartReducer,
    showCart:getCartReducer
  },
  devTools: true, 
});

export default store;
