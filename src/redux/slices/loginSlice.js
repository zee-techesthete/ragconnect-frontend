import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async action for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${rootUrl}/api/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.needsVerification
      ) {
        // If email needs verification, redirect to verification page
        window.location.href = `/verify-email?email=${encodeURIComponent(
          credentials.email
        )}`;
        return rejectWithValue({
          error: "Please verify your email before logging in.",
          needsVerification: true,
        });
      }
      return rejectWithValue(
        error.response?.data?.error || "Login failed. Please try again."
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.success = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed";
      });
  },
});

export const { logout, clearError, clearState } = loginSlice.actions;
export default loginSlice.reducer;
