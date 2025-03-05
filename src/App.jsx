import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
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
  const location = useLocation(); // Get current route

  // Hide Sidebar on "/", "/onboarding2", and "/onboarding3"
  const hideSidebarRoutes = ["/", "/signup","/account-created","/email-confirmed",  "/login",  "/reset-password", "/reset-password:", "/onboarding-step2", "/onboarding-step3"];
  const showSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="App flex">
      {/* ✅ Conditionally render Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content Area */}
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


const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
