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

const ChatUI = () => {
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
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

  return (
    <div className="flex flex-col bg-primary h-full">
      {/* Top Navbar - Fixed */}
      <div className="flex justify-between items-center min-h-14 px-6 bg-white border-b border-gray">
        {/* User Info Section */}
        <div className="flex items-center">
          <Avatar
            size="large"
            src="https://via.placeholder.com/40"
            className="me-2"
          />
          <div className="flex">
            <p className="font-medium underline me-2">{selectedConversation.name}</p>
            <span className="font-medium">• {selectedConversation.app}</span>
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
                display: "none"
              }
            }}
          >
            {selectedConversation.messages.map((msg, index) => (
              msg.sender === "user" ? (
                <UserBubble
                  key={index}
                  message={msg.text}
                  userAvatar={true}
                />
              ) : (
                <AiBubble
                  key={index}
                  message={msg.text}
                  botAvatar={true}
                />
              )
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
