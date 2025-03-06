import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPasswordReset } from "../../redux/slices/resetPasswordSlice";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(
    (state) => state.resetPassword
  );

  const handleResetPassword = () => {
    dispatch(requestPasswordReset(email));
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary px-4 sm:px-6 lg:px-8">
      {/* Header */}
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

      {/* Reset Password Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Reset Password
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          {success && (
            <p className="bg-green text-green-500 p-3 rounded-lg mb-4 text-center">
              {success}
            </p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Error Message */}

          {/* Success Message */}

          {/* Reset Button */}
          <button
            className="w-full bg-black text-white py-2 rounded-md text-sm sm:text-base"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send reset instructions"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
