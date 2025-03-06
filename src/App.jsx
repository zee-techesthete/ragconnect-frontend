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

const AppContent = () => {
  const location = useLocation();

  // Hide Sidebar on "/", "/onboarding2", and "/onboarding3"
  const hideSidebarRoutes = [
    "/",
    "/signup",
    "/account-created",
    "/email-confirmed",
    "/login",
    "/reset-password",
    "/reset-password:",
    "/onboarding-step2",
    "/onboarding-step3",
  ];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="App flex">
      {showSidebar && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/signup" element={<AuthScreen />} />
          <Route path="/account-created" element={<AccountCreated />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password:" element={<EnterPassword />} />
          <Route path="/" element={<Onboarding1 />} />
          <Route path="/onboarding-step2" element={<Onboarding2 />} />
          <Route path="/onboarding-step3" element={<Onboarding3 />} />
          <Route path="/chatui" element={<ChatUI />} />
          <Route path="/main" element={<MainScreen />} />
          <Route path="/inbound" element={<MessageInbound />} />
          <Route
            path="/customer-hub"
            element={<div>Customer Hub Content</div>}
          />
          <Route
            path="/training-hub"
            element={<TrainingHub headerText={true} />}
          />
          <Route path="/connector" element={<Connector />} />
          <Route
            path="/agent-setting"
            element={<div>Agent Settings Content</div>}
          />
          <Route path="/emails" element={<EmailList />} />
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
        { path: "/signup", element: <AuthScreen /> },
        { path: "/account-created", element: <AccountCreated /> },
        { path: "/email-confirmed", element: <EmailConfirmed /> },
        { path: "/login", element: <Login /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/reset-password:", element: <EnterPassword /> },
        { path: "/", element: <Onboarding1 /> },
        { path: "/onboarding-step2", element: <Onboarding2 /> },
        { path: "/onboarding-step3", element: <Onboarding3 /> },
        { path: "/chatui", element: <ChatUI /> },
        { path: "/main", element: <MainScreen /> },
        { path: "/inbound", element: <MessageInbound /> },
        { path: "/customer-hub", element: <div>Customer Hub Content</div> },
        { path: "/training-hub", element: <TrainingHub headerText={true} /> },
        { path: "/connector", element: <Connector /> },
        { path: "/agent-setting", element: <div>Agent Settings Content</div> },
        { path: "/emails", element: <EmailList /> },
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
