import React, { useState } from "react";
import { Tabs, Tag } from "antd";
import { PhoneOutlined, FolderOutlined, SmileOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const MessageDetail = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="w-full h-full p-4 border-l border-gray bg-white overflow-y-auto">
      {/* Tabs Navigation */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Details" key="details">
          <div className="space-y-3 text-sm">
            <p><strong>Assigned to:</strong> User Name</p>
            <p><strong>Automation:</strong> Hands-off</p>
            <p><strong>Status:</strong> <Tag color="blue">Closed</Tag></p>
            <p><strong>Category:</strong> <FolderOutlined /> Shipping</p>
            <p><strong>Channel:</strong> <PhoneOutlined /> Phone</p>
            <p><strong>Tags:</strong> <Tag>Stock</Tag> <Tag>Shipping</Tag></p>
            <p><strong>Voice call time:</strong> Jan 28, 19:20</p>
            <p><strong>Sentiment:</strong> <SmileOutlined /> Positive</p>
            <p><strong>Conversation ID:</strong> INST-2025-00123</p>
            <p><strong>Customer ID:</strong> INST-2025-00123</p>
            <p><strong>Language:</strong> English</p>
            <h3 className="font-semibold mt-4">Agent’s Summary</h3>
            <p className="text-gray-600">
              Customer asked about international shipping options to Germany, estimated delivery time, and prices.
            </p>
          </div>
        </TabPane>
        
        <TabPane tab="Agent Reggie" key="agent">
          <p>Agent Reggie handled the case efficiently and provided the necessary information.</p>
        </TabPane>

        <TabPane tab="Training" key="training">
          <p>This case has been marked as an example for training purposes due to the nature of customer queries.</p>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MessageDetail;
