import React from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
const ChatUI = () => {
  return (
    <div className="flex flex-col h-screen bg-primary">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-12">
        <img
          src="../../src/assets/images/logo.png"
          alt="Company Logo"
          className="w-32 h-auto"
        />
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
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-700 font-bold flex items-center justify-center rounded-md">
                IM
              </div>
              <div className="bg-white border p-3 rounded-lg shadow-sm max-w-[75%]">
                Welcome to IntellMark 👋 We're excited to get you started. Let's
                tailor your experience to match your goals.
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-700 font-bold flex items-center justify-center rounded-md">
                IM
              </div>
              <div className="bg-white border p-3 rounded-lg shadow-sm max-w-[75%]">
                Only six quick questions to configure everything to your needs,
                this won’t take more than a minute!
              </div>
            </div>

            {/* User Message */}
            <div className="flex items-start space-x-2 justify-end">
              <div className="bg-gray-300 text-black p-3 rounded-lg shadow-sm max-w-[75%]">
                Business
              </div>
              <div className="w-8 h-8 bg-gray-500 text-white font-bold flex items-center justify-center rounded-md">
                Me
              </div>
            </div>

            {/* Another AI Message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-700 font-bold flex items-center justify-center rounded-md">
                IM
              </div>
              <div className="bg-white border p-3 rounded-lg shadow-sm max-w-[75%]">
                What is your company name?
              </div>
            </div>

            {/* User Response */}
            <div className="flex items-start space-x-2 justify-end">
              <div className="bg-gray-200 text-black p-3 rounded-lg shadow-sm max-w-[75%]">
                XYZ Store
              </div>
              <div className="p-2 bg-white rounded-md">me</div>
            </div>
          </div>

          {/* Chat Input Box */}
          <div className="flex items-center p-3 bg-gray-100">
            <textarea
              className="flex-grow p-2 focus:outline-none resize-none h-20 max-h-40 bg-transparent"
              placeholder="Enter your company website or social media link"
            ></textarea>
            <PrimaryBtn icon="arrow_upward" className="px-2 py-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
