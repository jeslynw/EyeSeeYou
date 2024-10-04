import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../components/ThemeProvider";

import LogoutUI from "./LogoutUI";
import logo from "../images/logo.png"
import logo2 from "../images/logo2.png"

// icon
import SvgIcon from '@mui/material/SvgIcon';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MessageIcon from '@mui/icons-material/Message';

const MSidebar = ({ isOpen, toggleSidebar }) => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();

    const location = useLocation();
    const [openPopUp, setOpenPopUp] = React.useState(false);

    // open logout popup
    const openLogoutPopUp = (e) => {
        e.preventDefault(); // Prevent default link behavior
        setOpenPopUp(true);
    };

    // handle logout button
    const confirmLogout = () => {
        sessionStorage.removeItem('accesstoken');
        sessionStorage.removeItem('refreshtoken');
        console.log("Logging out...");
        setOpenPopUp(false);
        navigate('/');
    };

      // Navigation items for top
      const navItemsTop = [
        { path: "/mdashboard", name: "Dashboard", icon: DashboardOutlinedIcon },
        { path: "/malerts", name: "Alerts", icon: NotificationsNoneOutlinedIcon },
        { path: "/mtroubleshootchat", name: "Troubleshoot Chat", icon: MessageIcon },
    ];

    // Navigation items for bottom
    const navItemsBottom = [
        { path: "/viewaccountdetails", name: "Profile", icon: PersonRoundedIcon },
        { path: "/feedback", name: "Feedback", icon: RateReviewOutlinedIcon },
        { path: "#", name: "Logout", icon: LogoutOutlinedIcon, onClick: openLogoutPopUp },
    ];

    return (
        <div className={darkMode ? "dark" : ""}>
            <div className={`fixed top-0 left-0 h-screen transition-all duration-300 bg-[#f4f4f4] dark:bg-[#262626] z-[1000] border-r-2 dark:border-r-[#414141] ${
                isOpen ? "w-[235px]" : "w-[65px]"
            } flex flex-col`}>
                {/* Header with logo and toggle button */}
                <div className="flex items-center justify-between h-[60px] px-4 border-b-2 border-b-[#dddddd] dark:border-b-[#414141]">
                    {isOpen && (
                        <>
                            <img src={darkMode ? logo : logo2} alt="logo" className="w-10 h-8" />
                            <h1 className="text-xl font-SansitaSwashed text-black dark:text-white cursor-default">
                                EyeSeeYou
                            </h1>
                        </>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="px-1 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
                    >
                        {isOpen ? (
                            <CloseIcon className="text-black dark:text-white" />
                        ) : (
                            <MenuIcon className="text-black dark:text-white" />
                        )}
                    </button>
                </div>

                {/* Main content area with flex layout */}
                <div className="flex flex-col justify-between flex-grow overflow-y-auto">
                    {/* Top navigation items */}
                    <div className="px-3 mt-4">
                        <ul className="flex flex-col items-start list-none p-0 m-0">
                            {navItemsTop.map((item) => (
                                <li key={item.name} className="w-full my-2">
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-2 py-2 h-12 rounded-xl cursor-pointer text-[20px] ${
                                            location.pathname === item.path
                                                ? "bg-gray-300 dark:bg-gray-400 text-gray-800"
                                                : "hover:bg-gray-300 dark:hover:bg-gray-400 transition-colors duration-200"
                                        }`}
                                        style={{
                                            maxWidth: isOpen ? "100%" : "65px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <span className="mr-2 mb-[4px] text-black dark:text-white">
                                            <SvgIcon sx={{ fontSize: 22 }} component={item.icon} />
                                        </span>
                                        {isOpen && (
                                            <p className="ml-3 text-base text-black dark:text-white">
                                                {item.name}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom navigation items */}
                    <div className="px-3 mb-4">
                        <ul className="flex flex-col items-start list-none p-0 m-0">
                            {navItemsBottom.map((item) => (
                                <li key={item.name} className="w-full my-2">
                                    <Link
                                        to={item.path}
                                        onClick={item.onClick}
                                        className={`flex items-center px-2 py-2 h-12 rounded-xl cursor-pointer text-[20px] ${
                                            location.pathname === item.path
                                                ? "bg-gray-300 dark:bg-gray-400 text-gray-800"
                                                : "hover:bg-gray-300 dark:hover:bg-gray-400 transition-colors duration-200"
                                        }`}
                                        style={{
                                            maxWidth: isOpen ? "100%" : "65px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <span className="mr-2 mb-[4px] text-black dark:text-white">
                                            <SvgIcon sx={{ fontSize: 22 }} component={item.icon} />
                                        </span>
                                        {isOpen && (
                                            <p className="ml-3 text-base text-black dark:text-white">
                                                {item.name}
                                            </p>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <LogoutUI
                    openPopUp={openPopUp}
                    setOpenPopUp={setOpenPopUp}
                    handleLogout={confirmLogout}
                />
            </div>
        </div>
    );
};

export default MSidebar;