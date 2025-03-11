import React, { useEffect, useState } from "react";
import SocialCards from "../../components/SocialCard";
import { useDispatch, useSelector } from "react-redux";
import SoIcons from "../../utils/Icons";
import {
  authenticateSocial,
  setAuthData,
} from "../../redux/slices/socialAuthSlice";
import ConnectorHeader from "./ConnectorHeader";
import { Button, Checkbox, Dropdown, Menu } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import SmtpModal from "../../utils/SmptModal";

const Connector = () => {
  const [formData, setFormData] = useState({
    socialPlatform: "", // Store the selected platform
    selectedMenu: "channels", // Store selected menu item
  });
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isSmtpModalOpen, setIsSmtpModalOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    isConnected = {},
    isLoading = {},
    isVerifying = {},
  } = useSelector((state) => state?.socialAuth) || {};
  const userIds = useSelector((state) => state.socialAuth.userIds);
  const tokens = useSelector((state) => state.socialAuth.tokens);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("user_id");
    const token = urlParams.get("token");

    const storedPlatform = localStorage.getItem("selectedPlatform");

    if (id && token && storedPlatform) {
      dispatch(setAuthData({ platform: storedPlatform, id, token }));

      localStorage.removeItem("selectedPlatform");
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [dispatch]);

  const socialPlatforms = Object.keys(SoIcons).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url: SoIcons[key],
    connected: isConnected[key.toLowerCase()] || false,
  }));

  const handleMenuClick = (menu) => {
    setFormData((prevState) => ({
      ...prevState,
      selectedMenu: menu, // Set selected menu
    }));
  };

  const handleSocialAuth = (platform) => {
    let platformKey = platform.toLowerCase();
    if (platformKey === "email") {
      platformKey = "smpt";
    }
    if (platformKey === "email" || platformKey === "smpt") {
      setSelectedPlatform(platformKey);
      setIsSmtpModalOpen(true);
      return;
    }
    localStorage.setItem("selectedPlatform", platformKey);
    console.log("======>>>>", platformKey);
    dispatch(authenticateSocial(platformKey));
  };

  // const handlePlatformClick = (platform) => {
  //   console.log("workkkkk");

  //   const platformKey = platform.toLowerCase();
  //   if (!isConnected[platformKey]) return;

  //   const userId = userIds[platformKey];
  //   const token = tokens[platformKey];

  //   console.log("User ID:", userId);
  //   console.log("Token:", token);

  //   if (userId && token) {
  //     console.log("Dispatching fetchEmails...");
  //     dispatch(
  //       fetchEmails({
  //         platform: platformKey,
  //         userId,
  //         token,
  //       })
  //     );
  //     navigate(`/inbound`);
  //   } else {
  //     console.warn("Missing userId or token!");
  //   }
  // };

  const filterOptions = [
    { label: "Order status", value: "order_status" },
    { label: "Gift card", value: "gift_card" },
    { label: "Shipping", value: "shipping" },
    { label: "Order changes", value: "order_changes" },
    { label: "Product availability", value: "product_availability" },
  ];

  const filterCategories = [
    { label: "Status", hasSubFilters: true, subFilters: filterOptions },
    {
      label: "Category",
      hasSubFilters: true,
      subFilters: filterOptions,
    },
  ];

  const toggleFilter = (open) => {
    setFilterOpen(open);
    if (!open) setActiveSubFilter(null);
  };
  const handleFilterChange = (checkedValues) => {
    setSelectedFilters(checkedValues);
  };
  const menu = (
    <Menu className="w-56 shadow-lg rounded-lg">
      {filterCategories.map((category) =>
        category.hasSubFilters ? (
          <Menu.SubMenu
            key={category.label}
            title={category.label}
            onTitleClick={() => setActiveSubFilter(category.label)}
          >
            {activeSubFilter === category.label && (
              <div className="p-3">
                <Checkbox.Group
                  options={category.subFilters}
                  value={selectedFilters}
                  onChange={handleFilterChange}
                  className="flex flex-col gap-2"
                />
              </div>
            )}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={category.label}>{category.label}</Menu.Item>
        )
      )}
    </Menu>
  );

  const menuItems = ["Channels", "All Integrations", "Custom code", "GitHub"];

  return (
    <div className="">
      <ConnectorHeader />
      {/* Menu Selection with Dynamic Styles */}
      <div className="my-3 border border-t-gray border-b-gray border-l-0 border-r-0 flex gap-4">
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
            <span className="p-4 bg-gray rounded-md"></span>
            <span>{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>{" "}
            {/* Capitalize first letter */}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center p-4 ">
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

          <Dropdown
            menu={{ items: menu }}
            trigger={["click"]}
            open={filterOpen}
            onOpenChange={toggleFilter}
            overlayStyle={{ position: "absolute", right: "1%" }}
          >
            <Button
              icon={<FilterOutlined />}
              className="size-10 border border-gray bg-white hover:bg-gray200"
            />
          </Dropdown>
        </div>
      </div>

      {/* Social Platform Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {socialPlatforms.map((platform) => {
          const platformKey = platform.name.toLowerCase(); // ✅ Ensure lowercase key

          return (
            <SocialCards
              key={platform.name}
              platform={platform}
              onConnect={() => handleSocialAuth(platformKey)}
              isConnecting={isLoading[platformKey] || false}
              isConnected={isConnected[platformKey] || false}
              isVerifying={isVerifying[platformKey]}
              isSelected={selectedPlatform === platformKey}
              linkText={true}
            />
          );
        })}
      </div>
      <SmtpModal
        isOpen={isSmtpModalOpen}
        onClose={() => setIsSmtpModalOpen(false)}
        platform={selectedPlatform}
      />
    </div>
  );
};

export default Connector;
