import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
import AiBubble from "../../components/AiBubble";
import UserBubble from "../../components/UserBubble";
import ChatInput from "../../components/ChatInput";
import { Avatar } from "antd";
import {
  StarOutlined,
  MoreOutlined,
  UserAddOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import moment from "moment";

const formatMessageTime = (timestamp) => {
  const messageDate = moment(timestamp);
  const now = moment();
  const diffMinutes = now.diff(messageDate, "minutes");
  const diffHours = now.diff(messageDate, "hours");
  const diffDays = now.diff(messageDate, "days");

  // If less than 1 minute ago
  if (diffMinutes < 1) {
    return "just now";
  }
  // If less than 1 hour ago
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  // If less than 24 hours ago
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  // If less than 7 days ago
  if (diffDays < 7) {
    return `${diffDays}d`;
  }
  // If less than 30 days ago
  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}w`;
  }
  // If less than 365 days ago
  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)}mo`;
  }
  // If more than a year ago
  return `${Math.floor(diffDays / 365)}y`;
};

const ChatUI = () => {
  const selectedConversation = useSelector(
    (state) => state.conversation.selectedConversation
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  if (!selectedConversation) {
    return (
      <div className="flex flex-col bg-primary h-full items-center justify-center">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  const isUserMessage = (message) => {
    return message.direction === "OUTBOUND";
  };

  return (
    <div className="flex flex-col bg-primary h-full">
      {/* Top Navbar - Fixed */}
      <div className="flex justify-between items-center min-h-14 px-6 bg-white border-b border-gray">
        {/* User Info Section */}
        <div className="flex items-center">
          <Avatar size="large" className="bg-gray200 text-gray900 me-2">
            {selectedConversation.name?.[0]?.toUpperCase()}
          </Avatar>
          <div className="flex items-center">
            <p className="font-medium">{selectedConversation.name}</p>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-600 font-semibold">
              {selectedConversation.platform?.charAt(0).toUpperCase() +
                selectedConversation.platform?.slice(1)}
            </span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-2">
          <StarOutlined className="text-xl cursor-pointer" />
          <MoreOutlined className="text-xl cursor-pointer bg-gray800 p-2 rounded-md" />
          <UserAddOutlined className="text-xl cursor-pointer bg-gray800 p-2 rounded-md" />
          <FolderOpenOutlined className="text-xl cursor-pointer bg-gray800 p-2 rounded-md" />
        </div>
      </div>

      {/* Main Container with Fixed Header and Footer */}
      <div className="flex flex-col flex-grow bg-white relative">
        {/* Scrollable Messages Container */}
        <div className="absolute inset-0 flex flex-col">
          <div
            className="flex-grow overflow-y-auto px-5 py-3 space-y-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {selectedConversation.messages?.map((msg, index) => (
              <div key={index} className="flex flex-col">
                {isUserMessage(msg) ? (
                  <UserBubble
                    message={msg.content}
                    userAvatar={true}
                    time={formatMessageTime(msg.sent_at)}
                  />
                ) : (
                  <AiBubble
                    message={msg.content}
                    botAvatar={true}
                    time={formatMessageTime(msg.sent_at)}
                  />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>

          {/* Fixed Chat Input at Bottom */}
          <div className="px-5 py-4 bg-white border-t border-gray">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
