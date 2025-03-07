import React from 'react';
import { Button, Card, Table, Tag, Divider, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const BillingSettings = () => {
  // Mock data for payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/24',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5555',
      expiry: '08/25',
      isDefault: false,
    },
  ];

  // Mock data for billing history
  const billingHistory = [
    {
      id: 1,
      date: '2024-03-01',
      amount: 29.99,
      status: 'Paid',
      description: 'Monthly Subscription',
    },
    {
      id: 2,
      date: '2024-02-01',
      amount: 29.99,
      status: 'Paid',
      description: 'Monthly Subscription',
    },
  ];

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Paid' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
  ];

  const handleAddPaymentMethod = () => {
    message.info('Add payment method functionality to be implemented');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAddPaymentMethod}
          >
            Add Payment Method
          </Button>
        </div>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card key={method.id} className="w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{method.type} ending in {method.last4}</p>
                  <p className="text-gray-500">Expires {method.expiry}</p>
                </div>
                <div className="space-x-2">
                  {method.isDefault && <Tag color="blue">Default</Tag>}
                  <Button type="link">Edit</Button>
                  <Button type="link" danger>Remove</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Divider />

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Billing History</h3>
        <Table
          columns={columns}
          dataSource={billingHistory}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default BillingSettings; 