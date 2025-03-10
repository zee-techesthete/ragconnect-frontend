import React from "react";
import { Button, Card, Table, Tag, Divider, message, Alert, Progress } from "antd";
import { PlusOutlined, CreditCardOutlined } from "@ant-design/icons";
import { LiaCcVisa } from "react-icons/lia";
import { RiVisaLine } from "react-icons/ri";

const BillingSettings = () => {
  const usedSeats = 8
  const totalSeats = 10
  const progressPercentage = (usedSeats / totalSeats) * 100;

  // Mock data for payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "1234",
      expiry: "12/24",
      isDefault: true,
    },
  ];

  // Mock data for billing history
  const billingHistory = [
    {
      id: 1,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
    {
      id: 2,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
    {
      id: 3,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
    {
      id: 4,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
    {
      id: 5,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
    {
      id: 6,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
    {
      id: 7,
      invoice: "Invoice 001",
      date: "Jan 18, 2025",
      amount: "$20.00",
      users: "8 users",
      plan: "Basic plan",
    },
  ];

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
    },
    {
      title: "Billing Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Users",
      dataIndex: "users",
      key: "users",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
    },
  ];

  const handleUpgrade = () => {
    message.info("Upgrade functionality coming soon!");
  };

  return (
    <div className="h-[calc(85vh-120px)] overflow-y-auto custom-scrollbar">
      <div className="billing-container space-y-4 sm:space-y-6 p-4 sm:p-6">
        {/* Upgrade Notification */}
        <Alert
      className="bg-white border-gray flex items-center"
      message={
        <div className="flex items-center">
          <Progress
            type="circle"
            percent={progressPercentage}
            width={40}
            strokeColor="black"
            trailColor="lightgray"
            format={() => ""}
          />
          <span className="ml-3 font-medium">
            You've used {usedSeats} of {totalSeats} available seats
          </span>
        </div>
      }
      description="Upgrade to a business plan to unlock up to 20 team members and 30 GB storage."
      type="info"
      showIcon={false}
      action={
        <Button
          type="default"
          className="bg-gray py-3 sm:py-5 font-medium mt-2 sm:mt-0"
          onClick={handleUpgrade}
        >
          Upgrade plan
        </Button>
      }
      closable
    />

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-medium">Payment Method</h3>
          <Card 
            className="mt-4 border-none" 
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full sm:w-96 me-0 sm:me-10">
                <div className="flex items-center space-x-2">

                  <RiVisaLine className="text-4xl border border-gray rounded-md p-1 w-14" />
                  <span className="font-medium">Visa **** 1234 
                  <p className="text-gray font-normal"> Expiry 12/24</p>
                  </span>
                </div>
                
                <Button type="default" className="mt-2 sm:mt-0">Change</Button>
              </div>
              <div>
                <p className="text-gray mt-2 w-full sm:w-96">
                  This is the payment method you're using for replenishing your workspace plan.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Subscription Plans */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-lg font-medium">Subscription Plan</h3>
            <Button type="default" className="border font-medium bg-gray py-3 sm:py-5 w-full sm:w-auto">Comparison Table →</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-4">
            {/* Free Plan */}
            <Card className="w-full">
              <h4 className="font-medium">Free plan</h4>
              <p className="text-gray-500">Up to 2 team members</p>
              <p className="text-base font-semibold mt-5">Free</p>
              <Button type="default" className="mt-4 w-full py-3 sm:py-5 bg-gray font-medium">
                Choose plan
              </Button>
            </Card>

            {/* Basic Plan */}
            <Card className="border-1 border-black relative w-full">
              <Tag color="default" className="absolute top-4 right-2 py-1 bg-white font-medium">
                Active
              </Tag>
              <h4 className="font-medium">Basic plan</h4>
              <p className="text-gray-500">Up to 8 team members</p>
              <p className="text-base font-normal mt-3">$ <span className="mt-4 text-lg font-semibold">20 <span className="text-gray">per month</span></span></p>
              <Button type="default" className="mt-5 w-full py-3 sm:py-5 font-medium">
                Current plan
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="w-full">
              <h4 className="font-medium">Pro plan</h4>
              <p className="text-gray-500">Up to 50 team members</p>
              <p className="font-normal mt-4">$ <span className="mt-4 text-lg font-semibold">140 <span className="text-gray font-medium">per month</span></span></p>
              <Button type="default" className="mt-4 w-full py-3 sm:py-5 bg-gray font-medium">
                Upgrade plan
              </Button>
            </Card>
          </div>
        </div>

        {/* Billing History */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-lg font-medium">Billing History</h3>
            <Button icon={<PlusOutlined />} className="bg-gray font-medium text-sm py-3 sm:py-5 w-full sm:w-auto">Download all</Button>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={billingHistory}
              rowKey="id"
              pagination={false}
              className="mt-4 [&_.ant-table-thead_.ant-table-cell]:text-gray-500"
              scroll={{ x: 'max-content' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
