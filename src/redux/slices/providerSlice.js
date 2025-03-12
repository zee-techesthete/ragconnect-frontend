import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for fetching providers
export const fetchProviders = createAsyncThunk(
  "providers/fetchProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootUrl}/providers`);
      
      // Return the raw response data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch providers");
    }
  }
);

// Helper function to format provider names
const formatProviderName = (name) => {
  // Convert SMTP_IMAP to email
  if (name === "SMTP_IMAP") return "email";
  
  // Convert other names to lowercase and replace underscores with spaces
  return name.toLowerCase().replace(/_/g, ' ');
};

const providerSlice = createSlice({
  name: "providers",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default providerSlice.reducer; 