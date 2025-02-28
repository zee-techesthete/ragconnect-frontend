import React, { useState } from "react";
import { Button, Segmented } from "antd";
import { LikeOutlined, DislikeOutlined, PauseOutlined } from "@ant-design/icons";

const ChatInput = () => {
  const [selectedMode, setSelectedMode] = useState("Hands-on");

  return (
    <div className="flex items-center p-5 bg-gray-200 rounded-xl border border-gray bg-gray800">
      {/* Mode Selection */}
      <span className="pe-2">Hands-on</span>
      <Segmented
        options={["Hands-free"]}
        value={selectedMode}
        onChange={setSelectedMode}
        className="bg-white font-medium"
      />

      {/* Divider */}
      <div className="border-l border-gray-black h-6 mx-3"></div>

      {/* Like & Dislike Icons */}
      <div className="flex gap-3">
        <LikeOutlined className="text-xl cursor-pointer" />
        <DislikeOutlined className="text-xl cursor-pointer" />
      </div>

      {/* Pause Button */}
      <Button
        icon={<PauseOutlined />}
        className="ml-auto px-4 py-1 bg-white border border-gray-300 rounded-full"
      >
        Pause
      </Button>
    </div>
  );
};

export default ChatInput;
