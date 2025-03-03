import React from "react";

const ProgressBar = ({ value }) => {
  return (
    <div className="bg-primary h-2 rounded-full w-full mb-2">
      <div
        className="bg-black h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
