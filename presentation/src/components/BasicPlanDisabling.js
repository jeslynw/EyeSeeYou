import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RestrictUI from "./RestrictUI";

const BasicPlanDisabling = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [openPopUp, setOpenPopUp] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //debugging for user
    const access_token = sessionStorage.getItem("accesstoken");
    const refresh_token = sessionStorage.getItem("refreshtoken");
    if (access_token) {
      console.log("Access found:", access_token);
      axios
        .get("http://127.0.0.1:5000/viewaccountdetails", {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setCurrentUser(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    } else {
      console.error("No token found. Please log in.");
    }
  }, []);

  // open upgrade popup
  const openUpgradePopUp = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setOpenPopUp(true);
  };

  // handle cancel button
  const handleCancel = () => {
    setOpenPopUp(false);
    navigate("/nadashboard");
  };

  // handle upgrade button
  const confirmUpgrade = () => {
    setOpenPopUp(false);
    // navigate("/");
    // todo: navigate to eyeseeyou wix pricing plan page
  };

  if (currentUser.plan_type === "Basic Plan") {
    return (
      <div>
        {children}
        <RestrictUI
          openPopUp={openUpgradePopUp}
          setOpenPopUp={setOpenPopUp}
          handleCancel={handleCancel}
          handleUpgrade={confirmUpgrade}
        />
      </div>
    );
  }

  console.log("plan type: ", currentUser.plan_type); // debug

  // if user is on premium plan, display content normally
  return children;
};

export default BasicPlanDisabling;
