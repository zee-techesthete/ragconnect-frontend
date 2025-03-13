import React, { useState } from 'react';
import { Button, Tag, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { FaInstagram } from 'react-icons/fa';

const CustomerDetailsView = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');

  const customerDetails = [
    { label: 'Customer ID', value: customer?.id || '-' },
    { label: 'Preferred channel', value: 'Instagram' },
    { label: 'Email', value: customer?.email || '-' },
    { label: 'Phone number', value: customer?.phone || '-' },
    { label: 'Assignee', value: 'Jordan Harris' },
    { label: 'Last Conversation', value: customer?.lastConvo || '-' },
    { label: 'Last Conv. Status', value: 'Closed' },
    { label: 'Sentiment', value: (
      <span className="flex items-center gap-1">
        😊 Positive
      </span>
    )},
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="p-4">
            <div className="space-y-4">
              {customerDetails.map((detail, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{detail.label}</span>
                  <span>{detail.value}</span>
                </div>
              ))}
              <div className="mt-6">
                <h3 className="font-medium mb-2">Notes</h3>
                <p className="text-gray-600">
                  One of our VIP customers from New York, prefers staying in touch via SMS. Has generally satisfying and has made over 5 calls to our support team, always appreciating quick, personalized replies. Keeping things concise and friendly will go a long way in maintaining his loyalty.
                </p>
              </div>
              <div className="mt-6">
                <h3 className="font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Prioritize SMS updates for key interactions.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Offer exclusive perks or early access to reinforce VIP status.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Proactively check in to ensure continued satisfaction.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return <div className="p-4">Orders content</div>;
      case 'conversations':
        return <div className="p-4">Conversations content</div>;
      case 'support_tickets':
        return <div className="p-4">Support Tickets content</div>;
      case 'site_visits':
        return <div className="p-4">Site Visits content</div>;
      case 'mentions':
        return <div className="p-4">Mentions content</div>;
      case 'ltv':
        return <div className="p-4">LTV content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button 
            icon={<ArrowLeftOutlined />} 
            type="text"
            onClick={onBack}
            className="flex items-center"
          >
            Back to Customers
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{customer?.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Tag>Purchaser</Tag>
              <span>8 items</span>
              <span>$675.00</span>
              <FaInstagram className="text-gray-500" />
              <span className="flex items-center gap-1">😊 Positive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="flex-1"
        items={[
          { label: 'Details', key: 'details' },
          { label: 'Orders', key: 'orders' },
          { label: 'Conversations', key: 'conversations' },
          { label: 'Support Tickets', key: 'support_tickets' },
          { label: 'Site Visits', key: 'site_visits' },
          { label: 'Mentions', key: 'mentions' },
          { label: 'LTV', key: 'ltv' },
        ]}
      />

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CustomerDetailsView; 