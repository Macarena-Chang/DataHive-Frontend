import React, { useState, useContext } from "react";
import {
  Modal,
  Button,
  Form,
  Tabs,
  Tab,
  Alert,
  Card,
  ButtonGroup,
} from "react-bootstrap";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { AuthContext } from "../../contexts/AuthContext";
import "./LoginRegisterModal.css";
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
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

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
        "http://localhost:8000/users/login",
        formData,
        config
      );
      // Handle successful login
      localStorage.setItem("access_token", res.data.access_token);
      setIsAuth(true); // update authentication status
      handleClose();
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
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
        email: username,
        full_name: "", // full_name should be taken from user input, here it's hardcoded
        password,
        disabled: 0,
      });
      // Handle successful registration here
      console.log(response.data);
      // if status 403 show message to inform about email verification
      // If registration is successful, call the login function
      /* let formDataR = new FormData();
formDataR.append("username", username);
formDataR.append("password", password);
 */
      /* const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem('access_token')
  },
}; */

      /* const res = await axios.post(
    "http://localhost:8000/users/login",
    formDataR,
    config
  ); */
      /* localStorage.setItem("access_token", res.data.access_token);
setIsAuth(true);  // update authentication status */
      if (response.status === 200) {
        setRegistrationSuccessful(true);
      }

      /* handleClose() */
    } catch (error) {
      // Display error message
      setErrorMessage(
        "There was an error registering your account, Please try again later"
      );
    }
  };

  return (
    <>
      <Button className="custom-button" onClick={handleShow}>
        Login / Register
      </Button>

      <Modal show={show} onHide={handleClose}>
        {registrationSuccessful && (
          <Card>
            <Card.Body>
              Registration successful! Please check your email to verify your
              account.
            </Card.Body>
          </Card>
        )}
        <Modal.Header>
          <Button className="custom-button" bsSize="small" onClick={handleClose}>
            x
          </Button>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Tabs defaultActiveKey="LOGIN" className="mb-3" fill role="tablist">
            <Tab eventKey="login" title="LOGIN" className="tab-login">
              {/*         <Modal.Title  className="custom-login-btn" >LOGIN</Modal.Title> */}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  {/*  <FacebookLoginButton onClick={() => alert("Hello")} />
              <GoogleLoginButton onClick={() => alert("Hello")} /> */}
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
                <div className="text-center mt-3 d-grid gap-2 btn-log-reg">
                  <Button
                    className="btn-log-reg w-auto"
                    size="lg"
                    type="submit"
                  >
                    LOGIN
                  </Button>
                </div>
              </Form>
            </Tab>
            <Tab eventKey="register" title="REGISTER" className="tab-register">
              {/*         <Modal.Title  className="custom-login-btn" >REGISTER</Modal.Title> */}
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
                <div className="text-center mt-3 d-grid gap-2">
                  <div className="text-center mt-3 d-grid gap-2 btn-log-reg">
                    <Button
                      className="btn-log-reg w-auto"
                      size="lg"
                      type="submit"
                    >
                      REGISTER
                    </Button>
                  </div>
                </div>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <p>Forgot Password?</p>
          {/*       
        <ButtonGroup className="w-100" aria-label="Login and Register">
            <Button variant="secondary" type="submit" onClick={handleLogin} className="w-100">Login</Button>
            <Button variant="primary" type="submit" onClick={handleRegister} className="w-100">Register</Button>
        </ButtonGroup> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginRegisterModal;
