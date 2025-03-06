import React from "react";
import userImg from "../../../assets/33.png";
import PrimaryBtn from "../../../components/PrimaryBtn";

const MessageHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
      <h2 className="text-2xl font-semibold">Inbound Conversations</h2>
      <div className="flex flex-wrap items-center gap-3">
        <PrimaryBtn 
          title="+ Invite" 
          className="border-gray font-semibold hover:bg-gray-50 transition-colors duration-200" 
        />
        <PrimaryBtn 
          title="Upgrade" 
          className="border-gray bg-gray font-semibold hover:bg-gray-600 transition-colors duration-200" 
        />
        <img
          src={userImg}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-gray-200 hover:border-gray-300 transition-colors duration-200 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MessageHeader;
