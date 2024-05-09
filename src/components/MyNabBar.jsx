import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoForma from "../assets/Img/LogoForma.svg";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/actions/actions";

const MyNavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const profile = useSelector((state) => state.profile.content);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  return (
    <Navbar expand="lg" className="bg-secondary border-bottom">
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
            <Nav className="d-flex align-items-center ">
              <Nav.Link href="#">About us</Nav.Link>
              <Nav.Link href="#">Latest</Nav.Link>
              <Nav.Link>
                {localStorage.getItem("token") ? (
                  <>
                    <img src={profile.avatar} alt="test" />
                    <p>{profile.name}</p>
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
