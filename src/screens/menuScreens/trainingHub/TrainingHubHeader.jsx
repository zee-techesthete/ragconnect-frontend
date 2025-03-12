import React from "react";
import SharedHeader from "../../../components/SharedHeader";

const TrainingHubHeader = () => {
  return (
    <SharedHeader
      title="Training Hub"
      showUpgradeButton={true}
      showNotifications={true}
      showSearch={true}
      showSettingsGuide={true}
    />
  );
};

export default TrainingHubHeader;
