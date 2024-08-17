import React, { useState } from "react";
import Header from "../components/Header";
import { useTheme } from "../components/ThemeProvider";
import { useNavigate } from "react-router-dom";

function UpdateAccountDetailsUI() {
  const { darkMode } = useTheme();

  // navigation button
  const navigate = useNavigate();
  const navigateToAccountDetails = () => {
    navigate('/viewaccountdetails')
  }

  const [fullname, setFullname] = useState('James Cook');
  const [username, setUsername] = useState('jcook');
  const [email, setEmail] = useState('jamescook@gmail.com');
  const [phone, setPhone] = useState('91234567');
  const [password, setPassword] = useState('password');
  const [organization, setOrganization] = useState('Lazada');
  const [type, setType] = useState('Network Administrator');
  const [plan, setPlan] = useState('Premium Plan');

  // const user = {
  //   getFullName: () => "James Cook",
  //   getUsername: () => "jcook",
  //   getEmail: () => "jamescook@gmail.com",
  //   getPhone: () => "91234567",
  //   getPassword: () => "password",
  //   getOrganization: () => "Lazada",
  //   getType: () => "Network Administrator",
  //   getPlan: () => "Premium Plan",
  // };

  // const [fullName, setFullName] = useState(user.getFullName());
  // const [username, setUsername] = useState(user.getUsername());
  // const [email, setEmail] = useState(user.getEmail());
  // const [phone, setPhone] = useState(user.getPhone());
  // const [password, setPassword] = useState(user.getPassword());
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    switch (id) {
      case "fullname":
        setFullname(value);
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
        // const phoneRegex = /^\d{8}$/;
        // if (!phoneRegex.test(value)) {
        //   setErrors((prev) => ({
        //     ...prev,
        //     phone: "Invalid phone number.",
        //   }));
        // } else {
        //   setErrors((prev) => ({ ...prev, phone: "" }));
        // }
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
    <div className={darkMode ? 'dark' : ''}>
      <Header />

      <div className="flex flex-col min-h-screen bg-[#f4f4f4] dark:bg-[#1C1D1F] text-black dark:text-white px-8 md:px-12 pb-0" style={{ minHeight: 'calc(100vh - 60px)' }}>
        {/* NOTE: edit the form action attribute to handle where the data being submitted*/}
        <form action="">
          {/* account details text */}
          <div className="flex w-full justify-between  items-center mt-4 mb-4">
            <p className="text-2xl">ACCOUNT DETAILS</p>
          </div>

          {/* NOTE: having trouble adjusting the width on this line below, rmb to test the dynamic part as well. */}
          <div className="bg-white dark:bg-[#252628] border-2 border-[#e7e7e7] dark:border-[#353535] text-black dark:text-white items-center rounded-xl shadow-lg dark:shadow-[#353535]  w-full px-6 py-4 ">
            <p className="text-xl mt-5 mb-8">Personal Information</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Full Name</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="text"
                  id="fullname"
                  value={fullname}
                  onChange={handleInputChange}
                  requireds
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm">{errors.fullname}</p>
                )}
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Username</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Email Address</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
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
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Phone Number</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={handleInputChange}
                  required
                />
                {/* {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )} */}
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Password</p>
                <input
                  className="w-full px-3 py-2 mb-4 bg-[#374157] rounded-md text-white text-sm focus:ring-1 focus:ring-[#004aad]"
                  type="password"
                  id="password"
                  value={password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Organization</p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">{organization}</p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Type</p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">{type}</p>
              </div>

              <div>
                <p className="block text-[12px] dark:font-normal text-[#3a3a3a] dark:text-[#d8d8d8] mb-1">Plan</p>
                <p className="block text-sm font-medium dark:font-normal mb-4 py-2">{plan}</p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-4 gap-4">
            <button onClick={navigateToAccountDetails} className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none">
              Cancel
            </button>
            <input
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              value="Save Changes"
              onClick={navigateToAccountDetails}
            />
          </div>
        </form>

        <div className="pb-10"></div>

      </div>
    </div>
  );
}

export default UpdateAccountDetailsUI;
