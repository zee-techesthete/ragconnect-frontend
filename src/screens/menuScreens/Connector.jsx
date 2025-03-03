import React, { useState } from "react";
import SocialCards from "../../components/SocialCard";
import PrimaryBtn from "../../components/PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import socialIcons from "../../utils/socialIcons";
import { authenticateSocial } from "../../redux/slices/socialAuthSlice";

const rootUrl = import.meta.env.VITE_ROOT_URL;

const Connector = () => {
  const [formData, setFormData] = useState({
    socialPlatform: "", // Store the selected platform
    selectedMenu: "channels", // Store selected menu item
  });
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const dispatch = useDispatch();
  // const { isLoading, isConnected } = useSelector((state) => state.googleAuth);
  const { isConnected = {}, isLoading = false } =
  useSelector((state) => state?.socialAuth) || {};



  const socialPlatforms = Object.keys(socialIcons).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url: socialIcons[key],
    connected: isConnected[key] || false,
  }));

  const handleMenuClick = (menu) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedMenu: menu, // Set selected menu
    }));
  };

  const handleSocialAuth = (platform) => {
    setSelectedPlatform(platform);
    dispatch(authenticateSocial(platform.toLowerCase()));
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

      <div className="flex justify-between items-center p-4">
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
      <div className="grid grid-cols-3 gap-4 p-3">
        {socialPlatforms.map((platform) => (
          <SocialCards
            key={platform.name}
            platform={platform}
            onConnect={() => handleSocialAuth(platform.name)}
            isConnecting={isLoading && selectedPlatform === platform.name}
            isConnected={platform.connected}
            isSelected={selectedPlatform === platform.name}
            linkText={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Connector;
