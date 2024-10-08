import React from "react";
import { Navigate } from "react-router-dom";

// Role-based ProtectedRoute component
const ProtectedRoute = ({ allowedRoles, children }) => {
  const userRole = sessionStorage.getItem("userrole"); // Or get from React Context/Redux
  console.log("userroleeee:", userRole);
  console.log("allowedRoles:", allowedRoles);
  console.log("children:", children);

  // If the user role is one of the allowed roles, render the component
  if (allowedRoles.includes(userRole)) {
    return children;
  }

  // If not, redirect to login or an unauthorized page
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
