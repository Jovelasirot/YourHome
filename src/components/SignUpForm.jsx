import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  return (
    <Container fluid className="signImgBg">
      <Row className="align-itmes-center">
        <Col>
          <Card id="signUpRectangle" className="py-5 px-5 ">
            <i className="bi bi-arrow-left-short"></i>
            <Link to="/" className="text-decoration-none">
              <i className="bi bi bi-arrow-left-short"></i>
            </Link>
            <Card.Body className="d-flex flex-column  justify-content-center">
              <Card.Title className="fs-3 fw-light">
                <span className="fw-bold text-primary"> Create </span>a new
                account
              </Card.Title>

              <Link to="/register" className="w-100 mt-3 ">
                <Button variant="primary w-100">Sign-up</Button>
              </Link>

              <Card.Text className="mt-2 text-light">
                Already have a register account, you can{" "}
                <span className="text-decoration-underline text-primary ">
                  Log-In
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUpForm;
