import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API Base URL
const rootUrl = import.meta.env.VITE_ROOT_URL;

// **Thunk to Request Reset Link**
export const requestPasswordReset = createAsyncThunk(
  "resetPassword/request",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(`${rootUrl}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// **Thunk to Reset Password**
export const resetPassword = createAsyncThunk(
  "resetPassword/confirm",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${rootUrl}/auth/reset-password-confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Reset failed");
      return data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Request Password Reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Confirm Password Reset
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
