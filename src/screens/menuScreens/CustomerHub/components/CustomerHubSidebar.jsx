import React, { useState } from 'react';
import { Button , Avatar, Input} from 'antd';
import { CloseOutlined, UserAddOutlined, CustomerServiceOutlined, HistoryOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import userImg from "../../../../assets/social-icons/user.png";

const CustomerHubSidebar = ({ isOpen, onClose }) => {
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
    <div className="bg-white h-[75vh] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col h-[74vh] p-2 custom-scrollbar">
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
    </div>
  );
};

export default CustomerHubSidebar; 