import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for Google authentication
export const authenticateGoogle = createAsyncThunk(
  "auth/authenticateGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootUrl}/api/auth/google`);
      return response.data; // Return the authentication URL
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const googleAuthSlice = createSlice({
  name: "googleAuth",
  initialState: {
    isLoading: false,
    isConnected: false,
    authUrl: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateGoogle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticateGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authUrl = action.payload.url;
        state.isConnected = true;
        window.location.href = action.payload.url; // Redirect to Google OAuth
      })
      .addCase(authenticateGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default googleAuthSlice.reducer;
