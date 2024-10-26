import React, { Component } from "react";
import Chart from "react-apexcharts";

function TrendingAttacks({ trendAttackCategory, trendAttackData, width, height }) {
  const options = {
      chart: {
          type: 'bar',
          height: 350,
          toolbar: {
              show: false  // Disable the hamburger menu
          }
      },
      plotOptions: {
          bar: {
              borderRadius: 4,
              borderRadiusApplication: 'end',
              horizontal: true,
          }
      },
      dataLabels: {
          enabled: false
      },
      xaxis: {
          categories: trendAttackCategory, 
          labels: {
            style: {
              colors: '#ffffff',
              fontSize: '12px',
            },
          },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#ffffff', // Customize the y-axis label colors
            fontSize: '12px', // Customize the font size
          },
        },
      },
      tooltip: {
        enabled: true,
        theme: 'dark', // Can be 'dark', 'light', or 'custom'
        style: {
          fontSize: '12px',
          fontFamily: undefined, // Set a custom font if needed
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined,
        },
        y: {
          formatter: function (value) {
            return value + " detected"; // Customize the label
          },
          title: {
            formatter: () => '', // Return an empty string to hide the series name
          },
        },
        marker: {
          show: true,
        },
        items: {
          display: 'flex',
        },
        fixed: {
          enabled: false,
          position: 'topRight', // Can be 'topRight' or 'topLeft'
          offsetX: 0,
          offsetY: 0,
        },
        background: '#333', // Custom background color
        borderRadius: 8, // Border radius for rounded corners
        borderWidth: 0, // Set border width
        shadow: {
          enabled: true,
          color: '#000',
          blur: 10,
          opacity: 0.2,
        },
      },
  };

  return (
      <div id="chart">
          <Chart
              options={options}
              series={trendAttackData}
              type="bar"
              width={width}
              height={height}
          />
      </div>
  );
}
export default TrendingAttacks;