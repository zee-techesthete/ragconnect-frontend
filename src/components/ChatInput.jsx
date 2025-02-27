import React from "react";
import PrimaryBtn from "./PrimaryBtn";
const ChatInput = () => {
  return (
    <div className="flex items-center p-3 bg-gray300 rounded-xl">
      <textarea
        className="flex-grow p-2 focus:outline-none resize-none h-20 max-h-40 bg-transparent"
        placeholder="Enter your company website or social media link"
      ></textarea>
      <PrimaryBtn icon="arrow_upward" className="py-2 bg-white" />
    </div>
  );
};

export default ChatInput;
