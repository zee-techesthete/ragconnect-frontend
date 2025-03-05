import React from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import Logo from "../../assets/svgs/logo.svg";

const EmailConfirmed = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary">
      <div className="mb-8 absolute top-12 left-20">
        <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
      </div>

      <div className=" absolute top-12 right-20">
        <div className="flex gap-4 justify-center md:justify-end mb-8 font-semibold">
          <PrimaryBtn title={"Get help"} className="bg-white" />
          <PrimaryBtn title={"Login"} className="bg-white" />
        </div>
      </div>
      <div className="text-center w-64">
        <h2 className="text-3xl font-bold">Email confirmed</h2>
        <p className="text-gray-600 mt-2">
          Your email has been confirmed, you can now login and start your
          account!
        </p>
        <PrimaryBtn title={"Login"} href="/login"className="bg-black text-white"/>
      </div>
    </div>
  );
};

export default EmailConfirmed;
