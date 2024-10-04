import React, { useState } from 'react';
import Header from '../components/Header';
import { useTheme } from '../components/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
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
  const [error, setError] = useState({});
  const [formFilled, setFormFilled] = useState('');

  const access_token = sessionStorage.getItem('accesstoken');

  useEffect(() => {
    // redirect to login page if no access token
    if (!sessionStorage.getItem('accesstoken')) {
      navigate('/loginUI');
    }

    checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

    // const access_token = sessionStorage.getItem('accesstoken');

    if (access_token) {
      console.log('Access found:', access_token);
      axios
        .get('http://127.0.0.1:5000/viewaccountdetails', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const currentUser = response.data;
            const user_id = response.data.logged_in_as;
            console.log(`User: ${user_id}`);
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
        });
    } else {
      console.error('No token found. Please log in.');
    }
  }, [access_token]);

  useEffect(() => {
    if (formFilled) {
      // Reset formFilled after validation
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

    try {
      axios
        .post(
          `http://127.0.0.1:5000/updateaccountdetails`,
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
          console.log('Account details updated successfully:', response.data);
          if (response.data) {
            displaySuccessMessage();
          } else {
            displayErrorMessage();
            console.log(error, 'Credentials not updated!');
          }
        })
        .catch((error) => {
          console.log(error, 'error');
          displayErrorMessage();
        });
    } catch (error) {
      setError('An error occurred during the update process.');
    }
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
        {/* NOTE: edit the form action attribute to handle where the data being submitted*/}
        <form action="{handleSubmit}">
          {/* account details text */}
          <div className="flex w-full justify-between  items-center mt-4 mb-4">
            <p className="text-2xl">ACCOUNT DETAILS</p>
          </div>

          {/* NOTE: having trouble adjusting the width on this line below, rmb to test the dynamic part as well. */}
          <div className="bg-white dark:bg-[#252628] border-2 border-[#e7e7e7] dark:border-[#353535] text-black dark:text-white items-center rounded-xl shadow-lg dark:shadow-[#353535]  w-full px-6 py-4 ">
            <p className="text-xl mt-5 mb-8">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Full Name
                </p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                {error.fullname && (
                  <p className="text-red-500 text-sm">{error.fullname}</p>
                )}
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Username
                </p>
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
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Email Address
                </p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Phone Number
                </p>
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
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Password
                </p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Organisation
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">
                  {organisation}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Type
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">
                  {type}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Plan
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">
                  {plan_type}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-4 gap-4">
            <button
              onClick={navigateToAccountDetails}
              className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none cursor-pointer"
            >
              Cancel
            </button>
            <input
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer"
              value="Save Changes"
              onClick={validatesAccountDetails}
            />
          </div>
        </form>

        <div className="pb-10"></div>
      </div>
    </div>
  );
}

export default UpdateAccountDetailsUI;
