import React, { useState } from "react";

const SearchAlerts = ({ isVisible, onClose }) => {
  // const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    severity: [],
    type: "",
    location: "",
    status: [],
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    // Handling 'severity' checkbox
    if (["AnySeverity", "Critical", "High", "Medium", "Low"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        severity: checked
          ? [...prevData.severity, name.toLowerCase()] // Add to severity array if checked
          : prevData.severity.filter((currentSeverity) => currentSeverity !== name.toLowerCase()), // Remove from severity array if unchecked
      }));
    }

    // Handling 'status' checkbox
    if (["AnyStatus", "Resolved", "InProgress", "Open", "FalsePositive"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        status: checked
          ? [...prevData.status, name.toLowerCase()] // Add status to the array if checked
          : prevData.status.filter((currentStatus) => currentStatus !== name.toLowerCase()), // Remove from status array if unchecked
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
    console.log(formData);
    setFormData({
      // reset form data
      severity: [],
      type: "",
      location: "",
      status: [],
    });
    onClose(); // close the search box
  };

  // if (!isVisible) return null;
  return (
    <div
      className={`bg-gray-200 rounded-lg max-w-fit mx-auto transition-all duration-300 ease-in-out ml-auto mr-0 mb-4 transform ${
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
                checked={formData.severity.includes("anyseverity")}
                onChange={handleCheckboxChange}
              />
              <span>Any</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Critical"
                checked={formData.severity.includes("critical")}
                onChange={handleCheckboxChange}
              />
              <span>Critical</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="High"
                checked={formData.severity.includes("high")}
                onChange={handleCheckboxChange}
              />
              <span>High</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Medium"
                checked={formData.severity.includes("medium")}
                onChange={handleCheckboxChange}
              />
              <span>Medium</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Low"
                checked={formData.severity.includes("low")}
                onChange={handleCheckboxChange}
              />
              <span>Low</span>
            </label>
          </div>
        </div>

        {/* Type */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Threat Type</label>
          <div className="relative">
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 pl-10"
              placeholder="Enter threat type"
            />
            <span className="absolute inset-y-0 left-2 flex items-center">🔍</span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Location</label>
          <div className="relative">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 pl-10"
              placeholder="Enter location"
            />
            <span className="absolute inset-y-0 left-2 flex items-center">🔍</span>
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
                checked={formData.status.includes("anystatus")}
                onChange={handleCheckboxChange}
              />
              <span>Any</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Resolved"
                checked={formData.status.includes("resolved")}
                onChange={handleCheckboxChange}
              />
              <span>Resolved</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="InProgress"
                checked={formData.status.includes("inprogress")}
                onChange={handleCheckboxChange}
              />
              <span>In Progress</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="Open"
                checked={formData.status.includes("open")}
                onChange={handleCheckboxChange}
              />
              <span>Open</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="checkbox"
                name="FalsePositive"
                checked={formData.status.includes("falsepositive")}
                onChange={handleCheckboxChange}
              />
              <span>False Positive</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button type="submit" className=" bg-gray-500 text-white px-4 py-2 rounded-md">
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchAlerts;
