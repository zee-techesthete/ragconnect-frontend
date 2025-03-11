import { useState, useEffect } from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram, FaMicrosoft } from "react-icons/fa"; // Microsoft logo
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signupUser,
  googleSSO,
  outlookSSO,
  instagramSSO,
  clearError,
} from "../../redux/slices/authSlice";

const AuthScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ssoLoading, setSSOLoading] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);

  // Add useEffect to clear error after 10 seconds
  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        dispatch(clearError());
      }, 10000); // 10 seconds
    }
    return () => {
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [error, dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    let newErrors = { ...errors };
    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;
      case "firstName":
        if (value.trim().length < 2) {
          newErrors.firstName = "First name must be at least 2 characters";
        } else {
          delete newErrors.firstName;
        }
        break;
      case "lastName":
        if (value.trim().length < 2) {
          newErrors.lastName = "Last name must be at least 2 characters";
        } else {
          delete newErrors.lastName;
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          newErrors.password =
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
        } else {
          delete newErrors.password;
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }
    setErrors(newErrors);
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (step === 2) {
      if (formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters";
      }
      if (formData.lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters";
      }
    }

    if (step === 3) {
      if (!validatePassword(formData.password)) {
        newErrors.password =
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
      }
      if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSignup = async () => {
    if (validateStep()) {
      setIsSubmitting(true);
      try {
        const { confirmPassword, ...signupData } = formData;
        const result = await dispatch(signupUser(signupData));
        if (result.meta.requestStatus === "fulfilled") {
          navigate("/account-created");
        }
      } catch {
        setErrors({
          submit: "An error occurred during signup. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleGoogleSSO = async () => {
    console.log("*here");
    try {
      setSSOLoading(true);
      const result = await dispatch(googleSSO());
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/account-created");
      }
    } catch (error) {
      setErrors({
        submit: "Google SSO failed. Please try again.",
      });
    } finally {
      setSSOLoading(false);
    }
  };

  const handleOutlookSSO = async () => {
    try {
      setSSOLoading(true);
      const result = await dispatch(outlookSSO());
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/account-created");
      }
    } catch (error) {
      setErrors({
        submit: "Outlook SSO failed. Please try again.",
      });
    } finally {
      setSSOLoading(false);
    }
  };

  const handleInstagramSSO = async () => {
    try {
      setSSOLoading(true);
      const result = await dispatch(instagramSSO());
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/account-created");
      }
    } catch (error) {
      setErrors({
        submit: "Instagram SSO failed. Please try again.",
      });
    } finally {
      setSSOLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Side */}
      <div className="w-full md:w-2/5 px-6 xl:px-24 py-8 flex flex-col justify-between bg-primary">
        {/* Logo */}
        <div className="mb-8">
          <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
        </div>

        {/* Step Indicator and Heading */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold mt-4">
            Start now with 14 days of free Premium access!
          </h1>
          <p className="mt-4 text-sm md:text-base">
            No credit card required. Cancel anything
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center md:justify-start mt-8">
          <PrimaryBtn
            title="Back"
            className={`text-black bg-white border-none ${
              step === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            icon="arrow_back"
            onClick={step > 1 ? prevStep : undefined} // Only allow if step > 1
            disabled={step === 1}
          />
        </div>
      </div>
      {/* Right Side */}
      <div
        className="w-1/2 flex flex-col justify-center items-center p-10 "
        style={{ width: "80%" }}
      >
        <div className="absolute top-8 right-20 flex gap-4">
          <PrimaryBtn title={"Get help"} />
          <PrimaryBtn title={"Login"} href="/login" />
        </div>
        {error && (
          <div className="w-full max-w-md mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {step === 1 && (
          <div className="w-full max-w-md">
            <label htmlFor="email" className="font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full border p-2 rounded-md mb-1 mt-2 ${
                errors.email ? "border-red-500 bg-red-50" : "border-gray"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-4">{errors.email}</p>
            )}
            <button
              onClick={nextStep}
              className="w-full bg-black text-white p-2 mt-3 rounded-md hover:bg-gray-800 transition-colors"
              disabled={!!errors.email}
            >
              Continue
            </button>
            <div className="flex items-center w-full my-4">
              <div className="flex-1 border-t border-gray200"></div>
              <span className="px-4 text-gray text-sm font-medium">
                OR SIGN UP WITH
              </span>
              <div className="flex-1 border-t border-gray200"></div>
            </div>
            <div className="flex  gap-3 w-full max-w-md">
              <button
                className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition"
                onClick={handleGoogleSSO}
                disabled={loading || ssoLoading}
              >
                <FcGoogle className="mr-2 text-xl" />
                Google
              </button>
              <button
                className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition"
                onClick={handleOutlookSSO}
                disabled={loading || ssoLoading}
              >
                <FaMicrosoft className="mr-2 text-xl text-blue-600" />
                Outlook
              </button>
              <button
                className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition"
                onClick={handleInstagramSSO}
                disabled={loading || ssoLoading}
              >
                <FaInstagram className="mr-2 text-xl text-blue-600" />
                Instagram
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="w-full max-w-md">
            <label htmlFor="firstName" className="font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className={`w-full border p-2 rounded-md mb-1 mt-2 ${
                errors.firstName ? "border-red-500 bg-red-50" : "border-gray"
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mb-3">{errors.firstName}</p>
            )}

            <label htmlFor="lastName" className="font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className={`w-full border p-2 rounded-md mb-1 mt-2 ${
                errors.lastName ? "border-red-500 bg-red-50" : "border-gray"
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mb-4">{errors.lastName}</p>
            )}

            <div className="flex absolute bottom-8 right-20">
              <button
                onClick={nextStep}
                className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors"
                disabled={!!errors.firstName || !!errors.lastName}
              >
                Continue <FaArrowRightLong className="text-lg" />
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="w-full max-w-md">
            {/* Password Field */}
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={errors.password || "Password"}
                className={`w-full border p-2 rounded-md mb-3 mt-2 pr-10 ${
                  errors.password ? "border-red-500 bg-red-100" : "border-gray"
                }`}
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
            {errors.password && (
              <p className="text-red-500 text-sm mb-3">{errors.password}</p>
            )}

            {/* Confirm Password Field */}
            <label htmlFor="confirmPassword" className="font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={errors.confirmPassword || "Confirm Password"}
                className={`w-full border p-2 rounded-md mb-4 mt-2 pr-10 ${
                  errors.confirmPassword
                    ? "border-red-500 bg-red-100"
                    : "border-gray"
                }`}
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
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-3">{errors.confirmPassword}</p>
            )}

            {/* Continue Button */}
            <div className="flex absolute bottom-8 right-20">
              <button
                className="bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSignup}
                disabled={
                  loading ||
                  isSubmitting ||
                  !!errors.password ||
                  !!errors.confirmPassword
                }
              >
                {loading ? "Processing..." : "Continue"}{" "}
                <FaArrowRightLong className="text-lg" />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
