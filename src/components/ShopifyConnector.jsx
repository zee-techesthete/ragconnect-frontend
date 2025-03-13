import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authenticateShopify } from "../redux/slices/socialAuthSlice";

const ShopifyConnector = ({ isOpen, onClose, onVerifyingStart }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { isLoading, isConnected, errors } = useSelector(
    (state) => state.socialAuth
  );

  const handleSubmit = async (values) => {
    const { shopUrl } = values;
    // Clean up the shop URL to ensure correct format
    const cleanShopUrl = shopUrl
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/$/, "");

    // Close modal and notify parent about verification start
    onClose();
    onVerifyingStart?.();
    
    // Dispatch the authentication action
    await dispatch(authenticateShopify(cleanShopUrl));
  };

  return (
    <Modal
      title="Connect Shopify Store"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ shopUrl: "" }}
      >
        <Form.Item
          name="shopUrl"
          label="Shopify Store URL"
          rules={[
            { required: true, message: "Please enter your Shopify store URL" },
            {
              pattern: /^[a-zA-Z0-9-]+\.myshopify\.com$/,
              message:
                "Please enter a valid Shopify store URL (e.g., my-store.myshopify.com)",
            },
          ]}
          help="Enter your Shopify store URL (e.g., my-store.myshopify.com)"
        >
          <Input
            placeholder="my-store.myshopify.com"
            disabled={isLoading?.shopify || isConnected?.shopify}
          />
        </Form.Item>

        {errors?.shopify && (
          <div className="text-red-500 text-sm mb-4">{errors.shopify}</div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} disabled={isLoading?.shopify}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading?.shopify}
            disabled={isLoading?.shopify || isConnected?.shopify}
          >
            {isLoading?.shopify ? "Verifying..." : isConnected?.shopify ? "Connected" : "Connect Store"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ShopifyConnector;
