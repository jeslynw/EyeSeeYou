import React, {useState, useEffect, useRef} from 'react'
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';


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
    // const [trendAttackCategory, setTrendAttackCategory] = useState([]);
    // const [trendAttackData, setTrendAttackData] = useState([]);
    // console.log("trendAttackCategory:", trendAttackCategory);
    // console.log("trendAttackData:", trendAttackData);
    const [trendAttackCategory, setTrendAttackCategory] = useState([]);


    const [prevData, setPrevData] = useState([]);
    const tableRef = useRef(null);
    useEffect(() => {
        const access_token = sessionStorage.getItem('accesstoken');

        const fetchData = () => {
            axios.get('http://127.0.0.1:5000/natrendingattacks', {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    //  trending attacks data
                    // const alertClasses = response.data.trending_attacks.map(alert => alert.class);
                    // const classCounts = response.data.trending_attacks.map(alert => alert.count);
                    // setTrendAttackCategory(alertClasses);
                    // setTrendAttackData([{ data: classCounts }]);
                    // console.log('attackcategory', trendAttackCategory)
                    // console.log("attackcount", trendAttackData)

                    setPrevData(trendAttackCategory);
                    setTrendAttackCategory(response.data.trending_attacks);
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

    const getRowStyles = (currentIndex, prevIndex) => {
        if (prevIndex === -1) return {}; // New item
        if (currentIndex === prevIndex) return {}; // No change
        return {
          y: (currentIndex - prevIndex) * 40, // Assuming each row is 40px high
          transition: { type: "spring", stiffness: 300, damping: 30 }
        };
    };

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
                    {/* Bar Chart */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Trending Attacks Bar Chart</p>
                        <div className="pb-4 px-8">
                            {/* <TrendingAttacks trendAttackCategory={trendAttackCategory} trendAttackData={trendAttackData} width={1000} height={380} /> */}
                            <iframe src="http://localhost:5601/app/dashboards#/view/ff5ba040-773d-11ef-a5fb-e755f6ca9b2d?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',expandedPanelId:d2704d84-d821-4e94-8fb6-870772585e8e,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-65935606-32b9-4d1e-bf7c-96055aa04fed,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('65935606-32b9-4d1e-bf7c-96055aa04fed':(columnOrder:!(a90986ac-53ef-4b0d-8ce1-e84d083412b6,f73f4761-dddb-499d-9874-a06dfd0466d6),columns:(a90986ac-53ef-4b0d-8ce1-e84d083412b6:(customLabel:!t,dataType:string,isBucketed:!t,label:'-',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:f73f4761-dddb-499d-9874-a06dfd0466d6,type:column),orderDirection:desc,otherBucket:!t,size:15),scale:ordinal,sourceField:class.keyword),f73f4761-dddb-499d-9874-a06dfd0466d6:(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!(f73f4761-dddb-499d-9874-a06dfd0466d6),layerId:'65935606-32b9-4d1e-bf7c-96055aa04fed',layerType:data,position:top,seriesType:bar_horizontal,showGridlines:!f,xAccessor:a90986ac-53ef-4b0d-8ce1-e84d083412b6,yConfig:!((color:%234782b4,forAccessor:f73f4761-dddb-499d-9874-a06dfd0466d6)))),legend:(isVisible:!t,position:right),preferredSeriesType:bar_horizontal,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:()),gridData:(h:16,i:d2704d84-d821-4e94-8fb6-870772585e8e,w:47,x:0,y:0),panelIndex:d2704d84-d821-4e94-8fb6-870772585e8e,type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Eyeseeyou%20all%20trending%20attacks',viewMode:view)&hide-filter-bar=true"
                                height="500"
                                width="100%"
                            >
                            </iframe>
                        </div>
                    </div>

                    <div className="py-4"></div>

                    {/* Table */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                        <p className="pb-3 text-sm md:text-base">Trending Attacks Table</p>
                        <div className="h-80 overflow-y-auto rounded-md">
                            <table className="min-w-full" ref={tableRef}>
                                <thead className="sticky top-0 bg-slate-200 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Attack Type</th>
                                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider">Count</th>
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
                                            <td className="px-6 py-4 whitespace-nowrap">{attack.class}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                {attack.count}
                                                {prevIndex !== -1 && prevData[prevIndex].count !== attack.count && (
                                                <span className={`ml-2 ${attack.count > prevData[prevIndex].count ? 'text-green-500' : 'text-red-500'}`}>
                                                    {attack.count > prevData[prevIndex].count ? '▲' : '▼'}
                                                </span>
                                                )}
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