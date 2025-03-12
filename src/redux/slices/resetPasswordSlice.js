import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const rootUrl = import.meta.env.VITE_ROOT_URL;

// **Thunk to Request Reset Link**
export const requestPasswordReset = createAsyncThunk(
  "resetPassword/request",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${rootUrl}/api/auth/forgot-password`, {
        email,
      });
      return response.data.message;
    } catch (error) {
      // Get the most specific error message available
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Failed to send reset instructions";
      return rejectWithValue(errorMessage);
    }
  }
);

// **Thunk to Reset Password**
export const resetPassword = createAsyncThunk(
  "resetPassword/confirm",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${rootUrl}/api/auth/reset-password`, {
        token,
        password,
      });
      return response.data.message;
    } catch (error) {
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Failed to reset password";
      return rejectWithValue(errorMessage);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Request Password Reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm Password Reset
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
