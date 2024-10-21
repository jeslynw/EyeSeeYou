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
  const [profileId, setProfileId] = useState('')

  // const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // const handleChange = (index, value) => {
  //   // Update the OTP array
  //   const newOtp = [...otp];
  //   newOtp[index] = value.slice(0, 1); // Only allow one character
  //   setOtp(newOtp);

  //   // Move focus to the next input
  //   if (value && index < 3) {
  //     document.getElementById(`otp-${index + 1}`).focus();
  //   }
  // };

  const navigate = useNavigate();
  const navigateLandingPage = () => {
    navigate('/');
  }

  // handle login button
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent form submission
    if (!username || !password){
      displayErrorMessage();
      return;
    }

    try {      
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username: username,
        password: password,
        profileId: profileId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.message === "Login successful") {
        sessionStorage.setItem('accesstoken', response.data.token.access);
        sessionStorage.setItem('refreshtoken', response.data.token.refresh);
        sessionStorage.setItem('userrole', response.data.profileId);

        setProfileId(response.data.profileId)
        redirectToDashboard(response.data.profileId)
      } else {
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
                      <button className='ml-3 text-sm bg-[#fff7f7] text-black'>Send OTP</button>          
                    </div>    
                  </div>


                  {/* <div className='flex flex-col items-center justify-center h-screen'>
                    <div className='flex space-x-2'>
                      {otp.map((value, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`} // Unique ID for each input
                          type='text'
                          maxLength={1} // Only allow 1 character
                          value={value}
                          onChange={(e) => handleChange(index, e.target.value)}
                          className='w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                        />
                      ))}
                    </div>
                    <button
                      type='button'
                      onClick={() => alert(`OTP entered: ${otp.join('')}`)} // Example action on button click
                      className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    >
                      Send OTP
                    </button>
                  </div> */}

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </div>
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