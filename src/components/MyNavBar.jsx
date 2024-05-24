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
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  return (
    <Navbar
      expand="lg"
      className={`bg-secondary border-bottom py-0 ${
        location.pathname === "/about" ? "fixed-top" : ""
      }`}
    >
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
              <Link to="/about" className="text-decoration-none">
                <span
                  className={`text-decoration-none me-lg-4 ${
                    location.pathname === "/about" ? "text-dark" : "text-muted"
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
                      alt="profile avatar"
                      width="35"
                      height="35"
                      className={`rounded-circle border border-primary ${
                        location.pathname === "/profile" ? "shadow" : ""
                      }`}
                      onClick={() => navigate("/profile")}
                    />
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
