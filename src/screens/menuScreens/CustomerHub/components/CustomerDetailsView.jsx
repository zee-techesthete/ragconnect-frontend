import React, { useState } from 'react';
import { Button, Tag, Tabs, Card, Avatar, Divider } from 'antd';
import { ArrowLeftOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { FaInstagram } from 'react-icons/fa';

const CustomerDetailsView = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');

  const customerDetails = [
    { label: 'Customer ID', value: customer?.id || '-' },
    { label: 'Preferred channel', value: <><FaInstagram className="text-pink-500" /> Instagram</> },
    { label: 'Email', value: customer?.email || '-', icon: <MailOutlined /> },
    { label: 'Phone number', value: customer?.phone || '-', icon: <PhoneOutlined /> },
    { label: 'Assignee', value: 'Jordan Harris' },
    { label: 'Last Conversation', value: customer?.lastConvo || '-' },
    { label: 'Last Conv. Status', value: 'Closed' },
    { label: 'Sentiment', value: <Tag color="green">😊 Positive</Tag> },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button icon={<ArrowLeftOutlined />} type="text" onClick={onBack}>
          Back to Customers
        </Button>
      </div>
      <Card className="border-none shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar size={64} src={customer?.avatar} />
          <div>
            <h2 className="text-xl font-semibold">{customer?.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <Tag color="blue">Purchaser</Tag>
              <span>{customer?.orders} items</span>
              <span>${customer?.totalSpent}</span>
              <FaInstagram className="text-gray-500" />
              <Tag color="green">😊 Positive</Tag>
            </div>
          </div>
        </div>
      </Card>

      <Divider />

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        <Tabs.TabPane tab="Details" key="details">
          <div className="space-y-4">
            {customerDetails.map((detail, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600 flex items-center gap-2">
                  {detail.icon} {detail.label}
                </span>
                <span>{detail.value}</span>
              </div>
            ))}
            <Divider />
            <h3 className="font-medium">Notes</h3>
            <p className="text-gray-600">
              One of our VIP customers from New York prefers staying in touch via SMS. He’s made over 5 calls to our support team,
              always appreciating quick, personalized replies. Keeping things friendly will go a long way in maintaining his loyalty.
            </p>
            <Divider />
            <h3 className="font-medium">Recommendations</h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>✅ Prioritize SMS updates for key interactions.</li>
              <li>✅ Offer exclusive perks to reinforce VIP status.</li>
              <li>✅ Proactively check-in to ensure continued satisfaction.</li>
            </ul>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Orders" key="orders">Orders content</Tabs.TabPane>
        <Tabs.TabPane tab="Conversations" key="conversations">Conversations content</Tabs.TabPane>
        <Tabs.TabPane tab="Support Tickets" key="support_tickets">Support Tickets content</Tabs.TabPane>
        <Tabs.TabPane tab="Site Visits" key="site_visits">Site Visits content</Tabs.TabPane>
        <Tabs.TabPane tab="Mentions" key="mentions">Mentions content</Tabs.TabPane>
        <Tabs.TabPane tab="LTV" key="ltv">LTV content</Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CustomerDetailsView;
