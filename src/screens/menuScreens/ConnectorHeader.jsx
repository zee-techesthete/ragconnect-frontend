import React from "react";
import SharedHeader from "../../components/SharedHeader";
import PrimaryBtn from "../../components/PrimaryBtn";
import userImg from "../../assets/33.png";

const ConnectorHeader = () => {
  const additionalButtons = [
    // <PrimaryBtn key="invite" title="+ Invite" className="border-gray font-semibold" />,
    // <PrimaryBtn key="connect" title="Connect Other" icon="bolt" className="border-gray-300" />
  ];

  return (
    <SharedHeader
      title="Connector"
      showUpgradeButton={true}
      showNotifications={true}
      // showSearch={true}
      // showSettingsGuide={true}
    />
  );
};

export default ConnectorHeader;
