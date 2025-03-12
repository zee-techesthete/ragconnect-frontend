import React from "react";
import SearchMessageInbound from "./SearchMessageInbound";
import MessageInboundConv from "./MessageInboundConv";
import MessageDetail from "./MessageInboundDetails";
import ChatUI from "../../ChatUI/ChatUI";
import MessageHeader from "./MessageHeader";
const MessageInbound = () => {
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="">
      <MessageHeader/>
      </div>
      {/* Search Bar & Filters */}
      <div className="p-2 border-b border-gray">
        <SearchMessageInbound />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Conversations List */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray overflow-y-auto custom-scrollbar">
          <MessageInboundConv />
        </div>

        {/* Center Section (Chat UI) */}
        <div className="hidden md:block w-full md:w-2/3 lg:w-1/2 flex-1 overflow-y-auto custom-scrollbar">
          <ChatUI/>
        </div>

        {/* Right Sidebar - Message Details */}
        <div className="hidden lg:block w-1/4 border-gray overflow-y-auto">
          <MessageDetail />
        </div>
      </div>
    </div>
  );
};

export default MessageInbound;
