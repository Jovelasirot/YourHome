import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProperty, getAllProperties } from "../../redux/actions/actions";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const PersonalPropertySection = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const currentUser = useSelector((state) => state.profile.content.id);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const properties = useSelector(
    (state) => state.allProperties.content.content
  );
  const isXxlScreen = useMediaQuery({ minWidth: 1400 });

  const userProperties = properties.filter(
    (property) => property.user.id === currentUser
  );

  const handleModalConfirmation = (propertyId) => {
    setShowConfirmation(true);
    setPropertyToDelete(propertyId);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setPropertyToDelete(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteProperty(token, propertyToDelete)).then(() =>
      dispatch(getAllProperties(token))
    );
    setShowConfirmation(false);
    setPropertyToDelete(null);
  };

  if (userProperties.length === 0) {
    return (
      <div className={isXxlScreen ? " " : "vh-100 text-center"}>
        Your real state will be shown here.
      </div>
    );
  }

  return (
    <Row>
      {userProperties.map((property) => (
        <Col key={property.id} lg={4} className="g-4">
          <div className="favorite-thumbnail-wrapper">
            <img
              src={property.images[0]}
              alt="property picture"
              className="rounded-2 favorite-thumbnail"
            />
            <Row className="overlay flex-column align-items-center">
              <Col>
                <Row>
                  <Col>
                    <div>
                      <i
                        className="bi bi-trash fs-4 heartIcon-fav-section text-danger"
                        onClick={() => handleModalConfirmation(property.id)}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex">
                <Col className="d-flex flex-column justify-content-end">
                  <Row className="flex-column">
                    <Col className="fw-bold">{property.address}</Col>
                    <Col>
                      {property.city}, {property.country}
                    </Col>
                  </Row>
                </Col>
                <Col className="d-flex flex-column justify-content-end text-end">
                  <Link to={`/homepage/details/${property.id}`}>
                    <Button variant="secondary">View more</Button>
                  </Link>
                </Col>
              </Col>
            </Row>
          </div>
          <Modal show={showConfirmation} onHide={handleCancelDelete}>
            <Modal.Header closeButton className="bg-secondary">
              <Modal.Title>Confirm delete</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-secondary d-flex flex-column align-items-center">
              <span>Are you sure you want to delete this real state?</span>

              <img
                src={property.images[0]}
                alt="property picture"
                width={"400 px"}
                height={"200 px"}
              />
            </Modal.Body>
            <Modal.Footer className="bg-secondary">
              <Button variant="success" onClick={handleCancelDelete}>
                Cancel
              </Button>
              <Button
                variant="danger"
                className="text-light d-flex  align-items-center"
                onClick={handleDeleteConfirm}
              >
                Confrim
                <i className="bi bi-trash ms-1" />
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      ))}
    </Row>
  );
};

export default PersonalPropertySection;
