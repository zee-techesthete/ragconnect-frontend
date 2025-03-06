import React, { useState } from "react";
import { Avatar, Badge } from "antd";
import {
  ShoppingCartOutlined,
  GiftOutlined,
  MessageOutlined,
  PhoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const messages = [
  { id: 1, name: "Dave O.", message: "Where is my order?", time: "1h", icon: <ShoppingCartOutlined /> },
  { id: 2, name: "Jessica R.", message: "Do you have gift cards?", time: "1h", icon: <GiftOutlined /> },
  { id: 3, name: "Robert S.", message: "What's my tracking number?", time: "1h", icon: <ShoppingCartOutlined /> },
  { id: 5, name: "IP 543.658...", message: "Do you ship internationally?", time: "1h", icon: <MessageOutlined /> },
  { id: 6, name: "tashamach247@...", message: "Cancel my order, please", time: "1h", icon: <LinkOutlined /> },
  { id: 7, name: "Stephen P.", message: "Voice call", time: "1h", icon: <PhoneOutlined /> },
  { id: 8, name: "Monica T.", message: "Is this jacket available?", time: "1h", icon: <MessageOutlined /> },
];

const MessageInboundConv = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="bg-white shadow-md rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray flex items-center justify-between min-h-14">
        <h2 className="font-semibold text-lg">All Conversations</h2>
        <Badge count={20} className="text-gray font-semibold" style={{ backgroundColor: "transparent" , color: "black" , fontWeight: "bold"  }} />
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 px-4 flex flex-col gap-1 cursor-pointer border-b border-gray hover:bg-gray-50 transition-colors duration-200
              ${selectedId === msg.id ? "border-l-4 border-gray bg-lightGray" : ""}`}
            onClick={() => setSelectedId(msg.id)}
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
