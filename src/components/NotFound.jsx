import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Row className="vh-100 align-items-center justify-content-center ">
        <Col className="text-center">
          <h3>Page not found</h3>
          <iframe
            src="https://giphy.com/embed/UoeaPqYrimha6rdTFV"
            width="580"
            height="370"
            allowFullScreen
          ></iframe>
          <Col>
            <Link to={"/"}>
              <Button>Go back home</Button>
            </Link>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};
export default NotFound;
