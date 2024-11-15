import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function AlertsStatusPieChart() {
  const [dataSeries, setDataSeries] = useState([0, 0, 0, 0]);

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
            const alerts = response.data.recent_alerts;

            // Count alerts by status
            const statusCounts = { 'Open': 0, 'Resolved': 0, 'In Progress': 0, 'False Positive': 0 };
            alerts.map(alert => {
              if (statusCounts.hasOwnProperty(alert.status)) {
                statusCounts[alert.status]++;
              }
            });
    
            // Update data series for the chart
            setDataSeries([
              statusCounts['Open'],
              statusCounts['Resolved'],
              statusCounts['In Progress'],
              statusCounts['False Positive']
            ]);
          }
        });
    };
    fetchData(); // Initial fetch

    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      type: 'pie',
      height: 569,
      dropShadow: { enabled: true },
      toolbar: { show: false }
    },
    labels: ['Open', 'Resolved', 'In Progress', 'False Positive'],
    legend: {
      position: 'right',
      fontSize: 13,
      markers: { size: 7 },
      itemMargin: { horizontal: 6, vertical: 7 },
      
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            total: { show: true }
          }
        }
      }
    }
  };

  return (
    <div>
      <Chart options={chartOptions} series={dataSeries} type="pie" width="553" />
    </div>
  );
}

export default AlertsStatusPieChart;
