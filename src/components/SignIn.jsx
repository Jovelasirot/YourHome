import { Col, Container, InputGroup, Row, Spinner } from "react-bootstrap";
import LogoForma from "../assets/Img/LogoForma.svg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../redux/actions/actions";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const emailStored = localStorage.getItem("email");
  const passwordStored = localStorage.getItem("password");
  const [formData, setFormData] = useState({
    email: "" || emailStored,
    password: "" || passwordStored,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(loginUser(formData));
    setTimeout(() => {
      const token = localStorage.getItem("token");
      setIsLoading(false);
      if (token) {
        setFormData({
          email: "",
          password: "",
        });
        navigate("/homepage");
      }
    }, 1500);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormIncomplete =
    Object.entries(formData).some(([key, value]) => {
      if (value === "") {
        return true;
      }
      if (
        (key === "email" && emailStored) ||
        (key === "password" && passwordStored)
      ) {
        return false;
      }
      return false;
    }) && !(emailStored && passwordStored);

  return (
    <Container fluid className="signImgBg">
      <Row>
        <Col>
          <Card id="signUpRectangle" className="py-5  px-5">
            <Row>
              <Col>
                <Link to="/" className="text-decoration-none ">
                  <i className="bi bi bi-arrow-left fs-3"></i>
                </Link>
              </Col>
              <Col className="d-flex justify-content-end ">
                <Card.Img
                  variant="right"
                  src={LogoForma}
                  style={{ width: "100px", height: "100px" }}
                />
              </Col>
            </Row>
            <Card.Body className="d-flex flex-column">
              <Card.Title className="fs-3 fw-light border-bottom">
                <span className="fw-bold text-primary"> Welcome back </span>
                login to your account
                <span className="invisble">
                  ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎
                  ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎
                </span>
              </Card.Title>
              <Card.Text className="mt-2">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="email"
                      className="w-100"
                      onChange={handleChange}
                      defaultValue={emailStored ? emailStored : ""}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleChange}
                        defaultValue={passwordStored ? passwordStored : ""}
                        required
                      />
                      <InputGroup.Text onClick={togglePasswordVisibility}>
                        <i
                          className={`bi ${
                            showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                          }`}
                        ></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Card.Text>
              <Button
                variant="primary w-100"
                type="submit"
                onClick={handleSubmit}
                disabled={isFormIncomplete || isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Log in"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
