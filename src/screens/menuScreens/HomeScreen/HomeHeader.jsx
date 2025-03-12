import React, { useState } from "react";
import userImg from "../../../assets/33.png";
import { MdNotificationAdd } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { BsSun, BsMoon } from "react-icons/bs";
import { BiHelpCircle } from "react-icons/bi";
import { Divider } from "antd";
import PrimaryBtn from "../../../components/PrimaryBtn";

const HomeHeader = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg">
      {/* First Row */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 lg:p-4 gap-4">
        <h2 className="text-2xl sm:text-2xl font-semibold w-full sm:w-auto text-center sm:text-left">
          Home
        </h2>
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="border border-gray bg-gray text-sm sm:text-base font-semibold p-2 sm:px-4 rounded-md hover:bg-white transition">
            Upgrade
          </button>
          <div className="bg-gray p-3 rounded-md">
            <MdNotificationAdd />
          </div>
         

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button>
              <img
                src={userImg}
                alt="User Avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray hover:border-black cursor-pointer"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-64 bg-white shadow-md border border-gray rounded-lg p-4 z-[9999]">
                {/* User Info */}
                <div className="flex items-center gap-3 p-2">
                  <img src={userImg} alt="User" className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold">Jordan Miles</p>
                    <p className="text-xs text-gray">jordan.milesss@gmail.com</p>
                  </div>
                </div>
                <Divider className="my-2" />

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-evenly bg-primary p-2 rounded-full my-2 cursor-pointer">
                  <BsSun className={`${!darkMode ? "text-black" : "text-dullGray"}`} />
                  <div
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-12 h-6 bg-gray800 rounded-full flex items-center transition ${
                      darkMode ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
                  </div>
                  <BsMoon className={`${darkMode ? "text-black" : "text-dullGray"}`} />
                </div>
                <Divider className="my-2" />


                {/* Menu Items */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray" : "bg-white"
                      } flex items-center gap-2 w-full p-2 rounded-lg text-sm`}
                    >
                      <FiSettings />
                      Go to Settings
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray" : "bg-white"
                      } flex items-center gap-2 w-full p-2 rounded-lg text-sm`}
                    >
                      <BiHelpCircle />
                      Get Help
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } flex items-center gap-2 w-full p-2 rounded-lg text-sm text-red-500`}
                    >
                      <FiLogOut />
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-4 lg:px-4 pb-3 sm:pb-4 lg:pb-4 gap-4">
            <div className="w-[400px]">
              <p>Chat with your AI Agent to discuss ideas, solve problems, and analyze insights. 
              Use powerful brainstorming and business tools to boost creativity and productivity.</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <PrimaryBtn
                title="Settings Guide"
                icon="lightbulb"
                className="w-48border-gray text-sm sm:text-base font-semibold hover:bg-gray-50 transition-colors duration-200"
              />
            </div>
          </div>
    </div>
  );
};

export default HomeHeader;
