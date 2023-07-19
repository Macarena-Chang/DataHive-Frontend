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
DataHive
</Navbar.Brand>
<Navbar.Toggle aria-controls="navbar-nav" />
<Navbar.Collapse id="navbar-nav">
<Nav className="mr-auto">
<Nav.Link href="/" className="custom-nav-link">HOME</Nav.Link>

<Nav.Link href="/about" className="custom-nav-link custom-important-link">ABOUT</Nav.Link>
{/* <Nav.Link href="/contact" className="custom-nav-link custom-important-link">CONTACT</Nav.Link> */}
        {!isAuth && (
        <LoginRegisterModal />
        )}
{isAuth && (
            <>
            <Nav.Link href="/chat" className="custom-nav-link">CHAT</Nav.Link>
          
            <Nav.Link href="/profile" className="custom-nav-link custom-important-link">MY PROFILE</Nav.Link>


        </>
        
        )}
</Nav>
<Nav className="ml-auto" >
{isAuth && (
       <TestAPIButton />
        )}
</Nav>
</Navbar.Collapse>
</Navbar>
);
}

export default NavbarComponent;