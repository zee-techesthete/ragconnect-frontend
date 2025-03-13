import React from 'react';

const SupportTicketsTab = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Support Tickets</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700">Active Tickets</h3>
            <p className="text-gray-600">Manage ongoing support issues</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Ticket History</h3>
            <p className="text-gray-600">View resolved support tickets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketsTab; 