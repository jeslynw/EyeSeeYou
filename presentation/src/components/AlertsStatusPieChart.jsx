import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

function AlertsStatusPieChart({width}) {

  const [dataSeries, setDataSeries] = useState([0, 0, 0, 0]);

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
            const alerts = response.data.status;

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
      type: 'donut', // Change to 'donut' to make it a donut chart
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
      labels: {
        useSeriesColors: true
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%', // Adjust size of the donut hole if desired
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#FF5733',
              formatter: () => dataSeries.reduce((a, b) => a + b, 0) // Optional: display total
            }
          }
        }
      }
    },
    stroke: {
      width: 0 // Remove outline
    }
  };
  
  return (
    <div>
      <Chart options={chartOptions} series={dataSeries} type="donut" width={width} />
    </div>
  )
}

export default AlertsStatusPieChart;
