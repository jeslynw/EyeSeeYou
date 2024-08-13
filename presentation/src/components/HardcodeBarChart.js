import React, { Component } from "react";
import Chart from "react-apexcharts";

class HardcodeBarChart extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: ['Low', 'Medium', 'High', 'Critical'],
          labels: {
            style: {
              colors: '#ffffff', // Customize the x-axis label colors
              fontSize: '12px', // Customize the font size
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
        grid: {
          show: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 7, // Rounded corners for bars
            horizontal: false, // Change to true if you want horizontal bars
          },
        },
        dataLabels: {
          enabled: false,
        },
        // title: {
        //   text: 'Vulnerability Severity Levels', // Chart title
        //   align: 'center',
        //   margin: 20,
        //   offsetY: 20,
        //   style: {
        //     fontSize: '20px',
        //     color: '#333'
        //   }
        // },
      // },
      
        states: {
          hover: {
            filter: {
              type: 'darken', // Can be 'darken', 'lighten', or 'none'
              value: 0.15, // Degree of hover effect
            },
            // Customizing the hover color
            color: '#f10000', // Change the hover color to a specific one
            enabled: true, // Enables hover state customization
          },
          active: {
            allowMultipleDataPointsSelection: false,
            filter: {
              type: 'darken',
              value: 0.35,
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
              return value + " Vulnerabilities"; // Customize the label
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
      },

      series: [
        {
          // name: "series-1",
          data: [20, 24, 10, 12]
        } 
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart" style={chartContainerStyle}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="320"  // Set the width here
              height="180" // Set the height here
            />
          </div>
        </div>
      </div>
    );
  }
}

// Custom CSS styling
const chartContainerStyle = {
  backgroundColor: '#272929', // Match the chart's background color
  borderRadius: '10px',       // Apply rounded corners
  padding: '10px',            // Add padding to the container
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
};

export default HardcodeBarChart;