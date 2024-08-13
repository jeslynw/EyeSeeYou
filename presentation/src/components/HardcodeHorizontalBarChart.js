import React, { Component } from "react";
import Chart from "react-apexcharts";

class HardcodeHorizontalBarChart extends Component  {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'bar',
                    height: 350,
                    background: '#272929', // Set the background color here
                    borderRadius: 20,
                    responsive: true,
                },
                xaxis: {
                    categories: ['DDoS', 'Malware', 'Scanning', 'SQL Injection', 'Brute Force Attacks', 'XSS'],
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
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false,
                },
            },
            series: [{
                data: [250, 186, 125, 56, 33, 7],
            }],
        };
    }

    render (){
        return (
            <div className="app">
                <div className="row">
                    <div className="bar" style={chartContainerStyle}>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="bar" // Changed to 'bar' to match the chart type
                            width="320"  // Set the width here
                            height="200" // Set the height here
                        />
                    </div>
                </div>
            </div>
          )
    }
}

// Custom CSS styling
const chartContainerStyle = {
    backgroundColor: '#272929', // Match the chart's background color
    borderRadius: '10px',       // Apply rounded corners
    padding: '10px',            // Add padding to the container
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
};

export default HardcodeHorizontalBarChart