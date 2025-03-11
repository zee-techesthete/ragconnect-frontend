import React, { useState } from "react";
import { Button, Segmented, Input } from "antd";
import {
  AudioOutlined,
  UploadOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { BiUpArrow } from "react-icons/bi";
import { FaLongArrowAltUp } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";

const ChatInput = ({ variant = "ChatInput2" }) => {
  const [selectedMode, setSelectedMode] = useState("Hands-on");

  if (variant === "ChatInput1") {
    return (
      <div className="flex items-center p-5 rounded-xl border border-gray bg-gray800 mt-4">
        <span className="pe-2">Hands-on</span>
        <Segmented
          options={["Hands-free"]}
          value={selectedMode}
          onChange={setSelectedMode}
          className="bg-white font-medium"
        />
        <div className="border-l border-gray-black h-6 mx-3"></div>
        <div className="flex gap-3">
          <LikeOutlined className="text-xl cursor-pointer" />
          <DislikeOutlined className="text-xl cursor-pointer" />
        </div>
        <Button
          icon={<PauseOutlined />}
          className="ml-auto px-4 py-1 bg-white border border-gray200 rounded-lg"
        >
          Pause
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center p-1 rounded-lg border border-gray bg-primary mt-4">
      <div className="flex flex-col w-full">
        <Input
          placeholder="Enter your message or provide the Agent with a /prompt"
          className="flex-1 border-none bg-transparent w-full p-3"
        />
        <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <Segmented
            options={["Hands-on"]}
            value={selectedMode}
            onChange={setSelectedMode}
            className=" rounded-lg text-base font-medium bg-white"
            />
            <p className="text-base">Hands-free</p>
            <p  className="border-l border-gray-black h-6"></p>
                  <Button icon={<GrAttachment />} type="text" className=" text-xl" />
                  <Button icon={<SmileOutlined />} type="text" className=" text-xl" />

        </div>
        <div className="flex items-center">
      <Button icon={<AudioOutlined />} type="button" className="ml-2 bg-white rounded-lg text-xl" />
      <Button icon={<FaLongArrowAltUp />} type="button" className="ml-2 bg-white rounded-lg text-xl" />
      </div>
      </div>
      </div>
      {/* <Button icon={<UploadOutlined />} type="text" className="ml-2" /> */}
     
    </div>

  );
};

export default ChatInput;
