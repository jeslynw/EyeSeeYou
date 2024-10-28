"use client";
import React,  { useState } from 'react'
import { Footer } from "flowbite-react";

import logo from '../images/logo.png'

function FooterUI({ openPrivacyModal }) {
  return (
    <Footer>
      <div className="p-6 w-full text-center backdrop-blur-sm bg-[#1d1d1d]">
        <div className="w-full justify-between md:flex">
          <div className='ml-0 lg:ml-5'>
            <div className=" flex items-center">
              <img src={logo} alt="logo" className="w-12 h-10" />
              <p className="text-[25px] text-white font-SansitaSwashed ml-5">EyeSeeYou</p>
            </div>
            <p className='mt-5 text-sm text-slate-500 text-left'>Your Network's First Line of Defense: Comprehensive <br/> Real-Time Monitoring, Instant Alerts, and Proactive <br/> Threat Detection to Keep You Secure Around the Clock</p>
            
          </div>

          <div className=''> 
            <Footer.LinkGroup className='mr-0 mt-6 lg:mr-5 lg:mt-0'>
              <Footer.Link href="#pricingPlan" className='text-slate-500'>Pricing Plans</Footer.Link>
              <Footer.Link href="#contact" className='text-slate-500'>Contact</Footer.Link>
              <Footer.Link href="#" onClick={openPrivacyModal} className='text-slate-500'>Privacy Policy</Footer.Link>
            </Footer.LinkGroup>

          <section id='contact'>
            <div className='flex mt-5 lg:mt-10 gap-6'>
              <a href='#' to="route" target="_blank">
                <button class="githubButton">
                    <span class="githubBG"></span>
                    <span class="githubContainer">
                      <svg  viewBox="0 0 320 512" height="1.0em" xmlns="http://www.w3.org/2000/svg" class="svgIcon" fill="white">
                      <path
                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                      ></path>
                    </svg>
                    </span>
                </button>
              </a>

              <a href="tel:8080 7070">
                <button class="WAButton">
                    <span class="WABG"></span>
                    <span class="WAContainer">
                      <svg viewBox="0 0 448 512"fill="white"height="1.1em"xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                        ></path>
                      </svg>
                    </span>
                </button>
              </a>

              <a href="mailto:eyeseeyoufyp@gmail.com" target="_blank" rel="noopener noreferrer">
                <button class="emailButton">
                    <span class="emailBG"></span>
                    <span class="emailContainer">
                      <svg viewBox="0 0 24 24"fill="white"height="1.1em"strokeWidth="1.5" stroke="currentColor" class="size-6"xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </span>
                </button>
              </a>
            </div>
            </section>
          </div>
        </div>

        <hr className='w-full h-[1px] mt-8 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-400'/>
        
        <Footer.Copyright  by="EyeSeeYou™" year={2024} className='mt-5'/>
      </div>
    </Footer>
  )
}

export default FooterUI