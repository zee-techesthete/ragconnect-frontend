import { Avatar } from "antd";
import React from "react";

const AiBubble = ({ message, botAvatar }) => {
  return (
    <div className="flex items-center space-x-2 ">
      {botAvatar && (
        <div className="w-8 h-8 bg-white text-gray-700 font-bold">
         <Avatar className="bg-gray text-black me-2"> mi
                </Avatar>
        </div>
      )}
      <div className="bg-white border border-gray200 p-3 rounded-t-2xl rounded-ee-2xl shadow-sm max-w-[75%]">
        {message}
      </div>
    </div>
  );
};

export default AiBubble;
