import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import * as Icon from "react-bootstrap-icons";
import { useAuth0 } from "@auth0/auth0-react";

import logo from "../../images/vybes-logo-white.png";
import "../sass/_navbar.scss";

const NavigationBar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [show, setShow] = useState(false);

  const toggleDropdown = (e) => {
    setShow(!show);
  };
  
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Navbar collapseOnSelect expand="md" variant="dark" id="navbar">
      <Navbar.Brand
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          alt="logo"
          src={logo}
          width="auto"
          height="40"
          className="navbar-logo align-center"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <a
            className="nav-item"
            onClick={() => {
              navigate("people");
            }}
          >
            <Icon.PersonFill className="nav-item-icon" />
            <h4 className="nav-item-text">People</h4>
          </a>

          <a
            className="nav-item"
            onClick={() => {
              navigate("groups");
            }}
          >
            <Icon.PeopleFill className="nav-item-icon" />
            <h4 className="nav-item-text">Groups</h4>
          </a>
        </Nav>
      </Navbar.Collapse>

      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <div className="form-group has-search">
          <span className="form-control-feedback">
            <Icon.Search></Icon.Search>
          </span>

          <input
            type="text"
            className="form-control rounded search-bar"
            placeholder="Search for people, groups..."
          />
        </div>
        {/* <input
          type="search"
          className="form-control rounded search-bar"
          placeholder="Search for people, groups..."
          aria-label="Search"
          aria-describedby="search-addon"
        /> */}

        <div className="user-controls">
          {isAuthenticated ? (
            <NavDropdown
              className="user-dropdown"
              title={
                <>
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="nav-user-profile rounded-circle"
                    width="40"
                    height="40"
                  />
                </>
              }
              show={show}
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
              align="end"
            >
              <NavDropdown.Header>{user.name}</NavDropdown.Header>
              <NavDropdown.Divider className="divider" />

              <div className="dropdown-buttons">
                <NavDropdown.Item
                  onClick={() => {
                    navigate("profile");
                  }}
                  className="dropdown-button"
                >
                  <Icon.PersonBadge />
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={() => {
                    navigate("Notifications");
                  }}
                  className="dropdown-button"
                >
                  <Icon.Bell />
                  Notifications
                </NavDropdown.Item>
              </div>

              <div className="icons">
                <a
                  onClick={() => logoutWithRedirect()}
                  className="logout-button"
                >
                  <Icon.BoxArrowInLeft />
                  Sign out
                </a>

                <a
                  onClick={() => {
                    navigate("Settings");
                  }}
                  className="settings-button"
                >
                  <Icon.WrenchAdjustable />
                </a>
              </div>
            </NavDropdown>
          ) : (
            <Nav.Link
              className="nav-item login-button"
              onClick={() => loginWithRedirect()}
            >
              <Icon.PersonCircle
                color="white"
                className="nav-item-icon login-button-icon"
              />
            </Nav.Link>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
