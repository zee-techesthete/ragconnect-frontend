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
      className={`flex flex-col border p-3 sm:p-6 lg:p-3 rounded-md cursor-pointer gap-3 sm:gap-4 hover:border-black 
        ${isConnected ? "border-black" : "bg-white border-gray"} transition-all
        w-full max-w-md mx-auto`} // ✅ Ensures one card per row in small & tablet screens
      onClick={isConnected ? onClick : undefined}
    >
      <div className="flex flex-row md:flex-row items-center justify-between gap-3">
        {/* Platform Icon & Name */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={platform.url} alt={platform.name} className="w-8 h-8 md:w-10 md:h-10" />
          <span className="text-sm sm:text-base md:text-lg font-medium">{platform.name}</span>
        </div>

        {/* Connection Button */}
        {isConnected ? (
          <div className="flex items-center gap-2">
            <PrimaryBtn title="Connected" disabled={true} className="w-full sm:w-auto" />
            <span className="material-icons text-gray-500 text-sm md:text-base cursor-pointer">
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
            className=" w-full sm:w-auto" // ✅ Full width on small screens, auto on larger screens
          />
        )}
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
        Link your agent to this channel to...
      </p>
    </div>
  );
};

export default SocialCards;
