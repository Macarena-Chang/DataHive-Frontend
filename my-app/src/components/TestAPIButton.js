import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function TestAPIButton() {
  const [token, setToken] = useState(''); // Initialize with your token

  const handleTestAPI = async () => {
    const token = localStorage.getItem('access_token');
  
    const config = {
      headers: { 
        'Authorization': 'Bearer ' + token 
      }
    };
  
    try {
      const res = await axios.get('http://localhost:8000/users/me', config);
      console.log(res.data);
      console.log("token: " + token)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant="primary" onClick={handleTestAPI}>
      Test API
    </Button>
  );
}

export default TestAPIButton;
