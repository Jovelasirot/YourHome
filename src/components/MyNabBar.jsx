import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoForma from "../assets/Img/LogoForma.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const MyNavBar = () => {
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
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-items-center ">
              <Nav.Link href="#">About us</Nav.Link>
              <Nav.Link href="#">Latest</Nav.Link>
              <Nav.Link href="#">
                <Link to="/register">
                  <Button variant="primary">Sign-up</Button>
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
