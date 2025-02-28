import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import SocialCards from "../../components/SocialCard";
import googleIcon from "../../assets/social-icons/Icon-left.png";
import slackIcon from "../../assets/social-icons/Icon-left (1).png";
import instagramIcon from "../../assets/social-icons/Icon-left (2).png";
import telegramIcon from "../../assets/social-icons/Icon-left (3).png";
import facebookIcon from "../../assets/social-icons/Icon-left (4).png";
import tripadvisorIcon from "../../assets/social-icons/Icon-left (5).png";
import pinterestIcon from "../../assets/social-icons/Icon-left (6).png";
import discordIcon from "../../assets/social-icons/Icon-left (7).png";
import yahooIcon from "../../assets/social-icons/Icon-left (8).png";
import twitterIcon from "../../assets/social-icons/Icon-left (9).png";
import linkedinIcon from "../../assets/social-icons/Icon-left (10).png";
import snapchatIcon from "../../assets/social-icons/Icon-left (11).png";
import redditIcon from "../../assets/social-icons/Icon-left (12).png";
import youtubeIcon from "../../assets/social-icons/Icon-left (13).png";
import whatsappIcon from "../../assets/social-icons/Icon-left (14).png";
import tiktokIcon from "../../assets/social-icons/Icon-left (15).png";
import twitchIcon from "../../assets/social-icons/Icon-left (16).png";
import wechatIcon from "../../assets/social-icons/Icon-left (17).png";
import messengerIcon from "../../assets/social-icons/Icon-left (18).png";
// import skypeIcon from "../../assets/social-icons/Icon-left (19).png";
// import viberIcon from "../../assets/social-icons/Icon-left (20).png";
import Logo from "../../assets/svgs/logo.svg";

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
    { name: "Google", url: googleIcon },
    { name: "Slack", url: slackIcon },
    { name: "Instagram", url: instagramIcon },
    { name: "Telegram", url: telegramIcon },
    { name: "Facebook", url: facebookIcon },
    { name: "TripAdvisor", url: tripadvisorIcon },
    { name: "Pinterest", url: pinterestIcon },
    { name: "Discord", url: discordIcon },
    { name: "Yahoo", url: yahooIcon },
    { name: "Twitter", url: twitterIcon },
    { name: "LinkedIn", url: linkedinIcon },
    { name: "Snapchat", url: snapchatIcon },
    { name: "Reddit", url: redditIcon },
    { name: "YouTube", url: youtubeIcon },
    { name: "WhatsApp", url: whatsappIcon },
    { name: "TikTok", url: tiktokIcon },
    { name: "Twitch", url: twitchIcon },
    { name: "WeChat", url: wechatIcon },
    { name: "Messenger", url: messengerIcon },
    // { name: "Skype", url: skypeIcon },
    // { name: "Viber", url: viberIcon },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-2/5 px-6 xl:px-24 py-8 flex flex-col justify-between bg-primary">
        {/* Logo */}
        <div className="mb-8">
          <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
        </div>

        {/* Step Indicator and Heading */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-500">Step 2 of 3</h3>
          <h1 className="text-2xl md:text-4xl font-bold mt-4">
            Which channel would you like to start with?
          </h1>
          <p className="mt-4 text-sm md:text-base">
            You can connect your other channels later. If you don’t see your
            tools listed here, we’ll add them for you — just let us know.
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center md:justify-start mt-8">
          <PrimaryBtn
            href="/"
            title="Back"
            className="text-black"
            icon="arrow_back"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/5 px-6 xl:px-24 py-8 gap-6 flex flex-col justify-between">
        {/* Login */}
        <div className="flex gap-4 justify-center md:justify-end mb-8">
          <PrimaryBtn title="Get help" />
          <PrimaryBtn title="Login" />
        </div>

        {/* Social Platform Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
          {socialPlatforms.map((platform) => (
            <SocialCards
              key={platform.name}
              platform={platform}
              linkText={false}
              onClick={() => handleInputChange("socialPlatform", platform.name)}
              isSelected={formData.socialPlatform === platform.name}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
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
