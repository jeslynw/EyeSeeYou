import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import LoginUI from "./pages/LoginUI";
import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";
import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";
import NADashboardUI from "./pages/NADashboardUI";
import NAAlerts from "./pages/ViewDetailedAlertsUI";
import NAEvents from "./pages/ViewDetailedEventsUI";
import NALogInHistory from "./pages/ViewLoginHistoryUI";
import FeedbackPage from "./pages/FeedbackUI";
import TrendingAttacksUI from "./pages/ViewTrendingAttacksUI";

function App() {
  return (
    <ThemeProvider>
      <Router>  
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginUI" element={<LoginUI />} />
          <Route element={<Layout />}>
            <Route path="/nadashboard" element={<NADashboardUI />} />
            <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
            <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
            <Route path="/naalerts" element={<NAAlerts />} />
            <Route path="/naloginhistory" element={<NALogInHistory />} />
            <Route path="/naevents" element={<NAEvents />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/trendingattacks" element={<TrendingAttacksUI />} />
          </Route>
        </Routes>
      </Router>   
    </ThemeProvider>  
  );
}

export default App;