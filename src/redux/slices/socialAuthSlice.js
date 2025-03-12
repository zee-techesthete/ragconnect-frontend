import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

export const authenticateSocial = createAsyncThunk(
  "auth/authenticateSocial",
  async (platform, { rejectWithValue }) => {
    console.log("platform in social auth slice: ", platform);
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(
        `${rootUrl}/api/auth/${platform.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { platform, url: response.data.url };
    } catch (error) {
      return rejectWithValue({
        platform,
        error: error.response?.data || "Something went wrong",
      });
    }
  }
);

export const authenticateSmtp = createAsyncThunk(
  "auth/authenticateSmtp",
  async (smtpData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${rootUrl}/api/auth/smtp`, 
        smtpData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return { platform: "smtp", data: response.data };
    } catch (error) {
      return rejectWithValue({
        platform: "smtp",
        error: error.response?.data || "SMTP authentication failed",
      });
    }
  }
);

export const authenticateOutlook = createAsyncThunk(
  "auth/authenticateOutlook",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get the logged-in user's ID from auth state
      const loggedInUserId = getState().login.user?.id;
      const token = localStorage.getItem('authToken');

      if (!loggedInUserId) {
        throw new Error("No logged in user found");
      }

      const response = await axios.get(
        `${rootUrl}/api/auth/outlook?userId=${loggedInUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.data.url) {
        throw new Error("No URL returned from auth endpoint");
      }

      return { platform: "outlook", url: response.data.url };
    } catch (error) {
      console.error("Outlook auth error:", error);
      return rejectWithValue({
        platform: "outlook",
        error:
          error.response?.data ||
          error.message ||
          "Outlook authentication failed",
      });
    }
  }
);

const socialAuthSlice = createSlice({
  name: "socialAuth",
  initialState: {
    isLoading: {},
    isConnected: {},
    isVerifying: {},
    authUrls: {},
    tokens: {},
    userIds: {},
    errors: {},
  },
  reducers: {
    setAuthData: (state, action) => {
      const { platform, id, token } = action.payload;
      state.userIds[platform.toLowerCase()] = id;
      state.tokens[platform.toLowerCase()] = token;
      state.isConnected[platform.toLowerCase()] = true;
      state.isLoading[platform.toLowerCase()] = false;
      state.isVerifying[platform.toLowerCase()] = false;
    },
    setLoading: (state, action) => {
      const { platform, isLoading } = action.payload;
      state.isLoading[platform] = isLoading;
    },
    setVerifying: (state, action) => {
      const { platform, isVerifying } = action.payload;
      state.isVerifying[platform] = isVerifying;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateSocial.pending, (state, action) => {
        const platform = action.meta.arg;
        state.isLoading[platform] = true;
        state.isVerifying[platform] = false;
        state.isConnected[platform] = false;
      })
      .addCase(authenticateSocial.fulfilled, (state, action) => {
        const { platform, url } = action.payload;
        state.isLoading[platform] = false;
        state.isVerifying[platform] = true;
        state.authUrls[platform] = url;
        location.href = url;
      })
      .addCase(authenticateSocial.rejected, (state, action) => {
        const platform = action.meta.arg || "unknown";
        state.isLoading[platform] = false;
        state.isVerifying[platform] = false;
        state.errors[platform] =
          action.payload?.error || "Something went wrong";
      })

      // Handle SMTP Authentication
      .addCase(authenticateSmtp.pending, (state) => {
        state.isLoading["smtp"] = true;
        state.errors["smtp"] = null;
      })
      .addCase(authenticateSmtp.fulfilled, (state, action) => {
        state.isLoading["smtp"] = false;
        state.isConnected["smtp"] = true;
        state.tokens["smtp"] = action.payload.data.token;
      })
      .addCase(authenticateSmtp.rejected, (state, action) => {
        state.isLoading["smtp"] = false;
        state.errors["smtp"] = action.payload.error;
      })
      // Handle Outlook Authentication
      .addCase(authenticateOutlook.pending, (state) => {
        state.isLoading["outlook"] = true;
        state.errors["outlook"] = null;
      })
      .addCase(authenticateOutlook.fulfilled, (state, action) => {
        const { platform, url } = action.payload;
        state.isLoading[platform] = false;
        state.isVerifying[platform] = true;
        state.authUrls[platform] = url;
        location.href = url;
      })
      .addCase(authenticateOutlook.rejected, (state, action) => {
        state.isLoading["outlook"] = false;
        state.errors["outlook"] = action.payload.error;
      });
  },
});

export const { setAuthData, setLoading, setVerifying } =
  socialAuthSlice.actions;
export default socialAuthSlice.reducer;
