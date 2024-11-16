import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AlertNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  // console.log(notifications);

  // const socket = io("http://127.0.0.1:5000");

  useEffect(() => {
    const access_token = sessionStorage.getItem("accesstoken");

    const fetchNotifications = () => {
      if (access_token) {
        axios
          .get("http://127.0.0.1:5000/naalerts", {
            headers: {
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data.critical_alerts)
              // const isPremiumUser = sessionStorage.getItem("plan");
              const alerts = response.data.critical_alerts.map((alert) => (
              {
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
    // still wrong, supposed to have notif only when a new alert is detected instead of polling
    // fetch only priority 1,2,3
    const interval = setInterval(fetchNotifications, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   // Automatically close alerts after 5 seconds
  //   const timers = notifications.map((_, index) => {
  //     return setTimeout(() => {
  //       setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
  //     }, 5000);q
  //   });

  //   return () => timers.forEach((timer) => clearTimeout(timer)); // Cleanup timers on unmount
  // }, []);

  // useEffect(() => {
  //   socket.on("alert_notification", (alert) => {
  //     const newNotification = {
  //       // id: alert.id,
  //       message: `${alert.class} on IP address ${alert.dst_addr}`,
  //     };
  //     setNotifications((prev) => [...prev, newNotification]);
  //     setTimeout(() => {
  //       setNotifications((prev) => prev.filter((_, index) => index !== 0));
  //     }, 5000); // Close notification after 5 seconds
  //   });

  //   return () => {
  //     socket.off("alert_notification");
  //   };
  // }, []);

  const handleNotifClick = () => {
    navigate("/naalerts#alerts-logs");
  };

  const handleCloseNotifBtn = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter((alert) => alert.id !== id));

    // if (!isPremiumUser) {
    //   return null; // show notification only for premium users
    // }

    
  };

  return (
    <div className="fixed bottom-0 right-0 m-4 z-30">
      {/* Check if there are any notifications */}
      {notifications.length > 0 &&
        notifications.map((alert) => (
          <div
            key={alert.id}
            className="bg-red-600 text-white p-4 rounded-md mb-2 flex justify-between items-center relative shadow-lg"
          >
            {/* Icon indicating an error or alert */}
            <ErrorOutlineIcon className="text-white mr-3" />

            {/* Notification content */}
            <span
              onClick={() => handleNotifClick(alert.id)}
              className="cursor-pointer flex-1"
            >
              <p className="font-semibold">A new threat has been detected!</p>
              <p>{alert.message}</p>
            </span>

            {/* Close button to dismiss the notification */}
            <button
              className="absolute top-1 right-1 text-white hover:text-gray-200"
              onClick={() => handleCloseNotifBtn(alert.id)}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          </div>
        ))}
    </div>
    );
};

export default AlertNotification;


{/* <div className="fixed bottom-0 right-0 m-4 z-30">
        {notifications.length > 0 &&
          notifications.map((alert) => (
            <div
              key={alert.id}
              className="bg-red-600 text-white p-4 rounded-md mb-2 flex justify-between items-center relative">
              <ErrorOutlineIcon className="text-white mr-3 relative" />
              <button
                className="absolute top-1 right-1 text-white"
                onClick={() => handleCloseNotifBtn(alert.id)}>
                <CloseIcon className="text-white" />
              </button>
              <span onClick={() => handleNotifClick()} className="cursor-pointer">
                <p className="font-semibold">A new threat has been detected!</p>
                <p>{alert.message}</p>
              </span>
            </div>
          ))}
      </div> */}