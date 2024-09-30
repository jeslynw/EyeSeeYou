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

import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

    return (
      <ThemeProvider>
        {/* <Router>   */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/loginUI" element={<LoginUI />} />
            <Route element={<Layout />}>
              <Route path="/nadashboard" element={<NADashboardUI />} />
              <Route path="/viewaccountdetails" element={<ViewAccountDetailsUI />} />
              <Route path="/updateaccountdetails" element={<UpdateAccountDetailsUI />} />
              <Route path="/naalerts" element={<NAAlerts />} />
              <Route path="/naloginhistory" element={<NALogInHistory />} />
              {/* <Route path="/naevents" element={<NAEvents />} /> */}
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/trendingattacks" element={<TrendingAttacksUI />} />
            </Route>
          </Routes>
        {/* </Router>    */}
      </ThemeProvider>  
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