import React, { useState } from 'react';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';

function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Feedback submitted:', feedback);
  };
  const [value, setValue] = React.useState(0);

  return (
    <div className='flex items-center justify-center p-10 bg-[#000000] w-screen h-screen'>
    <div className='bg-[#484848] w-auto h-fit rounded-lg text-white'>
    <div className='p-5'>
      <p className='text-[30px] font-bold flex justify-center'>Rate and leave us a review on your experience</p>
      <p className='text-[25px] flex justify-center'>Click the stars to rate us</p>
      <div className='flex justify-center'>
      <Rating
        size='large'
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      </div>
      <div className='p-5 text-[20px]'>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <textarea
          className='border-2 border-black rounded-lg'
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
            style={{ width: '100%' }}
          />
        </div>
        <div className='flex justify-end'>
        <button className='text-[15px] border-2 rounded-md' type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
          Submit
        </button>
        </div>
      </form>
      </div>
    </div>
    </div>
    </div>
  );
}

export default FeedbackPage;