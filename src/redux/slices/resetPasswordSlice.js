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
      return rejectWithValue(
        error.response?.data?.error || "Failed to send reset instructions"
      );
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
      return rejectWithValue(
        error.response?.data?.error || "Failed to reset password"
      );
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Request Password Reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
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
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
