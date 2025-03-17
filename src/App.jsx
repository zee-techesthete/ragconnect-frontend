import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthScreen from "./screens/Registration/AuthScreen";
import Login from "./screens/Login/Login";
import ResetPassword from "./screens/Login/ResetPassword";
import EnterPassword from "./screens/Login/EnterPassword";
import AuthCallback from "./components/AuthCallback";
import AccountCreated from "./screens/Registration/AccountCreated";

import "./App.css";
import Sidebar from "./screens/Sidebar";
import setupAxiosInterceptors from "./utils/axiosConfig";
import EmailList from "./screens/Emails/EmailList";
import TrainingHub from "./screens/menuScreens/trainingHub/TrainingHub";
import AccountSetting from "./screens/menuScreens/AccountSetting/AccountSetting";
import CustomerHub from "./screens/menuScreens/CustomerHub/CustomerHub";
import HomeScreen from "./screens/menuScreens/HomeScreen/HomeScreen";
import ChatUI from "./screens/ChatUI/ChatUI";
import MainScreen from "./screens/MainScreen";
import MessageInbound from "./screens/menuScreens/Message/MessageInbound";
import Connector from "./screens/menuScreens/Connector";

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
    path: "/reset-password",
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute isPublic>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "reset",
        element: (
          <ProtectedRoute isPublic>
            <EnterPassword />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

// Protected Routes
const protectedRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AuthScreen />
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
        <CustomerHub />
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
    "/login",
    "/reset-password",
    "/reset-password/reset",
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
