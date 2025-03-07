import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
import { verifyEmail } from "../../redux/slices/authSlice";

const EmailConfirmed = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [verificationStatus, setVerificationStatus] = useState("verifying");

  useEffect(() => {
    const verifyEmailToken = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setVerificationStatus("error");
        return;
      }

      try {
        const result = await dispatch(verifyEmail(token)).unwrap();
        if (result.success) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setVerificationStatus("error");
      }
    };

    verifyEmailToken();
  }, [dispatch, searchParams]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGetHelp = () => {
    // Implement help functionality
    console.log("Get help clicked");
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary px-4">
      {/* Header: Logo & Buttons */}
      <div className="w-full flex flex-wrap items-center justify-between mt-5 px-4 md:px-8 lg:px-20 py-4">
        <img src={Logo} alt="Company Logo" className="w-24 lg:w-32 h-auto" />
        <div className="flex gap-2 md:gap-4">
          <PrimaryBtn
            title="Get help"
            className="bg-white text-sm md:text-base"
            onClick={handleGetHelp}
          />
          <PrimaryBtn
            title="Login"
            className="bg-white text-sm md:text-base"
            onClick={handleLogin}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-xs md:max-w-sm mt-12">
          {loading ? (
            // Loading state
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Verifying Email
              </h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Please wait while we verify your email...
              </p>
              <div className="mt-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
              </div>
            </div>
          ) : verificationStatus === "success" ? (
            // Success state
            <>
              <h2 className="text-2xl md:text-3xl font-bold">
                Email Confirmed
              </h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                Your email has been confirmed, you can now log in and start
                using your account!
              </p>
              <div className="mt-4 flex justify-center">
                <PrimaryBtn
                  title="Login"
                  onClick={handleLogin}
                  className="bg-black text-white px-6 py-3 text-sm md:text-base"
                />
              </div>
            </>
          ) : (
            // Error state
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-red-600">
                Verification Failed
              </h2>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {error || "Email verification failed. Please try again."}
              </p>
              {/* <div className="mt-4 flex justify-center gap-4">
                <PrimaryBtn
                  title="Try Again"
                  onClick={() => window.location.reload()}
                  className="bg-black text-white px-6 py-3 text-sm md:text-base"
                />
                <PrimaryBtn
                  title="Contact Support"
                  onClick={handleGetHelp}
                  className="bg-white text-black px-6 py-3 text-sm md:text-base"
                />
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmed;
