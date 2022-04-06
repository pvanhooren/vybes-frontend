import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Button } from "react-bootstrap";
import logo from "../../images/vybes-logo-white.png";
import * as Icon from "react-bootstrap-icons";

import "../sass/_navbar.scss";

const NavigationBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" variant="dark" id="navbar">
      <Navbar.Brand href="/">
        <img
          alt="logo"
          src={logo}
          width="auto"
          height="40"
          className="align-center"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <a className="nav-item" href="#">
            <Icon.PersonFill className="nav-item-icon"/>
            <h4 className="nav-item-text">People</h4>
          </a>

          <a className="nav-item" href="#">
            <Icon.PeopleFill className="nav-item-icon"/>
            <h4 className="nav-item-text">Groups</h4>
          </a>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <input
          type="search"
          className="form-control rounded search-bar"
          placeholder="Search for people, groups..."
          aria-label="Search"
          aria-describedby="search-addon"
        />

        <Nav.Link className="nav-item profile-button" href="#">
          <Icon.PersonCircle color="white" className="nav-item-icon" />
          <h4 className="nav-item-text">Pim</h4>
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
