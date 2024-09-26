import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AlertPageOverview from '../components/AlertsPageOverview';
import AlertsLogs from '../components/AlertsLogs';
import { useNavigate } from "react-router-dom";

function NAAlerts() {
    //debugging for user
    const access_token = sessionStorage.getItem('accesstoken');
    const refresh_token = sessionStorage.getItem('refreshtoken');

    const navigate = useNavigate();
    // redirect to login page if no access token
    if (!sessionStorage.getItem('accesstoken')) {
        navigate('/loginUI');
    }

    if (access_token) {
        console.log('Access found:', access_token);
        axios.get('http://127.0.0.1:5000/naalerts', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
        })
        .then(response => {
        if (response.status === 200) {
                const user_id = response.data.logged_in_as;
                console.log(`User: ${user_id}`);
        }
        })
        .catch(error => {
        console.error('Error fetching user info:', error);
        });
    } else {
        console.error('No token found. Please log in.');
    }

    const { darkMode } = useTheme();

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

    const [alerts, setAlerts] = useState([]);
    const [alertsOverview, setAlertsOverview] = useState({
        critical: 0,
        high: 0,
        med: 0,
        low: 0,
      });
    
    const breadcrumbItems = [
        {path: '/nadashboard', name:'Dashboard'},
        {path: '/naalerts', name: "Alerts"}
    ]

    useEffect(() => {
        const access_token = sessionStorage.getItem('accesstoken');

        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/naalerts', {
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
                    setAlerts(response.data.recent_alerts || []); 
                }

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
        
        <div className="flex justify-between items-center mt-4 mb-4">
            <p className="text-2xl">ALERTS</p>
            <p className="text-base">{currentDate}</p>
        </div>
        <div>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" color="primary" />} aria-label="breadcrumb">
            {breadcrumbItems.map((item) => (
                  <Link
                  className='text-[#6b7280] dark:text-[#ffffff79] text-base font-light'
                  to = {item.path}
                  underline="hover"
                  onClick = {item.onClick}
                  color="inherit"
                  >
                      <p>{item.name}</p>
                  </Link>
              
            ))}
            </Breadcrumbs>
        </div>
        
        <div className="py-2"></div>

        <div className="w-full">
            {/* Overall Alerts */}
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                <p className="pb-3 text-sm md:text-base">Overall Alerts</p>
                <AlertPageOverview alert={alertsOverview} />
            </div>

            <div className="py-4"></div>

            {/* Alerts Logs */}
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                <p className="pb-3 text-sm md:text-base">Alerts Logs</p>
                <AlertsLogs alerts={alerts}/>
            </div>
        </div>

        <div className='p-10'></div>

    </div>
</div>
  )
}

export default NAAlerts