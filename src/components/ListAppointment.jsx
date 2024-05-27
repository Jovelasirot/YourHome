import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Placeholder,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCurrentAppointement,
  getReservationsList,
  postReservation,
  updateReservation,
} from "../../redux/actions/actions";

const ListAppointment = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const currentUser = useSelector((state) => state.profile.content.id);
  const [reservationId, setReservationId] = useState("");
  const loading = useSelector((state) => state.reservationList.loading);
  const [showModal, setShowModal] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [formData, setFormData] = useState({
    reservationStatus: "",
    reservationDate: "",
    time: "",
  });

  useEffect(() => {
    dispatch(getReservationsList(token, currentUser));
  }, [dispatch, token, currentUser]);

  const reservationList = useSelector(
    (state) => state.reservationList.content.content
  );

  const handleModal = (reservationId, reservation) => {
    setReservationId(reservationId);
    setFormData({
      reservationStatus: reservation.reservationStatus,
      reservationDate: reservation.reservationDate,
      time: reservation.time,
    });

    setShowModal(!showModal);
  };

  const HandleCloseModalCancel = () => {
    setShowModalCancel(!showModalCancel);
  };

  const HandleModalCancel = (reservationId, reservation) => {
    setReservationId(reservationId);
    setFormData({
      reservationStatus: reservation.reservationStatus,
      reservationDate: reservation.reservationDate,
      time: reservation.time,
    });
    setShowModalCancel(!showModalCancel);
  };

  const HandleCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReservation(token, reservationId, formData));
  };

  const handleSubmitCancel = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      reservationStatus: "CANCELED",
    };
    dispatch(updateReservation(token, reservationId, updatedFormData));
  };

  const handleRemoveFromList = (reservationId) => {
    dispatch(deleteCurrentAppointement(token, reservationId));
  };

  const isFormComplete = () => {
    return formData.reservationDate && formData.time;
  };

  if (!Array.isArray(reservationList) || reservationList.length === 0) {
    return (
      <div className="vh-100 text-center">
        Your appointments will be shown here
      </div>
    );
  }

  return (
    <Container fluid>
      <Row className="fw-bold mb-1 mt-2">
        <Col>Date</Col>
        <Col>Time</Col>
        <Col>Address</Col>
        <Col>Status</Col>
        <Col>Owner</Col>
        <Col xs={1}></Col>
      </Row>
      <Row className="flex-column gy-4">
        {loading ? (
          <Col>
            <Placeholder animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={9} />
              <Placeholder xs={8} />
            </Placeholder>
          </Col>
        ) : (
          reservationList &&
          reservationList.map((reservation) => (
            <Col key={reservation.id} className="shadow rounded-3 p-3">
              <Row>
                <Col className="d-flex align-items-center">
                  {reservation.reservationDate}
                </Col>
                <Col className="d-flex align-items-center">
                  {reservation.time}
                </Col>
                <Col className="d-flex align-items-center">
                  {reservation.property.address}
                </Col>
                <Col className="d-flex align-items-center">
                  <span
                    className={`p-3 rounded-5 text-light shadow ${
                      reservation.reservationStatus === "PENDING"
                        ? "bg-warning"
                        : reservation.reservationStatus === "ACCEPTED"
                        ? "bg-success"
                        : reservation.reservationStatus === "NOT_ACCEPTED"
                        ? "bg-danger"
                        : reservation.reservationStatus === "CANCELED"
                        ? "bg-dark"
                        : ""
                    }`}
                  >
                    {reservation.reservationStatus}
                  </span>
                </Col>
                <Col className="d-flex align-items-center">
                  <img
                    src={reservation.property.user.avatar}
                    alt="owner avatar"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                  <small className="ms-2">
                    {reservation.property.user.name} {""}
                    {reservation.property.user.surname}
                  </small>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-center"
                  xs={1}
                >
                  {reservation.reservationStatus === "ACCEPTED" ? (
                    <Button
                      variant="outline-dark"
                      type="submit"
                      onClick={() =>
                        HandleModalCancel(reservation.id, reservation)
                      }
                    >
                      Cancel
                    </Button>
                  ) : reservation.reservationStatus === "CANCELED" ? (
                    <i
                      className="bi bi-trash iconBtn fs-5 text-danger"
                      onClick={() => handleRemoveFromList(reservation.id)}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-pencil-square text-end iconBtn fs-5"
                      onClick={() => handleModal(reservation.id, reservation)}
                    ></i>
                  )}
                </Col>
              </Row>
            </Col>
          ))
        )}
      </Row>
      <Modal show={showModal} onHide={HandleCloseModal} centered>
        <Modal.Header closeButton className="bg-secondary ">
          <Modal.Title>Modify appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary rounded-2">
          <Row className="flex-column align-items-center">
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
            </Form>
            <Col className="mt-4">
              <Button
                variant="primary w-100"
                type="submit"
                disabled={!isFormComplete()}
                onClick={handleSubmit}
              >
                Modify appointment
              </Button>
              {formData.reservationStatus !== "CANCELED" && (
                <Button
                  variant="outline-danger w-100"
                  type="submit"
                  className="mt-4"
                  onClick={handleSubmitCancel}
                >
                  Cancel appointment
                </Button>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={showModalCancel} onHide={HandleCloseModalCancel} centered>
        <Modal.Header closeButton className="bg-secondary "></Modal.Header>
        <Modal.Body className="bg-secondary rounded-2">
          <p className="fs-4">
            {" "}
            Are you sure you want to cancel the appointemnt?
          </p>
          <Row>
            <Col>
              <Button
                variant="success w-100"
                type="submit"
                className="mt-4"
                onClick={HandleCloseModalCancel}
              >
                Go back
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger w-100"
                type="submit"
                className="mt-4 text-light"
                onClick={handleSubmitCancel}
              >
                Cancel appointment
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default ListAppointment;
