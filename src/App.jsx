import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Onboarding1 from "./screens/onboarding/Onboarding1";
import Onboarding2 from "./screens/onboarding/Onboarding2";
import Onboarding3 from "./screens/onboarding/Onboarding3";
import ChatUI from "./screens/ChatUI/ChatUI";
import MainScreen from "./screens/MainScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />
          <Route path="/chatui" element={<ChatUI />} />
          <Route path="/main" element={<MainScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
