import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecentAlertsTable from "../components/RecentAlertsTable";
import AlertOverview from "../components/AlertsOverview";
import { checkIfTokenExpired } from "../App";

function NADashboardUI() {
  const { darkMode } = useTheme();

  // navigation button
  const navigate = useNavigate();
  // const navigateTAButton = () => {
  //   navigate("/trendingattacks");
  // };
  const navigateAlertsButton = () => {
    navigate("/naalerts");
  };
  // live time and date
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const showDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
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

  const [error, setError] = useState(null);

  const [alerts, setAlerts] = useState([]);
  const [src_mapIframe, setSrcMapIframe] = useState('');
  const [dst_mapIframe, setDstMapIframe] = useState('');
  const [alertsOverview, setAlertsOverview] = useState({
    critical: 0,
    high: 0,
    med: 0,
    low: 0,
  });

  useEffect(() => {
    // redirect to login page if no access token
    if (!sessionStorage.getItem('accesstoken')) {
        navigate('/loginUI');
    }

    checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

    const fetchAlertsData = async () => {
        const access_token = sessionStorage.getItem('accesstoken');

        axios.get('http://34.124.131.244:5000/nadashboard', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                // Set alerts and overview
                setAlerts(response.data.recent_alerts || []);
                const alertsOverview = response.data.alert_overview;
                setAlertsOverview({
                    critical: alertsOverview.critical || 0,
                    high: alertsOverview.high || 0,
                    med: alertsOverview.med || 0,
                    low: alertsOverview.low || 0,
                });
            } else {
                setError("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching alert info:", error);
            setError("Error fetching data");
        });
    };

    const fetchMapIframe = async () => {
        const access_token = sessionStorage.getItem('accesstoken');

        axios.get('http://34.124.131.244:5000/nadashboard', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
              setSrcMapIframe(response.data.src_map);
              setDstMapIframe(response.data.dst_map);
            } else {
                setError("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching map info:", error);
            setError("Error fetching map");
        });
    };

    // Fetch alerts data every 5 seconds
    fetchAlertsData();
    const alertsInterval = setInterval(fetchAlertsData, 5000);

    // Fetch map iframe every 60 seconds
    fetchMapIframe();
    const mapInterval = setInterval(fetchMapIframe, 300000);

    return () => {
        clearInterval(alertsInterval);
        clearInterval(mapInterval);
    };
}, []);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Header />

      <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Dashboard text and current date and time */}
        <div className="flex justify-between items-center mt-4 mb-4">
          <p className="text-2xl">DASHBOARD</p>
          <p className="text-base">{currentDate}</p>
        </div>

        <div className="w-full">
          <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-5">
            <div className="flex justify-between pb-3">
              <p className="pb-3 text-sm md:text-base">Alerts</p>
              <button
                onClick={navigateAlertsButton}
                className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Alerts Overview */}
              <div className="col-span-4 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#252628]">
                <p className="pb-5 text-sm md:text-base">Alerts Overview</p>
                <AlertOverview alert={alertsOverview} />
              </div>

              <div className="col-span-8 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#252628] w-full">
                <p className="pb-5 text-sm md:text-base">Alerts Over Time</p>
                <iframe src="http://34.124.131.244:5601/goto/4ac58cc0-a287-11ef-8421-e7ccdb026c72" height="400" width="100%"></iframe>
              </div>
            </div>

            <div className="py-2"></div>

            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#252628]">
              <p className="pb-3 text-sm md:text-base">Recent Alerts</p>
              <div className="h-96">
                <RecentAlertsTable alerts={alerts} />
              </div>
            </div>
          </div>

          <div className="py-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <div className="flex justify-between">
                <p className="pb-5 text-sm md:text-base">Top Threat Sources</p>
              </div>
              <div className="pb-4">
              <iframe src="http://34.124.131.244:5601/goto/004396e0-a28e-11ef-8421-e7ccdb026c72" height="300" width="100%"></iframe>
              </div>
            </div>

            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <p className="pb-5 text-sm md:text-base">
                Top Threat Destination
              </p>
              <div className="pb-4">
              <iframe src="http://34.124.131.244:5601/goto/69563d90-a28e-11ef-8421-e7ccdb026c72" height="300" width="100%"></iframe>
              </div>
            </div>
          </div>

          <div className="py-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-1">
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <p>Geolocation</p>
              <div className="grid pb-3 grid-cols-2">
                <div>
                  <p className="pb-3 text-sm md:text-base">Source</p>
                  <div dangerouslySetInnerHTML={{ __html: src_mapIframe }}></div>
                </div>
                <div>
                  <p className="pb-3 text-sm md:text-base">Destination</p>
                  <div className="map-container" dangerouslySetInnerHTML={{ __html: dst_mapIframe }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <div className="flex justify-between pb-3">
                <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
              </div>
              <iframe src="http://34.124.131.244:5601/goto/7fdf96b0-a28e-11ef-8421-e7ccdb026c72" height="400" width="100%"></iframe>
              <div className="py-2"></div>
              <iframe src="http://34.124.131.244:5601/goto/f6dbf240-a28e-11ef-8421-e7ccdb026c72" height="400" width="100%"></iframe>
            </div>
          </div>
        </div>
        <div className='p-10'></div>

      </div>
    </div>
  );
}

export default NADashboardUI;