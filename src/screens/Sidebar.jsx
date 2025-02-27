import React, { useState } from "react";
import Logo from "../assets/svgs/userLogo.svg";
const Sidebar = ({ onSelectMenu }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown for settings and logout
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Menu items
  const menuItems = [
    { name: "Home", onClick: () => onSelectMenu("home") },
    { name: "Inbound", onClick: () => onSelectMenu("inbound") },
    { name: "Customer Hub", onClick: () => onSelectMenu("customerHub") },
    { name: "Training Hub", onClick: () => onSelectMenu("trainingHub") },
    { name: "Connector", onClick: () => onSelectMenu("connector") },
    { name: "Agent Setting", onClick: () => onSelectMenu("agentSetting") },
  ];

  return (
    <div className="flex flex-col h-screen w-64 bg-primary text-black p-5">
      {/* Top Section: Profile Image, Name, Dropdown */}
      <div className="flex items-center mb-5">
        <img src={Logo} alt="Profile" className="w-10 h-10 rounded-lg mr-3" />
        <span className="font-semibold">John Doe</span>
        <button onClick={toggleDropdown} className="text-sm">
          <span className="material-icons">expand_more</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute bg-gray-100 rounded-md p-2 mt-2 b-0">
            <div
              onClick={() => alert("Opening Settings")}
              className="cursor-pointer p-2 hover:bg-gray-600"
            >
              Settings
            </div>
            <div
              onClick={() => alert("Logging Out")}
              className="cursor-pointer p-2 hover:bg-gray-600"
            >
              Logout
            </div>
          </div>
        )}
      </div>

      {/* Middle Section: Menu Items */}
      <div className="space-y-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={item.onClick}
            className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-700 rounded-md"
          >
            <span className="p-4 rounded-lg bg-gray"></span>
            {/* Replace with actual icons */}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Bottom Section: Agent Memory and Progress Bar */}
      <div className="mt-auto bg-gray p-4 rounded-md">
        <div className="flex justify-between mb-2">
          <span>Agent Memory</span>
          <span className="underline pb-1 cursor-pointer">Upgrade</span>
        </div>
        <div className="bg-primary h-2 rounded-full w-full mb-2">
          <div
            className="bg-black h-2 rounded-full"
            style={{ width: "14%" }}
          ></div>
        </div>
        <div className="text-sm text-gray-400">1.4 GB of 10 GB used</div>
      </div>
    </div>
  );
};

export default Sidebar;
