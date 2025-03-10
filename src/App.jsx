import "./App.css";
import {
  Route,
  Routes,
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Onboarding1 from "./screens/onboarding/Onboarding1";
import Onboarding2 from "./screens/onboarding/Onboarding2";
import Onboarding3 from "./screens/onboarding/Onboarding3";
import ChatUI from "./screens/ChatUI/ChatUI";
import MainScreen from "./screens/MainScreen";
import Login from "./screens/Login/Login";
import MessageInbound from "./screens/menuScreens/Message/MessageInbound";
import Connector from "./screens/menuScreens/Connector";
import EmailList from "./screens/Emails/EmailList";
import Sidebar from "./screens/Sidebar";
import TrainingHub from "./screens/menuScreens/trainingHub/TrainingHub";
import AuthScreen from "./screens/Registration/AuthScreen";
import AccountCreated from "./screens/Registration/AccountCreated";
import EmailConfirmed from "./screens/Registration/EmailConfirmed";
import ResetPassword from "./screens/Login/ResetPassword";
import EnterPassword from "./screens/Login/EnterPassword";
import AccountSetting from "./screens/menuScreens/AccountSetting/AccountSetting";
import ProtectedRoute from "./components/ProtectedRoute";
import setupAxiosInterceptors from "./utils/axiosConfig";
import { useEffect } from "react";
import HomeScreen from "./screens/menuScreens/HomeScreen/HomeScreen";

// Initialize axios interceptors
setupAxiosInterceptors();

const AppContent = () => {
  const location = useLocation();

  // Hide Sidebar on public routes only
  const hideSidebarRoutes = [
    "/",
    "/signup",
    "/account-created",
    "/verify-email",
    "/login",
    "/reset-password",
    "/reset-password:",
    "/onboarding-step2",
    "/onboarding-step3"
  ];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="App flex">
      {showSidebar && <Sidebar />}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<AuthScreen />} />
          <Route 
            path="/account-created" 
            element={
              <ProtectedRoute requireSignup={true}>
                <AccountCreated />
              </ProtectedRoute>
            } 
          />
          <Route path="/verify-email" element={<EmailConfirmed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password:" element={<EnterPassword />} />
          <Route path="/" element={<Onboarding1 />} />

          {/* Protected Routes */}
          <Route
            path="/onboarding-step2"
            element={
              <ProtectedRoute>
                <Onboarding2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding-step3"
            element={
              <ProtectedRoute>
                <Onboarding3 />
              </ProtectedRoute>
            }
          />
            <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatui"
            element={
              <ProtectedRoute>
                <ChatUI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main"
            element={
              <ProtectedRoute>
                <MainScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbound"
            element={
              <ProtectedRoute>
                <MessageInbound />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-hub"
            element={
              <ProtectedRoute>
                <div>Customer Hub Content</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/training-hub"
            element={
              <ProtectedRoute>
                <TrainingHub headerText={true} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connector"
            element={
              <ProtectedRoute>
                <Connector />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent-setting"
            element={
              <ProtectedRoute>
                <div>Agent Settings Content</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account-setting"
            element={
              <ProtectedRoute>
                <AccountSetting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emails"
            element={
              <ProtectedRoute>
                <EmailList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppContent />,
      children: [
        // Public Routes
        { path: "/signup", element: <AuthScreen /> },
        { 
          path: "/account-created", 
          element: (
            <ProtectedRoute requireSignup={true}>
              <AccountCreated />
            </ProtectedRoute>
          )
        },
        { path: "/verify-email", element: <EmailConfirmed /> },
        { path: "/login", element: <Login /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/reset-password:", element: <EnterPassword /> },
        { path: "/", element: <Onboarding1 /> },

        // Protected Routes
        {
          path: "/onboarding-step2",
          element: (
            <ProtectedRoute>
              <Onboarding2 />
            </ProtectedRoute>
          ),
        },
        {
          path: "/onboarding-step3",
          element: (
            <ProtectedRoute>
              <Onboarding3 />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: "/chatui",
          element: (
            <ProtectedRoute>
              <ChatUI />
            </ProtectedRoute>
          ),
        },
        {
          path: "/main",
          element: (
            <ProtectedRoute>
              <MainScreen />
            </ProtectedRoute>
          ),
        },
        {
          path: "/inbound",
          element: (
            <ProtectedRoute>
              <MessageInbound />
            </ProtectedRoute>
          ),
        },
        {
          path: "/customer-hub",
          element: (
            <ProtectedRoute>
              <div>Customer Hub Content</div>
            </ProtectedRoute>
          ),
        },
        {
          path: "/training-hub",
          element: (
            <ProtectedRoute>
              <TrainingHub headerText={true} />
            </ProtectedRoute>
          ),
        },
        {
          path: "/connector",
          element: (
            <ProtectedRoute>
              <Connector />
            </ProtectedRoute>
          ),
        },
        {
          path: "/agent-setting",
          element: (
            <ProtectedRoute>
              <div>Agent Settings Content</div>
            </ProtectedRoute>
          ),
        },
        {
          path: "/account-setting",
          element: (
            <ProtectedRoute>
              <AccountSetting />
            </ProtectedRoute>
          ),
        },
        {
          path: "/emails",
          element: (
            <ProtectedRoute>
              <EmailList />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const App = () => <RouterProvider router={router} />;

export default App;
