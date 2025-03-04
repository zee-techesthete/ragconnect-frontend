import React from "react";
import PrimaryBtn from "./PrimaryBtn";

const SocialCards = ({
  platform,
  onConnect,
  isConnecting,
  isConnected,
  linkText,
  isSelected,
  isVerifying,
  isLoading,
  onClick
}) => {  
  return (
    <div
    className={`flex flex-col border p-4 rounded-md cursor-pointer gap-2 hover:border-black ${
      isConnected ? "border-black" : "bg-white border-gray"
    }`}
    onClick={isConnected ? onClick : undefined} // ✅ Allow clicks only if connected
  >
  
      <div className="flex items-center justify-between">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <img src={platform.url} alt={platform.name} className="w-8 h-8" />
          <span className="text-sm md:text-base">{platform.name}</span>
        </div>
        {isConnected ? (
  <div className="flex items-center gap-2">
    <PrimaryBtn title="Connected" disabled={true} />
    <span className="material-icons text-gray-500 text-sm md:text-base">
      settings
    </span>
  </div>
) : (
  <PrimaryBtn
    title={
      isVerifying
        ? "Verifying..." 
        : isConnecting
        ? "Connecting..." 
        : "Connect"
    }
    onClick={!isConnecting && !isConnected ? onConnect : undefined}
    disabled={isConnecting || isConnected || isVerifying} 
  />
)}

      </div>
        <p className="text-xs md:text-sm mt-2">
          Link your agent to this channel to...
        </p>
    </div>
  );
};

export default SocialCards;
