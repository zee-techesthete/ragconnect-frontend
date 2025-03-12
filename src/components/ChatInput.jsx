import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Segmented, Input, Tooltip } from "antd";
import {
  AudioOutlined,
  UploadOutlined,
  SmileOutlined,
  DislikeOutlined,
  LikeOutlined,
  PauseOutlined,
  RedoOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { BiUpArrow } from "react-icons/bi";
import { FaLongArrowAltUp, FaRedo, FaRobot } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import PrimaryBtn from "./PrimaryBtn";
import { FaAnglesDown } from "react-icons/fa6";
import { Textarea } from "@headlessui/react";
import { addMessage } from "../redux/slices/conversationSlice";

const ChatInput = ({ variant = "ChatInput2" }) => {
  const dispatch = useDispatch();
  const selectedConversation = useSelector((state) => state.conversation.selectedConversation);
  const [selectedMode, setSelectedMode] = useState("Hands-on");
  const [message, setMessage] = useState("");
  const [aiSuggestionsVisible, setAiSuggestionsVisible] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(
    "Your order #12345 is currently on its way. It's with the courier and is estimated to arrive tomorrow by 7 PM. Would you like the tracking link to monitor its progress?"
  );

  const handleSendMessage = () => {
    if (!message.trim() || !selectedConversation) return;

    const newMessage = {
      sender: "agent",
      text: message.trim(),
    };

    dispatch(addMessage({
      conversationId: selectedConversation.id,
      message: newMessage
    }));

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  const handleInsertAiSuggestion = () => {
    setMessage(aiSuggestions);
  };

  return (
    <div className="flex items-center rounded-2xl border border-gray bg-primary">
      <div className="flex flex-col w-full p-1">
        {aiSuggestionsVisible && (
          <div className="flex flex-col bg-white p-3 rounded-t-lg border-b border-gray">
            <Textarea
              placeholder="Enter your message or provide the Agent with a /prompt"
              className="flex-1 border-none bg-transparent w-full p-3 mb-2 text-base outline-none"
              value={aiSuggestions}
              readOnly
            />
            <div className="flex gap-2 justify-between">
              <div className="flex gap-2">
                <Tooltip title="Insert AI Suggestion">
                  <PrimaryBtn
                    title="Insert"
                    onClick={handleInsertAiSuggestion}
                    className="text-sm bg-gray px-4 py-2 h-10 min-w-[90px]"
                  />
                </Tooltip>
                <Tooltip title="Retry AI Response">
                  <PrimaryBtn
                    title="Retry"
                    icon={<FaRedo className="text-base" />}
                    className="text-sm bg-gray px-2 py-2 h-10 min-w-[90px] flex items-center justify-center gap-1"
                  />
                </Tooltip>
              </div>

              <div className="flex gap-2">
                <Tooltip title="Copy AI Response">
                  <Button
                    icon={<CopyOutlined />}
                    type="text"
                    className="text-blue-500 text-lg"
                  />
                </Tooltip>
                <Tooltip title="Hide AI Suggestions">
                  <Button
                    icon={<FaAnglesDown />}
                    onClick={() => setAiSuggestionsVisible(false)}
                    className="border-none text-gray"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        )}
        <Input
          placeholder="Enter your message or provide the Agent with a /prompt"
          className="flex-1 border-none bg-transparent w-full p-3 rounded-xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <Segmented
              options={["Hands-on", "Hands-free"]}
              value={selectedMode}
              onChange={setSelectedMode}
              className="rounded-xl p-2 text-base font-medium"
            />
            <p className="text-base"></p>
            <p className="border-l border-gray-black h-6"></p>
            <Button icon={<GrAttachment />} type="text" className="text-xl" />
            <Button icon={<SmileOutlined />} type="text" className="text-xl" />
          </div>
          <div className="flex items-center">
            <Button
              icon={<AudioOutlined />}
              type="button"
              className="ml-2 bg-white rounded-lg text-xl"
            />
            <Button
              icon={<FaLongArrowAltUp />}
              type="button"
              onClick={handleSendMessage}
              className="ml-2 bg-white rounded-lg text-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
