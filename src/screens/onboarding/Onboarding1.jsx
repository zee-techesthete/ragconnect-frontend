import React, { useState } from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const Onboarding1 = () => {
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
    dispatch(logout());
    navigate("/login");
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
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-500">Step 1 of 3</h3>
          <h1 className="text-2xl md:text-4xl font-bold mt-4">
            We'd love to get to know you better!
          </h1>
          <p className="mt-4 text-sm md:text-base">
            We're excited to help you get solutions that align with your goals.
            It'll take six quick questions to configure everything, this won't
            take more than a minute!
          </p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center md:justify-start mt-8">
          <PrimaryBtn
            title="Back"
            className="text-black bg-white border-none"
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
            <p className="mb-2 font-semibold">
              Are you part of a business or working independently?
            </p>
            <div className="flex space-x-4 flex-wrap justify-center md:justify-start">
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
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray"
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
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray"
                }
              />
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold">What is your company?</p>
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
            <p className="mb-2 font-semibold">
              What is your company website or social media link?
            </p>
            <input
              type="text"
              name="companyWebsite"
              placeholder="e.g Company XYZ"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              className="mt-2 p-2 w-full border border-gray rounded-md"
            />
          </div>

          <div>
            <p className="mb-2 font-semibold">What is the size of your company?</p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
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
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray"
                  }
                />
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 font-semibold">What is your industry?</p>
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
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
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray"
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <PrimaryBtn
            title="Skip"
            className="text-gray-500 font-semibold"
            href="/onboarding-step2"
          />
          <PrimaryBtn
            title="Next: Channels"
            className="bg-black text-white"
            icon2="arrow_forward"
            href="/onboarding-step2"
          />
        </div>
      </div>
    </div>
  );
};

export default Onboarding1;
