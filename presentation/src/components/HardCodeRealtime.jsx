import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const HardCodeRealtime = () => {
  const XAXISRANGE = 777600000; // 9 days in milliseconds
  const [data, setData] = useState([]);
  const [lastDate, setLastDate] = useState(new Date().getTime());

  const getNewSeries = (baseval, yrange) => {
    const newDate = baseval + 86400000; // Add one day
    const newData = {
      x: newDate,
      y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    };
    setLastDate(newDate);
    return [...data, newData].slice(-20); // Keep only last 20 points
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => getNewSeries(lastDate, { min: 10, max: 90 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastDate]);

  const options = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      type: 'datetime',
      range: XAXISRANGE,
      labels: {
        style: {
          colors: '#ffffff', // Customize the x-axis label colors
          fontSize: '12px', // Customize the font size
        },
      },
    },
    yaxis: {
      max: 100,
      labels: {
        style: {
          colors: '#ffffff', // Customize the y-axis label colors
          fontSize: '12px', // Customize the font size
        },
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: ''
    },
    markers: {
      size: 0
    },
    legend: {
      show: false
    },
  };

  const series = [{
    data: data
  }];

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="line" height={200} width={300} style={chartContainerStyle}/>
    </div>
  );
};

// Custom CSS styling
const chartContainerStyle = {
  backgroundColor: '#272929', // Match the chart's background color
  borderRadius: '10px',       // Apply rounded corners
  padding: '18px',            // Add padding to the container
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
};

export default HardCodeRealtime;