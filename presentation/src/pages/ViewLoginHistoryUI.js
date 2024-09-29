import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Table } from "flowbite-react";


function NALogInHistory() {
    //debugging for user
    const access_token = sessionStorage.getItem('accesstoken');
    const refresh_token = sessionStorage.getItem('refreshtoken');
    if (access_token) {
        console.log('Access found:', access_token);
        axios.get('http://127.0.0.1:5000/loginhistory', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
        })
        .then(response => {
        if (response.status === 200) {
                const user_id = response.data.logged_in_as;
                const login_history_username = response.data.username
                const login_history_timestamp = response.data.timestamp
                const login_history_status = response.data.status
                console.log(`User: ${user_id}`);
                console.log('Login History: ', login_history_username, login_history_timestamp, login_history_status)
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
  

  const breadcrumbItems = [
    {path: '/nadashboard', name:'Dashboard'},
    {path: '/naloginhistory', name: "Log In History"}
  ]

  const tempData = [
    { name: 'Apple"', color: 'Silver', type: 'Laptop', price: '$2999' },
    { name: 'Dell', color: 'Black', type: 'Laptop', price: '$1199' },
    { name: 'HP', color: 'Silver', type: 'Laptop', price: '$1399' },
    { name: 'Lenovo', color: 'Black', type: 'Laptop', price: '$1599' },
    { name: 'Microsoft', color: 'Platinum', type: 'Laptop', price: '$1499' },
    { name: 'Apple"', color: 'Silver', type: 'Laptop', price: '$2999' },
    { name: 'Dell XPS 13', color: 'Black', type: 'Laptop', price: '$1199' },
    { name: 'HP', color: 'Silver', type: 'Laptop', price: '$1399' },
    { name: 'Lenovo', color: 'Black', type: 'Laptop', price: '$1599' },
    { name: 'Microsoft', color: 'Platinum', type: 'Laptop', price: '$1499' },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}   h-screen`}>
        <Header />  
        <div className="flex flex-col bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="flex justify-between items-center mt-4 mb-4">
                <p className="text-2xl">LOG IN HISTORY</p>
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
                {/* User Logs */}
                <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                    <p className="pb-3 text-sm md:text-base">User Logs</p>
                    <div className="h-[415px]">
                        {/* <LoginHistoryTable className="mt-10"/> */}
                        <div className="max-h-[400px] overflow-y-auto">
                            <Table className="min-w-full">
                                <Table.Head className="sticky top-0">
                                <Table.HeadCell className='bg-slate-200'>Username</Table.HeadCell>
                                <Table.HeadCell className='bg-slate-200'>Fullname</Table.HeadCell>
                                <Table.HeadCell className='bg-slate-200'>Date & Time</Table.HeadCell>
                                <Table.HeadCell className='bg-slate-200'>Status</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                {tempData.map((item, index) => (
                                    <Table.Row key={index} className="bg-slate-100 dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{item.name}</Table.Cell>
                                    <Table.Cell>{item.color}</Table.Cell>
                                    <Table.Cell>{item.type}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    </Table.Row>
                                ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-10'></div>

        </div>
    </div>
  )
}

export default NALogInHistory