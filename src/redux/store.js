import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import googleAuthSlice from "./slices/googleAuthSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    googleAuth: googleAuthSlice,

  },
});

export default store;
