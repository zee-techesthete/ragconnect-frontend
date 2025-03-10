import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Select, message, Modal } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  PictureOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import userImg from "../../../assets/user.png";
import PrimaryBtn from "../../../components/PrimaryBtn";
import {
  updateProfileSettings,
  uploadProfilePicture,
  deactivateAccount,
  clearError,
  clearSuccess,
  setProfilePicture,
} from "../../../redux/slices/profileSettingsSlice";

const { TextArea } = Input;

const ProfileSettings = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { user, loading, error, success, profilePicture } = useSelector(
    (state) => state.profileSettings
  );
  const [isDeactivateModalVisible, setIsDeactivateModalVisible] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        position: user.position,
        description: user.description,
        phone: user.phone,
        email: user.email,
        timezone: user.timezone,
        language: user.language,
      });
    }
  }, [user, form]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearError());
    }
    if (success) {
      message.success("Profile updated successfully");
      dispatch(clearSuccess());
    }
  }, [error, success, dispatch]);

  const handleProfileUpdate = async (values) => {
    await dispatch(updateProfileSettings(values));
  };

  const handleProfilePictureUpload = async (file) => {
    try {
      await dispatch(uploadProfilePicture(file));
      message.success("Profile picture updated successfully");
    } catch (error) {
      message.error("Failed to upload profile picture");
    }
    return false; // Prevent default upload behavior
  };

  const handleRemoveProfilePicture = () => {
    dispatch(setProfilePicture(null));
    message.success("Profile picture removed successfully");
  };

  const handleDeactivateAccount = async () => {
    try {
      await dispatch(deactivateAccount());
      message.success("Account deactivated successfully");
      // Handle navigation or logout here
    } catch (error) {
      message.error("Failed to deactivate account");
    }
    setIsDeactivateModalVisible(false);
  };

  const showDeactivateModal = () => {
    setIsDeactivateModalVisible(true);
  };

  return (
    <div className="mt-2 h-[calc(85vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray scrollbar-track-gray py-4 px-1 custom-scrollbar">
      <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>

      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Profile Picture Section with Contact Info */}
        <div className="flex justify-center md:justify-start">
          <div className="rounded-lg">
            <img
              src={profilePicture || userImg}
              alt="profile"
              className="w-64 sm:w-96 h-48 sm:h-64 object-cover"
            />
            <div className="mt-3 flex gap-2 w-full">
              <Button
                icon={<DeleteOutlined />}
                className="w-[120px] sm:w-[155px] h-[40px] bg-gray font-medium"
                onClick={handleRemoveProfilePicture}
              >
                Remove
              </Button>
              <Upload
                showUploadList={false}
                beforeUpload={handleProfilePictureUpload}
                accept="image/*"
              >
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
          <Form
            form={form}
            layout="vertical"
            className="h-full"
            onFinish={handleProfileUpdate}
          >
            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-2">
              <Form.Item
                name="fullName"
                label="Full Name"
                className="w-full text-base font-medium"
                rules={[{ required: true, message: "Please enter your full name" }]}
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
                rules={[{ required: true, message: "Please enter your position" }]}
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
        <Form
          form={form}
          layout="vertical"
          onFinish={handleProfileUpdate}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10">
            <Form.Item
              name="phone"
              label="Phone Number"
              className="w-full text-base font-medium"
              rules={[
                { required: true, message: "Please enter your phone number" },
                { pattern: /^\+?[1-9]\d{1,14}$/, message: "Please enter a valid phone number" }
              ]}
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
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" }
              ]}
            >
              <Input
                placeholder="jordan.miles@gmail.com"
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
              rules={[{ required: true, message: "Please select your timezone" }]}
            >
              <Select
                className="font-normal h-[40px]"
                options={[
                  { value: "UTC-06:00", label: "UTC-06:00 (Central Time Zone)" },
                  { value: "UTC-05:00", label: "UTC-05:00 (Eastern Time Zone)" },
                  { value: "UTC-07:00", label: "UTC-07:00 (Mountain Time Zone)" },
                  { value: "UTC-08:00", label: "UTC-08:00 (Pacific Time Zone)" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="language"
              label="Language"
              className="w-full text-base font-medium"
              rules={[{ required: true, message: "Please select your language" }]}
            >
              <Select
                className="font-normal h-[40px]"
                options={[
                  { value: "English", label: "English" },
                  { value: "Spanish", label: "Spanish" },
                  { value: "French", label: "French" },
                  { value: "German", label: "German" },
                ]}
              />
            </Form.Item>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-end gap-3 mt-4">
            <PrimaryBtn
              title="Discard"
              className="text-sm font-medium"
              onClick={() => form.resetFields()}
            />
            <PrimaryBtn
              title="Save"
              className="text-sm font-medium bg-gray text-center border border-primary hover:bg-gray"
              htmlType="submit"
              loading={loading}
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
        <Button
          className="mt-2 bg-gray font-medium hover:bg-primary"
          onClick={showDeactivateModal}
        >
          Deactivate Account
        </Button>
      </div>

      {/* Deactivation Confirmation Modal */}
      <Modal
        title="Deactivate Account"
        open={isDeactivateModalVisible}
        onOk={handleDeactivateAccount}
        onCancel={() => setIsDeactivateModalVisible(false)}
      >
        <p>Are you sure you want to deactivate your account? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ProfileSettings;
