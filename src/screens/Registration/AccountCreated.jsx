import React from "react";
import wavyCheck from "../../assets/svgs/Wavy_Check.svg";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
const AccountCreated = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary ">
      <div className="mb-8 absolute top-12 left-20">
        <img src={Logo} alt="Company Logo" className="w-32 h-auto" />
      </div>

      <div className=" absolute top-12 right-20">
        <div className="flex gap-4 justify-center md:justify-end mb-8 font-semibold">
          <PrimaryBtn title={"Get help"} className="bg-white"  />
          <PrimaryBtn title={"Login"} className="bg-white" href="/login" />
        </div>
      </div>
      <div className="text-center w-64">
        <div className="mb-4 flex justify-center">
          {/* Icon Placeholder */}
          <img src={wavyCheck} alt="wavy-check" />
        </div>
        <h2 className="text-2xl font-bold">Account created</h2>
        <p className="text-dullGray mt-2">
          Please check your email to confirm your account before signing in.
        </p>
      </div>
    </div>
  );
};

export default AccountCreated;
