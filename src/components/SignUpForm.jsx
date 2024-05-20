import {
  Button,
  Card,
  Col,
  Container,
  InputGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { registerUser } from "../../redux/actions/actions";
import Select from "react-select";
import zxcvbn from "zxcvbn";
import { useMediaQuery } from "react-responsive";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthdate: "",
    country: "",
    email: "",
    username: "",
    password: "",
  });
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const emailRgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormIncomplete = Object.values(formData).some(
    (value) => value === ""
  );

  const countryOptions = [
    { value: "Austria", label: "Austria" },
    { value: "Belgium", label: "Belgium" },
    { value: "Canada", label: "Canada" },
    { value: "Denmark", label: "Denmark" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Germany", label: "Germany" },
    { value: "Greece", label: "Greece" },
    { value: "Italy", label: "Italy" },
    { value: "Monaco", label: "Monaco" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Norway", label: "Norway" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "San Marino", label: "San Marino" },
    { value: "Spain", label: "Spain" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
  ];

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.value });
  };

  const getPasswordStrength = () => {
    const result = zxcvbn(formData.password);
    return (result.score + 1) * 25;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return "danger";
    if (strength <= 50) return "warning";
    if (strength <= 75) return "info";
    return "success";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const strength = zxcvbn(formData.password).score;
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
    } else if (strength <= 2) {
      alert("Weak password, try another one");
    } else if (!emailRgx.test(formData.email)) {
      alert("Invalid email format, please enter a valid email address.");
    } else {
      dispatch(registerUser(formData));
      alert("Registration successful!");
    }
  };

  return (
    <Container
      fluid
      className="signImgBg vh-100 justify-content-center align-items-center"
    >
      <Row className="align-itmes-center">
        <Col>
          <Card id="signUpRectangle" className={isMdScreen ? "p-5 " : ""}>
            <Link
              to="/"
              className={`text-decoration-none ${isMdScreen ? "" : "m-3"}`}
            >
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
                    <Form.Group className="mb-3" controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Select
                        options={countryOptions}
                        onChange={handleCountryChange}
                        className="w-100"
                        required
                      />
                    </Form.Group>
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
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        onChange={handleChange}
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
                    {formData.password && (
                      <>
                        <ProgressBar
                          now={getPasswordStrength()}
                          variant={getPasswordStrengthColor()}
                          className="mt-2"
                        />
                        {getPasswordStrengthColor() !== "success" ? (
                          <p className="mb-0 ">
                            Try using special characters, capital characters,
                            numbers
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </Form.Group>
                  {formData.password && (
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Confirm password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          onChange={handleChange}
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
                  )}
                </Form>
              </Card.Text>
              <Button
                variant="primary w-100"
                type="submit"
                onClick={handleSubmit}
                disabled={isFormIncomplete}
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
