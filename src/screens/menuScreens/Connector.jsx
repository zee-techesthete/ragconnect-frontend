import React, { useState } from "react";
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

const Connector = () => {
  const [formData, setFormData] = useState({
    socialPlatform: "", // Store the selected platform
  });

  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value, // Update the selected social platform
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
    <div>
      {/* Social Platform Selection */}
      <div className="grid grid-cols-3 gap-4">
        {socialPlatforms.map((platform) => (
          <SocialCards
            key={platform.name}
            platform={platform}
            connect={true}
            onClick={() => handleInputChange("socialPlatform", platform.name)}
            isSelected={formData.socialPlatform === platform.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Connector;
