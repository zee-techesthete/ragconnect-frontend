import React from "react";
import PrimaryBtn from "./PrimaryBtn";

const SocialCards = ({ platform, onClick, isSelected, connect }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between border border-gray p-4 rounded-md cursor-pointer gap-4 ${
        isSelected ? "bg-black text-white" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img src={platform.url} alt={platform.name} className="w-8 h-8" />
        <span>{platform.name}</span>
      </div>
      <div>{connect && <PrimaryBtn title={"Connect"} />}</div>
    </div>
  );
};

export default SocialCards;
