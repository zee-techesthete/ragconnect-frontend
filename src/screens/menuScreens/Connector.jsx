import React, { useState } from "react";
import axios from "axios";
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
import PrimaryBtn from "../../components/PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";

const rootUrl = import.meta.env.VITE_ROOT_URL;

const Connector = () => {
  const [formData, setFormData] = useState({
    socialPlatform: "", // Store the selected platform
    selectedMenu: "channels", // Store selected menu item
  });
  const dispatch = useDispatch();
  const { isLoading, isConnected } = useSelector((state) => state.googleAuth);

  const handleGoogleAuth = () => {
    dispatch(authenticateGoogle());
  };

  const handleInputChange = async (field, value) => {
    try {
      // Send a request to the backend to initiate the Google OAuth flow
      if (value === "Google") {
        const response = await axios.get(`${rootUrl}/api/auth/google`);
        if (response.data && response.data.url) {
          window.location.href = response.data.url;
        }
      }

      if (value === "Outlook") {
        const response = await axios.get(`${rootUrl}/api/auth/outlook`);
        if (response.data && response.data.url) {
          console.log("*response: ", response.data.url);
          window.location.href = response.data.url;
        }
      }

      if (value === "Smtp") {
        const response = await axios.get(`${rootUrl}/api/auth/smtp`);
        if (response.data && response.data.url) {
          console.log("*response: ", response.data.url);
          window.location.href = response.data.url;
        }
      }
    } catch (error) {
      console.error("Error initiating authentication:", error);
    }

    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const socialPlatforms = [
    { name: "Google", url: googleIcon, connected: isConnected },
    { name: "Slack", url: slackIcon },
    { name: "Smtp", url: instagramIcon },
    { name: "Outlook", url: telegramIcon },
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
  ];

  const handleMenuClick = (menu) => {
    console.log("*menu: ", menu);
    setFormData((prevState) => ({
      ...prevState,
      selectedMenu: menu, // Set selected menu
    }));
  };

  const menuItems = ["channels", "settings", "help", "profile"];

  return (
    <div>
      {/* Menu Selection with Dynamic Styles */}
      <div className="my-6 border border-t-gray border-b-gray border-l-0 border-r-0 flex gap-4">
        {menuItems.map((menu) => (
          <div
            key={menu}
            onClick={() => handleMenuClick(menu)}
            className={`flex items-center gap-2 cursor-pointer p-4 ${
              formData.selectedMenu === menu
                ? " text-black border-b-2 border-black"
                : " text-gray-500 border-b-2 border-white"
            }`}
          >
            <span className="p-4 bg-gray rounded-xl"></span>
            <span>{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>{" "}
            {/* Capitalize first letter */}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center my-6">
        <h2 className="font-semibold tetx-xl"> All Channels</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-2 rounded-lg border border-gray300 ">
            {/* Search input field */}
            <span className="material-icons text-gray">{"search"}</span>
            <input
              type="search"
              className="focus:outline-none focus:ring-0"
              placeholder="Search..."
            />
          </div>
          <PrimaryBtn className="px-2" icon="tune" />
        </div>
      </div>

      {/* Social Platform Selection */}
      <div className="grid grid-cols-3 gap-4">
        {socialPlatforms.map((platform) => (
          <SocialCards
            key={platform.name}
            platform={platform}
            connect={true}
            connected={platform.connected}
            onClick={() => handleInputChange("socialPlatform", platform.name)}
            isSelected={formData.socialPlatform === platform.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Connector;
