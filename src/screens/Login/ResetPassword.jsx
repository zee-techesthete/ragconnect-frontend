import React from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

const ResetPassword = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      {/* Header with Logo & Buttons */}
      <div className="absolute top-12 left-20">
        <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
      </div>

      <div className="absolute top-12 right-20 flex gap-4">
        <PrimaryBtn title="Get help" className="bg-white" />
        <PrimaryBtn title="Register" className="bg-white" href="/signup" />
      </div>

      {/* Login Form */}
      <div className=" p-8 rounded-lg w-96">
        <h2 className="text-4xl font-bold text-center mb-6">Reset Password</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-black text-white py-2 rounded-md ">
          Send reset instruction
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
