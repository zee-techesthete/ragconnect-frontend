import React, { useState } from "react";
import { Tabs, Tag, Avatar, Input, Button, Tooltip } from "antd";
import {
  FolderOutlined,
  InstagramOutlined,
  SmileOutlined,
  SendOutlined,
  AudioOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import userImg from "../../../assets/social-icons/user.png";

const { TabPane } = Tabs;

const MessageDetail = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [messages, setMessages] = useState([
    { sender: "Agent", text: "Hey there! What's on your mind, Jordan?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { sender: "User", text: inputMessage }]);
    setInputMessage("");
  };

  return (
    <div className="w-full bg-white border-l border-gray overflow-hidden flex flex-col h-full">
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="px-4"
        style={{ borderBottom: "none" }}
        tabBarStyle={{ borderBottom: "none", paddingBottom: "10px" }}
      >
        <TabPane tab="Details" key="details">
          <div className="space-y-3 text-sm overflow-y-auto max-h-[calc(100vh-200px)]">
            {[
              { label: "Assigned to", value: "User Name" },
              { label: "Automation", value: "Hands-on" },
              { label: "Status", value: <Tag color="blue">Open</Tag> },
              {
                label: "Category",
                value: (
                  <span className="flex items-center gap-2">
                    <FolderOutlined /> Order Status
                  </span>
                ),
              },
              {
                label: "Channel",
                value: (
                  <span className="flex items-center gap-2">
                    <InstagramOutlined /> Instagram
                  </span>
                ),
              },
              {
                label: "Tags",
                value: (
                  <div className="flex flex-wrap gap-2">
                    <Tag>Stock</Tag> <Tag>Shipping</Tag>
                  </div>
                ),
              },
              { label: "Messages", value: "4" },
              {
                label: "Sentiment",
                value: (
                  <span className="flex items-center gap-2">
                    <SmileOutlined /> Positive
                  </span>
                ),
              },
              { label: "Conversation ID", value: "INST-2025-00123" },
              { label: "Customer ID", value: "INST-2025-00123" },
              { label: "Language", value: "English" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between gap-1 pb-2">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="text-gray-900">{item.value}</span>
              </div>
            ))}

            <hr className="border-gray-200 my-4" />
            <h2 className="font-bold mt-2">Agent's Summary</h2>
            <p className="text-gray-600">
              Customer asked about AJ 9 Golf Low Charcoal in size 10. They chose
              black with standard delivery. Reservation confirmed; order details
              pending.
            </p>
          </div>
        </TabPane>

        <TabPane tab="Agent Reggie" key="agent">
          <div className="flex flex-col h-[75vh] p-4">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 content-center">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "User"
                      ? "justify-end"
                      : "flex-col items-center"
                  }`}
                >
                  {msg.sender === "Agent" && (
                    <Avatar src={userImg} className="mr-2 size-32" />
                  )}
                  <div
                    className={`p-3 ${
                      msg.sender === "User"
                        ? "bg-blue-100 text-black"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            {/* Message Input */}
            <div className="flex items-center bg-gray p-2 rounded-lg w-full shadow-sm">
      {/* Message Input */}
      <Input
        placeholder="Enter your message"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onPressEnter={sendMessage}
        className="flex-1 bg-transparent border-none focus:ring-0 px-3 text-black"
      />

      {/* Voice Button */}
      <Button
        shape="circle"
        icon={<AudioOutlined />}
        className="bg-white shadow-md border border-gray ml-2 flex items-center justify-center"
      />

      {/* Send Button */}
      <Button
        shape="circle"
        icon={<SendOutlined />}
        onClick={sendMessage}
        className="bg-white shadow-md border border-gray ml-2 flex items-center justify-center"
      />
    </div>
          </div>
        </TabPane>
        <TabPane tab="Training" key="training">
          <div className="p-4 text-sm">
            <p className="text-gray-600">
              This case has been marked as an example for training purposes due
              to the nature of customer queries.
            </p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MessageDetail;
