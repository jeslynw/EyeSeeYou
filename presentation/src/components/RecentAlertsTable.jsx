"use client";

import React from "react";
import { Table } from "flowbite-react";

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
    case "Unknown":
      return { label: "Unknown", color: "bg-gray-500" };
  }
};

function RecentAlertsTable({ alerts }) {
  // Sort alerts by timestamp, assuming it's a valid date string.
  const sortedAlerts = alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Get the 5 most recent alerts
  const recentAlerts = sortedAlerts.slice(0, 5);

  return (
    <div className="max-h-[380px] overflow-y-auto">
      <Table className="min-w-full">
        <Table.Head className="sticky top-0">
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Start Timestamp</Table.HeadCell>
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">End Timestamp</Table.HeadCell>
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">
            Source IP Address
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">
            Destination IP Address
          </Table.HeadCell>
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Threat Name</Table.HeadCell>
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700">Priority</Table.HeadCell>
          <Table.HeadCell className="bg-slate-200 dark:bg-gray-700"></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {recentAlerts.map((alert, index) => {
            const { label, color } = getPriorityStyle(alert.priority);
            return (
              <Table.Row key={index} className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>{alert.timestamp}</Table.Cell>
                <Table.Cell>{alert.end_timestamp}</Table.Cell>
                <Table.Cell>{alert.src_addr}</Table.Cell>
                <Table.Cell>{alert.dst_addr}</Table.Cell>
                <Table.Cell>{alert.class}</Table.Cell>
                <Table.Cell>
                  <div className={`px-2 py-1 text-white rounded-md text-center ${color}`}>
                    {label}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {alert.class === "Misc activity" ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-500 font-semibold">AI DETECTED</span>
                      <span
                        className={`px-2 py-1 text-sm rounded-full font-medium ${
                          alert.prediction === "safe"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
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

export default RecentAlertsTable;
