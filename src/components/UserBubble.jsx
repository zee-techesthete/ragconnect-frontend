import React from "react";

const UserBubble = ({ message, userAvatar }) => {
  return (
    <div className="flex items-start space-x-2 justify-end">
      <div className="bg-gray300 text-black p-3  rounded-t-2xl rounded-bl-2xl  shadow-sm max-w-[75%]">
        {message}
      </div>
      {/* {userAvatar && <div className="p-2 bg-white rounded-md">me</div>} */}
    </div>
  );
};

export default UserBubble;
