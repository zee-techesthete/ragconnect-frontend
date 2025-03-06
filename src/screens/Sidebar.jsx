import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../assets/svgs/userLogo.svg";
import ProgressBar from "../components/Progress";

const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile Sidebar State
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Inbound", path: "/inbound" },
    { name: "Customer Hub", path: "/customer-hub" },
    { name: "Training Hub", path: "/training-hub" },
    { name: "Connector", path: "/connector" },
    { name: "Agent Setting", path: "/agent-setting" },
  ];

  return (
    <>
      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen w-64 bg-primary text-black p-5 transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:flex-col`}
      >
        {/* Close Button (Mobile) */}
        <button
          className="md:hidden absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Profile and Settings */}
        <div className="flex items-center mb-5">
          <img src={Logo} alt="Profile" className="w-10 h-10 rounded-lg mr-3" />
          <span className="font-semibold">John Doe</span>
          <button onClick={toggleDropdown} className="text-sm">
            <span className="material-icons">expand_more</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-gray-100 rounded-md p-2 mt-2 b-0 shadow-md">
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

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
              className={`flex items-center space-x-2 cursor-pointer p-2 rounded-md ${
                location.pathname === item.path ? "bg-gray200" : "hover:bg-gray200"
              }`}
            >
              <span className="p-4 rounded-md bg-gray"></span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        {/* Agent Memory */}
        <div className="mt-auto bg-gray p-4 rounded-md">
          <div className="flex justify-between mb-2">
            <span>Agent Memory</span>
            <span className="underline pb-1 cursor-pointer">Upgrade</span>
          </div>
          <ProgressBar value={75} />
          <div className="text-sm text-gray-400">1.4 GB of 10 GB used</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
