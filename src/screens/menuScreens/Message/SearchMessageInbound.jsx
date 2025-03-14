import React, { useState, useEffect } from "react";
import { Input, Button, Dropdown, Checkbox, Menu, Badge } from "antd";
import { FilterOutlined, ExportOutlined, DownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import PrimaryBtn from "../../../components/PrimaryBtn";
import CustomSpinner from "../../../components/CustomSpinner";
import { fetchUserConnectors } from "../../../redux/slices/channelSlice";
import { fetchConversations } from "../../../redux/slices/conversationSlice";
import { FaEnvelope, FaGlobe, FaInstagram, FaShoppingCart, FaWhatsapp } from "react-icons/fa";

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

const SearchMessageInbound = () => {
  const dispatch = useDispatch();
  const { connectors, loading: connectorsLoading, error: connectorsError } = useSelector((state) => state.channels);
  const { user } = useSelector((state) => state.login);
  const token = localStorage.getItem("authToken");

  // Add debug logs


  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(null);
  const [selectedChannels, setSelectedChannels] = useState([]);

  // Get unique provider names from connectors
  const getUniqueProviderNames = (connectors) => {
    
    if (!Array.isArray(connectors?.connectors)) {
      return [];
    }

    const providerNames = connectors.connectors.map(c => {
      console.log("Processing connector:", c);
      return c.provider_name;
    });

    const uniqueProviders = [...new Set(providerNames)].map(name => name?.toLowerCase());

    const filteredProviders = uniqueProviders.filter(Boolean);

    return filteredProviders;
  };

  // Effect to fetch connectors
  useEffect(() => {
    const userId = user?.user?.id || user?.id;
    console.log("SearchMessageInbound - Effect triggered with userId:", userId);
    
    if (userId && token) {
      console.log("SearchMessageInbound - Dispatching fetchUserConnectors");
      dispatch(fetchUserConnectors({ userId, token }));
    } else {
      console.log("SearchMessageInbound - Missing userId or token:", { userId, hasToken: !!token });
    }
  }, [dispatch, user, token]);

  // Effect to set default selected channels when connectors load
  useEffect(() => {
    console.log("Connectors changed effect - Current connectors:", connectors);
    if (connectors?.success && Array.isArray(connectors?.connectors) && connectors.connectors.length > 0) {
      console.log("Connectors changed effect - Getting unique providers...");
      const uniqueProviders = getUniqueProviderNames(connectors);
      console.log("Connectors changed effect - Setting channels:", uniqueProviders);
      setSelectedChannels(uniqueProviders);
    } else {
      console.log("Connectors changed effect - No valid connectors array");
    }
  }, [connectors]);

  // Fetch conversations when selected channels change
  useEffect(() => {
    const userId = user?.user?.id || user?.id;
    if (userId && token && selectedChannels.length > 0) {
      console.log("SearchMessageInbound - Fetching conversations for channels:", selectedChannels);
      dispatch(fetchConversations({ 
        userId, 
        token, 
        platforms: selectedChannels 
      }));
    }
  }, [dispatch, user, token, selectedChannels]);

  const toggleFilter = (open) => {
    setFilterOpen(open);
    if (!open) setActiveSubFilter(null);
  };

  const handleFilterChange = (checkedValues) => {
    setSelectedFilters(checkedValues);
  };

  const handleChannelChange = (checkedValues) => {
    console.log("Channel selection changed:", checkedValues);
    setSelectedChannels(checkedValues);
  };

  const getChannelAccountCount = (providerName) => {
    const count = connectors?.success && Array.isArray(connectors?.connectors) 
      ? connectors.connectors.filter(connector => connector.provider_name === providerName).length 
      : 0;
    console.log(`Account count for ${providerName}:`, count);
    return count;
  };

  const getUniqueConnectorOptions = () => {
    console.log("getUniqueConnectorOptions - Starting...");
    if (!connectors?.success || !Array.isArray(connectors?.connectors)) {
      console.log("getUniqueConnectorOptions - Connectors is not valid");
      return [];
    }
    
    // Get unique providers with their connection types
    const uniqueProviders = [...new Set(connectors.connectors.map(c => ({
      provider_name: c.provider_name,
      connection_type: c.connection_type
    })))];
    console.log("getUniqueConnectorOptions - Unique providers:", uniqueProviders);
    
    const getIconForProvider = (provider, connectionType) => {
      const providerLower = connectionType.toLowerCase();
      
      if (connectionType === "EMAIL") {
        return <FaEnvelope className="text-gray mr-2" />;
      }
      if (providerLower.includes("instagram")) {
        return <FaInstagram className="text-gray mr-2" />;
      }
      if (providerLower.includes("whatsapp")) {
        return <FaWhatsapp className="text-gray mr-2" />;
      }
      if (providerLower.includes("web")) {
        return <FaGlobe className="text-gray mr-2" />;
      }
      if (providerLower.includes("ecommerce")) {
        return <FaShoppingCart className="text-gray mr-2" />;
      }
      return <FaGlobe className="text-gray mr-2" />; // Default icon
    };
    
    const options = uniqueProviders.map(({ provider_name, connection_type }) => ({
      label: (
        <div className="flex justify-between items-center w-full">
          <span className="flex items-center">
            {getIconForProvider(provider_name, connection_type)}
            {provider_name === "SMTP_IMAP" 
              ? "Email" 
              : provider_name.charAt(0).toUpperCase() + provider_name.slice(1).toLowerCase()}
          </span>
          <span className="text-gray-600">{getChannelAccountCount(provider_name)}</span>
        </div>
      ),
      value: provider_name.toLowerCase(),
    }));
    console.log("getUniqueConnectorOptions - Final options:", options);
    return options;
  };



  const channelMenu = (
    <Menu className="w-64 shadow-lg rounded-lg px-4">
      {connectorsLoading ? (
        <div className="flex justify-center items-center py-4">
          <CustomSpinner size="medium" color="#1890ff" />
        </div>
      ) : connectorsError ? (
        <div className="text-red-500 py-4 text-center">
          {connectorsError}
        </div>
      ) : (
        <div className="[&_.ant-checkbox-label]:w-full">
          <Checkbox.Group
            options={getUniqueConnectorOptions()}
            value={selectedChannels}
            onChange={handleChannelChange}
            className="flex flex-col gap-2"
          />
        </div>
      )}
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
          <Dropdown 
            overlay={channelMenu} 
            trigger={["click"]} 
            className="w-64 p-5 rounded-lg"
            disabled={connectorsLoading}
          >
            <Button className="border border-gray bg-white">
              Channels ({selectedChannels.length}) <DownOutlined className="ml-32" />
              {connectorsLoading && <CustomSpinner size="small" className="ml-2" />}
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
          menu={{
            items: filterCategories.map(category => ({
              key: category.label,
              label: category.label,
              children: category.hasSubFilters ? category.subFilters.map(subFilter => ({
                key: subFilter.value,
                label: subFilter.label
              })) : undefined
            }))
          }}
          trigger={['click']}
          open={filterOpen}
          onOpenChange={toggleFilter}
        >
          <Button icon={<FilterOutlined />}>Filters</Button>
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
