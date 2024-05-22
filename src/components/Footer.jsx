import { Col, Container, Row } from "react-bootstrap";
import Logo from "../assets/Img/Logo.svg";

const Footer = () => {
  return (
    <Container fluid className="bg-primary-subtle py-3 mt-5">
      <Container>
        <Row>
          <Col>
            <img src={Logo} alt="logo" height={"100px"} />
          </Col>
          <Col className="d-flex flex-column align-itmes-center justify-content-center ">
            <div className="fs-6 text-center">
              <span>Let&#39;s keep in touch</span>
            </div>
            <div className="fs-2 d-flex  align-items-center justify-content-center">
              <a
                href="https://www.linkedin.com/in/jovel-jhon-marcko-asirot-20295524a/"
                className="text-text-decoration-none "
              >
                <i className="bi bi-linkedin me-4"></i>
              </a>
              <a href="mailto:jovelasirot@gmail.com">
                <i className="bi bi-envelope-fill fs-1 "></i>
              </a>
            </div>
          </Col>
          <Col className="d-flex flex-column-reverse align-items-end  justify-content-center">
            <span>Copyright &#169; 2024</span>
            <a href="mailto:jovelasirot@gmail.com" className="text-primary">
              <span>jovelasirot@gmail.com</span>
            </a>
            <span>Made by Jovel Asirot</span>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default Footer;
