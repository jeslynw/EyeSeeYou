import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Header from '../components/Header';
import axios from "axios";


import { useTheme } from "../components/ThemeProvider";

function FeedbackPage() {
  const access_token = sessionStorage.getItem('accesstoken');
  const refresh_token = sessionStorage.getItem('refreshtoken');

  const { darkMode } = useTheme();
  const [value, setValue] = React.useState(0);
  const [user_id, setUserId] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (access_token) {
      axios.get('http://127.0.0.1:5000/feedback', {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          const user_id = response.data.logged_in_as;
          setUserId(user_id); // Store user_id in state
          sessionStorage.setItem('user_id', user_id); // Store user_id in sessionStorage
          console.log(`User: ${user_id}`);
        }
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
    } else {
      console.error('No token found. Please log in.');
    }
  }, [access_token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const feedbackData = {
        user_id: sessionStorage.getItem('user_id'),
        rating: value,
        review: feedback
    };

    axios.post('http://127.0.0.1:5000/feedback', feedbackData, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => {
      console.log(response.data.message);
      //clear fields and log(or show) result
      setFeedback('');
      setValue(0);
      console.log('Rating submitted:', value);
      console.log('Review submitted:', feedback);
    })
    .catch(error => {
      console.error('Error submitting feedback:', error);
    });

    // console.log('Feedback submitted:', feedback);
  };


  return (
    <div className={darkMode ? 'dark' : ''}>
      <Header />
      
      <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-4 md:px-8 lg:px-12 pb-0" style={{ minHeight: 'calc(100vh - 60px)' }}>
        {/* Feedback text */}
        <div className="flex mt-4 mb-4">
          <p className="text-2xl">FEEDBACK</p>
        </div>
       
        <div className='flex items-center justify-center'>
          <form action="">
            {/* Container */}
            <div className='w-full max-w-4xl bg-white dark:bg-[#252628] border-2 border-[#e7e7e7] dark:border-[#353535] text-black dark:text-white rounded-xl shadow-lg dark:shadow-[#353535]'>
              <div className='px-4 py-8 md:px-6 md:py-8 lg:px-10 lg:py-12'>
                <p className='text-xl md:text-2xl text-center flex justify-center'>Rate and leave us a review on your experience</p>
                <p className='text-sm md:text-base flex justify-center mt-4 md:mt-5'>Click the stars to rate us</p>
                <div className='flex justify-center mt-2'>
                  <Rating
                    size='large'
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </div>

                {/* Text area */}
                <div className='px-4 md:px-6 mt-4 md:mt-5 text-base'>
                  <textarea
                    className='w-full border-2 border-gray-400 dark:border-white rounded-lg focus:ring-1 focus:ring-[#004aad] text-black'
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className='flex justify-end mt-4'>
              <button onClick={handleSubmit} className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



export default FeedbackPage;