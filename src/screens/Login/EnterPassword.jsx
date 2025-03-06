import React, { useState } from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/slices/resetPasswordSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const EnterPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Get token from URL
  const { loading, message, error } = useSelector(
    (state) => state.resetPassword
  );

  const handleResetPassword = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    dispatch(resetPassword({ token, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/login", {
          state: {
            successMessage: "Your password has been changed successfully",
          },
        });
      }
    });
  };

  // Redirect on success
  if (message) {
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-primary px-4 sm:px-6 lg:px-8">
      {/* Header with Logo & Buttons */}
      <div className="w-full flex flex-wrap items-center justify-between mt-5 px-4 md:px-8 lg:px-20 py-4">
        <img src={Logo} alt="Company Logo" className="w-24 lg:w-32 h-auto" />
        <div className="flex gap-2 md:gap-4">
          <PrimaryBtn
            title="Get help"
            className="bg-white text-sm md:text-base"
          />
          <PrimaryBtn
            title="Register"
            className="bg-white text-sm md:text-base"
            href="/signup"
          />
        </div>
      </div>

      {/* Centered Reset Password Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Reset Password
          </h2>
          {errorMessage && (
            <div className="bg-gray text-gray-700 p-3 rounded-lg flex justify-between items-center mb-4 max-w-md mx-auto">
              <span>{errorMessage}</span>
              <button
                className="text-gray-500"
                onClick={() => setErrorMessage("")}
              >
                ✖
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none text-sm sm:text-base"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
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
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                placeholder="**********"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none text-sm sm:text-base"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>
          </div>

          {/* Reset Password Button */}
          <button
            className="w-full bg-black text-white py-2 rounded-md font-semibold text-sm sm:text-base"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterPassword;
