// import React, { useEffect, useState } from 'react';
// import logo from '../images/logo2.png'
// import Qachat from './Qachat';


// export const PDFPreview = ({criticalCount, highCount, mediumCount, lowCount, trendAttacks, networkStatus, srcAndDstIP, pdfDate, pdfTime, setAnswerConclusion, setAnswerRecommendation}) => {
//   // const totalAlerts = criticalCount + highCount + mediumCount + lowCount;
//   const [ answerConclusion, setAnswerConclusion1 ] = useState('')
//   const [ answerRecommendation, setAnswerRecommendation1 ] = useState('')

//   useState(()=>{
//     setAnswerConclusion1(answerConclusion)
//     setAnswerRecommendation1(answerRecommendation)
//   })

//   return (
//     // <div className='flex w-full justify-center'>
//     //   <div className="grid grid-cols-1 gap-8 lg:w-2/3 text-black">
//     //     {/* Page 1 */}
//     //     <div className="max-h-full bg-white shadow-lg rounded-lg px-14 py-10 ">
//     //       <div className='overflow-hidden'> {/* A4 height in pixels */}
//     //         {/* <div className='flex w-full justify-end mb-4'>
//     //           <div className="flex w-max h-9 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md">
//     //             <button onClick={handlePrint}>Print Report</button>
//     //           </div>
//     //         </div> */}

//     //         <div className="flex items-center mb-4">
//     //           <img src={logo} alt="Logo" className="w-10 h-8" />
//     //           <h1 className="text-xl ml-3 font-SansitaSwashed">EyeSeeYou</h1>
//     //         </div>

//     //         <h1 className="text-[20px] font-bold text-center">EyeSeeYou Network Analysis Report</h1>
//     //         <p className="text-[11px] text-gray-600 mt-7">Date: {pdfDate}</p>
//     //         <p className="text-[11px] text-gray-600">Reporting Period: {pdfTime}</p>

//     //         <h2 className="text-[15px] font-bold mt-6">Executive Summary</h2>
//     //         <p className="text-[11px] text-gray-800 text-justify">
//     //           This report provides a comprehensive overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of {totalAlerts} alerts, with network status {networkStatus}.
//     //         </p>

//     //         <h2 className="text-[15px] font-bold mt-6">1. Overview of Network Activity</h2>
//     //         <p className="text-[11px] text-gray-800">
//     //           During the reporting period, the EyeSeeYou dashboard tracked a variety of network activities, including:
//     //         </p>
//     //         <ul className="list-disc list-inside ml-4">
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Network Status</span>:
//     //             <span className='ml-1'>{networkStatus}</span>
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Source and Target IP Analysis</span>: 
//     //             <table className="min-w-max border border-gray-300 mb-4 mt-1 text-[11px]">
//     //               <thead>
//     //                 <tr className="bg-black text-white">
//     //                   <th className="border border-gray-300 px-4 py-2">Top Threat Sources</th>
//     //                   <th className="border border-gray-300 px-4 py-2">Count</th>
//     //                   <th className="border border-gray-300 px-4 py-2">Top Targeted Hosts</th>
//     //                   <th className="border border-gray-300 px-4 py-2">Count</th>
//     //                 </tr>
//     //               </thead>
//     //               <tbody>
//     //                 {srcAndDstIP.map((ip, index) => (
//     //                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//     //                     <td className="border border-gray-300 px-4 py-2">{ip.src_addr}</td>
//     //                     <td className="border border-gray-300 px-4 py-2">{ip.count_src_addr}</td>
//     //                     <td className="border border-gray-300 px-4 py-2">{ip.dst_addr}</td>
//     //                     <td className="border border-gray-300 px-4 py-2">{ip.count_dst_addr}</td>
//     //                   </tr>
//     //                 ))}
//     //               </tbody>
//     //             </table>
//     //           </li>
//     //         </ul>
//     //         <h2 className="text-[15px] font-bold">2. Incident Summary</h2>
            
