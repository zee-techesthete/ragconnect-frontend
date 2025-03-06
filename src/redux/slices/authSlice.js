import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${rootUrl}/api/auth/signup`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  }
);

// Async thunk for verifying email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootUrl}/api/auth/verify-email?token=${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    signupSuccess: false,
    verificationSuccess: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.signupSuccess = false;
      state.verificationSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signupSuccess = false;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = action.payload;
      })

      // Handle Email Verification
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.verificationSuccess = false;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.verificationSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.verificationSuccess = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
