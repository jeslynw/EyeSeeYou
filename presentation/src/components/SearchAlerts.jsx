import React, { useState } from "react";
import axios from "axios";

const SearchAlerts = ({ isVisible, onClose, onSearchResults }) => {
  const [formData, setFormData] = useState({
    severity: [],
    type: "",
    // location: "",
    src_addr: "",
    dst_addr: "",
    status: [],
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Handling 'severity' checkbox
    const severityMap = {
      Critical: 1,
      High: 2,
      Medium: 3,
      Low: 4,
    };

    if (name === "AnySeverity") {
      setFormData((prevData) => ({
        ...prevData,
        severity: checked ? [1, 2, 3, 4] : [],
      }));
    } else if (severityMap[name]) {
      setFormData((prevData) => ({
        ...prevData,
        severity: checked
          ? [...prevData.severity, severityMap[name]] // Add to severity array if checked
          : prevData.severity.filter((currentSeverity) => currentSeverity !== severityMap[name]), // Remove from severity array if unchecked
      }));
    }

    // Handling 'status' checkbox
    if (name === "AnyStatus") {
      setFormData((prevData) => ({
        ...prevData,
        status: checked ? ["Resolved", "In Progress", "Open", "False Positive"] : [],
      }));
    } else if (["Resolved", "In Progress", "Open", "False Positive"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        status: checked
          ? [...prevData.status, name] // Add status to the array if checked
          : prevData.status.filter((currentStatus) => currentStatus !== name), // Remove from status array if unchecked
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      priority: formData.severity.length > 0 ? formData.severity : null,
      class: formData.type ? formData.type : null,
      // location: formData.location ? formData.location : null,
      src_addr: formData.src_addr ? formData.src_addr : null,
      dst_addr: formData.dst_addr ? formData.dst_addr : null,
      status: formData.status.length > 0 ? formData.status : null,
    };

    const access_token = sessionStorage.getItem("accesstoken");
    axios
      .post("http://34.124.131.244:5000/naalerts/search", dataToSend, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          onSearchResults(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching search alerts:", error);
      });

    setFormData({
      // reset form data afterwards
      severity: [],
      type: "",
      // location: "",
      src_addr: "",
      dst_addr: "",
      status: [],
    });

    onClose(); // close the search box
  };

  return (
    <div
      className={`bg-[#d6dce1] dark:bg-[#343333] rounded-lg max-w-fit mx-auto transition-all duration-300 ease-in-out ml-auto mr-0 mb-4 transform ${
        isVisible ? "max-h-[1000px] p-6 opacity-100" : "max-h-0 opacity-0"
      }`}>
      <form onSubmit={handleSubmit}>
        {/* Severity */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Severity</label>
          <div className="flex gap-3">
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="AnySeverity"
                checked={
                  formData.severity.length === 4 &&
                  formData.severity.includes(1) &&
                  formData.severity.includes(2) &&
                  formData.severity.includes(3) &&
                  formData.severity.includes(4)
                }
                onChange={handleCheckboxChange}
              />
              <span>Any</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Critical"
                checked={formData.severity.includes(1)}
                onChange={handleCheckboxChange}
              />
              <span>Critical</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="High"
                checked={formData.severity.includes(2)}
                onChange={handleCheckboxChange}
              />
              <span>High</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Medium"
                checked={formData.severity.includes(3)}
                onChange={handleCheckboxChange}
              />
              <span>Medium</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Low"
                checked={formData.severity.includes(4)}
                onChange={handleCheckboxChange}
              />
              <span>Low</span>
            </label>
          </div>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-black dark:text-white">Threat Type</label>
          <div className="relative">
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 pl-10 text-black"
              placeholder="Enter threat type"
            />
            <span className="absolute inset-y-0 left-2 flex items-center text-black">🔍</span>
          </div>
        </div>

        {/* Source Address */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-black dark:text-white">Source IP Address</label>
          <div className="relative">
            <input
              type="text"
              name="src_addr"
              value={formData.src_addr}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 pl-10 text-black"
              placeholder="Enter source IP address"
            />
            <span className="absolute inset-y-0 left-2 flex items-center text-black">🔍</span>
          </div>
        </div>

        {/* Destination Address */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2 text-black dark:text-white">Destination IP Address</label>
          <div className="relative">
            <input
              type="text"
              name="dst_addr"
              value={formData.dst_addr}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 pl-10 text-black"
              placeholder="Enter source IP address"
            />
            <span className="absolute inset-y-0 left-2 flex items-center text-black">🔍</span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Status</label>
          <div className="flex gap-2">
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="AnyStatus"
                checked={
                  formData.status.length === 4 &&
                  formData.status.includes("Resolved") &&
                  formData.status.includes("In Progress") &&
                  formData.status.includes("Open") &&
                  formData.status.includes("False Positive")
                }
                onChange={handleCheckboxChange}
              />
              <span>Any</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Resolved"
                checked={formData.status.includes("Resolved")}
                onChange={handleCheckboxChange}
              />
              <span>Resolved</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="In Progress"
                checked={formData.status.includes("In Progress")}
                onChange={handleCheckboxChange}
              />
              <span>In Progress</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Open"
                checked={formData.status.includes("Open")}
                onChange={handleCheckboxChange}
              />
              <span>Open</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="False Positive"
                checked={formData.status.includes("False Positive")}
                onChange={handleCheckboxChange}
              />
              <span>False Positive</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className="bg-[#ffffff] dark:bg-[#ffffff1c] text-black dark:text-white px-4 py-2 rounded-md">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchAlerts;
