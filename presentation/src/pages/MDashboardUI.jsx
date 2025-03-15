import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkIfTokenExpired } from "../App";

function MDashboardUI() {
    const { darkMode } = useTheme();

    // navigation button
    const navigate = useNavigate();
    const navigateTAButton = () => {
        navigate('/trendingattacks');
    }
    const navigateAlertsButton = () => {
        navigate('/malerts');
    }
    // live time and date
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const updateTime = () => {
        const date = new Date();
        const showDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const showTime = date.getHours().toString().padStart(2, '0') + ':' + 
                            date.getMinutes().toString().padStart(2, '0') + ':' + 
                            date.getSeconds().toString().padStart(2, '0');
        const updatedDateTime = showDate + ' , ' + showTime;
        setCurrentDate(updatedDateTime);

        };

        updateTime();

        const timerId = setInterval(updateTime, 1000);
        return () => clearInterval(timerId);
  }, []);

    const [error, setError] = useState(null);
    const [alertsOverview, setAlertsOverview] = useState({
        critical: 0,
        high: 0,
        med: 0,
        low: 0,
      });

    useEffect(() => {
        const access_token = sessionStorage.getItem('accesstoken');
        const userRole = sessionStorage.getItem('userrole')

        checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

        const fetchData = () => {
            axios.get('http://34.124.131.244:5000/mdashboard', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    const alertsOverview = response.data.alert_overview;
                        setAlertsOverview({
                            critical: alertsOverview.critical || 0,
                            high: alertsOverview.high || 0,
                            med: alertsOverview.med || 0,
                            low: alertsOverview.low || 0,
                        });
                } else {
                    setError('No data available');
                }
            })
            .catch(error => {
                console.error('Error fetching threat info:', error);
                setError('Error fetching data');
            });
        } 
        fetchData(); // Initial fetch
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <div className={darkMode ? 'dark' : ''}>
            <Header />  

            <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Dashboard text and current date and time */}
                <div className="flex justify-between items-center mt-4 mb-4">
                    <p className="text-2xl">DASHBOARD</p>
                    <p className="text-base">{currentDate}</p>
                </div>

                <div className="w-full">
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-5">
                        <div className="flex justify-between pb-3">
                            <p className="pb-3 text-sm md:text-base">Alerts</p>
                            <button onClick={navigateAlertsButton} className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md">
                                View All
                            </button>
                        </div>
                        {/* 1st row */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                            {/* Alerts Overview */}
                            <div className="col-span-3 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#2f3541]">
                                <p className="pb-3 text-sm text-center">Critical Severity</p>
                                <p className="pb-2 text-base md:text-xl text-center">{alertsOverview.critical}</p>
                            </div>

                            <div className="col-span-3 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#2f3541]">
                                <p className="pb-3 text-sm text-center">High Severity</p>
                                <p className="pb-2 text-base md:text-xl text-center">{alertsOverview.high}</p>
                            </div>

                            <div className="col-span-3 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#2f3541]">
                                <p className="pb-3 text-sm text-center">Medium Severity</p>
                                <p className="pb-2 text-base md:text-xl text-center">{alertsOverview.med}</p>
                            </div>

                            <div className="col-span-3 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#2f3541]">
                                <p className="pb-3 text-sm text-center">Low Severity</p>
                                <p className="pb-2 text-base md:text-xl text-center">{alertsOverview.low}</p>
                            </div>
                        </div>

                        <div className="py-2"></div>

                        {/* 4th row */}
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                            <p className="pb-3 text-sm md:text-base">Top Countries</p>
                            <div className="pb-4">
                            <iframe src="http://34.124.131.244:5601/goto/c0acbce0-a289-11ef-8421-e7ccdb026c72" height="400" width="100%"></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="py-2"></div>

                    {/* 2nd row */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                        <div className="flex justify-between pb-3">
                            <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
                        </div>
                        <iframe src="http://34.124.131.244:5601/goto/7fdf96b0-a28e-11ef-8421-e7ccdb026c72" height="400" width="100%"></iframe>
                        <div className="py-2"></div>
                        <iframe src="http://34.124.131.244:5601/goto/f6dbf240-a28e-11ef-8421-e7ccdb026c72" height="400" width="100%"></iframe>
                        </div>
                    </div>
                    
                </div>

                <div className='p-3'></div>
        
            </div>
        </div>
    );
}

export default MDashboardUI;