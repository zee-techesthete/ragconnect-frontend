import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const Onboarding3 = () => {
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-2/5 px-6 xl:px-24 py-8 flex flex-col justify-between bg-primary">
        {/* Logo */}
        <div className="mb-8">
          <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
        </div>

        {/* Step Indicator and Heading */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500">Step 3 of 3</h3>
          <h1 className="text-2xl md:text-4xl font-bold mt-4">
            Ready to set up your workspace and agent?
          </h1>
          <p className="mt-4 text-sm">Don't worry – you can change it later.</p>
        </div>

        {/* Back Button */}
        <div className="flex justify-start items-center space-x-4 mt-6 md:mt-0">
          <PrimaryBtn
            href="/onboarding-step2"
            title="Back"
            className="text-black font-semibold"
            icon="arrow_back"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/5 px-6 xl:px-24 py-8 flex flex-col justify-between">
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

        {/* Form Questions */}
        <div className="space-y-6">
          <div>
            <p className="mb-2">What would you like to name your workspace?</p>
            <input
              type="text"
              name="companyName"
              placeholder="e.g Company XYZ"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray rounded-md"
            />
          </div>

          <div>
            <p className="mb-2">What would you like to name your AI agent?</p>
            <input
              type="text"
              name="companyWebsite"
              placeholder="e.g Company XYZ"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray rounded-md"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <PrimaryBtn title="Skip" className="text-gray-500 font-semibold" href="/inbound" />
          <PrimaryBtn
            title="Let's get started"
            className="bg-black text-white"
            icon2="arrow_forward"
            href="/inbound"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding3;
