import React, { useState, useEffect } from 'react'
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import { checkIfTokenExpired } from "../App";
import axios from "axios";
import PDF from "../components/PDF";
import logo from '../images/logo2.png'
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
    const [alertsStatus, setAlertsStatus] = useState({
        open: 0,
        inProgress: 0,
        resolved: 0,
        falsePositive: 0,
    });
    const [trendAttacks, setTrendAttacks] = useState([])
    const [srcAndDstIP, setSrcAndDstIP] = useState([])
    const [pdfDate, setPdfDate] = useState('');
    const [pdfTime, setPdfTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [answerConclusion, setAnswerConclusion] = useState('')
    const [answerRecommendation, setAnswerRecommendation] = useState('')
    const [answerTrend, setAnswerTrend] = useState('')
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [predictedAttack, setPredictedAttack] = useState('');
    const [confidenceLevel, setConfidenceLevel] = useState(0);

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

        // Initial update
        updateTime();

        // Set up interval for time updates
        const timeUpdateInterval = setInterval(updateTime, 1000);
        
        // Cleanup
        return () => clearInterval(timeUpdateInterval);
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
            return;
        }
        
        checkIfTokenExpired(sessionStorage.getItem('accesstoken'));
        const access_token = sessionStorage.getItem('accesstoken');

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://34.124.131.244:5000/summarisedpdf', {
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

                    const alertsStatus = response.data.alert_status;
                    setAlertsStatus({
                        open: alertsStatus.open,
                        inProgress: alertsStatus.inprogress,
                        resolved: alertsStatus.resolved,
                        falsePositive: alertsStatus.falsepos,
                    });
                    
                    const sortedTrendAttacks = response.data.list_trending_attacks.sort((a, b) => b.count - a.count);
                    setTrendAttacks(sortedTrendAttacks);
                    
                    const sortedSrcIP = response.data.countSrcAndDestIP.sort((a, b) => b.count - a.count);
                    setSrcAndDstIP(sortedSrcIP);
                    
                    setIsDataLoaded(true);
                    
                    const futurePrediction = response.data.future_prediction[0]; 
                    setPredictedAttack(futurePrediction.label);
                    setConfidenceLevel(futurePrediction.confidence);
                }
            } catch (error) {
                console.error('Error fetching threat info:', error);
                setError('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        // Set timeout to fetch data once after 15 seconds
        const timer = setTimeout(fetchData, 5000);

        // Cleanup
        return () => clearTimeout(timer);
    }, []); 

    const formattedConfidence = (confidenceLevel * 100).toFixed(2);

    const severityMapping = {
        'CRITICAL': ['Shellcode', 'Backdoor', 'Worms',],
        'HIGH': ['Exploits', 'DoS', 'Reconnaissance'],
        'MEDIUM': ['Fuzzers', 'Generic'],
        'LOW': ['Analysis']
    };
    
    const getSeverity = (attack) => {
        for (const [severityLevel, attacks] of Object.entries(severityMapping)) {
            if (attacks.includes(attack)) return severityLevel;
        }
        return 'UNKNOWN';
    };

    const severityLevel = getSeverity(predictedAttack);


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

    const apiKey = 'AIzaSyAWA0P9HUTdHi0Bn-7B8OHPc7vwDUxBBWg'

    useEffect(() => {
        const generateAIContent = async () => {
            if (!isDataLoaded) return; 
                    
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
                        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
                        method: 'post',
                        data: {
                            contents: [{ parts: [{ text: prompts.conclusion }] }],
                        },
                    }),
                    axios({
                        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
                        method: 'post',
                        data: {
                            contents: [{ parts: [{ text: prompts.recommendation }] }],
                        },
                    }),
                    axios({
                        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
                        method: 'post',
                        data: {
                            contents: [{ parts: [{ text: prompts.trend }] }],
                        },
                    })
                ]);


                setAnswerConclusion(conclusionRes.data.candidates[0].content.parts[0].text);

                setAnswerRecommendation(recommendationRes.data.candidates[0].content.parts[0].text);

                setAnswerTrend(trendRes.data.candidates[0].content.parts[0].text);
                
        
            } catch (error) {
                console.error("Error generating AI content:", error);
                setAnswerConclusion('This report, generated on 16/11/2024, highlights a critical network security situation. The EyeSeeYou intrusion detection system identified a large number of alerts, categorizing the network status as "Bad." Significant threats originated from specific internal addresses, primarily targeting each other. The high volume of critical and high-severity alerts, along with frequent occurrences of Information Leaks and Miscellaneous activity, indicates urgent vulnerabilities that need immediate attention. The detailed breakdown of threats and alert types should guide efforts to prioritize remediation and strengthen the overall security of the network.')
                setAnswerRecommendation('To prevent future incidents, it is essential to implement a comprehensive, multi-layered security approach. This includes deploying and regularly updating robust firewalls, strengthening access controls with strong passwords and multi-factor authentication, and refining intrusion detection system rules to better identify and block suspicious activities. Routine security audits and vulnerability scans should be conducted to proactively address potential weaknesses, while employee security awareness training ensures users can recognize and report phishing and social engineering attacks. Additionally, integrating a Security Information and Event Management (SIEM) system will provide a comprehensive view of network security, while employing intrusion prevention systems, firewalls, and network segmentation will help isolate vulnerable hosts and block connections from identified threats.')
                setAnswerTrend('Analysis reveals a high volume of network alerts, signaling a compromised network status. The relationship between threat sources and targeted hosts suggests potential internal attacks or compromised machines acting as both attackers and victims. The majority of alerts are classified as Medium and High severity, with Miscellaneous activity and Information Leaks being the most prevalent alert types. This suggests that the attacks are widespread and possibly less focused, rather than highly targeted and sophisticated. The number of Critical alerts is notably high, emphasizing the urgency of addressing severe threats. Immediate attention is required to mitigate these risks and enhance overall network security.')
            }
        };
        generateAIContent()

    }, [isDataLoaded, alertsOverview, trendAttacks, srcAndDstIP, pdfDate, pdfTime]);

    const handlePrint = () => {
        PDF(alertsOverview.critical, alertsOverview.high, alertsOverview.med, alertsOverview.low, trendAttacks, networkStatus, srcAndDstIP, answerRecommendation, answerConclusion, answerTrend, alertsStatus.open, alertsStatus.inProgress, alertsStatus.resolved, alertsStatus.falsePositive, severityLevel, predictedAttack, formattedConfidence)
    };

    
  return (
    <div className= {darkMode ? 'dark' : ''}>
        <Header />  
        <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 sm:px-6 md:px-8 lg:px-12">
                {/* Dashboard text and current date and time */}
                <div className="flex mt-4 mb-4">
                    <p className="min-w-max text-2xl">PDF REPORT</p>
                    <button onClick={handlePrint} className='ml-2 ' title='Download here'  disabled={isLoading}>
                        <svg className="w-6 h-6 text-gray-800 hover:text-blue-700 dark:text-white dark:hover:text-blue-700 justify-start transition duration-300 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clipRule="evenodd"/>
                            <path fillRule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
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
                        <div className="flex flex-col h-[1100px] bg-white shadow-lg rounded-lg">
                            <div className='flex-grow overflow-hidden px-14 py-10'>
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
                                        <span className="w-48">Open</span>: {alertsStatus.open}
                                    </li>
                                    <li className="text-[11px]">
                                        <span className="w-48">In Progress</span>: {alertsStatus.inProgress}
                                    </li>
                                    <li className="text-[11px]">
                                        <span className="w-48">Resolved</span>: {alertsStatus.resolved}
                                    </li>
                                    <li className="text-[11px]">
                                        <span className="w-48">False Positive</span>: {alertsStatus.falsePositive}
                                    </li>
                                </ul>

                                
                                {/* ML analysis */}
                                <h3 className="text-[13px] font-semibold mt-4">2.3 Analysis of Historical Patterns</h3>
                                <p className="text-[11px] text-gray-800">Following up on the recent analysis, the system has detected an {predictedAttack} pattern with a HIGH severity level. The confidence level of the detection stands at {formattedConfidence}%, indicating a significant risk.</p>
                                <ul className="list-disc list-inside ml-4">
                                    <li className="text-[11px]">
                                        <span className="w-48">Pattern Detected</span>: {predictedAttack}
                                    </li>
                                    <li className="text-[11px]">
                                        <span className="w-48">Confidence Level</span>: {formattedConfidence}
                                    </li>
                                    <li className="text-[11px]">
                                        <span className="w-48">Severity Level</span>: {severityLevel}
                                    </li>
                                </ul>
                            </div>
                            <footer className="text-[9px] px-14 py-10"> © 2024 EyeSeeYou. All rights reserved.</footer> 
                        </div>

                        {/* Page 2 */}
                        <div className="h-[1100px] bg-white shadow-lg rounded-lg flex flex-col mb-8">
                            <div className='flex-grow overflow-hidden px-14 py-10'>
                                {/* Recent Threat Trends */}
                                <h3 className="text-[13px] font-semibold mt-4">2.4 Recent Trending Attacks</h3>
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
                                    <li className="text-[11px] mt-2">Emerging Threat Patterns:</li>
                                    <p className="text-[11px] text-gray-800 text-justify">{answerTrend}</p>
                                </ul>
                                
                                
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