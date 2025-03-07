import React, { useState } from "react";
import { Card, Avatar, Typography, Tabs, Button, List } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import userImg from "../../../assets/user.png";
const { Title, Text } = Typography;

const ProfileView = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const user = {
    name: "Jordan Miles",
    role: "Chief Executive Officer",
    email: "jordan.milesss@gmail.com",
    phone: "+1 (212) 555-7890",
    avatar: null, // If available, add avatar URL here
  };

  const workspaces = [
    { name: "East Side Golf", icon: "🕺" },
    { name: "Synergy Group", icon: "⚡" },
  ];

  return (
    <div className=" border-l border-gray ">
      {/* Tabs Section */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="px-2 text-gray">
        <Tabs.TabPane tab="Profile View" key="profile"  />
        <Tabs.TabPane tab="Agent Reggie" key="agent" />
      </Tabs>

      {/* Profile Section */}
      <div className="flex flex-col items-center text-center mt-4"></div>
        <div className="flex flex-col items-center text-center">
          <img src={userImg} alt="raggie agent" className="w-36 h-36 rounded-md" />
          <Title level={5} className="mt-3 text-base font-medium">{user.name}</Title>
        <Text type="secondary">{user.role}</Text>
      </div>

      {/* Contact Information Section */}
      <div className="border-t border-gray m-4 p-4">
        <Title level={5} className="font-medium text-sm">
          Contact Information
        </Title>
        <div className="flex items-center gap-3 mt-2">
          <MailOutlined className="text-lg text-gray bg-primary p-2 rounded-md" />
          <div className="flex flex-col gap-1">
            <Text className="text-gray">Email</Text>
            <Text> {user.email}</Text>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <PhoneOutlined className="text-lg text-gray bg-primary p-2 rounded-md" />
          <div className="flex flex-col gap-1">
            <Text className="text-gray">Phone</Text>
            <Text>{user.phone}</Text>
          </div>
        </div>
      </div>

      {/* Associated Workspaces */}
      <div className="border-t border-gray m-4 pt-4 p-4">
        <Title level={5} className="font-medium text-sm">
          Associated Workspaces
        </Title>
        <List
          dataSource={workspaces}
          renderItem={(item) => (
            <List.Item className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-base font-medium">
                <span className="">{item.icon}</span> {item.name}
              </span>
              <Button type="default" size="" className="bg-primary p-2 border-gray">
                Manage
              </Button>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ProfileView;
