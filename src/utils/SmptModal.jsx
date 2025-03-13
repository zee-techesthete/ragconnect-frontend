import React, { useRef, useEffect } from "react";
import { Modal, Input, Button } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { authenticateSmtp, clearErrors } from "../redux/slices/socialAuthSlice";

const SmtpModal = ({ isOpen, onClose }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { isLoading, isConnected, errors } = useSelector(
    (state) => state.socialAuth
  );

  // Add debug logs for SMTP connection status
  useEffect(() => {
    console.log("SMTP Modal - Connection Status:", isConnected.smtp);
    console.log("SMTP Modal - Loading Status:", isLoading.smtp);
    console.log("SMTP Modal - Errors:", errors.smtp);
  }, [isConnected.smtp, isLoading.smtp, errors.smtp]);

  // Close modal when connection is successful
  useEffect(() => {
    if (isConnected.smtp) {
      handleClose();
    }
  }, [isConnected.smtp]);

  // Validation Schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
    host: Yup.string().required("Required"),
    port: Yup.number().required("Required").positive("Must be positive"),
  });

  const handleClose = () => {
    // Reset form when modal closes
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
    // Clear any SMTP errors
    dispatch(clearErrors("smtp"));
    onClose();
  };

  // Add debug logs for form submission
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting SMTP credentials...");
    dispatch(authenticateSmtp(values))
      .then((result) => {
        console.log("SMTP authentication result:", result);
        if (result.error) {
          console.error("SMTP authentication error:", result.error);
        }
      })
      .catch((error) => {
        console.error("SMTP authentication error:", error);
      });
    setSubmitting(false);
  };

  return (
    <Modal
      title="Email Connection"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
    >
      <Formik
        innerRef={formikRef}
        initialValues={{ email: "", password: "", host: "", port: 993 }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
              <Button onClick={handleClose}>Cancel</Button>
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
