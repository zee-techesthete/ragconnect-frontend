import React from 'react';
import { Form, Switch, Button, Radio, Divider, message } from 'antd';

const NotificationSettings = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Notification settings:', values);
    message.success('Notification preferences updated successfully');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          emailNotifications: true,
          pushNotifications: true,
          notificationFrequency: 'immediate',
        }}
      >
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
          <Form.Item
            name="emailNotifications"
            valuePropName="checked"
            label="Enable Email Notifications"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="marketingEmails"
            valuePropName="checked"
            label="Marketing Updates"
          >
            <Switch />
          </Form.Item>
        </div>

        <Divider />

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
          <Form.Item
            name="pushNotifications"
            valuePropName="checked"
            label="Enable Push Notifications"
          >
            <Switch />
          </Form.Item>
        </div>

        <Divider />

        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Notification Frequency</h3>
          <Form.Item name="notificationFrequency">
            <Radio.Group>
              <Radio value="immediate">Immediate</Radio>
              <Radio value="hourly">Hourly Digest</Radio>
              <Radio value="daily">Daily Digest</Radio>
              <Radio value="weekly">Weekly Digest</Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Notification Preferences
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NotificationSettings; 