import React from "react";

const IconCards = ({ platform }) => {  
  return (
    <div className="flex items-center border p-2 border-gray rounded-md bg-white shadow-sm gap-3 w-full">
      <img src={platform.url} alt={platform.name} className="w-10 h-10" />
      <span className="text-sm md:text-base">{platform.name}</span>
    </div>
  );
};

export default IconCards;
