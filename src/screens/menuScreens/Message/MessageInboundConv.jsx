import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge, Spin } from "antd";
import {
  ShoppingCartOutlined,
  GiftOutlined,
  MessageOutlined,
  PhoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const iconMap = {
  order: <ShoppingCartOutlined />,
  gift: <GiftOutlined />,
  message: <MessageOutlined />,
  phone: <PhoneOutlined />,
  link: <LinkOutlined />,
};

const MessageInboundConv = () => {
  const { data , loading} = useSelector((state) => state?.emails); // Fetch emails from Redux
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMessage = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="px-4 border-b border-gray flex items-center justify-between min-h-14">
        <h2 className="font-semibold text-lg">All Conversations</h2>
        <Badge count={0} className="text-gray bg-color-none" />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center p-6">
          <Spin size="large" />
        </div>
      ) : data?.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No conversations available.</p>
      ) : (
        <div className="divide-y">
          {emails?.map(({ id, sender, subject, time, type }) => (
            <div
              key={id}
              className={`p-3 px-6 flex flex-col gap-1 cursor-pointer border-gray 
                ${selectedId === id ? "border-l-4 border-darkGray bg-lightGray" : "hover:bg-gray200"}`}
              onClick={() => handleSelectMessage(id)}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="bg-gray text-black me-2">{sender[0]}</Avatar>
                  <p className="font-medium">{sender}</p>
                </div>
                <span className="text-darkGray font-bold pe-2 text-lg">{iconMap[type] || <MessageOutlined />}</span>
              </div>

              {/* Message Content */}
              <div className="flex items-center justify-between">
                <p className="text-gray truncate">{subject}</p>
                <span className="text-black font-medium">{time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageInboundConv;
