import { createSlice } from '@reduxjs/toolkit';
import { signup, login, logout } from '../thunks/UserThunk';

const storedUser = JSON.parse(localStorage.getItem('user'));

// Define the initial state for both signup and login
const initialState = {
  user: storedUser||{},
  status: 'idle',
  error: null,
};


const initialState1 = {
  user: {
    avatar: '',
   
  },
  status: 'idle',
  error: null,
};

// Create a slice for user signup
const signupSlice = createSlice({
  name: 'signup',
  initialState:initialState1,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors if any
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Store user data
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store error message
      });
  },
});

// Create a slice for user login
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors if any
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Store user data
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store error message
      });
  },
});



const initialState2 = {
  user:{},
  status: 'idle',
  error: null,
};

// Create a slice for user signup
const logoutSlice = createSlice({
  name: 'logout',
  initialState:initialState2,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear previous errors if any
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload; // Store user data
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store error message
      });
  },
});





// Export the reducers
export const signupReducer = signupSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const logoutReducer = logoutSlice.reducer;


