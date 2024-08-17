import React, { useState } from "react";

function UpdateAccountDetailsUI() {
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

  const [fullName, setFullName] = useState(user.getFullName());
  const [username, setUsername] = useState(user.getUsername());
  const [email, setEmail] = useState(user.getEmail());
  const [phone, setPhone] = useState(user.getPhone());
  const [password, setPassword] = useState(user.getPassword());
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "fullName":
        setFullName(value);
        break;

      case "username":
        setUsername(value);
        break;

      case "email":
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setErrors((prev) => ({ ...prev, email: "Invalid email address." }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;

      case "phone":
        setPhone(value);
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            phone: "Invalid phone number.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phone: "" }));
        }
        break;

      // if noneed regex for password then can remove commented part below.

      case "password":
        setPassword(value);
        //   const pwRegex = /^{8}}$/; // change regex here
        //   if (!pwRegex.test(value)) {
        //     setErrors((prev) => ({
        //       ...prev,
        //       password: "Password cannot be empty.",
        //     }));
        //   } else {
        //     setErrors((prev) => ({ ...prev, password: "" }));
        //   }
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">
      {/* body here */}

      {/* NOTE: edit the form action attribute to handle where the data being submitted*/}
      <form action="">
        <h2 className="text-2xl font-semibold mb-4">ACCOUNT DETAILS</h2>
        {/* NOTE: having trouble adjusting the width on this line below, rmb to test the dynamic part as well. */}
        <div className="bg-gray-800 text-white rounded-xl shadow-lg w-full max-w-3xl px-6 py-4 ">
          <h3 className="text-2xl font-semibold mb-8">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="fullName"
                value={fullName}
                onChange={handleInputChange}
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                id="phone"
                value={phone}
                onChange={handleInputChange}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="organization"
              >
                Organization
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="organization"
                value="getOrganization(){}"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="type">
                Type
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="type"
                value="getType(){}"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="plan">
                Plan
              </label>
              <input
                className="w-full px-3 py-2 mb-4 bg-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="plan"
                value="getPlan(){}"
                disabled
              />
            </div> */}
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

        <div className="w-full max-w-3xl flex justify-end mt-4 gap-4">
          <button className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none">
            <a href="/viewProfile">Cancel</a>
          </button>
          <input
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            value="Save Changes"
          />
        </div>
      </form>
    </div>
  );
}

export default UpdateAccountDetailsUI;
