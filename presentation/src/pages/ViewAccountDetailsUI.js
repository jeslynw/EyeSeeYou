import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import EditIcon from "@mui/icons-material/Edit";

function ViewAccountDetailsUI() {
  const user = {
    getFullName: () => "James Cook",
    getUsername: () => "jcook",
    getEmail: () => "jamescook@gmail.com",
    getPhone: () => "91234567",
    getPassword: () => "password",
    getOrganization: () => "Lazada",
    getType: () => "Network Administrator",
    getPlan: () => "Premium Plan",
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">
      {/* body here */}

      <div className="w-full max-w-3xl flex justify-between mt-4 gap-4">
        <h2 className="text-2xl font-semibold mb-4">ACCOUNT DETAILS</h2>
        <button className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none">
          <a href="/editProfile">
            <p>
              Edit Profile
              <SvgIcon sx={{ fontSize: 25 }} component={EditIcon} />
            </p>
          </a>
        </button>
      </div>

      <div className="bg-gray-800 text-white rounded-xl shadow-lg w-full max-w-3xl px-6 py-4 ">
        <h3 className="text-2xl font-semibold mb-8">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="fullName"
            >
              Full Name
            </label>

            <label
              className="block text-sm font-medium mb-4"
              htmlFor="fullNameValue"
            >
              {user.getFullName()}
            </label>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="usernameValue"
            >
              {user.getUsername()}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="emailValue"
            >
              {user.getEmail()}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone Number
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="phoneValue"
            >
              {user.getPhone()}
            </label>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="passwordValue"
            >
              {user.getPassword()}
            </label>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="organization"
            >
              Organization
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="organizationValue"
            >
              {user.getOrganization()}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="type">
              Type
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="typeValue"
            >
              {user.getType()}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="plan">
              Plan
            </label>
            <label
              className="block text-sm font-medium mb-4"
              htmlFor="planValue"
            >
              {user.getPlan()}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAccountDetailsUI;
