import React from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
import AiBubble from "../../components/AiBubble";
import UserBubble from "../../components/UserBubble";
import ChatInput from "../../components/ChatInput";
const ChatUI = () => {
  return (
    <div className="flex flex-col h-screen bg-primary">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-12">
        <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
        <div className="flex gap-4">
          <PrimaryBtn title={"Get help"} className="bg-white" />
          <PrimaryBtn title={"Login"} className="bg-white" />
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-2xl h-[80vh] flex flex-col p-4 overflow-hidden">
          {/* Chat Messages */}
          <div className="flex flex-col flex-grow space-y-4 overflow-y-auto p-2">
            {/* AI Message */}
            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />

            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />

            {/* User Message */}
            <UserBubble message={"XYZ Store"} userAvatar={true} />

            {/* Another AI Message */}
            <AiBubble
              message={
                "Welcome to IntellMark 👋 We're excited to get you started. Let's tailor your experience to match your goals"
              }
              botAvatar={true}
            />

            {/* User Response */}
            <UserBubble message={"XYZ Store"} userAvatar={true} />
          </div>

          {/* Chat Input Box */}
          <ChatInput
            suggestions={false}
            data={[
              "Small (1-9)",
              "Medium (10-49)",
              "Large (50-249)",
              "Enterprise (250+)",
              "Enterprise (250+)",
              "Enterprise (250+)",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
