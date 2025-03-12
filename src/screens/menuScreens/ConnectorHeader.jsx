import React from "react";
import SharedHeader from "../../components/SharedHeader";
import PrimaryBtn from "../../components/PrimaryBtn";
import userImg from "../../assets/33.png";

const ConnectorHeader = () => {
  const additionalButtons = [
    <PrimaryBtn key="invite" title="+ Invite" className="border-gray font-semibold" />,
    // <PrimaryBtn key="connect" title="Connect Other" icon="bolt" className="border-gray-300" />
  ];

  return (
    <SharedHeader
      title="Connector"
      showUpgradeButton={true}
      showNotifications={false}
      showSearch={false}
      showSettingsGuide={false}
      additionalButtons={additionalButtons}
      className="p-6 bg-white rounded-md"
    >
      {/* Description & Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm max-w-lg text-center md:text-left">
          Train your Agent by adding resources directly to its brain. Drop your
          content to enhance its knowledge and capabilities, making it smarter
          and better suited to meet your unique needs.
        </p>
        <img
          src={userImg}
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </SharedHeader>
  );
};

export default ConnectorHeader;