//     //         <h3 className="text-[13px] font-semibold mt-1">2.1 Alert Breakdown</h3>
//     //         <p className="text-[11px] text-gray-800">
//     //           The EyeSeeYou system detected a total of {totalAlerts} alerts categorized by severity as follows:
//     //         </p>
//     //         <ul className="list-disc list-inside ml-4">
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Critical Alerts</span>: {criticalCount}
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">High Alerts</span>: {highCount}
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Medium Alerts</span>: {mediumCount}
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Low Alerts</span>: {lowCount}
//     //           </li>
//     //         </ul>

//     //         {/* Alert Status */}
//     //         <h3 className="text-[13px] font-semibold mt-4">2.2 Alert Status</h3>
//     //         <p className="text-[11px] text-gray-800">The following are the current statuses of the alerts:</p>
//     //         <ul className="list-disc list-inside ml-4">
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Open</span>:
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">In Progress</span>:
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">Resolved</span>: 
//     //           </li>
//     //           <li className="text-[11px]">
//     //             <span className="w-48">False Positive</span>:
//     //           </li>
//     //         </ul>

//     //         {/* Recent Threat Trends */}
//     //         <h3 className="text-[13px] font-semibold mt-4">2.2 Recent Threat Trends</h3>
//     //         <p className="text-[11px] text-gray-800">The following trends were observed in detected threats:</p>
//     //         <ul className="list-disc list-inside ml-4">
//     //           <li className="text-[11px]">Most Frequent Alert Types:</li>
//     //           <table className="min-w-max border border-gray-300 mb-4 text-[11px] mt-1">
//     //             <thead>
//     //               <tr className="bg-black text-white">
//     //                 <th className="border border-gray-300 px-4 py-2">Alert Type</th>
//     //                 <th className="border border-gray-300 px-4 py-2">Count</th>
//     //               </tr>
//     //             </thead>
//     //             <tbody>
//     //               {trendAttacks.map((attack, index) => (
//     //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//     //                   <td className="border border-gray-300 px-4 py-2">{attack.class}</td>
//     //                   <td className="border border-gray-300 px-4 py-2">{attack.count}</td>
//     //                 </tr>
//     //               ))}
//     //             </tbody>
//     //           </table>
//     //         </ul>
//     //         <footer className="text-[9px] mt-6 object-bottom"> © 2024 EyeSeeYou. All rights reserved.</footer> 
//     //       </div>
//     //     </div>

//     //     {/* Page 2 */}
//     //     <div className="h-[1100px] bg-white shadow-lg rounded-lg flex flex-col mb-8">
//     //       <div className='flex-grow overflow-hidden px-14 py-10'> {/* Main content section */}
//     //         <li className="text-[11px] mt-2">Emerging Threat Patterns:</li>
//     //         <p className="text-[11px] text-gray-800 text-justify">
//     //           EyeSeeYou has observed a significant rise in ransomware-as-a-service (RaaS) attacks, with a 40% increase in attempts to exploit vulnerabilities over the last quarter. This trend highlights the importance of regular system updates and strong security measures to protect against these threats. Additionally, there has been a 20% increase in phishing attacks that use social engineering tactics, particularly targeting employees through emails and social media. This trend emphasizes the need for better training and awareness to help staff recognize and avoid these types of scams.
//     //         </p>
//     //         <Qachat
//     //           criticalCount={criticalCount}
//     //           highCount={highCount}
//     //           mediumCount={mediumCount}
//     //           lowCount={lowCount}
//     //           trendAttacks={trendAttacks}
//     //           networkStatus={networkStatus}
//     //           srcAndDstIP={srcAndDstIP}
//     //           pdfDate={pdfDate}
//     //           pdfTime={pdfTime}
//     //           setAnswerConclusion = {setAnswerConclusion1}
//     //           setAnswerRecommendation = {setAnswerRecommendation1}
//     //         />
//     //         {answerConclusion}
//     //         {answerRecommendation}
//     //       </div>
//     //       <footer className="text-[9px] px-14 py-10"> © 2024 EyeSeeYou. All rights reserved.</footer> 
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default PDFPreview;
