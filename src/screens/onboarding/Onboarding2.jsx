import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
import SocialIcons from "../../utils/Icons";
import IconCard from "../../components/IconsCards";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const Onboarding2 = () => {
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    socialPlatform: "",
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  // const handleInputChange = (name, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const socialPlatforms = Object.keys(SocialIcons).map((key) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    url: SocialIcons[key],
  }));

  const handlePlatformSelect = (platform) => {
    setSelectedPlatforms(
      (prevSelected) =>
        prevSelected.includes(platform)
          ? prevSelected.filter((item) => item !== platform) // Deselect
          : [...prevSelected, platform] // Select
    );
  };

  // console.log("selectedPlatforms", selectedPlatforms);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-2/5 px-6 xl:px-24 py-8 flex flex-col justify-between bg-primary">
        {/* Logo */}
        <div className="mb-8">
          <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
        </div>

        {/* Step Indicator and Heading */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-500">Step 2 of 3</h3>
          <h1 className="text-2xl md:text-4xl font-bold mt-4">
            Which channel would you like to start with?
          </h1>
          <p className="mt-4 text-sm md:text-base">
            You can connect your other channels later. If you don't see your
            tools listed here, we'll add them for you — just let us know.
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center md:justify-start mt-8">
          <PrimaryBtn
            href="/onboarding-step1"
            title="Back"
            className="text-black font-semibold"
            icon="arrow_back"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/5 px-6 xl:px-24 py-8 gap-6 flex flex-col justify-between">
        {/* Login/Logout */}
        <div className="flex gap-4 justify-center md:justify-end mb-8 font-semibold">
          <PrimaryBtn title={"Get help"} />
          {user && token ? (
            <PrimaryBtn 
              title={"Logout"} 
              onClick={handleLogout}
              className="bg-red-500 text-white hover:bg-red-600"
            />
          ) : (
            <PrimaryBtn title={"Login"} href="/login" />
          )}
        </div>

        {/* Social Platform Selection */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {socialPlatforms.map((platform) => (
            <div
              key={platform.name}
              onClick={() => handlePlatformSelect(platform.name)}
              className={`cursor-pointer transition-all ${
                selectedPlatforms.includes(platform.name)
                  ? "border border-black rounded-md"
                  : "border-gray"
              }`}
            >
              <IconCard platform={platform} />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <PrimaryBtn
            title="Skip"
            className="text-gray-500 font-semibold"
            href="/onboarding-step3"
          />
          <PrimaryBtn
            title={
              <>
                <span className="sm:inline hidden">
                  Next: Workspace & Agent
                </span>
                <span className="inline sm:hidden">Next</span>
              </>
            }
            className="bg-black text-white w-full sm:w-auto py-2 px-4 sm:px-6 text-sm sm:text-base flex items-center justify-center gap-2"
            icon2="arrow_forward"
            href="/onboarding-step3"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding2;
