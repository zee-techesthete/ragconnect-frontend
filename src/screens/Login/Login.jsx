import React, { useState } from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        <h2 className="text-2xl font-bold text-center mb-6">Welcome</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <div className="relative">
            <input
               type={showPassword ? "text" : "password"}
              placeholder="**********"
              className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none "
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // 👁️ Toggle password visibility
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </span>
          </div>
        </div>

        {/* Keep me signed in & Forgot password */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center text-sm">
            <input type="checkbox" className="mr-2" />
            Keep me signed in
          </label>
          <Link
            to="/reset-password"
            className="text-sm text-gray-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <PrimaryBtn title={"Login"} className="w-full bg-black text-white py-2 rounded-md font-semibold" href="/" />

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR LOGIN WITH</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-md">
          <button className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition">
            <FcGoogle className="mr-2 text-xl" />
            Sign Up with Google
          </button>
          <button className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition">
            <FaMicrosoft className="mr-2 text-xl text-blue-600" />
            Sign Up with Outlook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
