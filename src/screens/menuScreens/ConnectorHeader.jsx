import React from "react";
import PrimaryBtn from "../../components/PrimaryBtn";
import userImg from "../../assets/33.png";


export default function ConnectorHeader() {
  return (
    <div className="p-6 bg-whiterounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Connector</h2>
        <div className="flex items-center gap-3">
          <PrimaryBtn title="+ Invite" className="border-gray font-semibold" />

          <PrimaryBtn title="Upgrade" className="border-gray bg-gray font-semibold" />
          <img
            src={userImg}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
      <div className="flex justify-between items-center  space-x-3">
        <p className="text-gray-600 text-sm max-w-2xl">
          Train your Agent by adding resources directly to its brain. Drop your
          content to enhance its knowledge and capabilities, making it smarter
          and better suited to meet your unique needs.
        </p>
        <PrimaryBtn
          title="Connect Other"
          icon="bolt"
          className="border-gray-300"
        />
      </div>
    </div>
  );
}
