import React from "react";
import SearchMessageInbound from "./SearchMessageInbound";
import MessageInboundConv from "./MessageInboundConv";
import MessageDetail from "./MessageInboundDetails";

const MessageInbound = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      {/* Search Bar & Filters */}
      <div className="p-2 border-b border-gray">
        <SearchMessageInbound />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden ">
        {/* Left Sidebar - Conversations List */}
        <div className="w-1/4 border-r border-gray overflow-y-auto">
          <MessageInboundConv />
        </div>

        {/* Center Section (Placeholder for Chat UI) */}
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Chat UI goes here (To be implemented)
        </div>

        {/* Right Sidebar - Message Details */}
        <div className="w-1/4 border-l border-gray overflow-y-auto">
          <MessageDetail />
        </div>
      </div>
    </div>
  );
};

export default MessageInbound;
