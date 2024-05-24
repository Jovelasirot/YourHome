import { Card, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ContactModal = ({ showModal, handleCloseModal, property }) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Body className="d-flex flex-column p-4 bg-secondary rounded-3">
        <div className="d-flex flex-column">
          <i
            className="bi bi-arrow-left fs-4 iconBtn"
            onClick={handleCloseModal}
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
            <p className="mb-0 fs-6">Owner of property: </p>
            {property.user.name} {property.user.surname}
          </span>
        </div>
        <Row className="mt-3 gy-2">
          <Col className="d-flex flex-column justify-content-center">
            <div className="mx-auto">
              <a
                href={`mailto:${property.user.email}`}
                className="text-decoration-none fw-light"
              >
                <i className="bi bi-envelope iconBtnContact fs-4"></i>
              </a>
            </div>
            <small className="text-center">Write an email</small>
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <div className="mx-auto">
              <Link
                to={`/property/reservation/${property.id}`}
                className="text-decoration-none"
              >
                <i className="bi bi-calendar-check iconBtnContact fs-4"></i>
              </Link>
            </div>
            <small className="text-center">Make a reservation</small>
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <div className="mx-auto">
              <i
                className="bi bi-chat-left-dots iconBtnContact fs-4"
                disabled
              ></i>
            </div>
            <small className="text-center">Message {property.user.name}</small>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

ContactModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  property: PropTypes.shape({
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ContactModal;
