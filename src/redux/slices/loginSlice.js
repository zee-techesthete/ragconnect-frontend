import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async action for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${rootUrl}/api/auth/login`,
        credentials
      );

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // Store token in localStorage
      localStorage.setItem("authToken", token);
      // Set token as default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { token, user };
    } catch (error) {
      if (
        error.response?.status === 403 &&
        error.response?.data?.needsVerification
      ) {
        return rejectWithValue({
          error: "Please verify your email before logging in.",
          needsVerification: true,
        });
      }
      return rejectWithValue({
        error: error.response?.data?.error || "Login failed. Please try again.",
      });
    }
  }
);

// Async action for logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${rootUrl}/api/auth/logout`);
      // Clear token from localStorage and axios headers
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
      return null;
    } catch (error) {
      // Even if the API call fails, we should still clear local state
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
      return rejectWithValue(error.response?.data?.error || "Logout failed");
    }
  }
);

// Async thunk for Gmail SSO
export const googleSSO = createAsyncThunk(
  "login/googleSSO",
  async (_, { rejectWithValue }) => {
    try {
      // Redirect to the backend SSO endpoint
      const ssoUrl = `${rootUrl}/sso/google`;
      console.log("Redirecting to SSO URL:", ssoUrl);
      window.location.href = ssoUrl;
      return null; // The actual response will be handled by the callback route
    } catch (error) {
      console.error("Google SSO error:", error);
      return rejectWithValue(
        error.response?.data?.error || "Google SSO failed. Please try again."
      );
    }
  }
);

// Async thunk for Outlook SSO
export const outlookSSO = createAsyncThunk(
  "login/outlookSSO",
  async (_, { rejectWithValue }) => {
    try {
      // Redirect to the backend SSO endpoint
      const ssoUrl = `${rootUrl}/sso/outlook`;
      console.log("Redirecting to SSO URL:", ssoUrl);
      window.location.href = ssoUrl;
      return null; // The actual response will be handled by the callback route
    } catch (error) {
      console.error("Outlook SSO error:", error);
      return rejectWithValue(
        error.response?.data?.error || "Outlook SSO failed. Please try again."
      );
    }
  }
);

// Handle SSO callback
export const handleSSOCallback = createAsyncThunk(
  "login/handleSSOCallback",
  async (token, { rejectWithValue }) => {
    try {
      // Store token in localStorage
      localStorage.setItem("authToken", token);
      // Set token as default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Verify the token with your backend
      const response = await axios.get(`${rootUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { token, user: response.data };
    } catch (error) {
      // Clear token if verification fails
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
      return rejectWithValue(
        error.response?.data?.error || "Failed to verify SSO login."
      );
    }
  }
);

// Async thunk for email verification
export const verifyEmail = createAsyncThunk(
  "login/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${rootUrl}/api/auth/verify-email`, {
        token,
      });

      const { token: authToken, user } = response.data;

      if (!authToken || !user) {
        throw new Error("Invalid response from server");
      }

      // Store token in localStorage
      localStorage.setItem("authToken", authToken);
      // Set token as default header for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

      return { token: authToken, user };
    } catch (error) {
      return rejectWithValue({
        error:
          error.response?.data?.error ||
          "Email verification failed. Please try again.",
      });
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem("authToken"),
  loading: false,
  error: null,
  success: false,
  ssoLoading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed";
        state.token = null;
        state.user = null;
        state.success = false;
      })
      // Handle Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.success = false;
        state.error = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        // Even if the API call fails, we should still clear the state
        state.user = null;
        state.token = null;
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Google SSO
      .addCase(googleSSO.pending, (state) => {
        state.ssoLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(googleSSO.fulfilled, (state) => {
        state.ssoLoading = false;
        state.success = true;
      })
      .addCase(googleSSO.rejected, (state, action) => {
        state.ssoLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Handle Outlook SSO
      .addCase(outlookSSO.pending, (state) => {
        state.ssoLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(outlookSSO.fulfilled, (state) => {
        state.ssoLoading = false;
        state.success = true;
      })
      .addCase(outlookSSO.rejected, (state, action) => {
        state.ssoLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Handle SSO Callback
      .addCase(handleSSOCallback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(handleSSOCallback.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(handleSSOCallback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.user = null;
        state.success = false;
      })
      // Handle Email Verification
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Email verification failed";
        state.token = null;
        state.user = null;
        state.success = false;
      });
  },
});

export const { clearError, clearState } = loginSlice.actions;
export default loginSlice.reducer;
