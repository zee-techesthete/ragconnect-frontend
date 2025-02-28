import React from "react";
import Connector from "./menuScreens/Connector";
import Header from "../components/Header";
import MessageInbound from "./menuScreens/Message/MessageInbound";

const MenuSide = ({ selectedMenu }) => {
  const renderContent = () => {
    switch (selectedMenu) {
      case "home":
        return <div>Home Content</div>;
      case "inbound":
        return <MessageInbound />;
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

  // Dynamic title based on the selected menu
  const getTitle = () => {
    switch (selectedMenu) {
      case "home":
        return "Home";
      case "inbound":
        return "Inbound Messages";
      case "customerHub":
        return "Customer Hub";
      case "trainingHub":
        return "Training Hub";
      case "connector":
        return "Connector";
      case "agentSetting":
        return "Agent Settings";
      default:
        return "Select a menu";
    }
  };

  return (
    <div className="flex-1">
      <Header title={getTitle()} />
      {renderContent()}
    </div>
  );
};

export default MenuSide;
