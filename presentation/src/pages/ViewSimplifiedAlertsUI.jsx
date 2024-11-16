import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import MAlertsLogs from "../components/MAlertsLogs";
import MSearchAlerts from "../components/MSearchAlerts";
import { checkIfTokenExpired } from "../App";
import AlertsStatusPieChart from '../components/AlertsStatusPieChart';
import AlertsStatusLineChart from "../components/AlertsStatusLineChart";

function MAlerts() {
  const access_token = sessionStorage.getItem("accesstoken");
  const refresh_token = sessionStorage.getItem("refreshtoken");
  if (access_token) {
    axios
      .get("http://34.124.131.244:5000/malerts", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const user_id = response.data.logged_in_as;
        }
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  } else {
    console.error("No token found. Please log in.");
  }

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

  const breadcrumbItems = [
    { path: "/mdashboard", name: "Dashboard" },
    { path: "/malerts", name: "Alerts" },
  ];

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
      setSearchQuery(searchResults);
      setIsSearchActive(true);
      // console.log("searchQuery: ", searchQuery)
    };
  
    useEffect(() => {
      const access_token = sessionStorage.getItem("accesstoken");
  
      const fetchData = () => {
        axios
          .get("http://34.124.131.244:5000/malerts", {
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
              
              const datas = response.data.recent_alerts;
  
              // console.log("reponse data ",datas);
              // console.log("search query", searchQuery);
              
              const normalizedQuery = JSON.stringify(searchQuery);
              const normalizedResponse = JSON.stringify(response.data.recent_alerts);
  
              if (normalizedQuery == normalizedResponse){
                setAlerts(response.data.recent_alerts || []);
                setIsSearchActive(false);
              }
              else if(!isSearchActive){
                setAlerts(response.data.recent_alerts || []);
              }
              else {
                setAlerts(searchQuery);
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

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />

      <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-between items-center mt-4 mb-4">
          <p className="text-2xl">ALERTS</p>
          <p className="text-base">{currentDate}</p>
        </div>

        <div className="py-2"></div>

        <div className="w-full">
          {/* Overall Alerts */}
          <div className="grid grid-cols-1 sm:grid-cols-1">
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
              <p>Alerts Status</p>
                <div className="flex justify-center gap-36">
                  <AlertsStatusPieChart width={400}/>
                  <AlertsStatusLineChart width={400}/>
                </div>
            </div>
          </div>

          <div className="py-4"></div>

          <div className="relative border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
            <div className="flex justify-between">

            <p className="text-sm md:text-base">Alerts Logs</p>
              <button
                onClick={toggleSearchPopUp}
                className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md">
                Search By
              </button>
            </div>

            {/* Search PopUp */}
            <div className="overflow-x-auto mt-4">
              <MAlertsLogs alerts={alerts} />
            </div>

            <div className={`absolute top-16 right-6 w-full z-10 ${showSearchPopUp ? "block" : "hidden"}`}>
              <MSearchAlerts
                isVisible={showSearchPopUp}
                onClose={toggleSearchPopUp}
                onSearchResults={onSearchResults}
              />
            </div>
          </div>
        </div>
        <div className="py-52"></div>
      </div>
    </div>
  );
}

export default MAlerts;
