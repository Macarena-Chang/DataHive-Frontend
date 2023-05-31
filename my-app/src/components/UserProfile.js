import React, { useState, useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function UserProfile() {
const [name, setName] = useState('');
const [fileIds, setFileIds] = useState([]);

useEffect(() => {
const token = localStorage.getItem('access_token');
const config = { headers: { 'Authorization': 'Bearer ' + token } };


// Fetch user profile data
axios.get('http://localhost:8000/users/me', config)
  .then(res => {
    setName(res.data.name);
  })
  .catch(error => {
    console.error(error);
  });

// Fetch user's file IDs
axios.get('http://localhost:8000/users/me/files', config)
  .then(res => {
    setFileIds(res.data.map(file => file.file_id));
  })
  .catch(error => {
    console.error(error);
  });

}, []);
return (
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src="holder.js/100px180" />
<Card.Body>
<Card.Title>Card Title</Card.Title>
<Card.Text>
Some quick example text to build on the card title and make up the
bulk of the card's content.
</Card.Text>
<Button variant="primary">Go somewhere</Button>
</Card.Body>
</Card>
);
}

export default UserProfile;