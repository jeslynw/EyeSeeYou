import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecentAlertsTable from "../components/RecentAlertsTable";
import AlertOverview from "../components/AlertsOverview";
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
            axios.get('http://127.0.0.1:5000/mdashboard', {
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

                const temp = response.data.alert_classes;
                // console.log("Alert classes:", temp);
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
                                {/* <AlertOverview alert={alertsOverview}/> */}
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

                            {/* <div className="col-span-8 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-transparent w-full">
                                <p className="text-sm md:text-base pb-3">Alerts Over Time</p>
                                <iframe
                                    src="http://localhost:5601/app/dashboards#/view/7526f520-76aa-11ef-b502-b1fce63ea091?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-89c6c963-a14e-4495-9344-8e8a48c388d2,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('89c6c963-a14e-4495-9344-8e8a48c388d2':(columnOrder:!('3f6477e2-3529-498f-b7cf-a6a82067c993','77626785-9295-4fa0-95cb-9c2434d7fb32'),columns:('3f6477e2-3529-498f-b7cf-a6a82067c993':(customLabel:!t,dataType:date,isBucketed:!t,label:'Alerts%20over%20time',operationType:date_histogram,params:(interval:auto),scale:interval,sourceField:'@timestamp'),'77626785-9295-4fa0-95cb-9c2434d7fb32':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('77626785-9295-4fa0-95cb-9c2434d7fb32'),layerId:'89c6c963-a14e-4495-9344-8e8a48c388d2',layerType:data,position:top,seriesType:line,showGridlines:!f,xAccessor:'3f6477e2-3529-498f-b7cf-a6a82067c993')),legend:(isVisible:!t,position:right),preferredSeriesType:line,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:(),hidePanelTitles:!t),gridData:(h:15,i:b0fe4013-ef43-4364-9892-100a55e74df3,w:48,x:0,y:0),panelIndex:b0fe4013-ef43-4364-9892-100a55e74df3,type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Snort%20line',viewMode:view)&hide-filter-bar=true"
                                    height="400"
                                    width="100%"
                                    frameborder="0"
                                    scrolling="no">
                                </iframe>
                            </div> */}

                        </div>

                        <div className="py-2"></div>

                        {/* 4th row */}
                        <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                            <p className="pb-3 text-sm md:text-base">Alerts Status</p>
                            <div className="pb-4">
                                <iframe 
                                    src="http://localhost:5601/app/dashboards#/view/aeb67ff0-8199-11ef-9145-a10d82064bca?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',expandedPanelId:fb563037-c8b5-4a79-9f62-5cc3637c65ef,filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-2dc2e2c9-0fec-41c3-9dd0-30a5a318b5a9,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('2dc2e2c9-0fec-41c3-9dd0-30a5a318b5a9':(columnOrder:!(c9b2f6e5-cfa8-484e-a04a-b559687d1634,'670a366d-47de-4a88-a5ae-76760c49e136'),columns:('670a366d-47de-4a88-a5ae-76760c49e136':(dataType:number,isBucketed:!f,label:'Median%20of%20priority',operationType:median,scale:ratio,sourceField:priority),c9b2f6e5-cfa8-484e-a04a-b559687d1634:(dataType:number,isBucketed:!t,label:'Top%20values%20of%20priority',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'670a366d-47de-4a88-a5ae-76760c49e136',type:column),orderDirection:desc,otherBucket:!t,size:3),scale:ordinal,sourceField:priority)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:hide,groups:!(c9b2f6e5-cfa8-484e-a04a-b559687d1634),layerId:'2dc2e2c9-0fec-41c3-9dd0-30a5a318b5a9',layerType:data,legendDisplay:show,metric:'670a366d-47de-4a88-a5ae-76760c49e136',nestedLegend:!f,numberDisplay:percent,truncateLegend:!t)),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:fb563037-c8b5-4a79-9f62-5cc3637c65ef,w:24,x:0,y:0),panelIndex:fb563037-c8b5-4a79-9f62-5cc3637c65ef,type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Eyeseeyou%20priority',viewMode:view)&hide-filter-bar=true"
                                    height="400" 
                                    width="100%">    
                                </iframe>
                            </div>
                        </div>
                    </div>

                    <div className="py-2"></div>

                    {/* 2nd row */}
                    <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-5">
                        <div className="flex justify-between pb-3">
                            <p className="pb-3 text-sm md:text-base">Attacks</p>
                            {/* <button onClick={navigateTAButton} className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md">
                                View All
                            </button> */}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                                <div className="flex justify-between pb-3">
                                    <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
                                    {/* <button onClick={navigateTAButton} className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md">
                                        View All
                                    </button> */}
                                </div>
                                {/* <div className="h-56"> */}
                                <div className="pb-4">
                                    <iframe
                                        src="http://localhost:5601/app/dashboards#/view/ab1556b0-770c-11ef-a5fb-e755f6ca9b2d?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',expandedPanelId:'2ba5ee70-89c9-4e51-ab81-cd5bb1e9803c',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-5582c66e-ea40-45aa-8474-46c428de321a,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:filter-index-pattern-0,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('5582c66e-ea40-45aa-8474-46c428de321a':(columnOrder:!('2a90a558-a0e3-4912-9f89-f50812f5f730','69eb975c-6069-48c2-9f98-18d4d954317a'),columns:('2a90a558-a0e3-4912-9f89-f50812f5f730':(customLabel:!t,dataType:string,isBucketed:!t,label:'-',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'69eb975c-6069-48c2-9f98-18d4d954317a',type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:class.keyword),'69eb975c-6069-48c2-9f98-18d4d954317a':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,indexRefName:filter-index-pattern-0,key:class.keyword,negate:!t,params:(query:none),type:phrase),query:(match_phrase:(class.keyword:none)))),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('69eb975c-6069-48c2-9f98-18d4d954317a'),layerId:'5582c66e-ea40-45aa-8474-46c428de321a',layerType:data,position:top,seriesType:bar_horizontal,showGridlines:!f,xAccessor:'2a90a558-a0e3-4912-9f89-f50812f5f730',yConfig:!((color:%234782b4,forAccessor:'69eb975c-6069-48c2-9f98-18d4d954317a')))),legend:(isVisible:!t,position:right),preferredSeriesType:bar_horizontal,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:(),hidePanelTitles:!t),gridData:(h:15,i:'2ba5ee70-89c9-4e51-ab81-cd5bb1e9803c',w:24,x:0,y:0),panelIndex:'2ba5ee70-89c9-4e51-ab81-cd5bb1e9803c',type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Eyeseeyou%20trending%20attacks',viewMode:view)&hide-filter-bar=true"
                                        height="400"
                                        width="100%"
                                        frameborder="0">
                                    </iframe>
                                </div>
                            </div>  

                            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
                                <div className="flex justify-between pb-3">
                                <p className="pb-3 text-sm md:text-base">Attacks Categories</p>
                                </div>
                                <div className="pb-4">
                                    <iframe src="http://localhost:5601/app/dashboards#/view/bc5ad1f0-819a-11ef-9145-a10d82064bca?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',expandedPanelId:'07e15c2d-bcc9-4566-affe-6f44c4f63382',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-be65769e-32e6-4547-bbe6-8132592f4663,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:(be65769e-32e6-4547-bbe6-8132592f4663:(columnOrder:!(c8ab10d6-723a-4e14-8037-2153d1b714b6,'282e9aec-1bdb-4bf0-adf6-b17cfef95c17'),columns:('282e9aec-1bdb-4bf0-adf6-b17cfef95c17':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records),c8ab10d6-723a-4e14-8037-2153d1b714b6:(dataType:string,isBucketed:!t,label:'Top%20values%20of%20class.keyword',operationType:terms,params:(missingBucket:!f,orderBy:(columnId:'282e9aec-1bdb-4bf0-adf6-b17cfef95c17',type:column),orderDirection:desc,otherBucket:!t,size:5),scale:ordinal,sourceField:class.keyword)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(layers:!((categoryDisplay:hide,groups:!(c8ab10d6-723a-4e14-8037-2153d1b714b6),layerId:be65769e-32e6-4547-bbe6-8132592f4663,layerType:data,legendDisplay:show,metric:'282e9aec-1bdb-4bf0-adf6-b17cfef95c17',nestedLegend:!f,numberDisplay:percent,truncateLegend:!f)),palette:(name:kibana_palette,type:palette),shape:donut)),title:'',type:lens,visualizationType:lnsPie),enhancements:()),gridData:(h:15,i:'07e15c2d-bcc9-4566-affe-6f44c4f63382',w:24,x:0,y:0),panelIndex:'07e15c2d-bcc9-4566-affe-6f44c4f63382',type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Eyeseeyou%20class',viewMode:view)&hide-filter-bar=true" 
                                        height="600" 
                                        width="100%">
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className='p-3'></div>
        
            </div>
        </div>
    );
}

export default MDashboardUI;