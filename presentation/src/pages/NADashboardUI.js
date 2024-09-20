import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopThreatSrc from "../components/TopThreatSrc";
import TopThreatDest from "../components/TopThreatDest";
import TrendingAttacks from "../components/TrendingAttacks";
import RecentAlertsTable from "../components/RecentAlertsTable";
import AlertOverview from "../components/AlertsOverview";

// import check_token from "../auth.js";

// import Sidebar from "../components/Sidebar";

const getPriorityLabel = (priority) => {
    switch (priority) {
        case 1:
            return 'Critical';
        case 2:
            return 'High';
        case 3:
            return 'Medium';
        case 4:
            return 'Low';
        default:
            return 'Unknown';
    }
};

function NADashboardUI() {
    const { darkMode } = useTheme();

    // navigation button
    const navigate = useNavigate();
    const navigateTAButton = () => {
        navigate('/trendingattacks');
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


    // getting the top threat sources and destination ip address
    const [threatSrc, setThreatSrc] = useState([]);
    const [threatDest, setThreatDest] = useState([]);
    const [error, setError] = useState(null);
    const [trendAttackCategory, setTrendAttackCategory] = useState([]);
    const [trendAttackData, setTrendAttackData] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [alertsOverview, setAlertsOverview] = useState({
        critical: 0,
        high: 0,
        med: 0,
        low: 0,
      });

    // console.log("trendAttackCategory:", trendAttackCategory);
    // console.log("trendAttackData:", trendAttackData);
    // console.log(threatSrc)
    // console.log(threatDest)
    // console.log("alerts:", alerts)
    // console.log(response.data.recent_alerts);
    console.log(alertsOverview)

    useEffect(() => {
        const access_token = sessionStorage.getItem('accesstoken');

        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/nadashboard', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    //  trending attacks data
                    const alertClasses = response.data.trending_attacks.map(alert => alert.class);
                    const classCounts = response.data.trending_attacks.map(alert => alert.count);
                    const sortedData = alertClasses.map((c, i) => ({ class: c, count: classCounts[i] })).sort((a, b) => b.count - a.count);
                    const sortedCategories = sortedData.map(d => d.class);
                    const sortedSeriesData = sortedData.map(d => d.count);
                    setTrendAttackCategory(sortedCategories);
                    setTrendAttackData([{ data: sortedSeriesData }]);

                    // top threat src and dest ip address
                    setThreatSrc(response.data.top_threat_src || []);
                    setThreatDest(response.data.top_threat_dest || []);
                    
                    setAlerts(response.data.recent_alerts || []); 

                    // recent alerts
                    const alertsOverview = response.data.alert_overview;
                        console.log('Alert Overview:', alertsOverview);
                        setAlertsOverview({
                            critical: alertsOverview.critical || 0,
                            high: alertsOverview.high || 0,
                            med: alertsOverview.med || 0,
                            low: alertsOverview.low || 0,
                        });
                } else {
                    setError('No data available');
                }

                const temp = response.data.alert_classes;
                console.log("Alert classes:", temp);
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
                    {/* 1st row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {/* Alerts Overview */}
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Alerts Overview</p>
                            <AlertOverview alert={alertsOverview}/>
                        </div>


                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="text-sm md:text-base">Alerts Over Time</p>
                            <iframe src="http://localhost:5601/app/dashboards#/view/192995c0-740c-11ef-b531-93a452c5fb45?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A20000)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&hide-filter-bar=true" className="border-0 rounded-xl" height="420" width="360" frameborder="0" scrolling="no"></iframe>
                        </div>
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="text-sm md:text-base">Alerts</p>
                        </div>
                    </div>

                    <div className="py-2"></div>

                    {/* 2nd row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Event Status Pie Chart</p>
                            <div className="h-56">

                            </div>
                        </div>

                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <div className="flex justify-between">
                            <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
                            <button onClick={navigateTAButton} className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-[#444] rounded-md">
                                View All
                            </button>
                            </div>
                            <div className="h-56">
                                <TrendingAttacks trendAttackCategory={trendAttackCategory} trendAttackData={trendAttackData} width={500} height={230} />
                            </div>
                        </div>  
                    </div>

                    <div className="py-2"></div>

                    {/* 3rd row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Top Threat Sources</p>
                            <div className="h-56">
                                <TopThreatSrc threats={threatSrc} error={error}/>
                            </div>
                        </div>

                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Top Threat Destination</p>
                            <div className="h-56">
                                <TopThreatDest threats={threatDest} error={error} />
                            </div>
                        </div>  
                    </div>

                    <div className="py-2"></div>

                    {/* 4th row */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Recent Alerts</p>
                        <div className="h-96">
                            <RecentAlertsTable alerts={alerts}/>
                        </div>
                    </div>
                </div>

                <div className='p-10'></div>
        
            </div>
        </div>
    );
}

export default NADashboardUI;