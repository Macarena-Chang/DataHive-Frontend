import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";


function NavbarComponent() {
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#">Query your data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Chat your data</Nav.Link>
            <Nav.Link href="#">Summarizer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
export default NavbarComponent;