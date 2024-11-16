  import "./App.css";
  import { useState, useEffect } from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { ThemeProvider } from "./components/ThemeProvider";
  import Layout from "./components/Layout";
  import LandingPage from "./pages/LandingPage";
  import LoginUI from "./pages/LoginUI";
  import UpdateAccountDetailsUI from "./pages/UpdateAccountDetailsUI";
  import ViewAccountDetailsUI from "./pages/ViewAccountDetailsUI";
  import NADashboardUI from "./pages/NADashboardUI";
  import NAAlerts from "./pages/ViewDetailedAlertsUI";
  import NALogInHistory from "./pages/ViewLoginHistoryUI";
  import FeedbackPage from "./pages/FeedbackUI";
  import TrendingAttacksUI from "./pages/ViewTrendingAttacksUI";
  import BasicPlanDisabling from "./components/BasicPlanDisabling";
  import Geolocation from "./components/Geolocation";
  import AlertNotification from "./components/AlertNotification";

  import MLayout from "./components/MLayout";
  import MDashboardUI from "./pages/MDashboardUI";
  import MAlerts from "./pages/ViewSimplifiedAlertsUI";
  import GeneratePDF from "./pages/GeneratePDF";
  import ProtectedRoute from "./components/ProtectedRoute";

  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  import { jwtDecode } from "jwt-decode";

  // Notification Component
  const Notification = ({ notifications, onClose }) => (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification">
          <p>{notification.message}</p>
          <button onClick={() => onClose(notification.id)}>Close</button>
        </div>
      ))}
    </div>
  );

  function App() {
    const userRole = sessionStorage.getItem("userrole");
    const nav = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      const interceptor = axios.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (!error.response) {
            return Promise.reject(error);
          }

          const status = error.response.status;
          if (status !== 403 && status !== 401) {
            return Promise.reject(error);
          }

          const originalRequest = error.config;

          if (!originalRequest._retry) {
            originalRequest._retry = true;
            try {
              const access_token = await RefreshToken();
              originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
              return axios.request(originalRequest);
            } catch (error) {
              sessionStorage.clear();
              nav("/loginUI");
              return Promise.reject(error);
            }
          }
        }
      );
      return () => {
        axios.interceptors.response.eject(interceptor);
      };
    }, [nav]);

    const handleCloseNotification = (id) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((alert) => alert.id !== id)
      );
    };

    if (userRole === "1") {
      return (
        <ThemeProvider>
          <div className="text-center"></div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            <Route
              element={
                <ProtectedRoute allowedRoles={["1"]}>
                  <Layout />
                  <AlertNotification/>
                </ProtectedRoute>
              }
            >
              <Route path="/nadashboard" element={<NADashboardUI />} />
              <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
              <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
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
              <Route
                path="/trendingattacks"
                element={
                  <BasicPlanDisabling>
                    <TrendingAttacksUI />
                  </BasicPlanDisabling>
                }
              />
            </Route>
          </Routes>
          <Notification notifications={notifications} onClose={handleCloseNotification} />
        </ThemeProvider>
      );
    } else if (userRole === "2") {
      return (
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            <Route
              element={
                <ProtectedRoute allowedRoles={["2"]}>
                  <MLayout />
                  <AlertNotification/>
                </ProtectedRoute>
              }
            >
              <Route path="/mdashboard" element={<MDashboardUI />} />
              <Route path="/malerts" element={<MAlerts />} />
              <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
              <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/trendingattacks" element={<TrendingAttacksUI />} />
              <Route path="/summarisedpdf" element={<GeneratePDF />} />
            </Route>
          </Routes>
          <Notification notifications={notifications} onClose={handleCloseNotification} />
        </ThemeProvider>
      );
    }

    return (
      <div>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            <Route path="/geo" element={<Geolocation />} />
          </Routes>
          <Notification notifications={notifications} onClose={handleCloseNotification} />
        </ThemeProvider>
      </div>
    );
  }

  export const checkIfTokenExpired = (token) => {
    if (!token) return true; // No token is available
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  export async function RefreshToken() {
    try {
      const refresh_token = sessionStorage.getItem("refreshtoken");

      const response = await axios.post(
        "http://34.124.131.244:5000/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        }
      );

      const new_access_token = response.data.accesstoken;
      const new_refresh_token = response.data.refreshtoken;

      sessionStorage.removeItem("accesstoken");
      sessionStorage.removeItem("refreshtoken");

      sessionStorage.setItem("accesstoken", new_access_token);
      sessionStorage.setItem("refreshtoken", new_refresh_token);

      return new_access_token;
    } catch (error) {
      console.error(error);
    }
  }

  export default App;
