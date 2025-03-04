import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// ✅ Async Thunk to Fetch Emails
export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async ({ platform, userId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootUrl}/api/emails/${platform}/fetch`, {
        params: { user_id: userId },
        headers: { Authorization: `Bearer ${token}` }, // ✅ Secure request with token
      });
      return { platform, emails: response.data.emails };
    } catch (error) {
      return rejectWithValue({ platform, error: error.response?.data || "Failed to fetch emails" });
    }
  }
);

// ✅ Email Slice
const emailSlice = createSlice({
  name: "emails",
  initialState: {
    data: {},
    loading: {},
    error: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state, action) => {
        state.loading[action.meta.arg.platform] = true;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.loading[action.payload.platform] = false;
        state.data[action.payload.platform] = action.payload.emails;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.loading[action.meta.arg.platform] = false;
        state.error[action.meta.arg.platform] = action.payload.error;
      });
  },
});

export default emailSlice.reducer;
