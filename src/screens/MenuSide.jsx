import React from "react";
import Connector from "./menuScreens/Connector";
import Header from "../components/Header";

const MenuSide = ({ selectedMenu }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return <div>Home Content</div>;
      case "inbound":
        return <div>Inbound Content</div>;
      case "customerHub":
        return <div>Customer Hub Content</div>;
      case "trainingHub":
        return <div>Training Hub Content</div>;
      case "connector":
        return <Connector />;
      case "agentSetting":
        return <div>Agent Settings Content</div>;
      default:
        return <div>Select a menu</div>;
    }
  };

  return (
    <div className="flex-1 p-5">
      <Header />
      {renderContent()}
    </div>
  );
};

export default MenuSide;
