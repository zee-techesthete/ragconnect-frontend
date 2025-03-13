import React, { useState } from "react";
import SharedHeader from "../../../components/SharedHeader";

const HomeHeader = () => {

  return (
    <SharedHeader
      title="Home"
      showUpgradeButton={true}
      showNotifications={true}
      // showSearch={true}
      // showSettingsGuide={true}
    />
  );
};

export default HomeHeader;
