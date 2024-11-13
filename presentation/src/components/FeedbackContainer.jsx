import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';

function FeedbackContainer({ feedback }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedback.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + feedback.length) % feedback.length);
  };

  const createStars = (numStars) => {
    const starsRow = [];
    for (let i = 0; i < 5; i++) {
      starsRow.push(
        <FaStar
          key={i}
          style={{ color: i < numStars ? "#f2cc49" : "#d2d5da", width: "22px", height: "22px" }}
        />
      );
    }
    return starsRow;
  };

  return (
    <div className="bg-gray-100 px-10 pt-16 pb-16">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold pb-8">
          See what <span className="text-[#26baff]">others</span> are saying.
        </h1>
      </div>

      {feedback.length > 0 && (
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-56 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-200 transition-colors"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          {/* Testimonial Card */}
          <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="bg-white p-6 shadow-lg rounded-lg text-center w-[650px] h-[300px] flex flex-col justify-between">
              <p className="text-lg mt-8 overflow-hidden overflow-ellipsis">{feedback[currentIndex].review}</p>
              <div className="flex items-center justify-center mb-8">
                {createStars(feedback[currentIndex].rating)}
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
      )}
    </div>
  );
}

export default FeedbackContainer;
