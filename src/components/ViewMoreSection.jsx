import { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProfile, getSingleProperty } from "../../redux/actions/actions";
import blueprint from "../assets/Img/blueprint.png";
import bedroom from "../assets/Img/bedroom.png";
import bathroom from "../assets/Img/bathroom.png";

const ViewMoreSection = () => {
  const { propertyId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profile.content);

  useEffect(() => {
    dispatch(getSingleProperty(token, propertyId));
    dispatch(getProfile(token));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const property = useSelector((state) => state.singleProperty.content);

  return (
    <Container className="vh-100">
      <Row className="align-items-center">
        <Col className="mt-4 shadow rounded-2  ">
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
                  <span>{property.country}</span>
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
                {/* <p>{ownerData.name}</p> */}
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
                  <span className="me-3 fs-4 ">{property.area} m²</span>
                  <div>
                    <img src={blueprint} alt="area icon" />
                  </div>
                </Col>
              </Row>
              {currentUser.id == property.user.id ? (
                <Button variant="danger" className="w-100 shadow text-light">
                  Modify your post
                </Button>
              ) : (
                <Button variant="success" className="w-100 shadow">
                  Contant the seller
                </Button>
              )}
            </div>
          ) : (
            <p>No property data available.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewMoreSection;
