import React, { useState } from "react";
import Icon from "../images/logo.png";
import { useLocation } from "react-router-dom";
import SvgIcon from '@mui/material/SvgIcon';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const Sidebar = () => {
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(true);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    const [openPopUp, setOpenPopup] = useState(false);

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={Icon} alt="icon" className="logo" style={{width: "60px"}}/>
                <h2 className="title">EyeSeeYou </h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>

                        <a href="/">
                        <SvgIcon sx={{ fontSize: 35 }} component={DashboardOutlinedIcon}/>
                        <p className="pl-3">
                        Dashboard
                        </p>
                        </a>
                    </li>

                    <li
                        className={
                            location.pathname === "/alerts"
                                ? "active"
                                : ""
                        }
                    >
                        
                        <a href="/alerts">
                        <SvgIcon sx={{ fontSize: 35 }} component={NotificationsNoneOutlinedIcon}/>
                        <p className="pl-3">
                        Alerts
                        </p>
                        </a>
                    </li>

                    <li
                        className={
                            location.pathname === "/events" ? "active" : ""
                        }
                    >
                        <a href="/events">
                        <SvgIcon sx={{ fontSize: 35 }} component={TodayOutlinedIcon}/>
                        <p className="pl-3">
                        Events
                        </p>
                        </a>
                    </li>

                    <li
                        className={
                            location.pathname === "/loginhistory" ? "active" : ""
                        }
                    >
                        <a href="/loginhistory">
                        <SvgIcon sx={{ fontSize: 35 }} component={HistoryOutlinedIcon}/>
                        <p className="pl-3 w-36">
                        Log In History
                        </p>
                        </a>
                    </li>
                    
                    <li
                        className={
                            location.pathname === "/profile" ? "active" : ""
                        }
                    >
                        <a href="/profile">
                        <SvgIcon sx={{ fontSize: 35 }} component={PersonRoundedIcon}/>
                        <p className="pl-3">
                        Profile
                        </p>
                        </a>
                    </li>

                    <li
                        className={
                            location.pathname === "/feedback" ? "active" : ""
                        }
                    >
                        
                        <a href="/feedback">
                        <SvgIcon sx={{ fontSize: 35 }} component={RateReviewOutlinedIcon} />
                        <p className="pl-3">
                        Feedback
                        </p>
                        </a>
                    </li>

                    <li>
                        
                        <a onClick={()=>setOpenPopup(true)}>
                        <SvgIcon sx={{ fontSize: 35 }} component={LogoutOutlinedIcon}/>
                        <p className="pl-3 w-20">
                        Log out
                        </p>
                        </a>
                    </li>
                </ul>


                <Dialog
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
                open={openPopUp}
                onClose={() => setOpenPopup(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title"><SvgIcon component={LogoutOutlinedIcon}/>{" Log Out?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Are you sure you want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPopup(false)} variant="outlined" color="primary">
                    Cancel
                    </Button>
                    <Button onClick={() => setOpenPopup(false)} variant="contained" style={{ backgroundColor: 'rgba(156, 12, 12)', color: 'white' }}>
                    Log out
                    </Button>
                </DialogActions>
                </Dialog>

            </div>
        </div>
    );
};

export default Sidebar;
