import React from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";


const EmailConfirmed = () => {
 

  return (
    <div className="flex flex-col  min-h-screen bg-primary px-4">
      {/* Header: Logo & Buttons */}
       <div className="w-full flex flex-wrap items-center justify-between mt-5 px-4 md:px-8 lg:px-20 py-4">
              <img src={Logo} alt="Company Logo" className="w-24 lg:w-32 h-auto" />
              <div className="flex gap-2 md:gap-4">
                <PrimaryBtn title="Get help" className="bg-white text-sm md:text-base" />
                <PrimaryBtn title="Login" className="bg-white text-sm md:text-base" href="/login" />
              </div>
            </div>

      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center">

      <div className="text-center max-w-xs md:max-w-sm mt-12">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold">Email Confirmed</h2>

        {/* Message */}
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Your email has been confirmed, you can now log in and start using your account!
        </p>

        {/* Login Button (Perfectly Centered) */}
        <div className="mt-4 flex justify-center">
          <PrimaryBtn 
            title="Login" 
            href="/login" 
            className="bg-black text-white px-6 py-3 text-sm md:text-base"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmailConfirmed;
