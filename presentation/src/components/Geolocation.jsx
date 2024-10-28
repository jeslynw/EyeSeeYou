import React, { useEffect, useState } from 'react';

function Geolocation() {
    const [ip, setIp] = useState('');
    const [geoData, setGeoData] = useState(null);
  
    useEffect(() => {
      const fetchPublicIP = async () => {
        try {
          const response = await fetch('https://geo.ipify.org/api/v2/country?apiKey=at_OoPs6ABQ5VFkSJKJg8VpXmZ7Q4fX8&ipAddress=203.217.187.34');
          const data = await response.json();
          setIp(data.ip);
        } catch (error) {
          console.error('Error fetching public IP:', error);
        }
      };
  
      fetchPublicIP();
    }, []);
  
    useEffect(() => {
      const fetchGeolocation = async (ip) => {
        try {
          const response = await fetch(`http://ip-api.com/json/${ip}`);
          const geoData = await response.json();
          setGeoData(geoData);
        } catch (error) {
          console.error('Error fetching geolocation:', error);
        }
      };
  
      if (ip) {
        fetchGeolocation(ip);
      }
    }, [ip]);
  
    return (
      <div>
        HELLLOoo
        <h2>My Public IP Address is: {ip}</h2>
        {geoData && (
          <div>
            <h3>Geolocation Data:</h3>
            <p>Country: {geoData.country}</p>
            <p>Region: {geoData.regionName}</p>
            <p>City: {geoData.city}</p>
            <p>ZIP: {geoData.zip}</p>
            <p>Latitude: {geoData.lat}</p>
            <p>Longitude: {geoData.lon}</p>
          </div>
        )}
      </div>
    );
  };

export default Geolocation