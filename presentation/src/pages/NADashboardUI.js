import React from "react";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import axios from "axios";
// import check_token from "../auth.js";

// import Sidebar from "../components/Sidebar";

function NADashboardUI() {
    //debugging for user
    const access_token = sessionStorage.getItem('accesstoken');
    const refresh_token = sessionStorage.getItem('refreshtoken');
    
    if (access_token) {
        console.log('Access found:', access_token);
        axios.get('http://127.0.0.1:5000/nadashboard', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
        })
        .then(response => {
        if (response.status === 200) {
            const currentUser = response.data.logged_in_as;
            console.log(`User: ${currentUser}`);
        }
        })
        .catch(error => {
        console.error('Error fetching user info:', error);
        });
    } else {
        console.error('No token found. Please log in.');
    }

    const { darkMode } = useTheme();

    // current date
    const date = new Date();
    const showDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const currentDate = showDate + ' , ' + showTime

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
                            <div className="flex flex-col md:flex-row bg-[#efe8ff] dark:bg-[#252525] rounded-xl py-4 items-center">

                                {/* Left side: Network status and total alerts */}
                                <div className="flex flex-col md:block">
                                    <div className="flex items-center md:pl-5">
                                        <svg className="w-11 h-11 text-[#51ff2e]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z" clipRule="evenodd"/>
                                        </svg>  
                                        <div className="ml-4">
                                            <p className="text-xs">Network Status</p>
                                            <p className="text-lg font-medium">Good</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center md:pl-5 pt-4 ">
                                        <svg className="w-11 h-11 text-[#ff1f1fea]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
                                        </svg>
                                        <div className="ml-4">
                                            <p className="text-xs">Total Alerts</p>
                                            <p className="text-lg font-medium">12</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Middle side: Critical, high, medium, low symbols and amounts */}
                                <div className="flex flex-col md:flex-row items-start md:items-center mt-4 md:mt-0 lg:pl-4">
                                    {/* Symbols Column */}
                                    <div className="flex flex-col items-start">
                                        <div className="flex items-center mb-2">
                                            <svg className="w-6 h-6 text-[#ff1f1fea]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                            <p className="ml-2 text-sm">Critical 
                                                <span className="pl-[20px]">10</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center mb-2">
                                            <svg className="w-6 h-6 text-[#ff841fea]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                            <p className="ml-2 text-sm">High <span className="pl-[34px]">10</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center mb-2">
                                            <svg className="w-6 h-6 text-[#ffe91fea]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                            <p className="ml-2 text-sm">Medium <span className="pl-[9px]">10</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center mb-2">
                                            <svg className="w-6 h-6 text-[#51ff2e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                            <p className="ml-2 text-sm">Low <span className="pl-[39px]">10</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Amount Column */}
                                    {/* <div className="flex flex-col items-center pl-3 mt-4 md:mt-0">
                                        <p className="text-lg">10</p>
                                        <p className="text-lg mt-1">10</p>
                                        <p className="text-lg mt-1">10</p>
                                        <p className="text-lg mt-1">10</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>


                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="text-sm md:text-base">Alerts Over Time</p>
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
                            <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
                            <div className="h-56">

                            </div>
                        </div>  
                    </div>

                    <div className="py-2"></div>

                    {/* 3rd row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Top Threat Sources</p>
                            <div className="h-56">

                            </div>
                        </div>

                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Top Threat Destination</p>
                            <div className="h-56">

                            </div>
                        </div>  
                    </div>

                    <div className="py-2"></div>

                    {/* 4th row */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Threat Map</p>
                        <div className="h-80">

                        </div>
                    </div>
                </div>

                <div className='p-10'></div>

            </div>
        </div>
    );
}

export default NADashboardUI;