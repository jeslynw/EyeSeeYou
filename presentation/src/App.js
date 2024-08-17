import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import LoginUI from "./pages/LoginUI";
import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";
import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";
import NADashboardUI from "./pages/NADashboardUI";
import Alerts from "./pages/Alerts";
import Events from "./pages/Events";
import LogInHistory from "./pages/LogInHistory";
import FeedbackPage from "./pages/Feedback";

function App() {
  return (
    <ThemeProvider>
      <Router>  
        <Routes>
          <Route path="/" element={<LoginUI />} />
          <Route element={<Layout />}>
            <Route path="/nadashboard" element={<NADashboardUI />} />
            <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
            <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/loginhistory" element={<LogInHistory />} />
            <Route path="/events" element={<Events />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Route>
        </Routes>
      </Router>   
    </ThemeProvider>  
  );
}

export default App;