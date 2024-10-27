"use client";

import React from 'react'
import { Table } from "flowbite-react"; 

const getPriorityStyle = (priority) => {
    switch (priority) {
        case "Critical":
            return { label: 'Critical', color: 'bg-[#ff572d]'};
        case "High":
            return { label: 'High', color: 'bg-[#ff9c2c]' };
        case "Medium":
            return { label: 'Medium', color: 'bg-[#f7d025]'};
        case "Low":
            return { label: 'Low', color: 'bg-green-500' }; 
        case "Unknown":
            return { label: 'Unknown', color: 'bg-gray-500' };  
    }
};

// const handleStatusChange = async (alertId, newStatus) => {
//     try {
//       const response = await fetch('http://localhost:5000/update_alert_status', {  // Use your actual backend URL
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('access_token')}`  // Include JWT token
//         },
//         body: JSON.stringify({
//           alertId: alertId,  // Send alertId
//           status: newStatus  // Send the selected new status
//         })
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update alert status');
//       }
  
      const result = await response.json();
    //   console.log(result.message);  // Log success message
    } catch (error) {
      console.error('Error updating alert status:', error);
    }
  };
  

function AlertsLogs({alerts}) {
    
    return (
        <div className="max-h-[380px] overflow-y-auto">
        <Table className="min-w-full">
            <Table.Head className="sticky top-0">
                <Table.HeadCell className='bg-slate-200 dark:bg-gray-700'>Timestamp</Table.HeadCell>
                <Table.HeadCell className='bg-slate-200 dark:bg-gray-700'>Source IP Address</Table.HeadCell>
                <Table.HeadCell className='bg-slate-200 dark:bg-gray-700'>Destination IP Address</Table.HeadCell>
                <Table.HeadCell className='bg-slate-200 dark:bg-gray-700'>Threat Name</Table.HeadCell>
                <Table.HeadCell className='bg-slate-200 dark:bg-gray-700'>Priority</Table.HeadCell>
                <Table.HeadCell className='bg-slate-200 dark:bg-gray-700'>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {alerts.map((alert, index) => {
                    const { label, color } = getPriorityStyle(alert.priority);
                    return (
                        <Table.Row key={index} className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
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
                                value={alert.status || 'Unknown'}
                                onChange={(e) => handleStatusChange(alert.id, e.target.value)}
                                className='rounded-lg text-sm'
                                >
                                    <option value="Open">Open</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="False Positive">False Positive</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
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