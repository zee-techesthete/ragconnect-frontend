import React from "react";
import SharedHeader from "../../../components/SharedHeader";

const AccountHeader = () => {
  return (
    <SharedHeader
      title="Account Settings"
      showUpgradeButton={true}
      showNotifications={true}
      showSearch={true}
      showSettingsGuide={true}
    />
  );
};

export default AccountHeader;
