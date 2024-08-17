import React from 'react'
import ThemeMode from './ThemeMode'
import { useTheme } from "./ThemeProvider";
import { useNavigate } from "react-router-dom";

// image
import logo from '../images/logo.png'
import logo2 from '../images/logo2.png'

function Header() {
  // navigation button
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate('/NAdashboard')
  }
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className='flex max-w-full px-8 md:px-12 h-[60px] bg-[#f4f4f4] dark:bg-[#1C1D1F] border-b-2 border-b-[#dddddd] dark:border-b-[#414141]'>
          <nav className="flex w-full justify-between items-center">
              <div onClick={navigateToDashboard} className="flex items-center cursor-pointer">
                  {/* <img src={darkMode? logo : logo2} alt="logo" className="w-10 h-8" /> */}
                  {/* <p className="text-[22px] text-black dark:text-white font-SansitaSwashed ml-5">EyeSeeYou</p> */}
              </div>
              <ThemeMode />
          </nav>
      </div>
    </div>
  )
}

export default Header