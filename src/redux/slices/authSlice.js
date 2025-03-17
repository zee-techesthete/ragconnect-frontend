import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${rootUrl}/api/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Signup failed. Please try again."
      );
    }
  }
);

// Async thunk for verifying email
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${rootUrl}/api/auth/verify-email`, {
        token: token,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          "Email verification failed. Please try again."
      );
    }
  }
);

// Async thunk for Gmail SSO
export const googleSSO = createAsyncThunk(
  "auth/googleSSO",
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

// Handle SSO callback
export const handleSSOCallback = createAsyncThunk(
  "auth/handleSSOCallback",
  async (token, { rejectWithValue }) => {
    try {
      // Verify the token with your backend
      const response = await axios.get(`${rootUrl}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to verify SSO login."
      );
    }
  }
);

// Async thunk for Outlook SSO
export const outlookSSO = createAsyncThunk(
  "auth/outlookSSO",
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

// Async thunk for Instagram SSO
export const instagramSSO = createAsyncThunk(
  "auth/instagramSSO",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${rootUrl}/api/sso/instagram`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Instagram SSO failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    signupSuccess: false,
    verificationSuccess: false,
    error: null,
    ssoLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.loading = false;
      state.signupSuccess = false;
      state.verificationSuccess = false;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.signupSuccess = false;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.signupSuccess = true;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.signupSuccess = false;
        state.error = action.payload;
      })

      // Handle Email Verification
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.verificationSuccess = false;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.verificationSuccess = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.verificationSuccess = false;
        state.error = action.payload;
      })

      // Handle Google SSO
      .addCase(googleSSO.pending, (state) => {
        state.ssoLoading = true;
        state.error = null;
      })
      .addCase(googleSSO.fulfilled, (state, action) => {
        state.ssoLoading = false;
        state.user = action.payload.user;
        state.signupSuccess = true;
      })
      .addCase(googleSSO.rejected, (state, action) => {
        state.ssoLoading = false;
        state.error = action.payload;
      })

      // Handle Outlook SSO
      .addCase(outlookSSO.pending, (state) => {
        state.ssoLoading = true;
        state.error = null;
      })
      .addCase(outlookSSO.fulfilled, (state) => {
        state.ssoLoading = false;
        // The actual user data will be handled by handleSSOCallback
      })
      .addCase(outlookSSO.rejected, (state, action) => {
        state.ssoLoading = false;
        state.error = action.payload;
      })

      // Handle Instagram SSO
      .addCase(instagramSSO.pending, (state) => {
        state.ssoLoading = true;
        state.error = null;
      })
      .addCase(instagramSSO.fulfilled, (state, action) => {
        state.ssoLoading = false;
        state.user = action.payload.user;
        state.signupSuccess = true;
      })
      .addCase(instagramSSO.rejected, (state, action) => {
        state.ssoLoading = false;
        state.error = action.payload;
      })

      // Handle SSO Callback
      .addCase(handleSSOCallback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSSOCallback.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.signupSuccess = true;
      })
      .addCase(handleSSOCallback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetAuthState, setUser } = authSlice.actions;
export default authSlice.reducer;
