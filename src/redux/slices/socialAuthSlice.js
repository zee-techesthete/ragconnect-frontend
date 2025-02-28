import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Generic async thunk for social authentication
export const authenticateSocial = createAsyncThunk(
  "auth/authenticateSocial",
  async (platform, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootUrl}/api/auth/${platform.toLowerCase()}`);
      return { platform, url: response.data.url };
    } catch (error) {
      return rejectWithValue({ platform, error: error.response.data });
    }
  }
);

const socialAuthSlice = createSlice({
  name: "socialAuth",
  initialState: {
    isLoading: false,
    isConnected: {},
    authUrls: {},
    errors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticateSocial.pending, (state, action) => {
        state.isLoading = true;
        state.errors[action.meta.arg] = null;
      })
      .addCase(authenticateSocial.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authUrls[action.payload.platform] = action.payload.url;
        state.isConnected[action.payload.platform] = true;
        window.location.href = action.payload.url; // 🔴 Redirect happens here

      })
      .addCase(authenticateSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.errors[action.payload.platform] = action.payload.error || "Something went wrong";
      });
  },
});

export default socialAuthSlice.reducer;
