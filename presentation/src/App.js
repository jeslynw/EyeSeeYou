import "./App.css";
import "../src/styles/main.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./components/ThemeProvider";
import LoginUI from "./pages/LoginUI";
import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";
import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Events from "./pages/Events";
import LogInHistory from "./pages/LogInHistory";
import Profile from "./pages/Profile";
import FeedbackPage from "./pages/Feedback";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<LoginUI />} /> 
            <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
            <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>  
  );
}

export default App;

