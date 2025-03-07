import React from 'react'
import userImg from "../../../assets/33.png";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { MdNotificationAdd } from "react-icons/md";


const AccountHeader = () => {
    return (
        <div className="flex flex-col gap-4 bg-white rounded-lg">
          {/* First Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:p-4 lg:p-4 gap-4">
            <h2 className="text-2xl sm:text-2xl font-semibold w-full sm:w-auto text-center sm:text-left">Account Settings</h2>
            <div className="flex items-center gap-2 sm:gap-3">
              <PrimaryBtn 
                title="Upgrade" 
                className="border-gray bg-gray text-sm sm:text-base font-semibold hover:bg-white transition-colors duration-200 px-3 sm:px-4" 
              />
              <div className='bg-gray p-3 rounded-md'>
                <MdNotificationAdd />
              </div>

              <img
                src={userImg}
                alt="User Avatar"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray hover:border-gray transition-colors duration-200 cursor-pointer"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-4 lg:px-4 pb-3 sm:pb-4 lg:pb-4 gap-4">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search settings..."
                className=" pl-10 pr-4 py-2 border border-gray rounded-lg focus:outline-none focus:border-black transition-colors duration-200"
              />
              <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
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
}

export default AccountHeader