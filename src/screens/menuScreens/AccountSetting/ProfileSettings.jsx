import React from "react";
import { Form, Input, Button, Upload, Select } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  PictureOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import userImg from "../../../assets/user.png";
import PrimaryBtn from "../../../components/PrimaryBtn";

const { TextArea } = Input;

const ProfileSettings = () => {
  const [form] = Form.useForm();

  return (
    <div className="mt-2 h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray scrollbar-track-gray py-4 custom-scrollbar">
      <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>

      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Profile Picture Section with Contact Info */}
        <div className="flex justify-center md:justify-start">
          <div className="rounded-lg">
            <img
              src={userImg}
              alt="raggie agent"
              className="w-64 sm:w-96 h-48 sm:h-64 object-cover"
            />
            <div className="mt-3 flex gap-2 w-full">
              <Button
                icon={<DeleteOutlined />}
                className="w-[120px] sm:w-[155px] h-[40px] bg-gray font-medium"
              >
                Remove
              </Button>
              <Upload showUploadList={false}>
                <Button
                  icon={<UploadOutlined />}
                  className="w-[120px] sm:w-[155px] h-[40px] font-medium"
                >
                  Change
                </Button>
              </Upload>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <Form form={form} layout="vertical" className="h-full">
            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-2">
              <Form.Item
                name="fullName"
                label="Full Name"
                className="w-full text-base font-medium"
              >
                <Input
                  placeholder="Jordan Miles"
                  className="font-normal h-[40px]"
                />
              </Form.Item>

              <Form.Item
                name="position"
                label="Position"
                className="w-full text-base font-medium"
              >
                <Input
                  placeholder="Chief Executive Officer"
                  className="font-normal h-[40px]"
                />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea
                  rows={4}
                  placeholder="Help Reggie and your teammates understand your business goals"
                  className="min-h-[40px]"
                />
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>

      {/* Profile Form */}
      <div className="mt-6">
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
            <Form.Item
              name="phone"
              label="Phone Number"
              className="w-full text-base font-medium"
            >
              <Input
                placeholder="+1 (212) 555-7890"
                className="font-normal h-[40px]"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              className="w-full text-base font-medium"
            >
              <Input
                placeholder="jordan.milesss@gmail.com"
                className="font-normal h-[40px]"
              />
            </Form.Item>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 mt-4">
            <Form.Item
              name="timezone"
              label="Time Zone"
              className="w-full text-base font-medium"
            >
              <Select
                defaultValue="UTC-06:00 (Central Time Zone)"
                className="font-normal h-[40px]"
              >
                <Select.Option value="UTC-06:00">
                  UTC-06:00 (Central Time Zone)
                </Select.Option>
                <Select.Option value="UTC-05:00">
                  UTC-05:00 (Eastern Time Zone)
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              className="w-full text-base font-medium"
            >
              <Select defaultValue="English" className="font-normal h-[40px]">
                <Select.Option value="English">English</Select.Option>
                <Select.Option value="Spanish">Spanish</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end gap-3 mt-4">
            <PrimaryBtn title={"Discard"} className="text-sm font-medium" />
            <PrimaryBtn
              title={"Save"}
              className="text-sm font-medium bg-gray text-center border border-primary hover:bg-gray"
            />
          </div>
        </Form>
      </div>

      {/* Deactivation Section */}
      <div className="border-t border-gray mt-6 pt-4 flex justify-between items-center">
        <div className="flex flex-col gap-2 w-80">
          <h5 className="text-base font-medium">Deactivation</h5>
          <p className="text-gray text-sm">
            If you no longer need your account, you can deactivate it without
            affecting other workspaces.
          </p>
        </div>
        <Button className="mt-2 bg-gray font-medium hover:bg-primary">
          Deactivate Account
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
