import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AlertNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = sessionStorage.getItem("accesstoken");

    const fetchNotifications = () => {
      if (access_token) {
        axios
          .get("http://34.124.131.244:5000/naalerts", {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              const alerts = response.data.critical_alerts.map((alert) => ({
                id: 1,
                message: `${alert.class} on IP address ${alert.src_addr}`,
              }));
              setNotifications(alerts.slice(0, 3)); // Keep only the 3 newest alerts
            }
          })
          .catch((error) => {
            console.error("Error fetching alerts:", error);
          });
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleNotifClick = () => {
    navigate("/naalerts#alerts-logs");
  };

  const handleCloseNotifBtn = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((alert) => alert.id !== id));
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 z-30">
      {notifications.length > 0 &&
        notifications.map((alert) => (
          <div
            key={alert.id}
            className="bg-red-600 text-white p-4 rounded-md mb-2 flex justify-between items-center relative shadow-lg">
            <ErrorOutlineIcon className="text-white mr-3" />

            <span onClick={() => handleNotifClick(alert.id)} className="cursor-pointer flex-1">
              <p className="font-semibold">A new threat has been detected!</p>
              <p>{alert.message}</p>
            </span>

            <button
              className="absolute top-1 right-1 text-white hover:text-gray-200"
              onClick={() => handleCloseNotifBtn(alert.id)}
              aria-label="Close notification">
              <CloseIcon />
            </button>
          </div>
        ))}
    </div>
  );
};

export default AlertNotification;
