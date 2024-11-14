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
import BlockIP from "../components/BlockIP"

function NADashboardUI() {
  const { darkMode } = useTheme();

  // navigation button
  const navigate = useNavigate();
  // const navigateTAButton = () => {
  //   navigate("/trendingattacks");
  // };
  const navigateAlertsButton = () => {
    navigate("/naalerts");
  };
  // live time and date
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const showDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const showTime =
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");
      const updatedDateTime = showDate + " , " + showTime;
      setCurrentDate(updatedDateTime);
    };

    updateTime();

    const timerId = setInterval(updateTime, 1000);
    return () => clearInterval(timerId);
  }, []);

  const [error, setError] = useState(null);

  const [alerts, setAlerts] = useState([]);
  const [mapIframe, setMapIframe] = useState('');
  const [alertsOverview, setAlertsOverview] = useState({
    critical: 0,
    high: 0,
    med: 0,
    low: 0,
  });

  const [srciFrame, setSrciFrame] = useState();

  // useEffect(() => {
  //   // redirect to login page if no access token
  //   if (!sessionStorage.getItem('accesstoken')) {
  //       navigate('/loginUI');
  //   }

  //   checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

  //   const fetchData = async () => {
    
  //     const access_token = sessionStorage.getItem('accesstoken');

  //     axios.get('http://127.0.0.1:5000/nadashboard', {
  //         headers: {
  //             'Authorization': `Bearer ${access_token}`
  //         }
  //     })
  //     .then(response => {
  //       if (response.status === 200) {
  //         setAlerts(response.data.recent_alerts || []);
  //         setMapIframe(response.data.map);

  //     // recent alerts
  //     const alertsOverview = response.data.alert_overview;
  //     setAlertsOverview({
  //       critical: alertsOverview.critical || 0,
  //       high: alertsOverview.high || 0,
  //       med: alertsOverview.med || 0,
  //       low: alertsOverview.low || 0,
  //     });
  //     } else {
  //       setError("No data available");
  //     }

  //     const temp = response.data.alert_classes;
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching threat info:", error);
  //     setError("Error fetching data");
  //   });
  // };
  // fetchData();
  // const interval = setInterval(fetchData, 5000);

  // return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    // redirect to login page if no access token
    if (!sessionStorage.getItem('accesstoken')) {
        navigate('/loginUI');
    }

    checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

    const fetchAlertsData = async () => {
        const access_token = sessionStorage.getItem('accesstoken');

        axios.get('http://127.0.0.1:5000/nadashboard', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                // Set alerts and overview
                setAlerts(response.data.recent_alerts || []);
                const alertsOverview = response.data.alert_overview;
                setAlertsOverview({
                    critical: alertsOverview.critical || 0,
                    high: alertsOverview.high || 0,
                    med: alertsOverview.med || 0,
                    low: alertsOverview.low || 0,
                });
            } else {
                setError("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching alert info:", error);
            setError("Error fetching data");
        });
    };

    const fetchMapIframe = async () => {
        const access_token = sessionStorage.getItem('accesstoken');

        axios.get('http://127.0.0.1:5000/nadashboard', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setMapIframe(response.data.map);
            } else {
                setError("No data available");
            }
        })
        .catch((error) => {
            console.error("Error fetching map info:", error);
            setError("Error fetching map");
        });
    };

    // Fetch alerts data every 5 seconds
    fetchAlertsData();
    const alertsInterval = setInterval(fetchAlertsData, 5000);

    // Fetch map iframe every 60 seconds
    fetchMapIframe();
    const mapInterval = setInterval(fetchMapIframe, 300000);

    return () => {
        clearInterval(alertsInterval);
        clearInterval(mapInterval);
    };
}, []);



  // privacy policy modal pop up
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const openPrivacyModal = (e) => {
    e.preventDefault(); // Prevents default anchor behavior
    setPrivacyModalOpen(true);
  };
  const closePrivacyModal = () => {
    setPrivacyModalOpen(false);
  };
  


  return (
    <div className={darkMode ? "dark" : ""}>
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
              <button
                onClick={navigateAlertsButton}
                className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-transparent hover:bg-slate-200 dark:hover:bg-[#444] rounded-md"
              >
                View All
              </button>
            </div>
            {/* 1st row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Alerts Overview */}
              <div className="col-span-4 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#252628]">
                <p className="pb-5 text-sm md:text-base">Alerts Overview</p>
                <AlertOverview alert={alertsOverview} />
              </div>

              <div className="col-span-8 border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#252628] w-full">
                <p className="pb-5 text-sm md:text-base">Alerts Over Time</p>
                <iframe
                  src="http://localhost:5601/app/dashboards#/view/7526f520-76aa-11ef-b502-b1fce63ea091?embed=true&_g=(filters:!(),refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,syncColors:!f,useMargins:!t),panels:!((embeddableConfig:(attributes:(references:!((id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-current-indexpattern,type:index-pattern),(id:'48a30000-74d6-11ef-a9fc-7978195c8b08',name:indexpattern-datasource-layer-89c6c963-a14e-4495-9344-8e8a48c388d2,type:index-pattern)),state:(datasourceStates:(indexpattern:(layers:('89c6c963-a14e-4495-9344-8e8a48c388d2':(columnOrder:!('3f6477e2-3529-498f-b7cf-a6a82067c993','77626785-9295-4fa0-95cb-9c2434d7fb32'),columns:('3f6477e2-3529-498f-b7cf-a6a82067c993':(customLabel:!t,dataType:date,isBucketed:!t,label:'Alerts%20over%20time',operationType:date_histogram,params:(interval:auto),scale:interval,sourceField:'@timestamp'),'77626785-9295-4fa0-95cb-9c2434d7fb32':(dataType:number,isBucketed:!f,label:'Count%20of%20records',operationType:count,scale:ratio,sourceField:Records)),incompleteColumns:())))),filters:!(),query:(language:kuery,query:''),visualization:(axisTitlesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),fittingFunction:None,gridlinesVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),labelsOrientation:(x:0,yLeft:0,yRight:0),layers:!((accessors:!('77626785-9295-4fa0-95cb-9c2434d7fb32'),layerId:'89c6c963-a14e-4495-9344-8e8a48c388d2',layerType:data,position:top,seriesType:line,showGridlines:!f,xAccessor:'3f6477e2-3529-498f-b7cf-a6a82067c993')),legend:(isVisible:!t,position:right),preferredSeriesType:line,tickLabelsVisibilitySettings:(x:!t,yLeft:!t,yRight:!t),valueLabels:hide,yLeftExtent:(mode:full),yRightExtent:(mode:full))),title:'',type:lens,visualizationType:lnsXY),enhancements:(),hidePanelTitles:!t),gridData:(h:15,i:b0fe4013-ef43-4364-9892-100a55e74df3,w:48,x:0,y:0),panelIndex:b0fe4013-ef43-4364-9892-100a55e74df3,type:lens,version:'7.17.22')),query:(language:kuery,query:''),tags:!(),timeRestore:!f,title:'Snort%20line',viewMode:view)&hide-filter-bar=true"></iframe>
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
                  src="http://localhost:5601/goto/a3bee8f0-94d4-11ef-a0c8-f3e2108b99c7"
                  height="400"
                  width="100%"
                  frameborder="0"
                  scrolling="yes"
                ></iframe>
              </div>
            </div>

            <div className="py-2"></div>

            {/* 4th row */}
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl px-4 py-4 bg-white dark:bg-[#252628]">
              <p className="pb-3 text-sm md:text-base">Recent Alerts</p>
              <div className="h-96">
                <RecentAlertsTable alerts={alerts} />
              </div>
            </div>
          </div>

          <div className="py-2"></div>

          {/* 3rd row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <div className="flex justify-between">
                <p className="pb-5 text-sm md:text-base">Top Threat Sources</p>
                <p onClick={openPrivacyModal} className="cursor-default">Block IP?</p>
              </div>
              <div className="pb-4">
                <iframe
                  src="http://localhost:5601/goto/7d913900-94dc-11ef-a0c8-f3e2108b99c7"
                  height="300"
                  width="100%"
                  scrolling="no"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>

            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <p className="pb-5 text-sm md:text-base">
                Top Threat Destination
              </p>
              <div className="pb-4">
                <iframe
                  src="http://localhost:5601/goto/b78b7260-94dc-11ef-a0c8-f3e2108b99c7"
                  height="300"
                  width="100%"
                  scrolling="no"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="py-2"></div>

          {/* 2nd row */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="border border-[#e7e7e7] dark:border-[#353535] shadow-md rounded-xl p-6 bg-white dark:bg-[#252628]">
              <div className="flex justify-between pb-3">
                <p className="pb-3 text-sm md:text-base">Trending Attacks</p>
                {/* <button
                  onClick={navigateTAButton}
                  className="flex items-center h-9 pl-2 pr-2 border border-[#e7e7e7] dark:border-[#353535] bg-[#252628] hover:bg-slate-200 dark:hover:bg-[#444] rounded-md"
                >
                  View All
                </button> */}
              </div>
              <iframe
                src="http://localhost:5601/goto/76ee6440-94de-11ef-a0c8-f3e2108b99c7"
                height="400"
                width="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="p-3">
        </div>
        <div className="map-container" dangerouslySetInnerHTML={{ __html: mapIframe }}></div>

      </div>
      <BlockIP isOpen={isPrivacyModalOpen} closeModal={closePrivacyModal}/>
    </div>
  );
}

export default NADashboardUI;