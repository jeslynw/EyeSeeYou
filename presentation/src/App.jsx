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
import NALogInHistory from "./pages/ViewLoginHistoryUI";
import FeedbackPage from "./pages/FeedbackUI";
import TrendingAttacksUI from "./pages/ViewTrendingAttacksUI";
import BasicPlanDisabling from "./components/BasicPlanDisabling";

// import SimulateAlert from "./components/SimulateAlert";
import { Toaster } from 'react-hot-toast';
import { AlertNotificationProvider } from "./components/AlertNotificationContext";

// management
import MLayout from "./components/MLayout";
import MDashboardUI from "./pages/MDashboardUI";
import MAlerts from "./pages/ViewSimplifiedAlertsUI";

import ProtectedRoute from "./components/ProtectedRoute";

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import GeneratePDF from "./pages/GeneratePDF";


// backup
// function App() {
//   return (
//     <ThemeProvider>
//       {/* <Router>   */}
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/loginUI" element={<LoginUI />} />
//           <Route element={<Layout />}>
//             <Route path="/nadashboard" element={<NADashboardUI />} />
//             <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
//             <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
//             <Route path="/naalerts" element={<NAAlerts />} />
//             <Route path="/naloginhistory" element={<NALogInHistory />} />
//             {/* <Route path="/naevents" element={<NAEvents />} /> */}
//             <Route path="/feedback" element={<FeedbackPage />} />
//             <Route path="/trendingattacks" element={<TrendingAttacksUI />} />
//           </Route>
//         </Routes>
//       {/* </Router>    */}
//     </ThemeProvider>  
//   );
// }


function App() {
  const userRole = sessionStorage.getItem("userrole");

  // console.log("userRole: ", userRole); // Debugging log

  const nav = useNavigate();
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        // if (error.response.status !== 403 && error.response.status !== 405) {
        //   return Promise.reject(error);
        // }

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

  if (userRole === "1") {
    return (
      <ThemeProvider>
        <AlertNotificationProvider>
          <div className="text-center">
            {/* <SimulateAlert/> */}
          </div>
          <Toaster />
          {/* <Router> */}
            <Routes>
              {/* <Route path="/Simulate" element={<SimulateAlert />} /> */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/loginUI" element={<LoginUI />} />
              {/* <Route path="/pdf" element={<PDF />} /> */}
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
          {/* </Router> */}
        </AlertNotificationProvider>
      </ThemeProvider>
    );
  } else if (userRole === "2") {
    return (
      <ThemeProvider>
        <AlertNotificationProvider>
          {/* <SimulateAlert/> */}
          <Toaster />
          {/* <Router> */}
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
                <Route path="/summarisedpdf" element={<GeneratePDF />} />
              </Route>
            </Routes>
          {/* </Router> */}
        </AlertNotificationProvider>
      </ThemeProvider>
    );
  }

  return (
    <div>
      <ThemeProvider>
        {/* <Router> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            {/* then system will check for user role here and redirect to appropriate page */}
          </Routes>
        {/* </Router> */}
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

// Function to use the refresh token to get tokens
export async function RefreshToken() {
  try {
    const refresh_token = sessionStorage.getItem("refreshtoken");

    const response = await axios.post("http://127.0.0.1:5000/refresh", {},{
      headers: {
        'Authorization': `Bearer ${refresh_token}`
      }
    });

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