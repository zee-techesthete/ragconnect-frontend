import React from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import userImg from "../../assets/33.png";

export default function ConnectorHeader() {
  return (
    <div className="p-6 bg-white rounded-md">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-semibold">Connector</h2>
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryBtn title="+ Invite" className="border-gray font-semibold" />
          <PrimaryBtn title="Upgrade" className="border-gray bg-gray font-semibold" />
          <img
            src={userImg}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* Description & Action Button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-sm max-w-lg text-center md:text-left">
          Train your Agent by adding resources directly to its brain. Drop your
          content to enhance its knowledge and capabilities, making it smarter
          and better suited to meet your unique needs.
        </p>
        <PrimaryBtn
          title="Connect Other"
          icon="bolt"
          className="border-gray-300 w-full md:w-auto"
        />
      </div>
    </div>
  );
}
