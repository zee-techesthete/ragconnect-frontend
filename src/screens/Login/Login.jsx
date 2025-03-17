import { useState, useEffect } from "react";
import Logo from "../../assets/svgs/logo.svg";
import PrimaryBtn from "../../components/PrimaryBtn";
import { FcGoogle } from "react-icons/fc";
import { FaInstagram, FaMicrosoft } from "react-icons/fa";
import {
  Link,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  clearError,
  googleSSO,
  outlookSSO,
  verifyEmail,
} from "../../redux/slices/loginSlice";
import { message, Form, Input } from "antd";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const verificationToken = searchParams.get("email-verification-token");
  const [isVerifying, setIsVerifying] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || ""
  );

  const { loading, error, user, token, ssoLoading } = useSelector(
    (state) => state.login
  );

  // Handle email verification
  useEffect(() => {
    const handleEmailVerification = async () => {
      if (verificationToken) {
        setIsVerifying(true);
        try {
          const result = await dispatch(
            verifyEmail(verificationToken)
          ).unwrap();
          if (result.user && result.token) {
            message.success("Email verified successfully!");
            navigate("/home", { replace: true });
          }
        } catch (err) {
          message.error(
            err?.error ||
              "Email verification failed, verify your email to login"
          );
        } finally {
          setIsVerifying(false);
        }
      }
    };

    handleEmailVerification();
  }, [verificationToken, dispatch, navigate]);

  // Clear error on unmount and after 10 seconds when error occurs
  useEffect(() => {
    let errorTimeout;
    if (error) {
      errorTimeout = setTimeout(() => {
        dispatch(clearError());
      }, 10000); // 10 seconds
    }
    return () => {
      dispatch(clearError());
      if (errorTimeout) {
        clearTimeout(errorTimeout);
      }
    };
  }, [dispatch, error]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && token) {
      navigate("/home", { replace: true });
    }
  }, [user, token, navigate]);

  const handleLogin = async (values) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      if (result.user && result.token) {
        message.success("Login successful!");
        form.resetFields();
        navigate("/home", { replace: true });
      }
    } catch (err) {
      messageApi.error(err?.error || "Login failed. Please try again.");
    }
  };

  const handleGoogleSSO = () => {
    dispatch(googleSSO());
  };

  const handleOutlookSSO = () => {
    dispatch(outlookSSO());
  };

  return (
    <div className="flex flex-col  min-h-screen bg-primary px-4 sm:px-6 lg:px-8">
      {contextHolder}
      <div className="w-full flex flex-wrap items-center mt-5 justify-between px-4 md:px-8 lg:px-20 py-4">
        <img src={Logo} alt="Company Logo" className="w-24 lg:w-32 h-auto" />
        <div className="flex gap-2 md:gap-4 flex-wrap">
          <PrimaryBtn
            title="Get help"
            className="bg-white text-sm md:text-base"
          />
          <PrimaryBtn
            title="Register"
            className="bg-white text-sm md:text-base"
            href="/signup"
          />
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Welcome
          </h2>
          {successMessage && (
            <div className="bg-silver text-green-700 p-3 rounded-lg flex justify-between items-center mb-4 max-w-md mx-auto">
              <span>{successMessage}</span>
              <button
                className="text-darkGray hover:text-green-700"
                onClick={() => setSuccessMessage("")}
              >
                ✖
              </button>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {isVerifying ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          ) : (
            <>
              <Form
                form={form}
                name="login"
                onFinish={handleLogin}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input placeholder="Enter email address" size="large" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="**********"
                    size="large"
                    iconRender={(visible) => (
                      <span
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {visible ? (
                          <AiOutlineEyeInvisible size={20} />
                        ) : (
                          <AiOutlineEye size={20} />
                        )}
                      </span>
                    )}
                  />
                </Form.Item>

                {/* Keep me signed in & Forgot password */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
                  <label className="flex items-center text-sm">
                    <input type="checkbox" className="mr-2" />
                    Keep me signed in
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <Form.Item>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-black text-white py-2 rounded-md font-semibold text-sm sm:text-base ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </Form.Item>
              </Form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">
                  OR LOGIN WITH
                </span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Social Login Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={handleGoogleSSO}
                  disabled={ssoLoading}
                  className={`flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition text-sm sm:text-base ${
                    ssoLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FcGoogle className="mr-2 text-xl" />
                  {ssoLoading ? "Connecting..." : "Google"}
                </button>
                <button
                  onClick={handleOutlookSSO}
                  disabled={ssoLoading}
                  className={`flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition text-sm sm:text-base ${
                    ssoLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <FaMicrosoft className="mr-2 text-xl text-blue-600" />
                  {ssoLoading ? "Connecting..." : "Outlook"}
                </button>
                <button className="flex items-center justify-center w-full border border-gray rounded-lg py-2 text-black font-medium hover:bg-gray-100 transition text-sm sm:text-base">
                  <FaInstagram className="mr-2 text-xl text-pink-600" />
                  Instagram
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
