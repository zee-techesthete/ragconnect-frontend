import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const rootUrl = import.meta.env.VITE_ROOT_URL;

// Async thunk for fetching conversations
export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async ({ userId, token, platforms }, { rejectWithValue }) => {
    try {
      if (!userId || !token) {
        throw new Error("Missing userId or token");
      }

      const response = await axios.get(`${rootUrl}/api/fetch/conversations`, {
        params: { 
          user_id: userId,
          platforms: platforms
        },
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch conversations"
      );
    }
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    selectedConversation: null,
    conversations: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      // Update the selected conversation if it's the current one
      if (state.selectedConversation?.id === conversationId) {
        state.selectedConversation.messages.push(message);
      }
      // Update the conversation in the conversations array
      const conversation = state.conversations.find(conv => conv.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
        // Update the last message preview
        conversation.message = message.text;
        conversation.time = "now";
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedConversation,
  setConversations,
  addMessage,
  setLoading,
  setError,
} = conversationSlice.actions;

export default conversationSlice.reducer; 