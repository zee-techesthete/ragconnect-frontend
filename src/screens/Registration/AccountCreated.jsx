import React, { useEffect } from "react";
import wavyCheck from "../../assets/svgs/Wavy_Check.svg";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../redux/slices/authSlice";

const AccountCreated = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, verificationSuccess, error, signupSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // If accessed directly without signup, redirect to signup page
    if (!signupSuccess) {
      navigate("/signup");
      return;
    }

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, location, navigate, signupSuccess]);

  useEffect(() => {
    if (verificationSuccess) {
      setTimeout(() => {
        navigate("/verify-email");
      }, 2000);
    }
  }, [verificationSuccess, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-primary px-4">
      {/* Logo */}
      <div className="w-full flex flex-wrap items-center justify-between mt-5 px-4 md:px-8 lg:px-20 py-4">
        <img src={Logo} alt="Company Logo" className="w-24 lg:w-32 h-auto" />
        <div className="flex gap-2 md:gap-4">
          <PrimaryBtn
            title="Get help"
            className="bg-white text-sm md:text-base"
          />
          <PrimaryBtn
            title="Login"
            className="bg-white text-sm md:text-base"
            href="/login"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-xs md:max-w-sm">
          {/* Check Icon */}
          <div className="mb-4 flex justify-center">
            <img src={wavyCheck} alt="wavy-check" className="w-16 md:w-20" />
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold">Account Created</h2>

          {/* Message */}
          <p className="text-dullGray mt-2 text-sm md:text-base">
            Please check your email to confirm your account before signing in.
          </p>

          {/* Loading State */}
          {loading && (
            <p className="text-gray-600 mt-4">Verifying your email...</p>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
