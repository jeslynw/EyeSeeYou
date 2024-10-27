import React, { useState, useEffect } from 'react';

function AlertPageOverview({alert}) {

    // Weighting factors: give more weight to critical and high
    const severity = parseFloat(
      (
        alert.critical * 1 +
        alert.high * 0.8 +
        alert.med * 0.5 +
        alert.low * 0.3
      ).toFixed(2)
    );

    let networkStatus;
    let emoji;

    // Determine network status and emoji based on the severity score
    if (severity <= 10) {
      networkStatus = "Good";
      emoji = (
        <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-14 h-14 text-[#51ff2e]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z" clipRule="evenodd" />
        </svg>
      );
    } else if (severity <= 30) {
      networkStatus = "Moderate";
      emoji = (
        <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-14 h-14 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z" clipRule="evenodd" />
        </svg>
      );
    } else {
      networkStatus = "Bad";
      emoji = (
        <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-14 h-14 text-[#FF5733]" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7.99 9a1 1 0 0 1 1-1H9a1 1 0 0 1 0 2h-.01a1 1 0 0 1-1-1ZM14 9a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H15a1 1 0 0 1-1-1Zm-5.506 7.216A5.5 5.5 0 0 1 6.6 13h10.81a5.5 5.5 0 0 1-8.916 3.216Z" clipRule="evenodd" />
        </svg>
      );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-10 gap-4">
        {/* Network status grid */}
          <div className="col-span-2 border border-[#e7e7e7] dark:border-gray-700 shadow-md rounded-xl px-4 py-4 bg-gray-50 dark:bg-[#2f3541]">
            <div className="flex flex-col gap-5 p-5">
              <div className="flex items-center gap-4">
                {emoji}
                  <div className="ml-4">
                      <p className="text-sm">Network Status</p>
                      <p className="text-2xl font-medium">{networkStatus}</p>
                  </div>
              </div>
              <div className="flex items-center md: pt-5 gap-4">
                  <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-14 h-14 text-[#ff1f1fea]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z"/>
                  </svg>
                  <div className="ml-4">
                      <p className="text-sm">Total Alerts</p>
                      <p className="text-2xl font-medium">{alert.critical + alert.high + alert.med + alert.low}</p>
                  </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 grid grid-rows-1 sm:grid-rows-2 gap-4">
              <div className="border border-[#e7e7e7] dark:border-gray-700 shadow-md rounded-xl px-4 py-4 bg-gray-50 dark:bg-[#2f3541]">
                <div className="flex items-center mb-2 pt-2">
                    <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-16 h-16 text-[#ff1f1fea]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className="ml-2 grid grid-rows-1">
                        <span className="pl-[20px] text-xs">Critical Alerts</span>
                        <span className="pl-[20px] text-3xl">{alert.critical}</span>
                    </p>
                </div>
              </div>

              <div className="border border-[#e7e7e7] dark:border-gray-700 shadow-md rounded-xl px-4 py-4 bg-gray-50 dark:bg-[#2f3541]">
                <div className="flex items-center mb-2 pt-2">
                    <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-16 h-16 text-[#ffe91fea]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className="ml-2 grid grid-rows-1">
                        <span className="pl-[20px] text-xs">Medium Alerts</span>
                        <span className="pl-[20px] text-3xl">{alert.med}</span>
                    </p>
                </div>
              </div>
          </div>

          <div className="col-span-2 grid grid-rows-1 sm:grid-rows-2 gap-4">
              <div className="border border-[#e7e7e7] dark:border-gray-700 shadow-md rounded-xl px-4 py-4 bg-gray-50 dark:bg-[#2f3541]">
                <div className="flex items-center mb-2 pt-2">
                    <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-16 h-16 text-[#ff841fea]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className="ml-2 grid grid-rows-1">
                        <span className="pl-[20px] text-xs">High Alerts</span>
                        <span className="pl-[20px] text-3xl">{alert.high}</span>
                    </p>
                </div>
              </div>

              <div className="border border-[#e7e7e7] dark:border-gray-700 shadow-md rounded-xl px-4 py-4 bg-gray-50 dark:bg-[#2f3541]">
                <div className="flex items-center mb-2 pt-2">
                    <svg style={{width: "10px", height: "10px", minWidth: "60px", minHeight: "60px"}} className="w-16 h-16 text-[#51ff2e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    <p className="ml-2 grid grid-rows-1">
                        <span className="pl-[20px] text-xs">Low Alerts</span>
                        <span className="pl-[20px] text-3xl">{alert.low}</span>
                    </p>
                </div>
              </div>  
          </div>

          <div className="col-span-4 border border-[#e7e7e7] dark:border-gray-700 shadow-md rounded-xl px-4 py-4 bg-gray-50 dark:bg-[#2f3541]">
              <div className="">
                <p className='pl-4'>Alerts Pie Chart</p>
              </div> 
          </div>

        </div>
    );
  };

export default AlertPageOverview;