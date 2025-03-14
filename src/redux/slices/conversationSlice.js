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

      const response = await axios.get(
        `${rootUrl}/api/connector/conversations`,
        {
          params: {
            user_id: userId,
            platforms: JSON.stringify(platforms),
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to fetch conversations");
      }

      // Transform the response data to match the expected format
      const allConversations = response.data.results.reduce(
        (acc, platformData) => {
          if (platformData.success && platformData.conversations) {
            // Add platform info to each conversation
            const conversationsWithPlatform = platformData.conversations.map(
              (conv) => ({
                ...conv,
                platform: platformData.platform,
              })
            );
            return [...acc, ...conversationsWithPlatform];
          }
          return acc;
        },
        []
      );

      // Sort conversations by received_at date
      allConversations.sort(
        (a, b) => new Date(b.received_at) - new Date(a.received_at)
      );

      return allConversations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch conversations"
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
      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );
      if (conversation) {
        conversation.messages.push(message);
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
        state.error = null;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.conversations = [];
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
