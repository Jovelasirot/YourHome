import { useEffect } from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReservationsList } from "../../redux/actions/actions";

const ListAppointment = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const currentUser = useSelector((state) => state.profile.content.id);
  const loading = useSelector((state) => state.reservationList.loading);

  useEffect(() => {
    dispatch(getReservationsList(token, currentUser));
  }, [dispatch, token, currentUser]);

  const reservationList = useSelector(
    (state) => state.reservationList.content.content
  );

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
                        ? "bg-info"
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
                <Col className="d-flex align-items-center" xs={1}>
                  <i className="bi bi-pencil-square text-end iconBtn fs-5 "></i>
                </Col>
              </Row>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
export default ListAppointment;
