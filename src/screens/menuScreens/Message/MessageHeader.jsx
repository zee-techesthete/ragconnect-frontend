import React from "react";
import SharedHeader from "../../../components/SharedHeader";

const MessageHeader = () => {
  return (
    <SharedHeader
      title="Inbound"
      showUpgradeButton={true}
      showNotifications={true}
      showSearch={false}
      showSettingsGuide={false}
    />
  );
};

export default MessageHeader;
