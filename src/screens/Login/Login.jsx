import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button, Card, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get loading & error from Redux store
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap(); // Dispatch login action

      message.success(result.message || "Login successful!");
      navigate("/"); // Redirect after login
    } catch (err) {
      message.error(err || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <Title level={3} className="text-center">Login</Title>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-medium">Username</label>
                <Field name="username" as={Input} placeholder="Enter your username" className="w-full" />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                <Field name="password" as={Input.Password} placeholder="Enter your password" className="w-full" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {error && <div className="text-red-500 text-sm text-center mb-2">{error}</div>}

              <div className="text-center">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading || isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  {loading || isSubmitting ? "Logging In..." : "Login"}
                </Button>
                <div className="mt-2">
                  <span>Don't have an account? </span>
                  <Link to="/signup" className="text-blue-500">Sign Up</Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
