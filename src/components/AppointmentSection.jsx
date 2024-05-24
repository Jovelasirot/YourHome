import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProfile,
  getSingleProperty,
  postReservation,
} from "../../redux/actions/actions";
import { useMediaQuery } from "react-responsive";
import blueprint from "../assets/Img/blueprint.png";
import bedroom from "../assets/Img/bedroom.png";
import bathroom from "../assets/Img/bathroom.png";

const AppointmentSection = () => {
  const { propertyId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profile.content);
  const property = useSelector((state) => state.singleProperty.content);
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    propertyId: propertyId,
    userId: currentUser.id,
    reservationDate: "",
    time: "",
  });

  useEffect(() => {
    dispatch(getSingleProperty(token, propertyId));
    dispatch(getProfile(token));
  }, [dispatch, token, propertyId]);

  useEffect(() => {
    if (currentUser.id) {
      setFormData((prevData) => ({ ...prevData, userId: currentUser.id }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReservation(token, formData));
    navigate(`/property/details/${propertyId}`);
  };

  const isFormComplete = () => {
    return formData.reservationDate && formData.time;
  };

  return (
    <Container>
      <Row className={isMdScreen ? "vh-100 align-items-center" : "vh-100 mt-5"}>
        <Col>
          <Card
            className={`bg-secondary shadow border-0 ${
              isMdScreen ? " py-5 px-5" : ""
            }`}
          >
            <Col>
              <Link
                to={`/property/details/${propertyId}`}
                className="text-decoration-none"
              >
                <i className="bi bi-arrow-left iconBtn fs-3"></i>
              </Link>
            </Col>
            <Card.Body>
              <Card.Title className="fs-3 fw-light border-bottom">
                Book an appointment
              </Card.Title>
              <Row className="flex-column border-bottom py-4">
                <Col className="d-flex flex-column ">
                  <Col>
                    <Row className="mt-3">
                      <Col>
                        <p className="fw-bold fs-4 mb-0">{property.address}</p>
                        <span>
                          {property.city}, {property.country}
                        </span>
                      </Col>
                      <Col className="text-end">
                        <span className="fw-bold fs-4">{property.price}</span>€
                      </Col>
                    </Row>
                  </Col>
                  <Col className="d-flex align-items-end ">
                    <Col className="d-flex justify-content-center  align-items-center me-5 shadow">
                      <span className="me-2 fs-3">{property.bedrooms}</span>
                      <div>
                        <img src={bedroom} alt="bedroom icon" />
                      </div>
                    </Col>
                    <Col className="d-flex mt-4 justify-content-center  align-items-center me-5 shadow">
                      <span className="me-2 fs-3">{property.bathrooms}</span>
                      <div>
                        <img src={bathroom} alt="bathroom icon" />
                      </div>
                    </Col>
                    <Col className="d-flex justify-content-center  align-items-center  shadow">
                      <span className="me-2 fs-3">{property.area} </span>
                      <div>
                        <img src={blueprint} alt="area icon" />
                      </div>
                    </Col>
                  </Col>
                </Col>
              </Row>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="reservationDate" className="mb-3">
                  <Form.Label>Reservation Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.reservationDate}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="time" className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary w-100"
                  type="submit"
                  disabled={!isFormComplete()}
                >
                  Request appointment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentSection;
