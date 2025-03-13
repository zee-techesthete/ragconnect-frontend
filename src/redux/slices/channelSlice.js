import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for fetching user connectors (channels)
export const fetchUserConnectors = createAsyncThunk(
  "channels/fetchUserConnectors",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      console.log("channelSlice - Making API call with:", { userId, hasToken: !!token });
      
      if (!userId || !token) {
        throw new Error("Missing userId or token");
      }

      const response = await axios.get(`${rootUrl}/api/user-connectors`, {
        params: { user_id: userId },
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log("channelSlice - API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("channelSlice - API Error:", error.response?.data || error.message);
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch channels"
      );
    }
  }
);

const channelSlice = createSlice({
  name: "channels",
  initialState: {
    connectors: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConnectors.pending, (state) => {
        console.log("channelSlice - Pending state");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserConnectors.fulfilled, (state, action) => {
        console.log("channelSlice - Fulfilled state with data:", action.payload);
        state.loading = false;
        state.connectors = action.payload;
      })
      .addCase(fetchUserConnectors.rejected, (state, action) => {
        console.log("channelSlice - Rejected state with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = channelSlice.actions;
export default channelSlice.reducer; 