import React from "react";
import SearchMessageInbound from "./SearchMessageInbound";
import MessageInboundConv from "./MessageInboundConv";
import MessageDetail from "./MessageInboundDetails";
import ChatUI from "../../ChatUI/ChatUI";

const MessageInbound = () => {
  return (
    <div className="flex flex-col w-full">
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
        <div className="w-2/4 flex-1 overflow-y-auto">
          <ChatUI/>
        </div>

        {/* Right Sidebar - Message Details */}
        <div className="w-1/4 border-gray overflow-y-auto">
          <MessageDetail />
        </div>
      </div>
    </div>
  );
};

export default MessageInbound;
