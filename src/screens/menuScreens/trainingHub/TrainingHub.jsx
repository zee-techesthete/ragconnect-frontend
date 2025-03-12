import { useState } from "react";
import PrimaryBtn from "../../../components/PrimaryBtn";
import ProgressBar from "../../../components/Progress";
import TrainingHubHeader from "./TrainingHubHeader";
const menuItems = [
  "Files",
  "Links",
  "FAQs",
  "Integrations",
  "Rules and Categories",
];
const rightMenu = ["Add New", "Agent Reggie"];

const fileData = [
  {
    type: "PDF",
    name: "Tinuti.pdf",
    size: "5MB",
    status: "Waiting",
    uploaded: "Just now",
    tags: "No tag",
    user: "Jordan M.",
  },
  {
    type: "CSV",
    name: "Topic_FAQ.csv",
    size: "120KB",
    status: "Processing",
    uploaded: "10 min ago",
    tags: "No tag",
    user: "Miranda P.",
  },
  {
    type: "TXT",
    name: "File name.txt",
    size: "5MB",
    status: "Trained",
    uploaded: "Yesterday",
    tags: "No tag",
    user: "Miranda P.",
  },
];

export default function TrainingHub() {
  const [selectedMenu, setSelectedMenu] = useState("Files");

  return (
    <div className="h-screen">
      <TrainingHubHeader />
      {/* Left Panel - 70% */}
      <div className="w-7/10 border-r">
        {/* Top Menu */}
        <div className="my-6 border border-t-gray border-b-gray border-l-0 border-r-0 flex gap-4">
          {menuItems.map((menu) => (
            <button
              key={menu}
              onClick={() => setSelectedMenu(menu)}
              className={`flex items-center gap-2 cursor-pointer p-4 ${
                selectedMenu === menu
                  ? "text-black border-b-2 border-black"
                  : "text-gray-500 border-b-2 border-white"
              }`}
            >
              <span className="p-4 bg-gray rounded-xl"></span>
              <span>{menu}</span>
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center my-6">
          <h2 className="font-semibold tetx-xl"> All Channels</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 p-2 rounded-lg border border-gray300 ">
              {/* Search input field */}
              <span className="material-icons text-gray">{"search"}</span>
              <input
                type="search"
                className="focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>
            <PrimaryBtn className="px-2" icon="sell" />
            <PrimaryBtn className="px-2" icon="tune" />
          </div>
        </div>

        {/* File List */}
        <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600 border-b border-gray p-6">
          <div className="text-gray">
            File Name{" "}
            <span className="material-icons text-xs rotate-90">
              {"sync_alt"}
            </span>
          </div>
          <div className="text-gray">
            Status
            <span className="material-icons text-xs rotate-90">
              {"sync_alt"}
            </span>
          </div>
          <div className="text-gray">
            Uploaded
            <span className="material-icons text-xs rotate-90">
              {"sync_alt"}
            </span>
          </div>
          <div className="text-gray">
            Tags
            <span className="material-icons text-xs rotate-90">
              {"sync_alt"}
            </span>
          </div>
          <div className="text-gray">
            Uploaded By
            <span className="material-icons text-xs rotate-90">
              {"sync_alt"}
            </span>
          </div>
          <div></div>
        </div>
        <div className="px-6">
          {fileData.map((file, idx) => (
            <div
              key={idx}
              className="grid grid-cols-6 gap-4 py-2 border-b border-gray items-center"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-3 bg-gray300 text-xs rounded-xl">
                  {file.type}
                </span>
                <div>
                  <div className="text-xs">{file.name}</div>
                  <small className="text-gray-500 text-xs">{file.size}</small>
                </div>
              </div>
              <div className="text-xs bg-gray300 w-fit p-2 rounded-xl">
                {file.status}
              </div>
              <div className="text-xs text-gray-500">{file.uploaded}</div>
              <div className="text-xs text-gray-500 italic">{file.tags}</div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray300 rounded-full"></div>
                <span className="text-xs ">{file.user}</span>
              </div>
              <div>
                <span className="material-icons ">{"more_vert"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - 30% */}
      <div className="w-3/10 p-6">
        {/* Right Menu */}
        <div className="flex justify-between border-b pb-2">
          {rightMenu.map((menu) => (
            <button key={menu} className="font-semibold">
              {menu}
            </button>
          ))}
        </div>

        {/* Upload Section */}
        <div className="mt-4 border-dashed border-2 p-6 text-center cursor-pointer">
          <p className="text-gray-500">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-400">
            Supports: PDF, DOC, DOCX, TXT, CSV | Max 100MB
          </p>
        </div>

        {/* Uploaded Files List */}
        <div className="mt-4 space-y-2">
          {fileData.slice(0, 2).map((file, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 border rounded-md"
            >
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-gray-200 text-xs rounded-md">
                  {file.type}
                </span>
                <span>{file.name}</span>
              </div>
              <button className="text-gray-500">✕</button>
            </div>
          ))}
          <ProgressBar value={75} className="mt-2" />
        </div>
      </div>
    </div>
  );
}
