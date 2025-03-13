import React from 'react';

const OrdersTab = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700">Recent Orders</h3>
            <p className="text-gray-600">View and manage recent orders</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-700">Order History</h3>
            <p className="text-gray-600">Access complete order history</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTab; 