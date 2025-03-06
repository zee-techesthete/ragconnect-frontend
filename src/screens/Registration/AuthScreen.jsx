import { useState } from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram, FaMicrosoft } from "react-icons/fa"; // Microsoft logo
import { FaArrowRightLong } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/authSlice";

const AuthScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "zeeshanshafique.te@gmail.com",
    firstName: "Zeeshan",
    lastName: "Shafique",
    password: "123456",
    confirmPassword: "123456",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.email.includes("@")) {
        newErrors.email = "Invalid email address";
      }
    }

    if (step === 2) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
    }

    if (step === 3) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
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

  const handleSignup = () => {
    if (validateStep()) {
      const { confirmPassword, ...signupData } = formData;
      dispatch(signupUser(signupData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/account-created");
        }
      });
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
          <PrimaryBtn  title={"Login"} href="/login" />
        </div>
        {step === 1 && (
          <div className="w-full max-w-md">
            <label htmlFor="email" className="font-medium ">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={errors.email || "Email address"}
              className={`w-full border p-2 rounded-md mb-4 mt-2 ${
                errors.email ? "border-red-500 bg-red-100" : "border-gray"
              }`}
            />
            <button
              onClick={nextStep}
              className="w-full bg-black text-white p-2 rounded-md"
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
              <button className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition">
                <FcGoogle className="mr-2 text-xl" />
                 Google
              </button>
              <button className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition">
                <FaMicrosoft className="mr-2 text-xl text-blue-600" />
                 Outlook
              </button>
              <button className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition">
                <FaInstagram className="mr-2 text-xl text-blue-600" />
                 Instagram
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="w-full max-w-md">
            <label htmlFor="email" className="font-medium ">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder={errors.firstName || "First Name"}
              className={`w-full border p-2 rounded-md mb-3 mt-2 ${
                errors.firstName ? "border-red-500 bg-red-100" : "border-gray"
              }`}
            />

            <label htmlFor="email" className="font-medium">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder={errors.lastName || "Last Name"}
              className={`w-full border p-2 rounded-md mb-3 mt-2 ${
                errors.lastName ? "border-red-500 bg-red-100" : "border-gray"
              }`}
            />

            <div className="flex absolute bottom-8 right-20">
              <button
                onClick={nextStep}
                className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2"
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
               {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
             </span>
           </div>
   
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
                 errors.confirmPassword ? "border-red-500 bg-red-100" : "border-gray"
               }`}
             />
             <span
               className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
             >
               {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
             </span>
           </div>
   
           {/* Continue Button */}
           {/* <div className="flex absolute bottom-8 right-20">
             <button className="bg-black text-white px-4 py-2 rounded flex items-center gap-2" onClick={()=>navigate("/account-created")}>
               Continue <FaArrowRightLong className="text-lg" />
             </button>
           </div> */}
           <div className="flex absolute bottom-8 right-20">
              <button
                className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Processing..." : "Continue"} <FaArrowRightLong className="text-lg" />
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
         </div>
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
