import React from "react";
import { Form, Switch, Radio, Select, Divider, Checkbox } from "antd";
import "./NotificationSettings.css";

const { Option } = Select;

const NotificationSettings = () => {
  const [form] = Form.useForm();

  return (
    <div className="h-[calc(85vh-120px)] overflow-y-auto custom-scrollbar py-4 px-1 notification-settings">
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          pushNotifications: "assigned",
          notifyReggie: true,
          notifyTeam: false,
          emailNotifications: true,
          emailFrequency: "15min",
          signInNotification: "standard",
        }}
      >
        {/* Push Notifications */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
          <Form.Item name="pushNotifications">
            <Radio.Group className="flex flex-col gap-5">
              <Radio value="all">All new messages in Inbound</Radio>
              <Radio value="assigned">Only conversations Assigned to me</Radio>
              <Radio value="handsOn">Only conversations inHands-on Mode</Radio>
              <Radio value="none">Nothing</Radio>
            </Radio.Group>
          </Form.Item>
        <Divider />

        <Form.Item name="notifyReggie" valuePropName="checked">
            <Checkbox>Notify me about actions made by Reggie</Checkbox>
          </Form.Item>

          <Form.Item name="notifyTeam" valuePropName="checked">
            <Checkbox>Notify me about actions made by team members</Checkbox>
          </Form.Item>
        </div>


        {/* Email Notifications */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          <div className="flex items-center justify-between">
            <span className="me-2">Enabled</span>
            <Form.Item name="emailNotifications" valuePropName="checked" noStyle>
              <Switch />
            </Form.Item>
          </div>
        </div>

        <Form.Item name="emailFrequency" label="Send me email notifications:" className="w-96 font-medium">
          <Select>
            <Option value="15min">Once every 15 minutes</Option>
            <Option value="hourly">Once an hour</Option>
            <Option value="daily">Once a day</Option>
          </Select>
        </Form.Item>

        {/* Sign-in Notifications */}
        <div className="mb-6">
  <h3 className="text-sm font-medium">Sign-in notifications</h3>
  <Form.Item name="signInNotification">
    <Radio.Group className="flex flex-col gap-4">
      <Radio value="secure">
        <div>
          <span className="font-normal">Most secure</span>
          <p className="text-gray text-sm mt-1">
            Receive an email anytime someone signs in to your account from an unrecognized device.
          </p>
        </div>
      </Radio>
      <Radio value="standard">
        <div>
          <span className="font-normal">Standard</span>
          <p className="text-gray text-sm mt-1">
            Receive an email when someone signs in from a new location, with an unrecognized device.
          </p>
        </div>
      </Radio>
      <Radio value="none">
        <span className="font-normal">Don't send me any sign-in notifications</span>
      </Radio>
    </Radio.Group>
  </Form.Item>
</div>

      </Form>
    </div>
  );
};

export default NotificationSettings;
