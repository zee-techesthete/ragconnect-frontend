import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineHome, AiOutlineTeam, AiOutlineBook, AiOutlineLink, AiOutlineSetting } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import Logo from "../assets/svgs/userLogo.svg";
import ProgressBar from "../components/Progress";

const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const menuItems = [
    { name: "Home", path: "/home", icon: <AiOutlineHome size={20} /> },
    { name: "Inbound", path: "/inbound", icon: <BiMessageSquareDetail size={20} /> },
    { name: "Customer Hub", path: "/customer-hub", icon: <AiOutlineTeam size={20} /> },
    { name: "Training Hub", path: "/training-hub", icon: <AiOutlineBook size={20} /> },
    { name: "Connector", path: "/connector", icon: <AiOutlineLink size={20} /> },
    { name: "Agent Setting", path: "/agent-setting", icon: <AiOutlineSetting size={20} /> },
    { name: "Account Setting", path: "/account-setting", icon: <AiOutlineSetting size={20} /> },
  ];

  return (
    <>
      {/* Hamburger Menu (Mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-primary p-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
        onClick={toggleSidebar}
        aria-label="Toggle Menu"
      >
        <AiOutlineMenu size={24} className="text-white" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen w-64 bg-primary text-gray-800 p-6 transform transition-all duration-300 ease-in-out z-50 shadow-lg md:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:flex-col`}
      >
        {/* Close Button (Mobile) */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={toggleSidebar}
          aria-label="Close Menu"
        >
          <AiOutlineClose size={24} />
        </button>

        {/* Profile and Settings */}
        <div className="flex items-center mb-8 relative">
          <img src={Logo} alt="Profile" className="w-12 h-12 rounded-md mr-3 shadow-md" />
          <div className="">
            <span className="font-semibold text-lg block">John Doe</span>
          </div>
          <button 
            onClick={toggleDropdown} 
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle Profile Menu"
          >
            <span className="material-icons text-gray-600">expand_more</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 border border-gray-100">
              <div
                onClick={() => alert("Opening Settings")}
                className="cursor-pointer px-4 py-2 hover:bg-gray text-gray-700"
              >
                Settings
              </div>
              <div
                onClick={() => alert("Logging Out")}
                className="cursor-pointer px-4 py-2 hover:bg-gray-50 text-gray-700"
              >
                Logout
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
              className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? "bg-gray800 text-black" 
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className={`${location.pathname === item.path ? "text-white" : "text-gray-600"}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Agent Memory */}
        <div className="mt-auto bg-gray p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="font-normal text-gray-700">Agent's memory</span>
            <span className="text-sm text-primary hover:underline cursor-pointer">Upgrade</span>
          </div>
          <ProgressBar value={25} />
          <div className="text-sm text-gray-500 mt-2">1.4 GB of 10 GB used</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
