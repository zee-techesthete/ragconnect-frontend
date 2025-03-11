import { Suspense, useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import "./App.css";
import Sidebar from "./screens/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import setupAxiosInterceptors from "./utils/axiosConfig";
import AuthCallback from "./components/AuthCallback";

// Screens
import OnBoarding from "./screens/onboarding/OnBoarding";
import Onboarding1 from "./screens/onboarding/Onboarding1";
import Onboarding2 from "./screens/onboarding/Onboarding2";
import Onboarding3 from "./screens/onboarding/Onboarding3";
// import HomeScreen from "./screens/menuScreens/HomeScreen/HomeScreen";
import ChatUI from "./screens/ChatUI/ChatUI";
import MainScreen from "./screens/MainScreen";
import Login from "./screens/Login/Login";
import MessageInbound from "./screens/menuScreens/Message/MessageInbound";
import Connector from "./screens/menuScreens/Connector";
import EmailList from "./screens/Emails/EmailList";
import TrainingHub from "./screens/menuScreens/trainingHub/TrainingHub";
import AuthScreen from "./screens/Registration/AuthScreen";
import AccountCreated from "./screens/Registration/AccountCreated";
import EmailConfirmed from "./screens/Registration/EmailConfirmed";
import ResetPassword from "./screens/Login/ResetPassword";
import EnterPassword from "./screens/Login/EnterPassword";
import AccountSetting from "./screens/menuScreens/AccountSetting/AccountSetting";

// Initialize Axios interceptors
setupAxiosInterceptors();

// Public Routes
// Public Routes (redirect logged-in users to /home)
const publicRoutes = [
  {
    path: "/auth-callback",
    element: <AuthCallback />,
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoute isPublic>
        <AuthScreen />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/account-created",
  //   element: (
  //     <ProtectedRoute requireSignup>
  //       <AccountCreated />
  //     </ProtectedRoute>
  //   ),
  // },
  { path: "/account-created", element: <AccountCreated /> },
  {
    path: "/verify-email",
    element: (
      <ProtectedRoute isPublic>
        <EmailConfirmed />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute isPublic>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ProtectedRoute isPublic>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reset-password:",
    element: (
      <ProtectedRoute isPublic>
        <EnterPassword />
      </ProtectedRoute>
    ),
  },
];

// Protected Routes
const protectedRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <OnBoarding />
      </ProtectedRoute>
    ),
  },
  {
    path: "/onboarding-step1",
    element: (
      <ProtectedRoute>
        <Onboarding1 />
      </ProtectedRoute>
    ),
  },
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
  // { path: "/home", element: <ProtectedRoute><HomeScreen /></ProtectedRoute> },
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
];

// Layout Component to Manage Sidebar Visibility
const AppLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = [
    "/",
    "/signup",
    "/account-created",
    "/verify-email",
    "/login",
    "/reset-password",
    "/reset-password:",
    "/onboarding-step1",
    "/onboarding-step2",
    "/onboarding-step3",
    "/auth-callback",
  ];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="App flex">
      {showSidebar && <Sidebar />}
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

// Define the router
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [...publicRoutes, ...protectedRoutes],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

// Root App Component
const App = () => <RouterProvider router={router} />;

export default App;
