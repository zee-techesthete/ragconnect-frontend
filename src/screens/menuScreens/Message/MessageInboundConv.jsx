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
  { id: 4, name: "IP 543.658...", message: "Do you ship internationally?", time: "1h", icon: <MessageOutlined /> },
  { id: 5, name: "tashamach247@...", message: "Cancel my order, please", time: "1h", icon: <LinkOutlined /> },
  { id: 6, name: "Stephen P.", message: "Voice call", time: "1h", icon: <PhoneOutlined /> },
  { id: 7, name: "Monica T.", message: "Is this jacket available?", time: "1h", icon: <MessageOutlined /> },
];

const MessageInboundConv = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="w-full bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray flex items-center justify-between">
        <h2 className="font-semibold text-lg">All Conversations</h2>
        <Badge count={20} className="text-gray bg-color-none" />
      </div>

      {/* Conversations List */}
      <div className="divide-y">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 px-6 flex flex-col gap-1 cursor-pointer border-gray 
              ${selectedId === msg.id ? " border-l-4 border-darkGray bg-lightGray" : "hover:bg-gray200"}`}
            onClick={() => setSelectedId(msg.id)}
          >
            {/* Message Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="bg-gray text-black me-2">{msg.name[0]}</Avatar>
                <p className="font-medium">{msg.name}</p>
              </div>
              <div>
              <span className="text-darkGray font-bold pe-2 text-lg">{msg.icon}</span>
              <span className="text-darkGray font-bold">{msg.icon}</span>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex items-center justify-between">
              <p className="text-gray">{msg.message}</p>
              <span className="text-black font-medium">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageInboundConv;
