import React, { useState } from "react";
import { Table, Tag, Dropdown, Menu, Input } from "antd";
import { MoreOutlined, SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { FaEnvelope, FaGlobe, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import CustomerDetailsView from "./CustomerDetailsView";

const customers = [
  {
    key: "1",
    name: "Stephen Phillips",
    email: "st.phill@gmail.com",
    id: "INST-0123",
    lastConvo: "Just now",
    social: "instagram",
    status: "Site visitor",
    sentiment: "Neutral",
    purchased: "-",
    tags: ["New"],
    notes: "+ Add notes",
  },
  {
    key: "2",
    name: "Robert Skwarko",
    email: "skwarko@yahoo.com",
    id: "SMS-0123",
    lastConvo: "Yesterday",
    social: "whatsapp",
    status: "Purchaser",
    sentiment: "Positive",
    purchased: "$1,050.00",
    tags: ["VIP", "+3"],
    notes: "High value customer...",
  },
  {
    key: "3",
    name: "Dave Osborn",
    email: "daveosborn@gmail.com",
    id: "INST-0123",
    lastConvo: "Jan 30, 2025",
    social: "instagram",
    status: "SME",
    sentiment: "Neutral",
    purchased: "-",
    tags: ["Needs follow-up"],
    notes: "+ Add notes",
  },
  {
    key: "4",
    name: "Jessica Reynolds",
    email: "reynolds123@yahoo.com",
    id: "WA-0123",
    lastConvo: "Jan 18, 2025",
    social: "whatsapp",
    status: "Purchaser",
    sentiment: "Positive",
    purchased: "$1,650.50",
    tags: ["Returning", "+4"],
    notes: "Happy with service...",
  },
  {
    key: "5",
    name: "Tasha March",
    email: "tasha_march@mail.com",
    id: "GM-0123",
    lastConvo: "Jan 18, 2025",
    social: "gmail",
    status: "Purchaser",
    sentiment: "Neutral",
    purchased: "$186.00",
    tags: ["Inactive", "+2"],
    notes: "+ Add notes",
  },
  {
    key: "6",
    name: "IP 543.658...",
    email: "-",
    id: "WS-0123",
    lastConvo: "Jan 18, 2025",
    social: "web",
    status: "Purchaser",
    sentiment: "Negative",
    purchased: "$44.80",
    tags: ["Complaint Filed"],
    notes: "Late delivery compl...",
  },
  {
    key: "6",
    name: "IP 543.658...",
    email: "-",
    id: "WS-0123",
    lastConvo: "Jan 18, 2025",
    social: "web",
    status: "Purchaser",
    sentiment: "Negative",
    purchased: "$44.80",
    tags: ["Complaint Filed"],
    notes: "Late delivery compl...",
  },
  {
    key: "6",
    name: "IP 543.658...",
    email: "-",
    id: "WS-0123",
    lastConvo: "Jan 18, 2025",
    social: "web",
    status: "Purchaser",
    sentiment: "Negative",
    purchased: "$44.80",
    tags: ["Complaint Filed"],
    notes: "Late delivery compl...",
  },
  {
    key: "6",
    name: "IP 543.658...",
    email: "-",
    id: "WS-0123",
    lastConvo: "Jan 18, 2025",
    social: "web",
    status: "Purchaser",
    sentiment: "Negative",
    purchased: "$44.80",
    tags: ["Complaint Filed"],
    notes: "Late delivery compl...",
  },
  {
    key: "6",
    name: "IP 543.658...",
    email: "-",
    id: "WS-0123",
    lastConvo: "Jan 18, 2025",
    social: "web",
    status: "Purchaser",
    sentiment: "Negative",
    purchased: "$44.80",
    tags: ["Complaint Filed"],
    notes: "Late delivery compl...",
  },
];

const sentimentEmojis = {
  Neutral: "😐",
  Positive: "😊",
  Negative: "😡",
};

const statusColors = {
  "Site visitor": "blue",
  Purchaser: "green",
  SME: "orange",
};

const socialIcons = {
    instagram: <FaInstagram className="text-gray" />, 
    whatsapp: <FaWhatsapp className="text-gray" />,
    gmail: <FaEnvelope className="text-gray" />,
    web: <FaGlobe className="text-gray" />,
  };

const CustomerTab = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => {}}>View Details</Menu.Item>
      <Menu.Item key="2">Edit</Menu.Item>
      <Menu.Item key="3">Delete</Menu.Item>
    </Menu>
  );

  const handleRowClick = (record) => {
    setSelectedCustomer(record);
  };

  const columns = [
    {
      title: "Name & Email",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <p className="font-medium">{text}</p>
          <p className="text-gray-500 text-sm">{record.email}</p>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Last Convo",
      dataIndex: "lastConvo",
      key: "lastConvo",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <span className="text-lg">{socialIcons[record.social]}</span>
          <span className="underline cursor-pointer">{text}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <Tag color={statusColors[text]}>{text}</Tag>,
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment",
      key: "sentiment",
      render: (text) => (
        <span className="flex items-center gap-1">
          {sentimentEmojis[text]} {text}
        </span>
      ),
    },
    {
      title: "Purchased",
      dataIndex: "purchased",
      key: "purchased",
    },
    {
      title: "Customer Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) =>
        tags.map((tag, index) => (
          <Tag key={index} color="gray">
            {tag}
          </Tag>
        )),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: "",
      key: "action",
      render: () => (
        <Dropdown overlay={menu} trigger={['click']}>
          <MoreOutlined className="cursor-pointer text-gray-600 text-lg" />
        </Dropdown>
      ),
    },
  ];

  if (selectedCustomer) {
    return (
      <CustomerDetailsView 
        customer={selectedCustomer} 
        onBack={() => setSelectedCustomer(null)} 
      />
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg h-[75vh] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-xl font-semibold">All Customers ({customers.length})</h2>
        <div className="flex items-center gap-2">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search customers..."
            onChange={(e) => setSearchText(e.target.value)}
            className="w-64 p-2"
          />
          <div className="flex items-center gap-2 border border-gray rounded p-2">
            <GoTag className="cursor-pointer text-lg" />
          </div>
          <div className="flex items-center gap-2 border border-gray rounded p-2">
            <FilterOutlined className="cursor-pointer text-gray-600 text-lg" />
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        pagination={false}
        className="border-none"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default CustomerTab;
