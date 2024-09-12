"use client";

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios'
import '../App.css';
import '../index.css';
import FooterUI from '../components/FooterUI.js';

// image
import logo from '../images/logo.png'

// graph, chart, etx
import HardcodeBarChart from '../components/HardcodeBarChart';
import HardCodePieChart from '../components/HardCodePieChart';
import HardcodeHorizontalBarChart from '../components/HardcodeHorizontalBarChart';
import HardCodeRealtime from '../components/HardCodeRealtime';

// flowbite
import { Button, Card, Label, TextInput } from "flowbite-react";


function LoginUI() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

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

  // navbar login button (to scroll to login section)
  const loginSection = useRef(null);
  const handleScrollToLogin = () => {
    if (loginSection.current){
      loginSection.current.scrollIntoView({behavior: 'smooth'});
    }
  }

  // handle login button
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (!username || !password){
      displayErrorMessage();
      return;
    }

    try {
      console.log("username", username)
      console.log("password", password)
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.message === "Login successful") {
        console.log("Login successful");
        console.log("access", response.data.token.access)
        console.log("refresh", response.data.token.refresh)
        sessionStorage.setItem('accesstoken', response.data.token.access);
        sessionStorage.setItem('refreshtoken', response.data.token.refresh);
        redirectToDashboard()
      } else {
        console.log("response", response.status)
        console.log("response", response.data.message)
        displayErrorMessage()
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError("Login failed. Please try again.");
    }
  };

  function displayErrorMessage(){
    setError("Incorrect username or password");
  }

  function redirectToDashboard(){
    window.location.href = '/nadashboard'
  }

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
              <button onClick={handleScrollToLogin} className="btn-custom w-32 h-12 rounded-[10px] text-white cursor-pointer transition-all duration-1000 overflow-hidden relative hover:bg-right active:scale-95">
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


        {/* impact */}
        <div className='bg-[#1d1d1d] backdrop-blur-sm '>
          <div className='grid grid-cols-5  text-white px-8 lg:px-5 h-36 lg:h-44 items-center border-y-4 border-transparent glow-border rounded-lg'> 
            <div className='text-white '>
              <p className='flex lg:text-4xl text-3xl justify-center text-[#26baff]'>100+</p>
              <p className='flex lg:text-sm text-[10px] md:text-xs justify-center text-center mt-2'>Organization Protected</p>
            </div>
            <div className='text-white'>
            <p className='flex lg:text-4xl text-3xl justify-center text-[#26baff]'>5K+</p>
            <p className='flex lg:text-sm text-[10px] md:text-xs justify-center text-center mt-2'>Devices Monitored</p>
            </div>
            <div className='text-white'>
            <p className='flex lg:text-4xl text-3xl justify-center text-[#26baff]'>60K+</p>
            <p className='flex lg:text-sm text-[10px] md:text-xs justify-center text-center mt-2'>Threats Detected</p>
            </div>
            <div className='text-white'>
            <p className='flex lg:text-4xl text-3xl justify-center text-[#26baff]'>24/7</p>
            <p className='flex lg:text-sm text-[10px] md:text-xs justify-center text-center mt-2'>Real-Time Monitoring</p>
            </div>
            <div className='text-white'>
            <p className='flex lg:text-4xl text-3xl justify-center text-[#26baff]'>98%</p>
            <p className='flex lg:text-sm text-[10px] md:text-xs justify-center text-center mt-2'>Customer Satisfaction</p>
            </div>
          </div>

          <div className='mt-24 pointer-events-none'></div>


          {/* features */}
          <div className=' text-white px-8 lg:px-5'> 
            <p className='flex justify-center text-center text-white text-3xl font-semibold'>Explore The Power Behind Network Security</p>

            <div className='mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mx-12 gap-6'>
              <div className='text-white p-8 bg-[#74B1B9] rounded-xl'>
                <svg className='w-12 h-12 text-[#1d1d1d]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <p className='mt-3 text-lg font-semibold text-[#1d1d1d]'>Traffic Monitoring</p>
                <p className='mt-2 text-sm text-[#1d1d1d]'>Proactively detect and stop threats by continuously analyzing network traffic for suspicious activity.</p>
              </div>

              <div className='text-white p-8 bg-[#40656A] rounded-xl'>  
                <svg className='w-12 h-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>

                <p className='mt-3 text-lg font-semibold'>Events Detection</p>
                <p className='mt-2 text-sm'>Gain deep insights into network behavior with detailed event logging and analysis.</p>
              </div>

              <div className='text-white p-8 bg-[#289EAE] rounded-xl'>
                <svg className='w-12 h-12 text-[#1d1d1d]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <p className='mt-3 text-lg font-semibold text-[#1d1d1d]'>Alerts Notification</p>
                <p className='mt-2 text-sm text-[#1d1d1d]'>Stay informed with real-time alerts that instantly notify you of potential threats, allowing for rapid response.</p>
              </div>
            </div>

          </div>





        


          {/* login section */}
          <div ref={loginSection}  className='pt-32 px-8 lg:px-5 pointer-events-none' >
            <p className='flex justify-center text-center text-white text-3xl font-semibold'>Ready To Secure Your Network?</p>
            <div className='flex w-full justify-center mt-14 '>
              <Card className="max-w-md w-full bg-transparent border border-[#4F4F4F] pointer-events-auto">
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Username" className='text-white'/>
                    </div>
                      <TextInput
                        id = "username"
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                      />              
                    </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password1" value="Password" className='text-white'/>
                    </div>
                      <TextInput
                        id = "password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />              
                    </div>

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className='mt-4'>Log In</Button>
                </form>
            </Card>
          </div>

          <div className='p-10 backdrop-blur-sm'></div>

          </div>
          
          <FooterUI className="pointer-events-none"/>

        </div>
        
        
      </div>
    );
}

export default LoginUI