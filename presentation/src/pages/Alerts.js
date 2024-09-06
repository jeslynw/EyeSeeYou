import React from 'react'
import axios from "axios";

function Alerts() {
  //debugging for user
  const access_token = sessionStorage.getItem('accesstoken');
  const refresh_token = sessionStorage.getItem('refreshtoken');
  if (access_token) {
      console.log('Access found:', access_token);
      axios.get('http://127.0.0.1:5000/alerts', {
      headers: {
          'Authorization': `Bearer ${access_token}`
      }
      })
      .then(response => {
      if (response.status === 200) {
          const currentUser = response.data.logged_in_as;
          console.log(`User: ${currentUser}`);
      }
      })
      .catch(error => {
      console.error('Error fetching user info:', error);
      });
  } else {
      console.error('No token found. Please log in.');
  }

  return (
    <div><h1>Alerts</h1></div>
  )
}

export default Alerts