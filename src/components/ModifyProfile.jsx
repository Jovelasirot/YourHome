import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { modifyCurrentProfile } from "../../redux/actions/actions";

const ModifyProfile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const profile = useSelector((state) => state.profile.content);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const hanldeSubmit = () => {
    dispatch(modifyCurrentProfile(token, formData));
  };
  return (
    <Container>
      <Row className="vh-100 align-items-center">
        <Col>
          <Card className="py-5 bg-secondary shadow border-0 px-5">
            <Col>
              <Link to="/homepage" className="text-decoration-none ">
                <i className="bi bi bi-arrow-left iconBtn fs-3"></i>
              </Link>
            </Col>
            <Card.Body>
              <Card.Title className="fs-3 fw-light  border-bottom">
                <span className="fw-bold text-primary">
                  Modify your profile
                </span>
              </Card.Title>
              <Container>
                <Row>
                  <Col className="border-end">
                    <Card.Text>
                      <Form>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="w-100"
                            //   onChange={handleChange}
                            //   value={formData.city}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                          <Form.Label>Surname:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Surname"
                            className="w-100"
                            //   onChange={handleChange}
                            //   value={formData.city}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            className="w-100"
                            //   onChange={handleChange}
                            //   value={formData.city}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>Phone:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            className="w-100"
                            //   onChange={handleChange}
                            //   value={formData.city}
                            required
                          />
                        </Form.Group>
                      </Form>
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <Form>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Previews name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="w-100"
                            value={profile.name}
                            readOnly
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                          <Form.Label>Previews surname:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Surname"
                            className="w-100"
                            value={profile.surname}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Old email:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Email"
                            className="w-100"
                            value={profile.email}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>Old phone:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone"
                            className="w-100"
                            value={profile.phone}
                            required
                          />
                        </Form.Group>
                      </Form>
                    </Card.Text>
                  </Col>
                </Row>
              </Container>

              <Button
                variant="primary w-100"
                type="submit"
                // onClick={handleSubmit}
                // disabled={!isFormComplete()}
              >
                Save changes
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ModifyProfile;
