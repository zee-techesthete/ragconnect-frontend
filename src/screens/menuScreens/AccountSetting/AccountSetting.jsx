import React, { useState } from "react";
import { Tabs, ConfigProvider } from "antd";
import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";
import NotificationSettings from "./NotificationSettings";
import BillingSettings from "./BillingSettings";
import AccountHeader from "./AccountHeader";
import ProfileView from "./ProfileView";

const AccountSetting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabItems = [
    { key: "profile", label: "Profile", component: <ProfileSettings /> },
    { key: "security", label: "Security", component: <SecuritySettings /> },
    { key: "notifications", label: "Notifications", component: <NotificationSettings /> },
    { key: "billing", label: "Billing", component: <BillingSettings /> },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Full width header */}
      <div className="w-full bg-white border-b border-gray">
        <AccountHeader />
      </div>

      {/* Content container */}
      <div className="flex flex-col md:flex-row w-full px-4">
        {/* Tabs section */}
        <div className="w-full md:w-3/4">
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  itemSelectedColor: '#4B5563',
                  itemColor: '#6B7280',
                  itemHoverColor: '#4B5563',
                  inkBarColor: '#4B5563',
                  horizontalItemGutter: 32,
                }
              }
            }}
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              className="w-full custom-tabs "
              items={tabItems.map((tab) => ({
                key: tab.key,
                label: tab.label,
                children: tab.component,
              }))}
            />
          </ConfigProvider>
        </div>

        {/* Profile view section */}
        <div className="w-full md:w-1/4 mt-4 md:mt-0 md:ml-4 border-l border-gray">
          <ProfileView />
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
