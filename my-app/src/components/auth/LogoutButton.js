import React from 'react';
import axios from 'axios';

const LogoutButton = () => {

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');

    const config = {
      headers: {
        'Authorization': 'Bearer ' + token  
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/users/logout', null, config);
      
      if (response.status === 200) {
        // Remove token from localStorage
        localStorage.removeItem('access_token');
        
        // Redirect user to root path
        window.location.href = '/';
      }
    } catch(error) {
      console.error(error);
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton;
