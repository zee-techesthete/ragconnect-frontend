import React, { useState } from "react";
import { Input, Button, Dropdown, Checkbox, Menu, Badge} from "antd";
import { FilterOutlined, ExportOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PrimaryBtn from "../../../components/PrimaryBtn";

const filterOptions = [
  { label: "Order status", value: "order_status" },
  { label: "Gift card", value: "gift_card" },
  { label: "Shipping", value: "shipping" },
  { label: "Order changes", value: "order_changes" },
  { label: "Product availability", value: "product_availability" },
];

const filterCategories = [
  { label: "Automation", hasSubFilters: true,
    subFilters: filterOptions, },
  { label: "Status" },
  {
    label: "Category",
    hasSubFilters: true,
    subFilters: filterOptions,
  },
  { label: "Channel" },
  { label: "Assigned to..." },
];

// Mock data for testing connected accounts
const mockConnectedAccounts = {
  instagram: {
    user1: "instagram_user1",
    user2: "instagram_user2"
  },
  whatsapp: {
    user1: "whatsapp_user1",
    user2: "whatsapp_user2",
    user3: "whatsapp_user3"
  },
  email: {
    user1: "email_user1"
  }
};

const channels = [
  { label: "Instagram", value: "instagram" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "SMS", value: "sms" },
  { label: "Phone", value: "phone" },
  { label: "Chatbot IP", value: "chatbot_ip" },
  { label: "Email", value: "email" },
];

const SearchMessageInbound = () => {
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState(channels.map(channel => channel.value));

  // Instead of using Redux store, we'll use our mock data
  const getChannelAccountCount = (channel) => {
    const channelKey = channel.toLowerCase();
    return mockConnectedAccounts[channelKey] ? Object.keys(mockConnectedAccounts[channelKey]).length : 0;
  };

  const toggleFilter = (open) => {
    setFilterOpen(open);
    if (!open) setActiveSubFilter(null);
  };

  const handleFilterChange = (checkedValues) => {
    setSelectedFilters(checkedValues);
  };

  const handleChannelChange = (checkedValues) => {
    setSelectedChannels(checkedValues);
  };

  const channelMenu = (
    <Menu className="w-64 shadow-lg rounded-lg px-4">
      <Checkbox.Group
        options={channels.map(channel => ({
          ...channel,
          label: (
            <div className="flex justify-between items-center w-48">
              <span>{channel.label}</span>
              {getChannelAccountCount(channel.value) > 0 && (
                <span className="text-gray">{getChannelAccountCount(channel.value)}</span>
              )}
            </div>
          )
        }))}
        value={selectedChannels}
        onChange={handleChannelChange}
        className="flex flex-col gap-2"
      />
    </Menu>
  );

  const menu = (
    <Menu className="w-56 shadow-lg rounded-lg">
      {filterCategories.map((category) =>
        category.hasSubFilters ? (
          <Menu.SubMenu
            key={category.label}
            title={category.label}
            onTitleClick={() => setActiveSubFilter(category.label)}
          >
            {activeSubFilter === category.label && (
              <div className="p-3">
                <Checkbox.Group
                  options={category.subFilters}
                  value={selectedFilters}
                  onChange={handleFilterChange}
                  className="flex flex-col gap-2"
                />
              </div>
            )}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={category.label}>{category.label}</Menu.Item>
        )
      )}
    </Menu>
  );

  return (
    <div className="flex justify-between items-center pb-4 ">
      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-10"></div>
      )}

      <div className="flex items-center gap-3 bg-white p-1">
      <div className="">
      <Dropdown overlay={channelMenu} trigger={["click"]} className="w-64 p-5 rounded-lg">
          <Button className="border border-gray bg-white">
            Channels ({selectedChannels.length}) <DownOutlined className="ml-32" />
          </Button>
        </Dropdown>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg border border-gray300 ">
          {/* Search input field */}
          <span className="material-icons text-gray">{"search"}</span>
          <input
            type="search"
            className="focus:outline-none focus:ring-0"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Dropdown
          overlay={menu}
          trigger={["click"]}
          open={filterOpen}
          onOpenChange={toggleFilter}
          overlayStyle={{ position: "absolute", left: "280px" }}
        >
          <Button
            icon={<FilterOutlined />}
            className="size-10 border border-gray bg-white hover:bg-gray200"
          />
        </Dropdown>

        <div className="flex items-center gap-2 flex-wrap">
          {selectedFilters.map((filter) => (
            <div
              key={filter}
              className="bg-gray h-10 px-2 py-1 rounded-md text-sm flex items-center"
            >
              {filterOptions.find((f) => f.value === filter)?.label}
              <button
                className="ml-3 text-red hover:text-black"
                onClick={() =>
                  setSelectedFilters(
                    selectedFilters.filter((f) => f !== filter)
                  )
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button
        icon={<ExportOutlined />}
        className="p-5 border border-gray bg-gray hover:bg-gray"
      >
        Export
      </Button>
    </div>
  );
};

export default SearchMessageInbound;
