import React from "react";
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
  return (
    <div className="flex flex-col bg-primary">
      {/* Top Navbar */}
      <div className="flex justify-between items-center min-h-14 px-6 bg-white border-b border-gray">
        {/* User Info Section */}
        <div className="flex items-center">
          <Avatar
            size="large"
            src="https://via.placeholder.com/40"
            className="me-2"
          />
          <div className="flex">
            <p className="font-medium underline me-2">Dave Osborn</p>
            <span className="font-medium">• Instagram</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-2">
          <StarOutlined className="text-xl cursor-pointer " />
          <MoreOutlined className="text-xl cursor-pointer bg-gray800 p-2 rounded-md" />
          <UserAddOutlined className="text-xl cursor-pointer bg-gray800 p-2 rounded-md" />
          <FolderOpenOutlined className="text-xl cursor-pointer bg-gray800 p-2 rounded-md" />
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-grow flex justify-center items-center bg-white">
        <div className="w-full p-5 flex flex-col ">
          {/* Chat Messages */}
          <div
            className="flex flex-col space-y-4 overflow-y-auto flex-grow p-3 max-h-[70vh] scrollbar-hide"
            style={{
              overflowY: "auto",
              maxHeight: "60vh",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // Internet Explorer/Edge
            }}
          >
            {/* AI Message */}
            <UserBubble
              message={
                "Thank you! Let me check that for you. One moment, please..."
              }
              userAvatar={true}
            />

            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />
            <UserBubble
              message={
                "Thank you! Let me check that for you. One moment, please..."
              }
              userAvatar={true}
            />

            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />
            <UserBubble
              message={
                "Thank you! Let me check that for you. One moment, please..."
              }
              userAvatar={true}
            />

            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />
            <UserBubble
              message={
                "Thank you! Let me check that for you. One moment, please..."
              }
              userAvatar={true}
            />

            {/* User Message */}
            <UserBubble message={"abc Store"} userAvatar={true} />

            {/* Another AI Message */}
            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />
            <UserBubble
              message={
                "Thank you! Let me check that for you. One moment, please..."
              }
              userAvatar={true}
            />
          </div>

          {/* Chat Input Box */}
          <ChatInput
            suggestions={false}
            data={[
              "Small (1-9)",
              "Medium (10-49)",
              "Large (50-249)",
              "Enterprise (250+)",
              "Enterprise (250+)",
              "Enterprise (250+)",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
