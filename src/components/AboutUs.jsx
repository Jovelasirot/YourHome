import { Col, Container, Row } from "react-bootstrap";
import Logo from "../assets/Img/LogoForma.svg";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const [showingBuy, setShowingBuy] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingBuy((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container className="d-flex flex-column  align-items-center ">
      <Col className="fadein fs-1">
        <div
          style={{ marginBottom: "300px", marginTop: "300px" }}
          className="text-center"
        >
          <img
            src={Logo}
            alt="logo"
            className="img-fluid"
            style={{
              width: "500px",
              height: "500px",
              margin: "auto",
            }}
          />
          <div className="container">
            <div className="phrase">
              <span className={`text ${showingBuy ? "show" : "hide"}`}>
                {showingBuy ? "Buy" : "Sell"}
              </span>
              <span>
                <span className="ms-2 fw-bold">your home</span>, simply with us
              </span>
            </div>
          </div>
          <p className="invisible">
            ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎ ‎‎
            ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
          </p>
        </div>
        <p>
          Your Home is a cutting-edge web platform for property search and
          sales, designed to offer an intuitive user experience and advanced
          features. We utilize modern technologies to ensure efficiency,
          security, and scalability.
        </p>
        <p>
          You can schedule appointments to visit properties directly through the
          platform. An integrated calendar system allows you to choose dates and
          times that are convenient for both parties.
        </p>
        <p>
          Each listing includes an option to contact the owner via email. Users
          can send emails directly from the site, without the need to copy
          addresses or use external email programs.
        </p>
        <p>
          Secure Authentication: All communications are protected by an
          authentication system that ensures the security of personal data.
          Personal Data Management: Contact details and personal information are
          managed securely to prevent unauthorized access.
        </p>
        <p className="text-center fs-1 fw-bold">Coming soon</p>
        <p>
          Users will be able to send direct messages to property owners through
          the platform. This feature will allow them to ask questions and
          receive quick responses without leaving the site.
        </p>
      </Col>
    </Container>
  );
};
export default AboutUs;
