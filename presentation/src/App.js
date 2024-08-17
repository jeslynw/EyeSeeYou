// import logo from './logo.svg';
import "./App.css";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginUI from "./pages/LoginUI";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Events from "./pages/Events";
import LogInHistory from "./pages/LogInHistory";
import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";
import FeedbackPage from "./pages/Feedback";
import Sidebar from "./components/Sidebar";
import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<LoginUI />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/loginhistory" element={<LogInHistory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/viewProfile" element={<ViewAccountDetailsUI />} />
          <Route path="/editProfile" element={<UpdateAccountDetailsUI />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
