import React, { useState, useEffect } from 'react'
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import { checkIfTokenExpired } from "../App";
import axios from "axios";
import PDF from "../components/PDF";
import logo from '../images/logo2.png'
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Loader2 } from "lucide-react";

function GeneratePDF() {
    const { darkMode } = useTheme();

    const [error, setError] = useState(null);
    const [alertsOverview, setAlertsOverview] = useState({
        critical: 0,
        high: 0,
        med: 0,
        low: 0,
    });
    const [trendAttacks, setTrendAttacks] = useState([])
    const [srcAndDstIP, setSrcAndDstIP] = useState([])
    const [pdfDate, setPdfDate] = useState('');
    const [pdfTime, setPdfTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [answerConclusion, setAnswerConclusion] = useState('')
    const [answerRecommendation, setAnswerRecommendation] = useState('')
    const [asnwerTrend, setAnswerTrend] = useState('')
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let networkStatus;

    // live time and date
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

    // static time and date
    useEffect(() => {
        const date = new Date();
        const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        const formattedTime = date.getHours().toString().padStart(2, '0') + ':' + 
                             date.getMinutes().toString().padStart(2, '0') + ':' + 
                             date.getSeconds().toString().padStart(2, '0');
        setPdfDate(formattedDate);
        setPdfTime(formattedTime);
    }, []);

      // when data is loading, the page cannot scroll
      useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            // Restore scrolling
            document.body.style.overflow = 'unset';
            document.body.style.position = 'static';
            document.body.style.width = 'auto';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'static';
            document.body.style.width = 'auto';
        };
    }, [isLoading]);
    
    useEffect(() => {
        if (!sessionStorage.getItem('accesstoken')) {
            navigate('/loginUI');
        }
        
        checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 
        const access_token = sessionStorage.getItem('accesstoken');
        const userRole = sessionStorage.getItem('userrole')
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:5000/summarisedpdf', {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });

                if (response.status === 200) {
                    const alertsOverview = response.data.alert_overview;
                    setAlertsOverview({
                        critical: alertsOverview.critical,
                        high: alertsOverview.high,
                        med: alertsOverview.med,
                        low: alertsOverview.low,
                    });

                    const sortedTrendAttacks = response.data.list_trending_attacks.sort((a, b) => b.count - a.count);
                    setTrendAttacks(sortedTrendAttacks);
                    const sortedSrcIP = response.data.countSrcAndDestIP.sort((a, b) => b.count - a.count);
                    setSrcAndDstIP(sortedSrcIP);

                    setIsDataLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching threat info:', error);
                setError('Error fetching data');
            }finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(fetchData, 5000);
        return () => clearTimeout(timer);
    }, []);

    const severity = parseFloat(
        (
          alertsOverview.critical * 1 +
          alertsOverview.high * 0.8 +
          alertsOverview.med * 0.5 +
          alertsOverview.low * 0.3
        ).toFixed(2)
      );

    // Determine network status and emoji based on the severity score
    if (severity <= 10) {
        networkStatus = "Good";
    } else if (severity <= 30) {
    networkStatus = "Moderate";
    } else {
    networkStatus = "Bad";
    }


    // console.log('delay trendattack: ', trendAttacks)


    // gemini API chatbot
    useEffect(() => {
        const generateAIContent = async () => {
            if (!isDataLoaded) return; 
            
            const genAI = new GoogleGenerativeAI('AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY');
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                    
            const topSrcIpList = srcAndDstIP.map((ip) => `${ip.src_addr} with the count ${ip.count_src_addr}`).join(', ');
            const topDstIpList = srcAndDstIP.map((ip) => `${ip.dst_addr} with the count ${ip.count_dst_addr}`).join(', ');
            const trendAttacksList = trendAttacks.map((ip) => `${ip.class} with the count ${ip.count}`).join(', ');

            const context = `
            Context: This report provides a comprehensive real time overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of ${alertsOverview.critical + alertsOverview.high + alertsOverview.med + alertsOverview.low} alerts, with network status ${networkStatus}.
            The top threat sources are ${topSrcIpList}. The top targeted hosts are ${topDstIpList}.
            EyeSeeYou system detected a total of ${alertsOverview.critical + alertsOverview.high + alertsOverview.med + alertsOverview.low} alerts categorized by severity as follows: Critical: ${alertsOverview.critical}, High:${alertsOverview.high} , Medium:${alertsOverview.med}, Low:${alertsOverview.low}. 
            Furthermore, EyeSeeYou detected most frequent alert types which are ${trendAttacksList}.
            `

            const prompts = {
                conclusion: `
                Instruction to generate text:
                    - Write a paragraph for the conclusion for the context. 
                    - Must say something about like conclusion is generated at ${pdfDate}, ${pdfTime} at the start sentence.
                ${context}`,

                recommendation: `
                Instruction to generate text:
                    - Write a paragraph for the recommended action to prevent the context. Provide some actions
                    - Dont repeat the context
                    - Must say: Starts with recommended action ...
                    ${context}`,

                trend: `
                Instruction to generate text:
                    - Write a paragraph of the trend patterns that you observed. 
                    - Dont rewrite the data/context.
                    ${context}`,
            };

            try {
                // Make all API calls concurrently
                const [conclusionRes, recommendationRes, trendRes] = await Promise.all([
                    axios({
                        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY',
                        method: 'post',
                        data: {
                            contents: [{ parts: [{ text: prompts.conclusion }] }],
                        },
                    }),
                    axios({
                        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY',
                        method: 'post',
                        data: {
                            contents: [{ parts: [{ text: prompts.recommendation }] }],
                        },
                    }),
                    axios({
                        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY',
                        method: 'post',
                        data: {
                            contents: [{ parts: [{ text: prompts.trend }] }],
                        },
                    })
                ]);
    
                // Update all states at once
                setAnswerConclusion(conclusionRes.data.candidates[0].content.parts[0].text);
                setAnswerRecommendation(recommendationRes.data.candidates[0].content.parts[0].text);
                setAnswerTrend(trendRes.data.candidates[0].content.parts[0].text);
    
            } catch (error) {
                console.error("Error generating AI content:", error);
                setAnswerConclusion("Error generating content for conclusion.");
                setAnswerRecommendation("Error generating content for recommendation.");
                setAnswerTrend("Error generating content for trend analysis.");
            }
        };
        generateAIContent()

    }, [isDataLoaded, alertsOverview, trendAttacks, srcAndDstIP, pdfDate, pdfTime]);

    const handlePrint = () => {
        PDF(alertsOverview.critical, alertsOverview.high, alertsOverview.med, alertsOverview.low, trendAttacks, networkStatus, srcAndDstIP, answerRecommendation, answerConclusion, asnwerTrend)
        console.log("Conclusion:", answerConclusion);
        console.log("Recommendation:", answerRecommendation);
    };

    
  return (
    <div className= {darkMode ? 'dark' : ''}>
        <Header />  
        <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Dashboard text and current date and time */}
                <div className="flex mt-4 mb-4">
                    <p className="min-w-max text-2xl">PDF REPORT</p>
                    <button onClick={handlePrint} className='ml-2 ' title='Download here'  disabled={isLoading}>
                        <svg className="w-6 h-6 text-gray-800 hover:text-blue-700 dark:text-white transition duration-300 justify-start" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clip-rule="evenodd"/>
                            <path fill-rule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd"/>
                        </svg>
                    </button>
                    <p className="flex  items-center w-full text-base justify-end">{currentDate}</p>
                </div>
        
            <div className="w-full">
                <div className="preview pt-5">
                <div className='flex w-full justify-center'>
                    <div className="grid grid-cols-1 gap-8 lg:w-2/3 text-black">
                        {isLoading && (
                        <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50 flex items-center justify-center">
                            <div className="flex flex-col items-center space-y-4">
                                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Loading report...
                                </p>
                            </div>
                        </div>
            )}

                        {/* Page 1 */}
                        <div className="max-h-full bg-white shadow-lg rounded-lg px-14 py-10 ">
                            <div className='overflow-hidden'> 
                                <div className="flex items-center mb-4">
                                    <img src={logo} alt="Logo" className="w-10 h-8" />
                                    <h1 className="text-xl ml-3 font-SansitaSwashed">EyeSeeYou</h1>
                                </div>

                                <h1 className="text-[20px] font-bold text-center">EyeSeeYou Network Analysis Report</h1>
                                <p className="text-[11px] text-gray-600 mt-7">Date: {pdfDate}</p>
                                <p className="text-[11px] text-gray-600">Reporting Period: {pdfTime}</p>

                                <h2 className="text-[15px] font-bold mt-6">Executive Summary</h2>
                                <p className="text-[11px] text-gray-800 text-justify">
                                This report provides a comprehensive overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of {alertsOverview.critical + alertsOverview.high + alertsOverview.med + alertsOverview.low} alerts, with network status {networkStatus}.
                                </p>

                                <h2 className="text-[15px] font-bold mt-6">1. Overview of Network Activity</h2>
                                <p className="text-[11px] text-gray-800">
                                During the reporting period, the EyeSeeYou dashboard tracked a variety of network activities, including:
                                </p>
                                <ul className="list-disc list-inside ml-4">
                                <li className="text-[11px]">
                                    <span className="w-48">Network Status</span>:
                                    <span className='ml-1'>{networkStatus}</span>
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">Source and Target IP Analysis</span>: 
                                    <table className="min-w-max border border-gray-300 mb-4 mt-1 text-[11px]">
                                    <thead>
                                        <tr className="bg-black text-white">
                                        <th className="border border-gray-300 px-4 py-2">Top Threat Sources</th>
                                        <th className="border border-gray-300 px-4 py-2">Count</th>
                                        <th className="border border-gray-300 px-4 py-2">Top Targeted Hosts</th>
                                        <th className="border border-gray-300 px-4 py-2">Count</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {srcAndDstIP.map((ip, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                            <td className="border border-gray-300 px-4 py-2">{ip.src_addr}</td>
                                            <td className="border border-gray-300 px-4 py-2">{ip.count_src_addr}</td>
                                            <td className="border border-gray-300 px-4 py-2">{ip.dst_addr}</td>
                                            <td className="border border-gray-300 px-4 py-2">{ip.count_dst_addr}</td>
                                        </tr>
                                        ))}
                                    </tbody>
                                    </table>
                                </li>
                                </ul>
                                <h2 className="text-[15px] font-bold">2. Incident Summary</h2>
                                
                                <h3 className="text-[13px] font-semibold mt-1">2.1 Alert Breakdown</h3>
                                <p className="text-[11px] text-gray-800">
                                The EyeSeeYou system detected a total of {alertsOverview.critical + alertsOverview.high + alertsOverview.med + alertsOverview.low} alerts categorized by severity as follows:
                                </p>
                                <ul className="list-disc list-inside ml-4">
                                <li className="text-[11px]">
                                    <span className="w-48">Critical Alerts</span>: {alertsOverview.critical}
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">High Alerts</span>: {alertsOverview.high}
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">Medium Alerts</span>: {alertsOverview.med}
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">Low Alerts</span>: {alertsOverview.low}
                                </li>
                                </ul>

                                {/* Alert Status */}
                                <h3 className="text-[13px] font-semibold mt-4">2.2 Alert Status</h3>
                                <p className="text-[11px] text-gray-800">The following are the current statuses of the alerts:</p>
                                <ul className="list-disc list-inside ml-4">
                                <li className="text-[11px]">
                                    <span className="w-48">Open</span>:
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">In Progress</span>:
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">Resolved</span>: 
                                </li>
                                <li className="text-[11px]">
                                    <span className="w-48">False Positive</span>:
                                </li>
                                </ul>

                                {/* Recent Threat Trends */}
                                <h3 className="text-[13px] font-semibold mt-4">2.3 Recent Threat Trends</h3>
                                <p className="text-[11px] text-gray-800">The following trends were observed in detected threats:</p>
                                <ul className="list-disc list-inside ml-4">
                                <li className="text-[11px]">Most Frequent Alert Types:</li>
                                <table className="min-w-max border border-gray-300 mb-4 text-[11px] mt-1">
                                    <thead>
                                    <tr className="bg-black text-white">
                                        <th className="border border-gray-300 px-4 py-2">Alert Type</th>
                                        <th className="border border-gray-300 px-4 py-2">Count</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {trendAttacks.map((attack, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                        <td className="border border-gray-300 px-4 py-2">{attack.class}</td>
                                        <td className="border border-gray-300 px-4 py-2">{attack.count}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                </ul>
                                <footer className="text-[9px] mt-6 object-bottom"> © 2024 EyeSeeYou. All rights reserved.</footer> 
                            </div>
                        </div>

                        {/* Page 2 */}
                        <div className="h-[1100px] bg-white shadow-lg rounded-lg flex flex-col mb-8">
                            <div className='flex-grow overflow-hidden px-14 py-10'>
                                <li className="text-[11px] mt-2">Emerging Threat Patterns:</li>
                                <p className="text-[11px] text-gray-800 text-justify">{asnwerTrend}</p>
                                {/* <Qachat
                                    alertsOverview.critical={alertsOverview.critical}
                                    alertsOverview.high={alertsOverview.high}
                                    alertsOverview.med={alertsOverview.med}
                                    alertsOverview..low={alertsOverview.low}
                                    trendAttacks={trendAttacks}
                                    networkStatus={networkStatus}
                                    srcAndDstIP={srcAndDstIP}
                                    pdfDate={pdfDate}
                                    pdfTime={pdfTime}
                                    setAnswerConclusion = {setAnswerConclusion}
                                    setAnswerRecommendation = {setAnswerRecommendation}
                                /> */}
                                <h2 className="text-[15px] font-bold mt-6">3. Recommended Action</h2>
                                <p className="text-[11px] text-gray-800">{answerRecommendation}</p>
                                <h2 className="text-[15px] font-bold mt-6">4. Conclusion</h2>
                                <p className="text-[11px] text-gray-800">{answerConclusion}</p>

                            </div>
                            <footer className="text-[9px] px-14 py-10"> © 2024 EyeSeeYou. All rights reserved.</footer> 
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GeneratePDF