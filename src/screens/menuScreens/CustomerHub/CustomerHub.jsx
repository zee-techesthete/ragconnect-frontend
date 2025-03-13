import React, { useState } from 'react';
import CustomerHubHeader from './CustomerHubHeader';
import CustomerTab from './components/CustomerTab';
import OrdersTab from './components/OrdersTab';
import SupportTicketsTab from './components/SupportTicketsTab';
import SentimentAnalysisTab from './components/SentimentAnalysisTab';
import CustomerHubSidebar from './components/CustomerHubSidebar';
import { Button } from 'antd';
import { FiSidebar } from 'react-icons/fi';

const CustomerHub = () => {
    const [selectedMenu, setSelectedMenu] = useState("Customer");
    const [selectedMenu1, setSelectedMenu1] = useState("Agent Reggie");
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    const menuItems = [
        "Customer",
        "Orders",
        "Support Tickets",
        "Sentiment Analysis",
    ];

    const sideMenu = [
        "Agent Reggie",
    ];

    const renderTabContent = () => {
        switch (selectedMenu) {
            case "Customer":
                return <CustomerTab />;
            case "Orders":
                return <OrdersTab />;
            case "Support Tickets":
                return <SupportTicketsTab />;
            case "Sentiment Analysis":
                return <SentimentAnalysisTab />;
            default:
                return <CustomerTab />;
        }
    };

    return (
        <div className="w-full h-full">
            <CustomerHubHeader />

            {/* Top Navigation */}
            <div className="flex items-center justify-between border border-t-gray border-b-gray border-l-0 border-r-0">
                <div className={`flex gap-4 transition-all duration-200 border-r border-gray800 ${isMenuOpen ? 'w-[75%]' : 'w-full border-r-0'}`}>
                    {menuItems.map((menu) => (
                        <button
                            key={menu}
                            onClick={() => setSelectedMenu(menu)}
                            className={`flex items-center gap-2 cursor-pointer p-3 ${
                                selectedMenu === menu
                                    ? "text-black border-b-2 border-black font-medium"
                                    : "text-gray border-b-2 border-white"
                            }`}
                        >
                            <span className="p-4 bg-gray rounded-xl"></span>
                            <span>{menu}</span>
                        </button>
                    ))}
                </div>

                {/* Sidebar Toggle Button */}
                <div className={`flex items-center justify-between transition-all duration-200 px-2 ${isMenuOpen ? 'w-[25%]' : 'w-10'}`}>
                    {isMenuOpen && (
                        <div className="flex items-center gap-4">
                            {sideMenu.map((menu1) => (
                                <button
                                    key={menu1}
                                    onClick={() => setSelectedMenu1(menu1)}
                                    className={`flex items-center gap-2 cursor-pointer p-4 ${
                                        selectedMenu1 === menu1
                                            ? "text-black border-b-2 border-black font-medium"
                                            : "text-gray border-b-2 border-white"
                                    }`}
                                >
                                    <span>{menu1}</span>
                                </button>
                            ))}
                        </div>
                    )}
                    <Button
                        type="default"
                        icon={<FiSidebar />}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="ml-auto border-none text-2xl"
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex">
                {/* Main Content */}
                <div className={`transition-all duration-300 border-r border-gray800 ${isMenuOpen ? 'w-[75%]' : 'w-full border-r-0'}`}>
                    {renderTabContent()}
                </div>

                {/* Sidebar */}
                <div
                    className={`transition-all duration-300 ${
                        isMenuOpen ? "w-[25%] border-gray800" : "w-0 border-transparent"
                    } overflow-hidden`}
                >
                    <CustomerHubSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </div>
            </div>
        </div>
    );
};

export default CustomerHub;
