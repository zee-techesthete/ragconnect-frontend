import { createSlice } from "@reduxjs/toolkit";

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
});

export const {
  setSelectedConversation,
  setConversations,
  addMessage,
  setLoading,
  setError,
} = conversationSlice.actions;

export default conversationSlice.reducer; 