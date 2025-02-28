import React from "react";
import PrimaryBtn from "./PrimaryBtn";

const SocialCards = ({
  platform,
  onClick,
  isSelected,
  connect,
  connected,
  linkText,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col border border-gray p-4 rounded-md cursor-pointer gap-2 hover:border-black ${
        isSelected ? "border-black" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <img src={platform.url} alt={platform.name} className="w-8 h-8" />
          <span className="text-sm md:text-base">{platform.name}</span>
        </div>
        {connected ? (
          <span className="material-icons text-sm md:text-base">
            {"settings"}
          </span>
        ) : (
          <div>{connect && <PrimaryBtn title={"Connect"} />}</div>
        )}
      </div>
      {linkText && (
        <p className="text-xs md:text-sm">
          Link your agent to this channel to...
        </p>
      )}
    </div>
  );
};

export default SocialCards;
