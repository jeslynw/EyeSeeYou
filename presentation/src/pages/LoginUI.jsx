import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import '../App.css';
import '../index.css';

// image
import bg from '../images/bg.jpg'

// flowbite
import { Button, Card, Label, TextInput } from "flowbite-react";

function LoginUI() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [otpMessage, setOtpMessage] = useState("");
  const [profileId, setProfileId] = useState('')

  const navigate = useNavigate();
  const navigateLandingPage = () => {
    navigate('/');
  }

  // handle login button
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission
    setError(""); // clear existing error message
    setOtpMessage("verifying...");
    if (!username || !password || !otp) {
      setError("Please fill in all fields.");
      setOtpMessage("");
      return;
    }

    try {      
      const response = await axios.post('http://34.124.131.244:5000/login', {
        username: username,
        password: password,
        otp: otp,
        profileId: profileId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.message === "Login successful") {
        sessionStorage.setItem("accesstoken", response.data.token.access);
        sessionStorage.setItem("refreshtoken", response.data.token.refresh);
        sessionStorage.setItem("userrole", response.data.profileId);

        setProfileId(response.data.profileId);
        redirectToDashboard(response.data.profileId);
      } else if (response.data.message === "Invalid OTP") {
        setError("The OTP entered is incorrect.");
        setOtpMessage("");
      } else {
        setError("Incorrect login credentials. Please try again.");
        setOtpMessage("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Login failed. Please try again.");
      setOtpMessage("");
    }
  };

  const sendOtp = async (event) => {
    event.preventDefault(); // Prevent form submission
    setError("");
    setOtpMessage("Sending...");
    if (!username || !password) {
      setError("Please enter your username and password first.");
      setOtpMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://34.124.131.244:5000/sendotp",
        {
          username: username,
          password: password,
          // otp: otp
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.message === "OTP sent") {
        setOtpMessage(`OTP has been sent to ${response.data.email}`);
      } else {
        setError(`${response.data.message}`);
        setOtpMessage("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("Incorrect username or password. Please try again.");
      setOtpMessage("");
    }
  };

  function redirectToDashboard(profileId){
    if (profileId === 1){
      window.location.href = '/nadashboard'
    }
    else if (profileId === 2){
      window.location.href = '/mdashboard'
    }
  }

  return (
    <div className='bg-'>
        {/* login section */}
        <div className='relative' >
          <div class="bg-cover bg-center h-screen" >
            <img src={bg} alt="Background" className="w-full h-full object-cover absolute inset-0" />
          </div>
          
          <div className="absolute inset-0 flex flex-col justify-center items-center">
              <p className='flex justify-center text-center text-white text-3xl font-semibold'>Ready To Secure Your Network?</p>
              <Card className="max-w-md w-full mt-14 bg-white border border-[#4F4F4F]">
                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Username" className='text-black'/>
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
                      <Label htmlFor="password1" value="Password" className='text-black'/>
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
                  <div>
                    <div className=" mb-2 block">
                      <Label htmlFor="otp" value="OTP" className='text-black'/>
                    </div>
                    <div className='flex w-full'>
                      <TextInput
                        id = "otp"
                        type="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(event) => setOtp(event.target.value)}
                        
                        className='w-2/3'
                      />
                      <Button
                        onClick={sendOtp}
                        className="ml-3 w-1/3 text-sm bg-[#ffffff] enabled:hover:bg-[#ffffff] text-black hover:text-[#0e7490] enabled:outline-gray-300">
                        Send OTP
                      </Button>    
                    </div>    
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </div>  
                  )}


                  {/* OTP Sent Message */}
                  {otpMessage && (
                    <div className="text-blue-500 text-sm text-center mt-2">{otpMessage}</div>
                  )}

                  <Button type="submit" className='mt-4'>Log In</Button>
                  <Button onClick={navigateLandingPage} className='bg-[#aaaaaa] enabled:hover:bg-[#8b8b8b]'>Cancel</Button>
                </form>
            </Card>
          </div>
      </div>
    </div>
  )
}

export default LoginUI