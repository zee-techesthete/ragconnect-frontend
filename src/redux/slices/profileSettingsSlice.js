import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for updating profile settings
export const updateProfileSettings = createAsyncThunk(
  "profileSettings/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${rootUrl}/api/user/profile`,
        profileData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update profile"
      );
    }
  }
);

// Async thunk for uploading profile picture
export const uploadProfilePicture = createAsyncThunk(
  "profileSettings/uploadPicture",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await axios.post(
        `${rootUrl}/api/user/profile/picture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to upload profile picture"
      );
    }
  }
);

// Async thunk for deactivating account
export const deactivateAccount = createAsyncThunk(
  "profileSettings/deactivateAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${rootUrl}/api/user/deactivate`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to deactivate account"
      );
    }
  }
);

const profileSettingsSlice = createSlice({
  name: "profileSettings",
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
    profilePicture: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update Profile Settings
      .addCase(updateProfileSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfileSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(updateProfileSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Upload Profile Picture
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        state.profilePicture = action.payload.profilePicture;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Deactivate Account
      .addCase(deactivateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deactivateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, setProfilePicture } = profileSettingsSlice.actions;
export default profileSettingsSlice.reducer; 