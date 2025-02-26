import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
const Onboarding1 = () => {
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
      <div className="w-2/5 p-8 flex flex-col justify-between bg-primary ">
        {/* Logo */}
        <div>
          <img
            src="../../src/assets/images/logo.png"
            alt="Company Logo"
            className="w-32 h-auto mb-8"
          />
        </div>

        {/* Step Indicator and Heading */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500">Step 1 of 3</h3>
          <h1 className="text-4xl font-bold mt-4">
            We’d love to get to know you better!
          </h1>
          <p className="mt-4 text-sm">
            We’re excited to help you get solutions that align with your goals.
            It’ll take six quick questions to configure everything, this won’t
            take more than a minute!
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-start items-center space-x-4">
          <PrimaryBtn
            title="Back"
            className="text-blue-500"
            icon="arrow_back"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-3/5 p-8 flex flex-col justify-between">
        {/* Login */}
        <div className="flex gap-4 justify-end">
          <PrimaryBtn title={"Get help"} />
          <PrimaryBtn title={"Login"} />
        </div>

        {/* Form Questions */}
        <div className="space-y-6">
          <div>
            <p className="mb-2">
              Are you part of a business or working independently?
            </p>
            <div className="flex space-x-4">
              <PrimaryBtn
                title="Business"
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    businessType: "business",
                  }))
                }
                className={
                  formData.businessType === "business"
                    ? "bg-black text-white"
                    : "bg-white"
                }
              />
              <PrimaryBtn
                title="Individual"
                onClick={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    businessType: "individual",
                  }))
                }
                className={
                  formData.businessType === "individual"
                    ? "bg-black text-white"
                    : "bg-white"
                }
              />
            </div>
          </div>

          <div>
            <p className="mb-2">What is your company?</p>
            <input
              type="text"
              name="companyName"
              placeholder="e.g Company XYZ"
              value={formData.companyName}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <p className="mb-2">
              What is your company website or social media link?
            </p>
            <input
              type="text"
              name="companyWebsite"
              placeholder="e.g Company XYZ"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border rounded-md"
            />
          </div>

          <div>
            <p className="mb-2">What is the size of your company?</p>
            <div className="flex space-x-4">
              {[
                "Small (1-9)",
                "Medium (10-49)",
                "Large (50-249)",
                "Enterprise (250+)",
              ].map((size) => (
                <PrimaryBtn
                  key={size}
                  title={size}
                  onClick={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      companySize: size,
                    }))
                  }
                  className={
                    formData.companySize === size
                      ? "bg-black text-white"
                      : "bg-white"
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">What is your industry?</p>
            <div className="flex gap-4 flex-wrap">
              {[
                "Health",
                "Hospitality",
                "Education",
                "Auto",
                "Others",
                "Real Estate",
                "Digital App",
                "Service Based",
                "Content Creation",
                "Charity",
              ].map((industry) => (
                <PrimaryBtn
                  key={industry}
                  title={industry}
                  onClick={() =>
                    setFormData((prevData) => ({
                      ...prevData,
                      industry: industry, // Store it as-is
                    }))
                  }
                  className={
                    formData.industry === industry
                      ? "bg-black text-white"
                      : "bg-white"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <PrimaryBtn
            title="Skip"
            className="text-gray-500"
            href="/onboarding2"
          />
          <PrimaryBtn
            title="Next"
            className="bg-black text-white"
            icon2="arrow_forward"
            href="/onboarding2"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding1;
