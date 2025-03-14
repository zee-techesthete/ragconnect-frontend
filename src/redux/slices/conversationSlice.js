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
      
      // Decode the platforms array to prevent URL encoding
      const decodedPlatforms = decodeURIComponent(JSON.stringify(platforms));
      
      // const response = await axios.get(`${rootUrl}/api/connector/conversations`, {
      //   params: { 
      //     user_id: userId,
      //     platforms: decodedPlatforms
      //   },
      //   headers: { 
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   },
      // });

      const response  =  {
        "success": true,
        "results": [
          {
            "platform": "google",
            "success": true,
            "conversations": [
              {
                "id": "123",
                "subject": "Project Update Meeting",
                "body": "Hi team, Let's discuss the project updates tomorrow at 2 PM...",
                "received_at": "2024-03-20T10:30:00Z",
                "thread_id": "thread_123",
                "messages": [
                  {
                    "id": "msg_456",
                    "external_message_id": "gmail_msg_789",
                    "direction": "INBOUND",
                    "content": "Hi team, Let's discuss the project updates tomorrow at 2 PM...",
                    "sender": {
                      "email": "john@example.com",
                      "name": "John Doe"
                    },
                    "receiver": {
                      "email": "team@company.com",
                      "name": "Team"
                    },
                    "sent_at": "2024-03-20T10:30:00Z",
                    "created_at": "2024-03-20T10:30:00Z"
                  },
                  {
                    "id": "msg_457",
                    "external_message_id": "gmail_msg_790",
                    "direction": "OUTBOUND",
                    "content": "Sounds good, I'll be there!",
                    "sender": {
                      "email": "team@company.com",
                      "name": "Team"
                    },
                    "receiver": {
                      "email": "john@example.com",
                      "name": "John Doe"
                    },
                    "sent_at": "2024-03-20T10:35:00Z",
                    "created_at": "2024-03-20T10:35:00Z"
                  }
                ]
              }
            ]
          },
          {
            "platform": "outlook",
            "success": true,
            "conversations": [
              {
                "id": "124",
                "subject": "Client Meeting Notes",
                "body": "Here are the key points from our client meeting...",
                "received_at": "2024-03-20T09:15:00Z",
                "thread_id": "thread_124",
                "messages": [
                  {
                    "id": "msg_458",
                    "external_message_id": "outlook_msg_791",
                    "direction": "INBOUND",
                    "content": "Here are the key points from our client meeting...",
                    "sender": {
                      "email": "client@company.com",
                      "name": "Client Name"
                    },
                    "receiver": {
                      "email": "me@company.com",
                      "name": "Me"
                    },
                    "sent_at": "2024-03-20T09:15:00Z",
                    "created_at": "2024-03-20T09:15:00Z"
                  }
                ]
              }
            ]
          }
        ]
      }

      return response;
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