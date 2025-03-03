import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import user from "../assets/svgs/userLogo.svg";
const Header = ({ title, headerText }) => {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <h2>{title}</h2>
        <div className="flex items-center gap-4">
          <PrimaryBtn icon={"add"} title="Invite" />
          <PrimaryBtn className="bg-gray" title={"Upgrade"} />
          <img className="h-8 w-8 rounded-full" src={user} alt="" />
        </div>
      </div>
      {headerText && (
        <div className="flex justify-between gap-8 items-center my-6">
          <p className="w-3/4">
            Train your Agent by adding resources directly to its brain. Simply
            drop your content to enhance its knowledge and capabilities, making
            it smarter and better equipped to meet your unique needs.
          </p>
          <PrimaryBtn title={"Connect Other"} icon2={"bolt"} />
        </div>
      )}
    </>
  );
};

export default Header;
