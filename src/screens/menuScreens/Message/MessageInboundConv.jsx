import React from "react";
import { Avatar, Badge } from "antd";
import { ShoppingCartOutlined, GiftOutlined, MessageOutlined, PhoneOutlined, LinkOutlined } from "@ant-design/icons";

const messages = [
  { id: 1, name: "Dave O.", message: "Where is my order?", time: "1h", icon: <ShoppingCartOutlined /> },
  { id: 2, name: "Jessica R.", message: "Do you have gift cards?", time: "1h", icon: <GiftOutlined /> },
  { id: 3, name: "Robert S.", message: "What's my tracking number?", time: "1h", icon: <ShoppingCartOutlined /> },
  { id: 4, name: "IP 543.658...", message: "Do you ship internationally?", time: "1h", icon: <MessageOutlined /> },
  { id: 5, name: "tashamach247@...", message: "Cancel my order, please", time: "1h", icon: <LinkOutlined /> },
  { id: 6, name: "Stephen P.", message: "Voice call", time: "1h", icon: <PhoneOutlined /> },
  { id: 7, name: "Monica T.", message: "Is this jacket available?", time: "1h", icon: <MessageOutlined /> },
];

const MessageInboundConv = () => {
  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray flex items-center justify-between">
        <h2 className="font-semibold text-lg"> All Conversations</h2>
        <Badge count={20} className="text-gray" />
      </div>

      {/* Conversations List */}
      <div className="divide-y ">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`p-4 flex items-center gap-3 cursor-pointer border-gray hover:bg-gray-100 ${
              index === 0 ? "bg-gray-100" : ""
            }`}
          >
            {/* Avatar (Initials if no image) */}
            <Avatar className="bg-gray-300 text-black">{msg.name[0]}</Avatar>

            {/* Message Content */}
            <div className="flex-1">
              <p className="font-medium">{msg.name}</p>
              <p className="text-gray-500 text-sm">{msg.message}</p>
            </div>

            {/* Right Side (Icon + Time) */}
            <div className="flex flex-col items-center text-gray">
              {msg.icon}
              <span className="text-xs">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageInboundConv;
