import React from "react";
import { Card, Button, Switch, Table, Typography } from "antd";
import { LockOutlined, SecurityScanFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

const SecuritySettings = () => {
  const sessionData = [
    {
      key: "1",
      location: "Kyiv, Ukraine",
      ip: "46.32.39.84",
      os: "macOS",
      browser: "Chrome",
      lastAccessed: "3 hours ago",
      created: "6 months ago",
      current: true,
    },
    {
      key: "2",
      location: "Rennes, France",
      ip: "921.02.19.55",
      os: "macOS",
      browser: "Opera GX",
      lastAccessed: "15 days ago",
      created: "15 days ago",
      current: false,
    },
    {
      key: "3",
      location: "Toronto, Canada",
      ip: "83.11.99.84",
      os: "macOS",
      browser: "Chrome",
      lastAccessed: "Jan 18, 2025",
      created: "2 months ago",
      current: false,
    },
  ];

  const columns = [
    {
      title: "Location & IP",
      dataIndex: "location",
      key: "location",
      render: (text, record) => (
        <div>
          <Text>{text}</Text>
          <br />
          <Text type="secondary">{record.ip}</Text>
        </div>
      ),
    },
    {
      title: "OS & Browser",
      dataIndex: "os",
      key: "os",
      render: (text, record) => (
        <div>
          <Text>{text}</Text>
          <br />
          <Text type="secondary">{record.browser}</Text>
        </div>
      ),
    },
    {
      title: "Last Accessed",
      dataIndex: "lastAccessed",
      key: "lastAccessed",
      render: (text, record) => (
        <div>
          <Text>{text}</Text>
          <br />
          <Text type="secondary">Created {record.created}</Text>
        </div>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) =>
        record.current ? (
          <Text type="success">Current</Text>
        ) : (
          <Button size="small">Sign out</Button>
        ),
    },
  ];

  return (
    <div className="security-settings-container h-[calc(85vh-120px)] overflow-y-auto bg-white px-2 custom-scrollbar">
      <div className="security-settings-content max-w-[1200px] mx-auto p-4 md:p-0">
        {/* Password Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray pb-4">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <Title level={5}>Password</Title>
            <div className="flex flex-wrap items-center gap-3 justify-between w-80">
                <span className="text-black font-medium">************</span>
              <Text className="text-gray">
                <SecurityScanFilled className="text-gray" /> Secure
              </Text>
              <Button type="default">Change</Button>
            </div>
            
          </div>
        </div>

        {/* Two-Step Verification */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray py-4 gap-4">
          <div className="w-full md:w-auto">
            <Title level={5}>Two-Step Verification</Title>
            <div className="flex items-center notification-settings">
              <Switch className="px-2 me-2 bg-gray" />
              <Text className="text-normal">Enable two-step verification</Text>
            </div>
          </div>
          <p className="text-gray md:w-80 w-full">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex explicabo quod temporibus voluptates</p>
        </div>

        {/* Sessions Table */}
        <div className="py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <Title level={5} className="mb-0">Sessions</Title>
            <Button type="default">Sign out all sessions</Button>
          </div>
          <div className="overflow-x-auto">
            <Table 
              columns={columns} 
              dataSource={sessionData} 
              pagination={false}
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
