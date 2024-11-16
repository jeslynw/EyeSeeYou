import React from 'react';
import { useState } from 'react';
import Header from '../components/Header';
import { useTheme } from '../components/ThemeProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkIfTokenExpired } from "../App";

function ViewAccountDetailsUI() {
  const { darkMode } = useTheme();

  // navigation button
  const navigate = useNavigate();
  const navigateEditButton = () => {
    navigate('/updateaccountdetails');
  };

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [type, setType] = useState('');
  const [plan_type, setPlan] = useState('');

  // redirect to login page if no access token
  if (!sessionStorage.getItem('accesstoken')) {
    navigate('/loginUI');
  }
  
  checkIfTokenExpired(sessionStorage.getItem('accesstoken')); 

  const access_token = sessionStorage.getItem('accesstoken');

  if (access_token) {
    // console.log('Access found:', access_token);
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
          const user_id = response.data.logged_in_as;
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

  function displayAccountDetails() {
    return (
      <div className={`${darkMode ? 'dark' : ''}`}>
        <Header />

        <div
          className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-8 md:px-12 pb-0"
          style={{ minHeight: 'calc(100vh - 60px)' }}
        >
          {/* account details text */}
          <div className="flex w-full justify-between  items-center mt-4 mb-4">
            <p className="text-2xl">ACCOUNT DETAILS</p>
          </div>

          <div className="bg-white dark:bg-[#252628] border-2 border-[#e7e7e7] dark:border-[#353535] text-black dark:text-white items-center rounded-xl shadow-lg dark:shadow-[#353535] w-full px-6 py-4 ">
            {/* edit button */}
            <div className="flex float-end">
              <button
                onClick={navigateEditButton}
                className="flex items-center h-9 pl-4 pr-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300 "
              >
                Edit
                <svg
                  className="w-6 h-6 ml-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="  round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  />
                </svg>
              </button>
            </div>

            {/* credentials */}
            <p className="text-xl mt-5 mb-8">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Full Name
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {fullname}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Username
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {username}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Email Address
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {email}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Phone Number
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {phone}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Password
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4"></p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Organisation
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {organisation}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Type
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {type}
                </p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">
                  Plan
                </p>
                <p className="block text-sm font-medium dark:font-normal mb-4">
                  {plan_type}
                </p>
              </div>
            </div>
          </div>

          <div className="pb-10"></div>
        </div>
      </div>
    );
  }

  return displayAccountDetails();
}

export default ViewAccountDetailsUI;
