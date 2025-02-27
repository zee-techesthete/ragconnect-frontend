import React, { useState } from "react";
import { Input, Button, Dropdown, Checkbox, Menu } from "antd";
import { FilterOutlined, ExportOutlined } from "@ant-design/icons";

const filterOptions = [
  { label: "Order status", value: "order_status" },
  { label: "Gift card", value: "gift_card" },
  { label: "Shipping", value: "shipping" },
  { label: "Order changes", value: "order_changes" },
  { label: "Product availability", value: "product_availability" },
];

const filterCategories = [
  { label: "Automation" },
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
  const [search, setSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeSubFilter, setActiveSubFilter] = useState(null);

  const toggleFilter = (open) => {
    setFilterOpen(open);
    if (!open) setActiveSubFilter(null);
  };

  const handleFilterChange = (checkedValues) => {
    setSelectedFilters(checkedValues);
  };

  const menu = (
    <Menu className="w-56 shadow-lg rounded-lg">
      {filterCategories.map((category) => (
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
      ))}
    </Menu>
  );

  return (
    <div className="flex justify-between items-center p-4 ">
      {filterOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-30 z-10"></div>
      )}

      <div className="flex items-center gap-3 bg-white p-3">
        <Input
          placeholder="Search users or key words"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />

        <Dropdown overlay={menu} trigger={["click"]} open={filterOpen} onOpenChange={toggleFilter}>
          <Button icon={<FilterOutlined />} className="border border-gray bg-white hover:bg-gray-100" />
        </Dropdown>

        <div className="flex items-center gap-2 flex-wrap">
          {selectedFilters.map((filter) => (
            <div key={filter} className="bg-gray px-2 py-1 rounded-md text-sm flex items-center">
              {filterOptions.find((f) => f.value === filter)?.label}
              <button
                className="ml-1 text-gray-600 hover:text-gray-800"
                onClick={() =>
                  setSelectedFilters(selectedFilters.filter((f) => f !== filter))
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <Button icon={<ExportOutlined />} className="border border-gray bg-white hover:bg-gray-100">
        Export
      </Button>
    </div>
  );
};

export default SearchMessageInbound;
