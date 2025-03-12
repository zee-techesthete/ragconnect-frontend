import React from "react";
import SharedHeader from "../../../components/SharedHeader";

const CustomerHubHeader = () => {
  return (
    <SharedHeader
      title="Customer Hub"
      showUpgradeButton={true}
      showNotifications={true}
      showSearch={true}
      showSettingsGuide={true}
    />
  );
};

export default CustomerHubHeader;
