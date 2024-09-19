import React, {useState, useEffect} from 'react'
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from "axios";
import TrendingAttacks from '../components/TrendingAttacks';


function TrendingAttacksUI() {
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

    // current date
    const date = new Date();
    const showDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const showTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const currentDate = showDate + ' , ' + showTime

    const [error, setError] = useState(null);
    const [trendAttackCategory, setTrendAttackCategory] = useState([]);
    const [trendAttackData, setTrendAttackData] = useState([]);
    console.log("trendAttackCategory:", trendAttackCategory);
    console.log("trendAttackData:", trendAttackData);

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


                    setTrendAttackCategory(sortedCategories);
                    setTrendAttackData([{ data: sortedSeriesData }]);

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
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);


    const breadcrumbItems = [
        {path: '/nadashboard', name:'Dashboard'},
        {path: '/trendingattacks', name: "Trending Attacks"}
    ]

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Header />  

            <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
                
                <div className="flex justify-between items-center mt-4 mb-4">
                    <p className="text-2xl">TRENDING ATTACKS</p>
                    <p className="text-base">{currentDate}</p>
                </div>
                <div>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" color="primary" />} aria-label="breadcrumb">
                    {breadcrumbItems.map((item) => (
                        <Link
                        className='text-[#413c3c9d] dark:text-[#ffffff79] text-sm font-light'
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
                    {/* Bar Chart */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Trending Attacks Bar Chart</p>
                        <div className="h-96 px-8">
                            <TrendingAttacks trendAttackCategory={trendAttackCategory} trendAttackData={trendAttackData} width={1000} height={380} />
                        </div>
                    </div>

                    <div className="py-4"></div>

                    {/* Table */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Trending Attacks Table</p>
                        <div className="h-80">

                        </div>
                    </div>
                </div>

                <div className='p-10'></div>

            </div>
        </div>
    );
}

export default TrendingAttacksUI