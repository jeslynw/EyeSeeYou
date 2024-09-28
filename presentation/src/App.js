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
// import NAEvents from "./pages/ViewDetailedEventsUI";
import NALogInHistory from "./pages/ViewLoginHistoryUI";
import FeedbackPage from "./pages/FeedbackUI";
import TrendingAttacksUI from "./pages/ViewTrendingAttacksUI";
import BasicPlanDisabling from "./components/BasicPlanDisabling";

// management
import MLayout from "./components/MLayout";
import MDashboardUI from "./pages/MDashboardUI";
import MAlerts from "./pages/ViewSimplifiedAlertsUI";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const userRole = localStorage.getItem("userrole"); // Or get from React Context/Redux

  console.log("userRole: ", userRole); // Debugging log

  if (userRole == 1) {
    return (
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            <Route
              element={
                <ProtectedRoute allowedRoles={["1"]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/nadashboard" element={<NADashboardUI />} />
              <Route
                path="/viewaccountdetails"
                element={<ViewAccountDetailsUI />}
              />
              <Route
                path="/updateaccountdetails"
                element={<UpdateAccountDetailsUI />}
              />
              <Route
                path="/naalerts"
                element={
                  <BasicPlanDisabling>
                    <NAAlerts />
                  </BasicPlanDisabling>
                }
              />
              <Route
                path="/naloginhistory"
                element={
                  <BasicPlanDisabling>
                    <NALogInHistory />
                  </BasicPlanDisabling>
                }
              />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/trendingattacks" element={<TrendingAttacksUI />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    );
  } else if (userRole == 2) {
    return (
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            <Route
              element={
                <ProtectedRoute allowedRoles={["2"]}>
                  <MLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/mdashboard" element={<MDashboardUI />} />
              <Route path="/malerts" element={<MAlerts />} />
              <Route
                path="/viewaccountdetails"
                element={<ViewAccountDetailsUI />}
              />
              <Route
                path="/updateaccountdetails"
                element={<UpdateAccountDetailsUI />}
              />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/trendingattacks" element={<TrendingAttacksUI />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    );
  }

  console.log("userRole is not set, redirecting to loginUI");
  return (
    <div>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            {/* then system will check for user role here and redirect to appropriate page */}
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
