import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestPasswordReset,
  clearState,
} from "../../redux/slices/resetPasswordSlice";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { loading, success, error, message } = useSelector(
    (state) => state.resetPassword
  );

  useEffect(() => {
    // If there's a token in the URL, redirect to the reset password page
    if (token) {
      navigate(`/reset-password/reset?token=${token}`);
    }
  }, [token, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [dispatch]);

  // Clear messages after 5 seconds
  useEffect(() => {
    let timer;
    if (success || error) {
      timer = setTimeout(() => {
        dispatch(clearState());
      }, 10000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [success, error, dispatch]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(clearState()); // Clear any existing messages
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
          <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6">
            Reset Password
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          {success && message && (
            <div className="bg-silver  text-silver900 p-3 rounded-lg mb-4 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray rounded-md focus:outline-none text-sm sm:text-base"
              />
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset instructions"}
            </button>
          </form>

          {/* Back to Login */}
          {/* <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Back to Login
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
