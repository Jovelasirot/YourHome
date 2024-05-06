import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../../redux/actions/actions";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    birthdate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      dispatch(registerUser(formData));
      alert("Registration successful!");
    }
  };

  return (
    <Container fluid className="signImgBg">
      <Row className="align-itmes-center">
        <Col>
          <Card id="signUpRectangle" className="py-5  px-5">
            <Link to="/" className="text-decoration-none ">
              <i className="bi bi bi-arrow-left fs-3"></i>
            </Link>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-3 fw-light border-bottom">
                <span className="fw-bold text-primary"> Create </span>a new
                account
                <span className="invisble">
                  ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎
                  ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎
                </span>
              </Card.Title>
              <Card.Text className="mt-2">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      className="w-100"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Surname"
                      className="w-100"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      className="w-100"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      className="w-100"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="Password"
                      placeholder="Password"
                      className="w-100"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {formData.password && (
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        className="w-100"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  )}
                  <Form.Group className="mb-3" controlId="birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Birthdate"
                      className="w-100"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Form>
              </Card.Text>
              <Button
                variant="primary w-100"
                type="submit"
                onClick={handleSubmit}
              >
                Sign-up
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default SignUpForm;
