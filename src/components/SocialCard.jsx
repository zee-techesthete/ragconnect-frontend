import React from "react";
import PrimaryBtn from "./PrimaryBtn";

const SocialCards = ({ platform, onClick, isSelected, connect, connected }) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col border border-gray p-4 rounded-md cursor-pointer gap-2 hover:border-black ${
        isSelected ? "border-black" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <img src={platform.url} alt={platform.name} className="w-8 h-8" />
          <span>{platform.name}</span>
        </div>
        {connected ? (
          <span className="material-icons ">{"settings"}</span>
        ) : (
          <div>{connect && <PrimaryBtn title={"Connect"} />}</div>
        )}
      </div>
      <p className="text-xs"> Link your agent to this channel to...</p>
    </div>
  );
};

export default SocialCards;
