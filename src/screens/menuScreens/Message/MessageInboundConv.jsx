import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Avatar, Badge, Spin } from "antd";
import {
  ShoppingCartOutlined,
  GiftOutlined,
  MessageOutlined,
  PhoneOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { fetchEmails } from "../../../redux/slices/emailSlice";

const iconMap = {
  order: <ShoppingCartOutlined />,
  gift: <GiftOutlined />,
  message: <MessageOutlined />,
  phone: <PhoneOutlined />,
  link: <LinkOutlined />,
};

const MessageInboundConv = () => {
  const dispatch = useDispatch();

  // ✅ Get connected platforms & emails from Redux
  const { isConnected, userIds, tokens } = useSelector(
    (state) => state.socialAuth
  );
  const { data, loading } = useSelector((state) => state.emails);

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // ✅ Handle platform selection & API call
  const handlePlatformClick = (platform) => {
    const platformKey = platform.toLowerCase();
    if (!isConnected[platformKey]) return;

    const userId = userIds[platformKey];
    const token = tokens[platformKey];

    if (userId && token) {
      setSelectedPlatform(platformKey);
      setSelectedId(null); // Reset selected message
      dispatch(fetchEmails({ platform: platformKey, userId, token }));
    } else {
      console.warn("Missing userId or token!");
    }
  };

  // ✅ Clear email data & reset platform
  const handleClear = () => {
    setSelectedPlatform(null);
    setSelectedId(null);
  };

  // ✅ Select an email
  const handleSelectMessage = useCallback((threadId) => {
    setSelectedId(threadId);
  }, []);

  return (
    <div className="bg-white rounded-lg">
      <div className="border-b border-gray min-h-14 flex justify-between items-center p-2">
        <h2 className="font-semibold text-md ">
          All Convertion
          <span>
            {" "}
            <Badge
              count={data[selectedPlatform]?.length || 0}
              className="text-gray bg-color-none"
            />
          </span>
        </h2>
        {selectedPlatform && <Button type="dashed" className="text-gray" danger onClick={handleClear} >
          Clear
        </Button>}
        
      </div>

      {/* ✅ Show platform cards only if no platform is selected */}
      {!selectedPlatform && (
        <>
          <h2 className="font-semibold text-lg p-2 text-center">
            Connected Platforms{" "}
          </h2>

          {/* ✅ Show platforms in a horizontal row */}
          <div className="overflow-x-auto">
            {Object.keys(isConnected).map(
              (platform) =>
                isConnected[platform] && (
                  <Card
                    key={platform}
                    className="cursor-pointer hover:shadow-sm transition-all"
                    onClick={() => handlePlatformClick(platform)}
                  >
                    <div className=" flex justify-between items-center">
                      <Avatar size={46} className="bg-blue-500">
                        {platform[0].toUpperCase()}
                      </Avatar>
                      <p className="mt-2 font-medium">
                        {platform.toUpperCase()}
                      </p>
                    </div>
                  </Card>
                )
            )}
          </div>
        </>
      )}

      {/* ✅ Show Email Conversations when a platform is selected */}
      {selectedPlatform && (
        <div className="bg-white shadow-md rounded-lg">
          {/* Header */}

          {/* Loading State */}
          {loading[selectedPlatform] ? (
            <div className="flex justify-center items-center p-6">
              <Spin size="large" />
            </div>
          ) : data[selectedPlatform]?.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No conversations available.
            </p>
          ) : (
            <div className="divide-y">
              {data[selectedPlatform]?.map(
                ({
                  threadId,
                  sender = "",
                  subject,
                  time,
                  type,
                  received_at,
                }) => (
                  <div
                    key={threadId}
                    className={`p-3 px-6 flex flex-col gap-1 cursor-pointer border-gray 
    ${
      selectedId === threadId
        ? "border-l-4 border-darkGray bg-lightGray"
        : "hover:bg-gray200"
    }`}
                    onClick={() => handleSelectMessage(threadId)}
                  >
                    {/* Message Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="bg-gray text-black me-2">
                          {sender ? sender[0] : "?"}{" "}
                          {/* Prevent undefined error */}
                        </Avatar>
                        <p className="font-medium">
                          {sender || "Unknown Sender"}
                        </p>
                      </div>
                      <span className="text-darkGray font-bold pe-2 text-lg">
                        {iconMap[type] || <MessageOutlined />}
                      </span>
                    </div>

                    {/* Message Content */}
                    <div className="flex items-center justify-between">
                      <p className="text-gray truncate w-48 text-sm">
                        {subject || "No Subject"}
                      </p>
                      <span className="text-black text-sm">
                        {received_at
                          ? new Date(received_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageInboundConv;
