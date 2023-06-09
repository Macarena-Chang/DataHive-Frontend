import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './NavbarComponent.css';
import LoginRegisterModal from './auth/LoginRegisterModal';
import TestAPIButton from './TestAPIButton';

function NavbarComponent() {
    const { isAuth } = useContext(AuthContext);
    console.log("isAuth FromNavBarComponent " + isAuth)


return (
<Navbar expand="md" className="custom-navbar">
<Navbar.Brand href="/" className="custom-brand">
My Logo
</Navbar.Brand>
<Navbar.Toggle aria-controls="navbar-nav" />
<Navbar.Collapse id="navbar-nav">
<Nav className="mr-auto">
<Nav.Link href="/" className="custom-nav-link">HOME</Nav.Link>

<Nav.Link href="/about" className="custom-nav-link custom-important-link">ABOUT</Nav.Link>
{/* <Nav.Link href="/contact" className="custom-nav-link custom-important-link">CONTACT</Nav.Link> */}
<Nav.Link href="/about" className="custom-nav-link custom-important-link">ABOUT</Nav.Link>
        {!isAuth && (
        <LoginRegisterModal />
        )}
<Nav.Link href="/chat" className="custom-nav-link">CHAT</Nav.Link>
<TestAPIButton />
<Nav.Link href="/myprofile" className="custom-nav-link custom-important-link">MY PROFILE</Nav.Link>
</Nav>
</Navbar.Collapse>
</Navbar>
);
}

export default NavbarComponent;