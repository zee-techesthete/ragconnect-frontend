import React from "react";

const SocialCards = ({ platform, onClick, isSelected }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center border border-gray-300 p-4 rounded-md cursor-pointer ${
        isSelected ? "bg-black text-white" : "bg-white"
      }`}
    >
      <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
        <span className="material-icons">{platform.toLowerCase()}</span>
      </div>
      <span className="font-semibold">{platform}</span>
    </div>
  );
};

export default SocialCards;
