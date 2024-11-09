  "use client";

  import React, { useState } from "react";
  import { Table } from "flowbite-react";
  import axios from "axios";

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return { label: "Critical", color: "bg-[#ff572d]" };
      case "High":
        return { label: "High", color: "bg-[#ff9c2c]" };
      case "Medium":
        return { label: "Medium", color: "bg-[#f7d025]" };
      case "Low":
        return { label: "Low", color: "bg-green-500" };
      default:
        return { label: "Unknown", color: "bg-gray-500" };
    }
  };

  function AlertsLogs({ alerts }) {
    const [updatedAlerts, setUpdatedAlerts] = useState(null);

    const handleStatusChange = async (alertId, newStatus) => {
      const access_token = sessionStorage.getItem("accesstoken");
      const data = {
        alertId: alertId,
        status: newStatus,
      };

      try {
        const response = await axios.post("http://localhost:5000/naalerts/update_alert_status", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        });
        
        if (response.status === 200) {
          // console.log(response.data.message);
          setUpdatedAlerts((prevAlerts) =>
            (prevAlerts || alerts).map((alert) =>
              alert.id === alertId ? { ...alert, status: newStatus } : alert
            )
          );
        }
      } catch (error) {
        console.error("Error updating alert status:", error);
      }
    };

    const alertsToDisplay = updatedAlerts || alerts;
    console.log("alertsToDisplay: ", alertsToDisplay);

    return (
      <div className="max-h-[380px] overflow-y-auto">
        <Table className="min-w-full">
          <Table.Head className="sticky top-0">
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Timestamp</Table.HeadCell>
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Source IP Address</Table.HeadCell>
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Destination IP Address</Table.HeadCell>
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Threat Name</Table.HeadCell>
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Priority</Table.HeadCell>
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Status</Table.HeadCell>
            <Table.HeadCell className="bg-slate-200 dark:bg-gray-700"></Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {alertsToDisplay.map((alert) => {
              const { label, color } = getPriorityStyle(alert.priority);
              return (
                <Table.Row key={alert.id} className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{alert.timestamp}</Table.Cell>
                  <Table.Cell>{alert.src_addr}</Table.Cell>
                  <Table.Cell>{alert.dst_addr}</Table.Cell>
                  <Table.Cell>{alert.class}</Table.Cell>
                  <Table.Cell>
                    <div className={`px-2 py-1 text-white rounded-md text-center ${color}`}>
                      {label}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <select
                      value={alert.status || "Unknown"}
                      onChange={(e) => handleStatusChange(alert.id, e.target.value)}
                      className="rounded-lg text-sm">
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="False Positive">False Positive</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </Table.Cell>
                  <Table.Cell>
                    {alert.class === 'Misc activity' ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-500 font-semibold">AI DETECTED</span>
                        <span
                          className={`px-2 py-1 text-sm rounded-full font-medium ${
                            alert.prediction === 'SAFE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {alert.prediction}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">SNORT DETECTED</span>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }

  export default AlertsLogs;
