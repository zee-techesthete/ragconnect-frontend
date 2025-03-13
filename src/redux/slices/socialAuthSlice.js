import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

export const authenticateSocial = createAsyncThunk(
  "auth/authenticateSocial",
  async (platform, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("authToken");
      const loggedInUserId = getState().login.user?.id;

      if (!loggedInUserId) {
        throw new Error("No logged in user found");
      }

      const url = `${rootUrl}/api/auth/${platform.toLowerCase()}?userId=${loggedInUserId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
  async (smtpData, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("authToken");
      const loggedInUserId = getState().login.user?.id;

      if (!loggedInUserId) {
        throw new Error("No logged in user found");
      }

      const response = await axios.post(
        `${rootUrl}/api/auth/smtp?userId=${loggedInUserId}`,
        smtpData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

export const authenticateShopify = createAsyncThunk(
  "auth/authenticateShopify",
  async (shopUrl, { rejectWithValue, getState }) => {
    try {
      if (!shopUrl) {
        throw new Error("Shop URL is required");
      }

      const token = localStorage.getItem("authToken");
      const loggedInUserId = getState().login.user?.id;

      if (!loggedInUserId) {
        throw new Error("No logged in user found");
      }

      const response = await axios.get(
        `${rootUrl}/api/auth/shopify?shop=${shopUrl}&userId=${loggedInUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // The response is now a plain text URL
      const url = response.data;
      return { platform: "shopify", url };
    } catch (error) {
      return rejectWithValue({
        platform: "shopify",
        error: error.response?.data || "Shopify authentication failed",
      });
    }
  }
);

export const authenticateOutlook = createAsyncThunk(
  "auth/authenticateOutlook",
  async (_, { rejectWithValue, getState }) => {
    try {
      const loggedInUserId = getState().login.user?.id || getState().login.user?.user?.id;
      // console.log("loggedInUserId", loggedInUserId);
      const token = localStorage.getItem("authToken");

      if (!loggedInUserId) {
        throw new Error("No logged in user found");
      }

      const response = await axios.get(
        `${rootUrl}/api/auth/outlook?userId=${loggedInUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    clearErrors: (state, action) => {
      const platform = action.payload;
      if (platform) {
        state.errors[platform] = null;
      } else {
        state.errors = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateSocial.pending, (state, action) => {
        const platform = action.meta.arg;
        state.isLoading[platform] = true;
        state.isVerifying[platform] = false;
        state.errors[platform] = null;
      })
      .addCase(authenticateSocial.fulfilled, (state, action) => {
        const { platform, url } = action.payload;
        state.isLoading[platform] = false;
        state.isVerifying[platform] = true;
        state.authUrls[platform] = url;
        if (url) {
          window.location.href = url;
        }
      })
      .addCase(authenticateSocial.rejected, (state, action) => {
        const platform = action.meta.arg;
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

      // Handle Shopify Authentication
      .addCase(authenticateShopify.pending, (state) => {
        state.isLoading["shopify"] = true;
        state.errors["shopify"] = null;
      })
      .addCase(authenticateShopify.fulfilled, (state, action) => {
        const { platform, url } = action.payload;
        state.isLoading[platform] = false;
        state.isVerifying[platform] = true;
        state.authUrls[platform] = url;
        if (url) {
          location.href = url;
        }
      })
      .addCase(authenticateShopify.rejected, (state, action) => {
        state.isLoading["shopify"] = false;
        state.errors["shopify"] = action.payload.error;
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

export const { setAuthData, setLoading, setVerifying, clearErrors } =
  socialAuthSlice.actions;
export default socialAuthSlice.reducer;
