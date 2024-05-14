import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoForma from "../assets/Img/LogoForma.svg";
import Button from "react-bootstrap/Button";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/actions";

const MyNavBar = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.content);
  const token = localStorage.getItem("token");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setShowDropdown(!showDropdown);
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-secondary border-bottom py-0 ">
      <Container fluid className="d-flex align-items-center px-5 ">
        <Link
          to={localStorage.getItem("token") ? "/homepage" : "/"}
          className="text-decoration-none"
        >
          <Navbar.Brand className="d-flex align-items-center">
            <img src={LogoForma} width="35" height="35" alt="logo your home" />
            Your Home
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto">
            <Nav className="d-flex align-items-center h-100">
              <Link
                to={localStorage.getItem("token") ? "/homepage" : "/"}
                className="text-decoration-none"
              >
                <span
                  className={`text-decoration-none me-lg-4 ${
                    location.pathname === "/homepage"
                      ? "text-dark"
                      : "text-muted"
                  }`}
                >
                  Home
                </span>
              </Link>
              <Link to="/notfound" className="text-decoration-none">
                <span
                  className={`text-decoration-none me-lg-4 ${
                    location.pathname === "/notfound"
                      ? "text-dark"
                      : "text-muted"
                  }`}
                >
                  About us
                </span>
              </Link>
              <Link to="/sell" className="text-decoration-none">
                <span
                  className={`text-decoration-none me-lg-4 ${
                    location.pathname === "/sell" ? "text-dark" : "text-muted"
                  }`}
                >
                  Sell
                </span>
              </Link>
              <Nav.Link>
                {localStorage.getItem("token") ? (
                  <>
                    <img
                      src={profile.avatar}
                      alt="test"
                      width="35"
                      height="35"
                      className="rounded-circle border border-primary"
                      onClick={toggleDropdown}
                    />
                    {showDropdown && (
                      <Dropdown show={showDropdown}>
                        <Dropdown.Menu
                          align="end"
                          className="bg-secondary p-0 "
                        >
                          <Dropdown.Item>
                            <Link
                              to="/profile"
                              className={`text-decoration-none me-lg-4 ${
                                location.pathname === "/profile"
                                  ? "text-dark"
                                  : "text-muted"
                              }`}
                              onClick={toggleDropdown}
                            >
                              Your profile{" "}
                            </Link>
                          </Dropdown.Item>

                          <Dropdown.Item href="#/action-2">Saved</Dropdown.Item>
                          <Dropdown.Item
                            className="text-decoration-none border-top me-lg-4 text-danger"
                            onClick={handleLogOut}
                          >
                            Log out
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </>
                ) : (
                  <Link to="/">
                    <Button variant="primary">Sign-up</Button>
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
