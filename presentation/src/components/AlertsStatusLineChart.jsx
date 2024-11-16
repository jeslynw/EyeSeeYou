import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function AlertsDynamicLineChart({ width = "100%", height = 400 }) {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const access_token = sessionStorage.getItem("accesstoken");

    const fetchData = () => {
      axios
        .get("http://34.124.131.244:5000/naalerts", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const alerts = response.data.recent_alerts;

            // Process alerts into grouped data by timestamp
            const groupedData = {};
            alerts.forEach((alert) => {
              const timestamp = new Date(alert.timestamp).toLocaleTimeString(); // Use time for simplicity
              if (!groupedData[timestamp]) {
                groupedData[timestamp] = { Open: 0, Resolved: 0, 'In Progress': 0, 'False Positive': 0 };
              }
              if (groupedData[timestamp][alert.status] !== undefined) {
                groupedData[timestamp][alert.status]++;
              }
            });

            const sortedTimestamps = Object.keys(groupedData).sort();
            const statuses = ['Open', 'Resolved', 'In Progress', 'False Positive'];

            // Create data series for chart
            const newSeries = statuses.map((status) => ({
              name: status,
              data: sortedTimestamps.map((time) => groupedData[time][status] || 0),
            }));

            setCategories(sortedTimestamps);
            setSeries(newSeries);
          }
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    xaxis: {
      categories: categories,
      title: {
        text: 'Time',
      },
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Alert Count',
      },
      labels: {
        style: {
          colors: '#B0B0B0', // Customize the y-axis label colors
          fontSize: '12px', // Customize the font size
        },
      },
      
      min: 0,
    },
    stroke: {
      curve: 'smooth',
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      labels: {
        colors: '#B0B0B0', // Set legend text color to black
      },
      onItemClick: {
        toggleDataSeries: true,
      },
    },
    markers: {
      size: 4,
    },
    colors: ['#FF5733', '#33FF57', '#3357FF', '#FFC300'], // Dynamic color palette
    tooltip: {
      shared: true,
      intersect: false,
      followCursor: true,
      theme: 'dark', 
    },
    grid: {
      borderColor: '#e0e0e0',
      strokeDashArray: 5,
    },
  };

  return (
    <div>
      <Chart options={chartOptions} series={series} type="line" width={width} />
    </div>
  );
}

export default AlertsDynamicLineChart;
