import React, { useState } from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // 👁️ Import eye icons

const EnterPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      {/* Reset Password Form */}
      <div className="p-8 rounded-lg w-96">
        <h2 className="text-4xl font-bold text-center mb-6">Reset Password</h2>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="**********"
              className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle confirm password visibility
              placeholder="**********"
              className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
        </div>

        {/* Reset Password Button */}
        <button className="w-full bg-black text-white py-2 rounded-md font-semibold">
          Reset password
        </button>
      </div>
    </div>
  );
};

export default EnterPassword;
