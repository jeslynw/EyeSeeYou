import React, { Component } from "react";
import Chart from "react-apexcharts";

class HardCodePieChart extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
                chart: {
                    type: 'donut'
                },
                labels: ['Low', 'Medium', 'High', 'Critical'], // Add labels for your pie chart
                plotOptions: {
                    pie: {
                        donut: {
                            size: '65%', // Adjust the size of the donut hole
                        }
                    }
                },
                colors: ['#1DFF16', '#FFF116', '#FF9916', '#FF1616'], // Customize colors
                legend: {
                    show: false // Hide legend
                },
                dataLabels: {
                    style: {
                        colors: ['#FFFFFF'] // Change color of data labels
                    }
                },
                stroke: {
                    show: false // Remove outline
                }
            },
            series: [20, 24, 10, 12] // Sample data, replace with your actual data
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
                            type="donut"
                            width="300"  // Set the width here
                            height="220" // Set the height here
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
    padding: '18px',            // Add padding to the container
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
  };

export default HardCodePieChart;