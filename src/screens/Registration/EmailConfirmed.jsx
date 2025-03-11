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
          // If we have an email, redirect to login after a short delay
          if (!token) {
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        } else {
          setVerificationStatus("error");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setVerificationStatus("error");
      }
    };

    verifyEmailToken();
  }, [dispatch, searchParams, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGetHelp = () => {
    // Implement help functionality
    console.log("Get help clicked");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center">
          <img className="h-12 w-auto" src={Logo} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {verificationStatus === "verifying" && "Verifying your email..."}
            {verificationStatus === "error" && "Email Confirmed"}
            {verificationStatus === "success" && "Verification failed"}
          </h2>
        </div>

        {verificationStatus === "verifying" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Please wait while we verify your email...
            </p>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center">
            <p className="text-dullGray mt-2 text-sm md:text-base">
              Your email has been confirmed, you can now login and start your
              account!
            </p>
            <div className="flex justify-center mt-4">
              <PrimaryBtn
                title="Login"
                className="bg-black text-white"
                href="/login"
              />
            </div>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {error || "Email is not verified. Please try again."}
            </p>
            {/* <div className="space-y-4">
              <button
                onClick={handleGetHelp}
                className="w-full text-sm text-gray-600 hover:text-gray-900"
              >
                Need help? Contact support
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmed;
