"use client";

import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios'
import '../App.css';
import '../index.css';

// image
// import dog from '../images/dog.png'
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
        localStorage.setItem('accesstoken', response.data.token.access);
        localStorage.setItem('refreshtoken', response.data.token.refresh);
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


        {/* login section */}
        <div ref={loginSection}  className='pt-32 px-8 lg:px-5 backdrop-blur-sm pointer-events-none' >
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
      </div>
    );
}

export default LoginUI