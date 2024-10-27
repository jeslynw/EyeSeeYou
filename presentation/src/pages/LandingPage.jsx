"use client";

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import '../App.css';
import '../index.css';
import FooterUI from '../components/FooterUI.jsx';
import PrivacyPolicy from '../components/PrivacyPolicy.jsx';

// image
import logo from '../images/logo.png'

// graph, chart, etx
import HardcodeBarChart from '../components/HardcodeBarChart.jsx';
import HardCodePieChart from '../components/HardCodePieChart.jsx';
import HardcodeHorizontalBarChart from '../components/HardcodeHorizontalBarChart.jsx';
import HardCodeRealtime from '../components/HardCodeRealtime.jsx';
import PricingPlan from '../components/PricingPlan.jsx';
import FeedbackContainer from '../components/FeedbackContainer.jsx';

function LandingPage() {
  // navigation button
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/loginUI');
  }

  // animated background
  useEffect(() => {
    const bgAnimation = document.getElementById('bgAnimation');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const boxSize = 40; // Adjust this value to change the size of each color box
    
    const columns = Math.ceil(windowWidth / boxSize);
    const rows = Math.ceil(windowHeight / boxSize);
    const numberOfColorBoxes = columns * rows;
  
    bgAnimation.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    bgAnimation.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < numberOfColorBoxes; i++) {
      const colorBox = document.createElement('div');
      colorBox.classList.add('colorBox');
      bgAnimation.append(colorBox);
    }
  }, []);

  const dataImpact = [
    {
      'amount': ['100+', '5K+', '60K+', '24/7', '98%'],
      'description': ['Organization Protected', 'Devices Monitored', 'Threats Detected', 'Real-Time Monitoring', 'Customer Satisfaction']
    }
  ]
  
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
    <div className="relative overflow-hidden">
          {/* animated background */}
          <div id="bgAnimation" className="absolute top-0 left-0 w-full h-full grid bg-[#1d1d1d] saturate-200">
              <div className="backgroundAnim absolute top-0 left-0 w-full h-10 bg-[#00bfff] blur-[60px] animate-animBack"></div>
          </div>

          {/* <div className="flex container mx-4 px-4 backdrop-blur-sm pointer-events-none"> */}
          <div className="flex max-w-full px-8 md:px-12 h-28 backdrop-blur-sm">
            <nav className="flex w-full justify-between items-center">
              <div className="flex items-center">
                <img src={logo} alt="logo" className="w-12 h-10" />
                <p className="text-[25px] text-white font-SansitaSwashed ml-5">EyeSeeYou</p>
              </div>
              <button onClick={navigateLogin} className="btn-custom w-32 h-12 rounded-[10px] text-white cursor-pointer transition-all duration-1000 overflow-hidden relative hover:bg-right active:scale-95">
                <span className="absolute inset-0 flex items-center justify-center w-[97%] h-[90%] m-auto rounded-lg bg-[#141414] bg-opacity-85 transition-all duration-1000">
                  Log In
                </span>
              </button>
            </nav>
          </div>
      
      
        {/* title & subtitle */}
        <div className="w-full h-full max-h-full max-w-full px-8 lg:px-0 backdrop-blur-sm pointer-events-none">
          <div className="flex justify-center items-center text-center pointer-events-none">
            {/* h-[calc(100vh-100px)]  */}
            <div className='mt-14'>
              <p className='text-white text-[40px] font-semibold'>
                Unlock Complete Network Visibility With <br/> EyeSeeYou Web-Based IDS
              </p>
              <p className='text-white text-lg mt-8'>Experience unparalleled protection and insights with our user-friendly <br/>  IDS dashboard designed to safeguard your network</p>
            </div>
          </div>
        </div>

        {/* a glimpse of chart, graph, etc */}
        <div className='flex px-8 lg:px-0 justify-center backdrop-blur-sm pointer-events-none'>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-24 gap-7 w-max pointer-events-auto'>
            <HardcodeBarChart/>
            <HardCodePieChart/>
            <HardcodeHorizontalBarChart/>
            <HardCodeRealtime/>
          </div>
        </div>

        <div className='pt-24 backdrop-blur-sm pointer-events-none'></div>


        {/* without animated background */}
        <div className='backdrop-blur-sm bg-[#1d1d1d]'>
          {/* impact */}
          <div  className='grid grid-cols-5 bg-[#0D1821] text-white px-8 lg:px-5 h-36 lg:h-44 items-center border-y-4 border-transparent glow-border rounded-lg'> 
            {dataImpact[0].amount.map((amount, index) => (
              <div key={index} className='text-white text-center'>
                <p className='flex lg:text-4xl text-3xl justify-center text-[#26baff]'>{amount}</p>
                <p className='flex lg:text-sm text-[12px] md:text-xs justify-center text-center mt-2'>{dataImpact[0].description[index]}</p>
              </div>
            ))}
          </div>

          <div className='mt-36 pointer-events-none'></div>

          {/* features */}
          <div className='text-white px-8 lg:px-5'> 
            <p className='flex justify-center text-center text-white text-3xl font-semibold'>Explore The Power Behind Network Security</p>

            <div className='mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-12 gap-6'>
              <div className='text-[#1c6485]  p-8 bg-[#74B1B9] rounded-xl'>
                <svg className='w-12 h-12' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 20.293l-4.75-4.75a7.5 7.5 0 1 0-1.414 1.414L19.586 21l1.414-1.414zM10 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" fill="#1c6485"/>
                </svg>
                <p className='mt-3 text-lg font-semibold'>Signature-based Detection</p>
                <p className='mt-2 text-sm'>Identifies known threats by comparing network traffic against a database of predefined attack signatures.</p>
              </div>  

              <div className='text-[#9ecbd1] p-8 bg-[#40656A] rounded-xl'>
                <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <p className='mt-3 text-lg font-semibold'>Traffic Monitoring</p>
                <p className='mt-2 text-sm'>Proactively detect and stop threats by continuously analyzing network traffic for suspicious activity.</p>
              </div>

              <div className='text-[#184452]  p-8 bg-[#289EAE] rounded-xl'>  
                <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#184452">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
                <p className='mt-3 text-lg font-semibold'>Events Detection</p>
                <p className='mt-2 text-sm'>Gains deep insights into network behavior with detailed event logging and analysis.</p>
              </div>

              <div className='text-[#184452] p-8 bg-[#289EAE] rounded-xl'>
                <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#184452">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <p className='mt-3 text-lg font-semibold'>Alerts Notification</p>
                <p className='mt-2 text-sm'>Stays informed with real-time alerts that instantly notify you of potential threats, allowing for rapid response.</p>
              </div>

              <div className='text-[#1c6485]  p-8 bg-[#74B1B9] rounded-xl'>
                <svg className='w-12 h-12' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12l4 4 8-8 4 4" stroke="#1c6485" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 20H4" stroke="#1c6485" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className='mt-3 text-lg font-semibold'>Trending Attacks</p>
                <p className='mt-2 text-sm'>Highlights real-time patterns and frequencies of emerging threats, stay ahead of evolving attacks to better protect your network.</p>
              </div>

              <div className='text-[#9ecbd1] p-8 bg-[#40656A] rounded-xl'>
                <svg className='w-12 h-12' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V12L16 14" stroke="#9ecbd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 21C6.48 21 2 16.52 2 12S6.48 3 12 3s10 4.48 10 9-4.48 9-10 9z" stroke="#9ecbd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className='mt-3 text-lg font-semibold'>Log In History</p>
                <p className='mt-2 text-sm'>Monitors user access by tracking successful and failed login attempts to identify potential unauthorized access.</p>
              </div>
            </div>
          </div>

          <div className='pt-16 pointer-events-none'></div>

          {/* User feedback */}
          <FeedbackContainer />

          <div className='pt-16 pointer-events-none'></div>

          {/* pricing plan */}
          <section id='pricingPlan'>
            <div className='text-white px-8 lg:px-5'> 
              <p className='flex justify-center text-center text-white text-3xl font-semibold'>Pricing Plans</p>
              <div className='mt-14'>
                <PricingPlan/>
              </div>
            </div>
          </section>

          <div className='mt-24 pointer-events-none'></div>

          <FooterUI openPrivacyModal={openPrivacyModal} className="pointer-events-none"/>

        </div>
        
        <PrivacyPolicy isOpen={isPrivacyModalOpen} closeModal={closePrivacyModal} />

      </div>
    );
}

export default LandingPage