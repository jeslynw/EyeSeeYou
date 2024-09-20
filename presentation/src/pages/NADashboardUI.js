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

// import check_token from "../auth.js";

// import Sidebar from "../components/Sidebar";

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
                    // //  trending attacks data
                    // const alertClasses = response.data.trending_attacks.map(alert => alert.class);
                    // const classCounts = response.data.trending_attacks.map(alert => alert.count);
                    // const sortedData = alertClasses.map((c, i) => ({ class: c, count: classCounts[i] })).sort((a, b) => b.count - a.count);
                    // const sortedCategories = sortedData.map(d => d.class);
                    // const sortedSeriesData = sortedData.map(d => d.count);
                    // setTrendAttackCategory(sortedCategories);
                    // setTrendAttackData([{ data: sortedSeriesData }]);



                    // top threat src and dest ip address
                    setThreatSrc(response.data.top_threat_src || []);
                    setThreatDest(response.data.top_threat_dest || []);
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
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        {/* Alerts Overview */}
                        <div className="col-span-4 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Alerts Overview</p>
                            <div className="flex justify-between md:flex-row h- bg-[#efe8ff] dark:bg-[#252525] rounded-xl p-4 items-center h-[380px]">

                                {/* Left side: Network status and total alerts */}
                                <div className="flex flex-col md:block">
                                    <div className="flex items-center">
                                        <svg className="w-11 h-11 text-[#51ff2e]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z" clipRule="evenodd"/>
                                        </svg>  
                                        <div className="ml-4">
                                            <p className="text-xs">Network Status</p>
                                            <p className="text-lg font-medium">Good</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center md: pt-5 ">
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
                                </div>
                            </div>
                        </div>


                        <div className="col-span-8 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent w-full">
                            <p className="text-sm md:text-base">Alerts Over Time</p>
                            {/* <iframe 
                                src="http://localhost:5601/app/dashboards#/view/7526f520-76aa-11ef-b502-b1fce63ea091?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-89c6c963-a14e-4495-9344-8e8a48c388d2,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('89c6c963-a14e-4495-9344-8e8a48c388d2':(columnOrder:!('3f6477e2-3529-498f-b7cf-a6a82067c993','77626785-9295-4fa0-95cb-9c2434d7fb32'),columns:('3f6477e2-3529-498f-b7cf-a6a82067c993':(customLabel:!t,dataType:date,isBucketed:!t,label:'Alerts%20over%20time',operationType:date_histogram,params:(interval:auto),scale:interval,sourceField:'@timestamp'),'77626785-9295-4fa0-95cb-9c2434d7fb32':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('77626785-9295-4fa0-95cb-9c2434d7fb32'),layerId:'89c6c963-a14e-4495-9344-8e8a48c388d2',layerType:data,position:top,seriesType:line,showGridlines:!f,xAccessor:'3f6477e2-3529-498f-b7cf-a6a82067c993')),legend:(isVisible:!t,position:right),preferredSeriesType:line,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:()),gridData:(h:15,i:b0fe4013-ef43-4364-9892-100a55e74df3,w:48,x:0,y:0),panelIndex:b0fe4013-ef43-4364-9892-100a55e74df3,type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Snort%20line',viewMode:view)&show-top-menu=false&show-query-input=false&show-time-filter=false&hideFilterBar=true&hideTimeFilterBar=true" 
                                height="400" 
                                width="520"
                                frameborder="0" 
                                scrolling="yes">
                            </iframe> */}
                            <iframe
                                src="http://localhost:5601/app/dashboards#/view/7526f520-76aa-11ef-b502-b1fce63ea091?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-89c6c963-a14e-4495-9344-8e8a48c388d2,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('89c6c963-a14e-4495-9344-8e8a48c388d2':(columnOrder:!('3f6477e2-3529-498f-b7cf-a6a82067c993','77626785-9295-4fa0-95cb-9c2434d7fb32'),columns:('3f6477e2-3529-498f-b7cf-a6a82067c993':(customLabel:!t,dataType:date,isBucketed:!t,label:'Alerts%20over%20time',operationType:date_histogram,params:(interval:auto),scale:interval,sourceField:'@timestamp'),'77626785-9295-4fa0-95cb-9c2434d7fb32':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('77626785-9295-4fa0-95cb-9c2434d7fb32'),layerId:'89c6c963-a14e-4495-9344-8e8a48c388d2',layerType:data,position:top,seriesType:line,showGridlines:!f,xAccessor:'3f6477e2-3529-498f-b7cf-a6a82067c993')),legend:(isVisible:!t,position:right),preferredSeriesType:line,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:(),hidePanelTitles:!t),gridData:(h:15,i:b0fe4013-ef43-4364-9892-100a55e74df3,w:48,x:0,y:0),panelIndex:b0fe4013-ef43-4364-9892-100a55e74df3,type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Snort%20line',viewMode:view)&hide-filter-bar=true"
                                height="400"
                                width="1000"
                                frameborder="0"
                                scrolling="no">
                            </iframe>
                        </div>
                        {/* <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="text-sm md:text-base">Alerts</p>
                        </div> */}
                    </div>

                    <div className="py-2"></div>

                    {/* 2nd row */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {/* <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Alerts Status Pie Chart</p>
                            <iframe src="http://localhost:5601/app/dashboards#/view/3b6670c0-76a7-11ef-b502-b1fce63ea091?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-9a74ac85-340d-4713-8ec1-7271f35ed391,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('9a74ac85-340d-4713-8ec1-7271f35ed391':(columnOrder:!('67dbed2a-05c5-4967-a417-623f180be435','65a1c139-1727-4171-b936-338a6a04046f'),columns:('65a1c139-1727-4171-b936-338a6a04046f':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records),'67dbed2a-05c5-4967-a417-623f180be435':(dataType:string,isBucketed:!t,label:'Top%20values%20of%20class.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'65a1c139-1727-4171-b936-338a6a04046f',type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:class.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:hide,groups:!('67dbed2a-05c5-4967-a417-623f180be435'),layerId:'9a74ac85-340d-4713-8ec1-7271f35ed391',layerType:data,legendDisplay:show,metric:'65a1c139-1727-4171-b936-338a6a04046f',nestedLegend:!f,numberDisplay:percent)),palette:(name:kibana_palette,type:palette),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:(),hidePanelTitles:!t),gridData:(h:18,i:'084c267f-17c4-4e76-9117-0e083b2ad9fc',w:48,x:0,y:0),panelIndex:'084c267f-17c4-4e76-9117-0e083b2ad9fc',type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Eyeseeyou%20class%20',viewMode:view)&hide-filter-bar=true" height="600" width="800"></iframe>
                            <div className="h-56">

                            </div>
                        </div> */}

                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <div className="flex justify-between">
                            <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
                            <button onClick={navigateTAButton} className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-[#444] rounded-md">
                                View All
                            </button>
                            </div>
                            <div className="h-56">
                                <iframe
                                    src="http://localhost:5601/app/dashboards#/view/ab1556b0-770c-11ef-a5fb-e755f6ca9b2d?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',expandedPanelId:'2ba5ee70-89c9-4e51-ab81-cd5bb1e9803c',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-5582c66e-ea40-45aa-8474-46c428de321a,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:filter-index-pattern-0,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('5582c66e-ea40-45aa-8474-46c428de321a':(columnOrder:!('2a90a558-a0e3-4912-9f89-f50812f5f730','69eb975c-6069-48c2-9f98-18d4d954317a'),columns:('2a90a558-a0e3-4912-9f89-f50812f5f730':(customLabel:!t,dataType:string,isBucketed:!t,label:'-',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'69eb975c-6069-48c2-9f98-18d4d954317a',type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:class.keyword),'69eb975c-6069-48c2-9f98-18d4d954317a':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,indexRefName:filter-index-pattern-0,key:class.keyword,negate:!t,params:(query:none),type:phrase),query:(match_phrase:(class.keyword:none)))),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('69eb975c-6069-48c2-9f98-18d4d954317a'),layerId:'5582c66e-ea40-45aa-8474-46c428de321a',layerType:data,position:top,seriesType:bar_horizontal,showGridlines:!f,xAccessor:'2a90a558-a0e3-4912-9f89-f50812f5f730',yConfig:!((color:%234782b4,forAccessor:'69eb975c-6069-48c2-9f98-18d4d954317a')))),legend:(isVisible:!t,position:right),preferredSeriesType:bar_horizontal,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:(),hidePanelTitles:!t),gridData:(h:15,i:'2ba5ee70-89c9-4e51-ab81-cd5bb1e9803c',w:24,x:0,y:0),panelIndex:'2ba5ee70-89c9-4e51-ab81-cd5bb1e9803c',type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Eyeseeyou%20trending%20attacks',viewMode:view)&hide-filter-bar=true"
                                    height="200"
                                    width="1650"
                                    frameborder="0">
                                </iframe>
                                {/* <TrendingAttacks trendAttackCategory={trendAttackCategory} trendAttackData={trendAttackData} width={500} height={230} /> */}
                            </div>
                        </div>  
                    </div>

                    <div className="py-2"></div>

                    {/* 3rd row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Top Threat Sources</p>
                            <div className="h-max pb-4">
                            <iframe src="http://localhost:5601/app/dashboards#/view/811a7cb0-7715-11ef-a5fb-e755f6ca9b2d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-3h%2Cto%3Anow))&hide-filter-bar=true" 
                            height="300" width="760" scrolling="no" frameborder="0"></iframe>
                                {/* <TopThreatSrc threats={threatSrc} error={error}/> */}
                            </div>
                        </div>

                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent">
                            <p className="pb-3 text-sm md:text-base">Top Threat Destination</p>
                            <div className="h-56">
                                {/* <TopThreatDest threats={threatDest} error={error} /> */}
                                <iframe src="http://localhost:5601/app/dashboards#/view/dd61c3e0-7722-11ef-a5fb-e755f6ca9b2d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-3h%2Cto%3Anow))&hide-filter-bar=true" 
                                height="300" width="760" scrolling="no" frameborder="0"></iframe>
                            </div>
                        </div>  
                    </div> *

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