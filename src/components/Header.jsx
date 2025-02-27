import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import user from "../assets/svgs/userLogo.svg";
const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <h2>Connector</h2>
      <div className="flex items-center gap-4">
        <PrimaryBtn icon={"add"} title="Invite" />
        <PrimaryBtn title={"Upgrade"} />
        <img className="h-8 w-8 rounded-full" src={user} alt="" />
      </div>
    </div>
  );
};

export default Header;
