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
    clientIds: {},    
    clientInfos: {}, 
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
        const { platform, url } = action.payload;

        // Extract client_id and client_info from the URL
        const urlParams = new URL(url).searchParams;
        const clientId = urlParams.get("client_id") || "";
        const clientInfo = urlParams.get("client_info") || "";

        // Store values dynamically per platform
        state.authUrls[platform] = url;
        state.clientIds[platform] = clientId;
        state.clientInfos[platform] = clientInfo;
        state.isConnected[platform] = true;

        // Redirect to the authentication URL
        window.location.href = url;

      })
      .addCase(authenticateSocial.rejected, (state, action) => {
        state.isLoading = false;
        state.errors[action.payload.platform] = action.payload.error || "Something went wrong";
      });
  },
});

export default socialAuthSlice.reducer;
