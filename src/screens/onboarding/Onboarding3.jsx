import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
const Onboarding3 = () => {
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-2/5 px-24 py-8 flex flex-col justify-between bg-primary ">
        {/* Logo */}
        <div>
          <img src={Logo} alt="Company Logo" className="w-32 h-auto mb-8" />
        </div>

        {/* Step Indicator and Heading */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500">Step 3 of 3</h3>
          <h1 className="text-4xl font-bold mt-4">
            Ready to set up your workspace and agent?
          </h1>
          <p className="mt-4 text-sm">Don’t worry – you can change it later.</p>
        </div>

        {/* Back Button */}
        <div className="flex justify-start items-center space-x-4">
          <PrimaryBtn
            href="/onboarding2"
            title="Back"
            className="text-black"
            icon="arrow_back"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/5 px-24 py-8 flex flex-col justify-between">
        {/* Login */}
        <div className="flex gap-4 justify-end">
          <PrimaryBtn title={"Get help"} />
          <PrimaryBtn title={"Login"} />
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
        <div className="flex justify-between">
          <PrimaryBtn title="Skip" className="text-gray-500" />
          <PrimaryBtn
            title="Lets get started"
            className="bg-black text-white"
            icon2="arrow_forward"
            href="/chatui"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding3;
