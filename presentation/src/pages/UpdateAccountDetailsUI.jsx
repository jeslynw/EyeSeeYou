import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useTheme } from '../components/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkIfTokenExpired } from "../App";

function UpdateAccountDetailsUI() {
  const { darkMode } = useTheme();

  // navigation button
  const navigate = useNavigate();
  const navigateToAccountDetails = () => {
    navigate('/viewaccountdetails');
  };

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [type, setType] = useState('');
  const [plan_type, setPlan] = useState('');
  const [error, setError] = useState('');
  const [formFilled, setFormFilled] = useState(false);

  const access_token = sessionStorage.getItem('accesstoken');

  useEffect(() => {
    // redirect to login page if no access token
    if (!access_token) {
      navigate('/loginUI');
    }

    checkIfTokenExpired(access_token); 

    if (access_token) {
      axios
        .get('http://34.124.131.244:5000/viewaccountdetails', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const currentUser = response.data;
            setFullname(currentUser.full_name);
            setUsername(currentUser.username);
            setEmail(currentUser.email);
            setPhone(currentUser.phone);
            setOrganisation(currentUser.organisation_name);
            setType(currentUser.profile_name);
            setPlan(currentUser.plan_type);
          }
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
          setError('Failed to fetch user info.');
        });
    } else {
      setError('No token found. Please log in.');
    }
  }, [access_token]);

  useEffect(() => {
    if (formFilled) {
      setFormFilled(false);
    }
  }, [formFilled]);

  // Handle submit
  function validatesAccountDetails(event) {
    event.preventDefault();
    setFormFilled(true);

    // Check if all fields are filled
    if (!fullname || !username || !email || !phone) {
      setError('Please enter the required fields.');
      return;
    }

    // Check if the phone number is in number format
    if (!/^\d+$/.test(phone)) {
      setError('Please enter only numbers in the phone number field.');
      return;
    }

    axios
      .post(
        `http://34.124.131.244:5000/updateaccountdetails`,
        {
          full_name: fullname,
          username: username,
          password: password,
          email: email,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        if (response.data) {
          displaySuccessMessage();
        } else {
          displayErrorMessage();
        }
      })
      .catch((error) => {
        console.error('Error updating account:', error);
        setError('An error occurred during the update process.');
      });
  }

  function displayErrorMessage() {
    setError('Account details not updated!');
  }

  function displaySuccessMessage() {
    setError('');
    navigateToAccountDetails();
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header />

      <div
        className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-8 md:px-12 pb-0"
        style={{ minHeight: 'calc(100vh - 60px)' }}
      >
        <form onSubmit={validatesAccountDetails}>
          {/* account details text */}
          <div className="flex w-full justify-between items-center mt-4 mb-4">
            <p className="text-2xl">ACCOUNT DETAILS</p>
          </div>

          <div className="bg-white dark:bg-[#252628] border-2 border-[#e7e7e7] dark:border-[#353535] text-black dark:text-white items-center rounded-xl shadow-lg dark:shadow-[#353535] w-full px-6 py-4 ">
            <p className="text-xl mt-5 mb-8">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Full Name</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Username</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Email Address</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Phone Number</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Password</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Organisation</p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">{organisation}</p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Type</p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">{type}</p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Plan</p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">{plan_type}</p>
              </div>
            </div>

            {/* Return Message */}
            {error && (
              <div
                className={`text-sm text-center mt-2 ${
                  formFilled ? "text-green-500" : "text-red-500"
                }`}
              >
                {error}
              </div>
            )}
          </div>

          <div className="w-full flex justify-end mt-4 gap-4">
            <button
              onClick={navigateToAccountDetails}
              className="px-4 py-2 text-sm text-white bg-gray-600 hover:bg-gray-500 rounded-md"
              type="button"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-400 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAccountDetailsUI;
