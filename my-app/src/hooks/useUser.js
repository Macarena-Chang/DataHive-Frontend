import { useState, useEffect } from 'react';
import axios from 'axios';

const useUser = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const config = { headers: { 'Authorization': 'Bearer ' + token } };

    axios.get('http://localhost:8000/users/me', config)
      .then(res => {
        setName(res.data.name);
        setUserId(res.data.user_id);  
      })
      .catch(error => {
        console.error(error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return { name, userId };
}

export default useUser;