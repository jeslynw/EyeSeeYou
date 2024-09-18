import React, { useEffect } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa6";



function FeedbackContainer() {
    // useEffect(()=>{
    //     axios.get('http://127.0.0.1:5000/feedback', {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then (response => {
    //         if (response.status === 200) {
    //             const feedback = response.data;
    //             setFeedback(feedback.)
    //         }
    //     })
    // })

    const testimonials = [
        'We approached Vlad to help us with the design of our new startup\'s app. Vlad was exemplary in understanding the product and strategizing with us.',
        'Vlad worked on designated web pages while keeping within the tight restrictions of our branding and recycling new UI elements the team had pre-approved within his own design.',
        // Add more testimonials if necessary
      ];
      
    const [feedback, setFeedback] = useState('');

    // next and previous button
    const [currentIndex, setCurrentIndex] = useState(0);
    const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };
    const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const [rating, setRating] = useState(0);
    const [ratingsList, setRatingsList] = useState([]);
    const createStars = (numStars) => {
    const starsRow = [];

    for (let i = 0; i < 5; i++) {
    if (i < numStars) {
        starsRow.push(<FaStar key={i} style={{ color: "#f2cc49", width: "22px", height: "22px" }} />);
    } 
    else {
        starsRow.push(<FaStar key={i} style={{ color: "#d2d5da", width: "22px", height: "22px" }} />);
    }
    }
    return starsRow;
};

    return (
    <div className="bg-gray-100 px-10 pt-16 pb-16">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">See what <span className="text-[#26baff]">others</span> are saying.</h1>
      </div>

      <div className="relative w-full flex items-center justify-center">
        {/* Left Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-56 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>

        {/* Testimonial Card */}
        <div className="flex flex-col h-52 items-center justify-center w-full max-w-md mx-auto">
          <div className="bg-white p-6 shadow-lg rounded-lg text-center">
            <p className="text-lg mb-4">"{testimonials[currentIndex]}"</p>
            <div className="flex items-center justify-center mt-4">
                <div className="flex">{createStars(rating)}</div>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-56 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-colors"
        >
          <FaArrowRight className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default FeedbackContainer