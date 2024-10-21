    // import React, { useState, useEffect } from 'react'
    // import axios from "axios"
    // import { GoogleGenerativeAI } from "@google/generative-ai"


    // function Qachat ({criticalCount, highCount, mediumCount, lowCount, trendAttacks, networkStatus, srcAndDstIP, pdfDate, pdfTime, setAnswerConclusion, setAnswerRecommendation}) {
    //     const genAI = new GoogleGenerativeAI('AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY');
    //     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                
    //     const topSrcIpList = srcAndDstIP.map((ip) => `${ip.src_addr} with the count ${ip.count_src_addr}`).join(', ');
    //     const topDstIpList = srcAndDstIP.map((ip) => `${ip.dst_addr} with the count ${ip.count_dst_addr}`).join(', ');
    //     const trendAttacksList = trendAttacks.map((ip) => `${ip.class} with the count ${ip.count}`).join(', ');

    //     const conclusion = `
    //         Write me a paragraph for the conclusion for the below context. Don't use punctuation.
    //         Must say something about like Conclusion is generated at ${pdfDate}, ${pdfTime} at the start.
            
    //         Context: This report provides a comprehensive real time overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of ${criticalCount + highCount + mediumCount + lowCount} alerts, with network status ${networkStatus}.
    //         The top threat sources are ${topSrcIpList}. The top targeted hosts are ${topDstIpList}.
    //         EyeSeeYou system detected a total of ${criticalCount + highCount + mediumCount + lowCount} alerts categorized by severity as follows: Critical: ${criticalCount}, High:${highCount} , Medium:${mediumCount}, Low:${lowCount}. 
    //         Furthermore, EyeSeeYou detected most frequent alert types which are ${trendAttacksList}.
    //         `

    //     const recommendation = `
    //         Write me a paragraph for the recommendation action for the below context. Don't use punctuation. Dont repeat the context, give your solution
    //         Must say: Starts with recommended action ...
            
    //         Context: This report provides a comprehensive real time overview of network activity monitored by the EyeSeeYou intrusion detection system. It highlights recent security alerts, trends in network activity, and recommendations for enhancing overall security posture. Over the reporting period, the system detected a total of ${criticalCount + highCount + mediumCount + lowCount} alerts, with network status ${networkStatus}.
    //         The top threat sources are ${topSrcIpList}. The top targeted hosts are ${topDstIpList}.
    //         EyeSeeYou system detected a total of ${criticalCount + highCount + mediumCount + lowCount} alerts categorized by severity as follows: Critical: ${criticalCount}, High:${highCount} , Medium:${mediumCount}, Low:${lowCount}. 
    //         Furthermore, EyeSeeYou detected most frequent alert types which are ${trendAttacksList}.
    //     `

    //     // console.log("conclusion:     ", conclusion)
    //     // console.log("recommendtion:   ", recommendation)


    //     useEffect(() => {
    //         const fetchData = async () => {
    //             // const result = await model.generateContent(recommendation);
    //             // console.log(result.response.text());
    //             try {
    //                 const response = await axios({
    //                     url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY',
    //                     method: 'post',
    //                     data: {
    //                         contents: [ 
    //                             { parts: [{ text: conclusion }] },
    //                         ],
    //                     },
    //                 });
    //                 setAnswerConclusion(response.data.candidates[0].content.parts[0].text);
    //             } catch (error) {
    //                 console.error("Error fetching data from API for conclusion:", error);
    //                 setAnswerConclusion("Error generating content for conclusion.");
    //             }

    //             try {
    //                 // Fetch answer for the second question
    //                 const response2 = await axios({
    //                     url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyANU7EYJW1fcoJfzeJmWJQi5qgcSboZ3tY',
    //                     method: 'post',
    //                     data: {
    //                         contents: [
    //                             { parts: [{ text: recommendation }] },
    //                         ],
    //                     },
    //                 });
    //                 setAnswerRecommendation(response2.data.candidates[0].content.parts[0].text);
    //             } catch (error) {
    //                 console.error("Error fetching data from API for recommendation:", error);
    //                 setAnswerRecommendation("Error generating content for recommendation.");
    //             }
    //         };

    //         fetchData();
    //     }, []);
                
    // }

    // export default Qachat