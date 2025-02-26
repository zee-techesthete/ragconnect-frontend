import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import SocialCards from "../../components/SocialCard";

const Onboarding2 = () => {
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    socialPlatform: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const socialPlatforms = [
    "Google",
    "Instagram",
    "Telegram",
    "Facebook",
    "TripAdvisor",
    "Pinterest",
    "Discord",
    "Yahoo",
    "Twitter",
    "LinkedIn",
    "Snapchat",
    "Reddit",
    "YouTube",
    "WhatsApp",
    "TikTok",
    "Twitch",
    "WeChat",
    "Messenger",
    "Skype",
    "Viber",
    "Slack",
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-2/5 p-8 flex flex-col justify-between bg-primary">
        {/* Logo */}
        <div>
          <img
            src="../../src/assets/images/logo.png"
            alt="Company Logo"
            className="w-32 h-auto mb-8"
          />
        </div>

        {/* Step Indicator and Heading */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500">Step 2 of 3</h3>
          <h1 className="text-4xl font-bold mt-4">
            Which channel would you like to start with?
          </h1>
          <p className="mt-4 text-sm">
            You can connect your other channels later. If you don’t see your
            tools listed here, we’ll add them for you — just let us know.
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-start items-center space-x-4">
          <PrimaryBtn
            href="/"
            title="Back"
            className="text-black"
            icon="arrow_back"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/5 px-24 py-8 gap-6 flex flex-col justify-between">
        {/* Login */}
        <div className="flex gap-4 justify-end">
          <PrimaryBtn title="Get help" />
          <PrimaryBtn title="Login" />
        </div>

        {/* Social Platform Selection */}
        <div className="grid grid-cols-3 gap-4">
          {socialPlatforms.map((platform) => (
            <SocialCards
              key={platform}
              platform={platform}
              onClick={() => handleInputChange("socialPlatform", platform)}
              isSelected={formData.socialPlatform === platform}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <PrimaryBtn
            title="Skip"
            className="text-gray-500"
            href="/onboarding3"
          />
          <PrimaryBtn
            title="Next"
            className="bg-black text-white"
            icon2="arrow_forward"
            href="/onboarding3"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;
