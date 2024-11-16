import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AlertPageOverview from "../components/AlertsPageOverview";
import AlertsLogs from "../components/AlertsLogs";
import SearchAlerts from "../components/SearchAlerts";
import { checkIfTokenExpired } from "../App";

function NAAlerts() {
  const navigate = useNavigate();
  // redirect to login page if no access token
  if (!sessionStorage.getItem("accesstoken")) {
    navigate("/loginUI");
  }

  checkIfTokenExpired(sessionStorage.getItem("accesstoken"));

  // const access_token = sessionStorage.getItem("accesstoken");

  // if (access_token) {
  //   console.log("Access found:", access_token);
  //   axios
  //     .get("http://127.0.0.1:5000/naalerts", {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const user_id = response.data.logged_in_as;
  //         console.log(`User: ${user_id}`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user info:", error);
  //     });
  // } else {
  //   console.error("No token found. Please log in.");
  // }

  const { darkMode } = useTheme();

  // live time and date
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const showDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const showTime =
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");
      const updatedDateTime = showDate + " , " + showTime;
      setCurrentDate(updatedDateTime);
    };

    updateTime();
    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  const [alerts, setAlerts] = useState([]);
  const [alertsOverview, setAlertsOverview] = useState({
    critical: 0,
    high: 0,
    med: 0,
    low: 0,
  });

  // const breadcrumbItems = [
  //   { path: "/nadashboard", name: "Dashboard" },
  //   { path: "/naalerts", name: "Alerts" },
  // ];

  // search alerts box
  const [showSearchPopUp, setShowSearchPopUp] = useState(false);
  const toggleSearchPopUp = () => {
    setShowSearchPopUp((prevState) => !prevState);
  };

  // State to track if the user is searching
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  // For fetching search results
  const onSearchResults = (searchResults) => {
    setAlerts(searchResults);
    setSearchQuery(searchResults);
    setIsSearchActive(true); // Mark that a search is active
  };

  // useEffect(() => {
  //   const access_token = sessionStorage.getItem("accesstoken");

  //   // if (!accessToken || checkIfTokenExpired(accessToken)) {
  //   //   navigate("/loginUI");
  //   //   return;
  //   // }

  //   const eventSource = new EventSource(`http://127.0.0.1:5000/naalerts?token=${accessToken}`);

  //   // const eventSource = new EventSource('http://127.0.0.1:5000/naalerts', {
  //   //   headers: {
  //   //       'Authorization': `Bearer ${access_token}`
  //   //   }
  //   //   });

  //   if (eventSource.onopen) {
  //     console.log("sse is open");
  //   } else { console.log("error here")}

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     console.log("Received SSE Data:", data);

  //     if (data.alert_overview) {
  //       setAlertsOverview({
  //         critical: data.alert_overview.critical || 0,
  //         high: data.alert_overview.high || 0,
  //         med: data.alert_overview.med || 0,
  //         low: data.alert_overview.low || 0,
  //       });
  //     }

  //     if (data.alerts) {
  //       setAlerts(data.alerts || []);
  //     }
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE error:", error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close();
  //   };
  // }, [isSearchActive, searchQuery]); // Reopen connection if search changes

  useEffect(() => {
    const access_token = sessionStorage.getItem("accesstoken");

    const fetchData = () => {
      axios
        .get("http://127.0.0.1:5000/naalerts", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const alertsOverview = response.data.alert_overview;
            setAlertsOverview({
              critical: alertsOverview.critical || 0,
              high: alertsOverview.high || 0,
              med: alertsOverview.med || 0,
              low: alertsOverview.low || 0,
            });
            if (!isSearchActive) {
              setAlerts(response.data.recent_alerts || []);
            } else {
              setAlerts(searchQuery);
              console.log(searchQuery);
            }
          }
        });
    };
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [isSearchActive, searchQuery]);


  // console.log("alerts: ", alerts)

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />

      <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center mt-4 mb-4">
          <p className="text-2xl">ALERTS</p>
          <p className="text-base">{currentDate}</p>
        </div>
        {/* <div>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" color="primary" />}
            aria-label="breadcrumb">
            {breadcrumbItems.map((item) => (
              <Link
                className="text-[#6b7280] dark:text-[#ffffff79] text-base font-light"
                to={item.path}
                underline="hover"
                onClick={item.onClick}
                color="inherit">
                <p>{item.name}</p>
              </Link>
            ))}
          </Breadcrumbs>
        </div> */}

        <div className="py-2"></div>

        <div className="w-full">
          {/* Overall Alerts */}
          <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
            <p className="pb-5 text-sm md:text-base">Overall Alerts</p>
            <AlertPageOverview alert={alertsOverview} />
          </div>

          <div className="py-4"></div>

          <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
            <p className="pb-5 text-sm md:text-base">Threat Map</p>
            <div className="p-[300px]"></div>
          </div>

          <div className="py-4"></div>

          {/* Alerts Logs */}
          <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
            <div className="flex justify-between">
              <p className="text-sm md:text-base">Alerts Logs</p>
              <button
                onClick={toggleSearchPopUp}
                className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md">
                Search By
              </button>
            </div>

            {/* Search PopUp */}
            <SearchAlerts
              isVisible={showSearchPopUp}
              onClose={toggleSearchPopUp}
              onSearchResults={onSearchResults}
            />
            <AlertsLogs alerts={alerts} />
          </div>
        </div>

        <div className="p-10"></div>
      </div>
    </div>
  );
}

export default NAAlerts;
