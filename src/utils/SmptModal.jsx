import React from "react";
import { Modal, Input, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authenticateSmtp } from "../redux/slices/socialAuthSlice"; // Import action

const SmtpModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isLoading, isConnected, errors } = useSelector(
    (state) => state.socialAuth
  );

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
    host: Yup.string().required("Required"),
    port: Yup.number().required("Required").positive("Must be positive"),
  });

  return (
    <Modal
      title="Email Connection"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Formik
        initialValues={{ email: "", password: "", host: "", port: 993 }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(authenticateSmtp(values)); // ✅ Dispatch SMTP authentication action
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Field name="email" as={Input} />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <Field name="password" type="password" as={Input} />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Host</label>
              <Field name="host" as={Input} />
              <ErrorMessage
                name="host"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Port</label>
              <Field name="port" type="number" as={Input} />
              <ErrorMessage
                name="port"
                component="div"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Display Errors */}
            {errors.smtp && (
              <p className="text-red-500 text-xs">{errors.smtp}</p>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={isConnected.smtp}
                loading={isSubmitting || isLoading.smtp}
              >
                {isConnected.smtp ? "Connected" : "Connect"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SmtpModal;
