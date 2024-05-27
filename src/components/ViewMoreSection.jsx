import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getProfile,
  getReservationsListProperty,
  getSingleProperty,
} from "../../redux/actions/actions";
import blueprint from "../assets/Img/blueprint.png";
import bedroom from "../assets/Img/bedroom.png";
import bathroom from "../assets/Img/bathroom.png";
import { useMediaQuery } from "react-responsive";
import ReservationsProperty from "./ReservationsProperty";

const ViewMoreSection = () => {
  const { propertyId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const currentUser = useSelector((state) => state.profile.content);

  useEffect(() => {
    dispatch(getSingleProperty(token, propertyId));
    dispatch(getProfile(token));
    dispatch(getReservationsListProperty(token, propertyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch.propertyId]);

  const property = useSelector((state) => state.singleProperty.content);

  const isMdScreen = useMediaQuery({ minWidth: 768 });

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const reservationListProperty = useSelector(
    (state) => state.reservationListProperty.content.content
  );

  if (!property || Object.keys(property).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="mt-4 shadow rounded-2">
          <Link to="/homepage" className="text-decoration-none ">
            <i className="bi bi-arrow-left fs-4 mt-2 iconBtn"></i>
          </Link>
          {property.length !== 0 ? (
            <div className="p-3">
              <Row>
                <Col>
                  <Card.Title className="fw-bold">
                    {property.address}
                  </Card.Title>
                  <span>
                    {property.city}, {property.country}
                  </span>
                </Col>
                <Col className="text-end">
                  <Card.Title className="mb-0">{property.price} €</Card.Title>
                </Col>
              </Row>
              <Carousel className="my-2">
                {property.images &&
                  property.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="w-100 "
                        src={image}
                        alt="Property image"
                        style={{ maxHeight: "500px", objectFit: "cover" }}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
              <Card.Text>
                <p className="fw-light text-end" style={{ fontSize: "14px" }}>
                  Posted on: {property.createdAt}
                </p>
              </Card.Text>
              <Card.Text>
                <p className="fw-bold mb-0">Description:</p>
                <p>{property.description}</p>
              </Card.Text>
              <Card.Text>
                <p className="fw-bold mb-0">Interior status:</p>
                <p>
                  {property.propertyStatus &&
                    property.propertyStatus.charAt(0).toUpperCase() +
                      property.propertyStatus
                        .slice(1)
                        .toLowerCase()
                        .replace(/_/g, " ")}
                </p>
              </Card.Text>
              <Card.Text>
                <p className="fw-bold mb-0">Property type:</p>
                <p>
                  {property.propertyType &&
                    property.propertyType.charAt(0).toUpperCase() +
                      property.propertyType.slice(1).toLowerCase()}
                </p>
              </Card.Text>
              <Card.Text className="text-end">
                <p className="fw-bold mb-0">Owner:</p>
                <p>
                  {property.user.name} {property.user.surname}
                </p>
              </Card.Text>
              <Row className="mt-3  border-top p-4">
                <Col className="d-flex justify-content-center  align-items-center ">
                  <span className="me-3 fs-4 ">{property.bedrooms}</span>
                  <div>
                    <img src={bedroom} alt="bedroom icon" />
                  </div>
                </Col>
                <Col className="d-flex justify-content-center  align-items-center ">
                  <span className="me-3 fs-4 ">{property.bathrooms}</span>
                  <div>
                    <img src={bathroom} alt="bathroom icon" />
                  </div>
                </Col>
                <Col className="d-flex justify-content-center  align-items-center ">
                  <span className="me-3 fs-4 ">{property.area}</span>
                  <div>
                    <img src={blueprint} alt="area icon" />
                  </div>
                </Col>
              </Row>
              {currentUser.id == property.user.id ? (
                <Link to={`/property/modify/${propertyId}`}>
                  <Button variant="danger" className="w-100 shadow text-light">
                    Modify your post
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="success"
                  className="w-100 shadow"
                  onClick={handleShowModal}
                >
                  Contant the seller
                </Button>
              )}
            </div>
          ) : (
            <p>No property data available.</p>
          )}
        </Col>
        <Modal show={showModal} onHide={handleShowModal} centered>
          <Modal.Body className="d-flex flex-column p-4 bg-secondary rounded-3">
            <div className="d-flex flex-column">
              <i
                className="bi bi-arrow-left fs-4  iconBtn"
                onClick={handleShowModal}
              ></i>

              <Card.Img
                variant="top"
                src={property.user.avatar}
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "auto",
                }}
                className="mt-2 rounded-circle border border-primary"
                alt="profile picture"
              />
              <span className="fs-5 ms-2 text-center">
                <p className="mb-0 fs-6 ">Owner of property: </p>
                {property.user.name} {property.user.surname}
              </span>
            </div>
            <Row className="mt-3 gy-2 ">
              <Col className="d-flex flex-column justify-content-center">
                <div className="mx-auto  ">
                  <a
                    href={`mailto:${property.user.email}`}
                    className="text-decoration-none fw-light m"
                  >
                    <i className="bi bi-envelope iconBtnContact fs-4  "></i>
                  </a>
                </div>
                <small className="text-center">Write an email</small>
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <div className="mx-auto  ">
                  <Link
                    to={`/property/appointment/${property.id}`}
                    className="text-decoration-none"
                  >
                    <i className="bi bi-calendar-check iconBtnContact fs-4"></i>
                  </Link>
                </div>
                <small className="text-center"> Book an appointment</small>
              </Col>
              <Col className="d-flex flex-column justify-content-center">
                <div className="mx-auto">
                  <i
                    className="bi bi-chat-left-dots iconBtnContact fs-4"
                    disabled
                  ></i>
                </div>
                <small className="text-center">
                  Message {property.user.name}{" "}
                </small>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
      {!reservationListProperty ||
        (currentUser.id == property.user.id &&
          Object.keys(reservationListProperty).length !== 0 && (
            <ReservationsProperty />
          ))}
    </Container>
  );
};

export default ViewMoreSection;
