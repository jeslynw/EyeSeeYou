import React, {useState, useEffect, useRef} from 'react'
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { checkIfTokenExpired } from "../App";
import FutureAttacks from '../components/FutureAttacks';

function TrendingAttacksUI() {
    const navigate = useNavigate();
    // redirect to login page if no access token
    if (!sessionStorage.getItem('accesstoken')) {
        navigate('/loginUI');
    }
    
    checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

    const access_token = sessionStorage.getItem('accesstoken');

    if (access_token) {
        axios.get('http://127.0.0.1:5000/loginhistory', {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
        })
        .then(response => {
        if (response.status === 200) {
              const user_id = response.data.logged_in_as;
            //   console.log(`User: ${user_id}`);
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
    const [predictedAttack, setPredictedAttack] = useState('');
    const [confidenceLevel, setConfidenceLevel] = useState(0);


    const [prevData, setPrevData] = useState([]);
    const tableRef = useRef(null);
    // useEffect(() => {
    //     const access_token = sessionStorage.getItem('accesstoken');

    //     const fetchData = () => {
    //         axios.get('http://127.0.0.1:5000/natrendingattacks', {
    //             headers: {
    //                 'Authorization': `Bearer ${access_token}`
    //             }
    //         })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 //  trending attacks data
    //                 // const alertClasses = response.data.trending_attacks.map(alert => alert.class);
    //                 // const classCounts = response.data.trending_attacks.map(alert => alert.count);
    //                 // setTrendAttackCategory(alertClasses);
    //                 // setTrendAttackData([{ data: classCounts }]);
    //                 // console.log('attackcategory', trendAttackCategory)
    //                 // console.log("attackcount", trendAttackData)

    //                 setPrevData(trendAttackCategory);
    //                 setTrendAttackCategory(response.data.trending_attacks);
    //             } else {
    //                 setError('No data available');
    //             }
    //             const temp = response.data.alert_classes;
    //             console.log("Alert classes:", temp);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching threat info:', error);
    //             setError('Error fetching data');
    //         });
    //     } 
    //     fetchData();
    //     const interval = setInterval(fetchData, 5000);

    //     return () => clearInterval(interval);
    // }, []);

    useEffect(() => {
        const access_token = sessionStorage.getItem('accesstoken');
    
        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/trendingattacks', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setPrevData(trendAttackCategory);
    
                    // Sort trending attacks by count in descending order
                    const sortedAttacks = response.data.trending_attacks.sort((a, b) => b.count - a.count);
                    setTrendAttackCategory(sortedAttacks);
                    const futurePrediction = response.data.future_prediction[0]; 
                    setPredictedAttack(futurePrediction.label);
                    setConfidenceLevel(futurePrediction.confidence);
                } else {
                    setError('No data available');
                }
            })
            .catch(error => {
                console.error('Error fetching threat info:', error);
                setError('Error fetching data');
            });
        }; 
        fetchData();
        const interval = setInterval(fetchData, 5000);
    
        return () => clearInterval(interval);
    }, []);
    

    const getRowStyles = (currentIndex, prevIndex) => {
        if (prevIndex === -1) return {}; // New item
        if (currentIndex === prevIndex) return {}; // No change
        return {
          y: (currentIndex - prevIndex) * 40, // Assuming each row is 40px high
          transition: { type: "spring", stiffness: 300, damping: 30 }
        };
    };

    // Calculate the confidence level to percentage
    const formattedConfidence = (confidenceLevel * 100).toFixed(2);


    // const breadcrumbItems = [
    //     {path: '/mdashboard', name:'Dashboard'},
    //     {path: '/trendingattacks', name: "Trending Attacks"}
    // ]

    
    return (
        <div className={darkMode ? 'dark' : ''}>
            <Header />  

            <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
                
                <div className="flex justify-between items-center mt-4 mb-4">
                    <p className="text-2xl">TRENDING ATTACKS</p>
                    <p className="text-base">{currentDate}</p>
                </div>
                {/* <div>
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
                </div> */}
                
                <div className="py-2"></div>

                <div className="w-full">
                    {/* future attack */}
                    <FutureAttacks predictedAttack={predictedAttack} confidenceLevel={formattedConfidence} />
                    
                    <div className="py-4"></div>

                    {/* Bar Chart */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                        <p className="pb-5 text-sm md:text-base">Trending Attacks Bar Chart</p>
                        <div className="pb-4 px-8">
                            {/* <TrendingAttacks trendAttackCategory={trendAttackCategory} trendAttackData={trendAttackData} width={1000} height={380} /> */}
                            {/* <iframe src="http://localhost:5601/goto/140a3ac0-94de-11ef-a0c8-f3e2108b99c7" height="600" width="800"></iframe>*/}
                            <iframe src="http://localhost:5601/goto/140a3ac0-94de-11ef-a0c8-f3e2108b99c7"
                                height="500"
                                width="100%"
                            >
                            </iframe>
                        </div>
                    </div>

                    <div className="py-4"></div>

                    {/* Table */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                        <p className="pb-5 text-sm md:text-base">Trending Attacks Table</p>
                        <div className="h-80 overflow-y-auto rounded-md">
                            <table className="min-w-full" ref={tableRef}>
                                <thead className="sticky top-0 bg-slate-200 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider">No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider">Attack Type</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-[#6b7280] dark:text-[#9ca3af] uppercase tracking-wider">Count</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y bg-slate-100 dark:bg-gray-800">
                                    <AnimatePresence>
                                        {trendAttackCategory.map((attack, index) => {
                                        const prevIndex = prevData.findIndex(item => item.class === attack.class);
                                        return (
                                            <motion.tr 
                                            key={attack.class}
                                            initial={false}
                                            animate={getRowStyles(index, prevIndex)}
                                            exit={{ opacity: 0 }}
                                            className="text-sm text-[#6b7280] dark:text-[#9ca3af] dark:border-gray-700 font-light"
                                            >
                                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{attack.class}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                {attack.count}
                                            </td>
                                            </motion.tr>
                                        );
                                        })}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='p-10'></div>

            </div>
        </div>
    );
}

export default TrendingAttacksUI