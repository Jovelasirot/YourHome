import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoForma from "../assets/Img/LogoForma.svg";
import Button from "react-bootstrap/Button";

const MyNavBar = () => {
  const getRealStateData = async () => {
    const urlRealStateData =
      "https://realtor-search.p.rapidapi.com/properties/search-buy?location=city%3ANew%20York%2C%20NY";
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "4a5db48de4msh6c0c309b8832ff7p13ca6ajsn868b9e492543",
          "X-RapidAPI-Host": "realtor-search.p.rapidapi.com",
        },
      };
      const response = await fetch(urlRealStateData, options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = () => {
    getRealStateData();
  };

  return (
    <Navbar expand="lg" className="bg-secondary">
      <Container fluid className="d-flex align-items-center px-5 ">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={LogoForma} width="35" height="35" alt="logo your home" />
          Your Home
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-items-center ">
              <Nav.Link href="#">About us</Nav.Link>
              <Nav.Link href="#">Latest</Nav.Link>
              <Nav.Link href="#">
                <Button variant="primary" onClick={handleSignIn}>
                  Sign in
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
