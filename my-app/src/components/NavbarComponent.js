import { Navbar, Nav, Button } from 'react-bootstrap';
import './NavbarComponent.css';
import React from 'react';
import LoginRegisterModal from './auth/LoginRegisterModal';
import TestAPIButton from './TestAPIButton';
function NavbarComponent() {
return (
<Navbar expand="md" className="custom-navbar">
<Navbar.Brand href="/" className="custom-brand">
My Logo
</Navbar.Brand>
<Navbar.Toggle aria-controls="navbar-nav" />
<Navbar.Collapse id="navbar-nav">
<Nav className="mr-auto">
<Nav.Link href="/" className="custom-nav-link">HOME</Nav.Link>
<Nav.Link href="/chat" className="custom-nav-link">CHAT</Nav.Link>
<Nav.Link href="/about" className="custom-nav-link custom-important-link">ABOUT</Nav.Link>
{/* <Nav.Link href="/contact" className="custom-nav-link custom-important-link">CONTACT</Nav.Link> */}
<LoginRegisterModal />
<TestAPIButton />
<Nav.Link href="/myprofile" className="custom-nav-link custom-important-link">MY PROFILE</Nav.Link>
</Nav>
</Navbar.Collapse>
</Navbar>
);
}

export default NavbarComponent;