import React, { useState, useEffect } from "react";
import { Avatar, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCartOutlined,
  GiftOutlined,
  MessageOutlined,
  PhoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { setSelectedConversation, setConversations } from "../../../redux/slices/conversationSlice";

const messages = [
  { id: 1, name: "Dave O.", message: "Where is my order?", time: "1h", icon: <ShoppingCartOutlined />, app: "instagram", messages: [
    { sender: "user", text: "Where is my order?" },
    { sender: "agent", text: "Let me check that for you. Can you provide your order number?" }
  ] },
  { id: 2, name: "Jessica R.", message: "Do you have gift cards?", time: "1h", icon: <GiftOutlined />, app: "whatsapp", messages: [
    { sender: "user", text: "Do you have gift cards?" },
    { sender: "agent", text: "Yes, we do offer gift cards! They are available in various denominations." }
  ] },
  { id: 3, name: "Robert S.", message: "What's my tracking number?", time: "1h", icon: <ShoppingCartOutlined />, app: "facebook", messages: [
    { sender: "user", text: "What's my tracking number?" },
    { sender: "agent", text: "I'll help you find your tracking number. What's your order ID?" }
  ] },
  { id: 5, name: "IP 543.658...", message: "Do you ship internationally?", time: "1h", icon: <MessageOutlined />, app: "instagram", messages: [
    { sender: "user", text: "Do you ship internationally?" },
    { sender: "agent", text: "Yes, we do ship internationally to many countries!" }
  ] },
  { id: 6, name: "tashamach247@...", message: "Cancel my order, please", time: "1h", icon: <LinkOutlined />, app: "whatsapp", messages: [
    { sender: "user", text: "Cancel my order, please" },
    { sender: "agent", text: "I can help you with canceling your order. Could you share your order number?" }
  ] },
  { id: 7, name: "Stephen P.", message: "Voice call", time: "1h", icon: <PhoneOutlined />, messages: [
    { sender: "user", text: "Voice call" },
    { sender: "agent", text: "I see you requested a voice call. Our agent will call you shortly." }
  ] },
  { id: 8, name: "Monica T.", message: "Is this jacket available?", time: "1h", icon: <MessageOutlined />, messages: [
    { sender: "user", text: "Is this jacket available?" },
    { sender: "agent", text: "Which jacket are you interested in? I'd be happy to check its availability." }
  ] },
];

const MessageInboundConv = () => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);

  useEffect(() => {
    dispatch(setConversations(messages));
    // Select the first conversation by default if none is selected
    if (!selectedConversation && messages.length > 0) {
      dispatch(setSelectedConversation(messages[0]));
    }
  }, []);

  const handleConversationSelect = (conversation) => {
    dispatch(setSelectedConversation(conversation));
  };

  return (
    <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray flex items-center justify-between min-h-14">
        <h2 className="font-semibold text-lg">All Conversations</h2>
        <Badge count={messages.length} className="text-gray font-semibold" style={{ backgroundColor: "transparent", color: "black", fontWeight: "bold" }} />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 px-4 flex flex-col gap-1 cursor-pointer border-b border-gray hover:bg-gray-50 transition-colors duration-200
              ${selectedConversation?.id === msg.id ? "border-l-4 border-gray bg-lightGray" : ""}`}
            onClick={() => handleConversationSelect(msg)}
          >
            {/* Message Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="bg-gray-200 text-gray-700">{msg.name[0]}</Avatar>
                <p className="font-medium truncate max-w-[150px] sm:max-w-[200px]">{msg.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-lg">{msg.icon}</span>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-gray-600 text-sm truncate flex-1">{msg.message}</p>
              <span className="text-gray-500 text-xs whitespace-nowrap">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageInboundConv;
