import React, { useState, useContext } from "react";
import { Modal, Button, Form, Tabs, Tab, Alert, ButtonGroup } from "react-bootstrap";
import {
FacebookLoginButton,
GoogleLoginButton,
} from "react-social-login-buttons";
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios";


function LoginRegisterModal() {
const { isAuth, setIsAuth } = useContext(AuthContext);
const [show, setShow] = useState(false);
const [activeKey, setActiveKey] = useState("login");
const [errorMessage, setErrorMessage] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const handleLogin = async (event) => {
event.preventDefault();

let formData = new FormData();
formData.append("username", email);
formData.append("password", password);

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

try {
  const res = await axios.post(
    "http://localhost:8000/login",
    formData,
    config
  );
  // Handle successful login
  localStorage.setItem("access_token", res.data.access_token);
  setIsAuth(true);  // update authentication status
  handleClose()
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('access_token')
    },
  };

  try {
    const res = await axios.get("http://localhost:8000/", config);
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
  // console.log(response.data);
} catch (error) {
  // Display error message
  setErrorMessage("Invalid username or password");
}

};

const handleRegister = async (event) => {
event.preventDefault();


if (password !== confirmPassword) {
  setErrorMessage("Passwords do not match");
  return;
}
try {
const response = await axios.post("http://localhost:8000/register", {
  username,
  email:username,
  full_name: '', // full_name should be taken from user input, here it's hardcoded
  password,
  disabled: 0
});
// Handle successful registration here
console.log(response.data);
// If registration is successful, call the login function
let formDataR = new FormData();
formDataR.append("username", username);
formDataR.append("password", password);

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem('access_token')
  },
};

const res = await axios.post(
    "http://localhost:8000/login",
    formDataR,
    config
  );
localStorage.setItem("access_token", res.data.access_token);
setIsAuth(true);  // update authentication status
handleClose()

} catch (error) {
// Display error message
setErrorMessage("Registration failed");
}
};

return (
<>
<Button variant="primary" onClick={handleShow}>
Login / Register
</Button>


  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Login / Register</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Tabs activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
        <Tab eventKey="login" title="Login">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <FacebookLoginButton onClick={() => alert("Hello")} />
              <GoogleLoginButton onClick={() => alert("Hello")} />
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
            <p>Forgot Password?</p>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Modal.Body>
    <Modal.Footer>
      
        <ButtonGroup className="w-100" aria-label="Login and Register">
            <Button variant="secondary" type="submit" onClick={handleLogin} className="w-100">Login</Button>
            <Button variant="primary" type="submit" onClick={handleRegister} className="w-100">Register</Button>
        </ButtonGroup>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</>

);
}

export default LoginRegisterModal;