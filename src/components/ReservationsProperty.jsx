import React, { useState } from "react";
import { Col, Row, Placeholder, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postReservationPropertyAnswer } from "../../redux/actions/actions";
import { useParams } from "react-router-dom";

const ReservationsProperty = () => {
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const loading = useSelector((state) => state.reservationListProperty.loading);
  const token = localStorage.getItem("token");
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const reservationListProperty = useSelector(
    (state) => state.reservationListProperty.content?.content
  );
  const [formData, setFormData] = useState({
    reservationStatus: "",
  });

  const handleReservationAccept = () => {
    const updatedFormData = {
      ...formData,
      reservationStatus: "ACCEPTED",
    };

    dispatch(postReservationPropertyAnswer(token, propertyId, updatedFormData));
  };

  const handleReservationReject = () => {
    const updatedFormData = {
      ...formData,
      reservationStatus: "NOT_ACCEPTED",
    };

    dispatch(postReservationPropertyAnswer(token, propertyId, updatedFormData));
  };

  const handleReservationCancel = () => {
    const updatedFormData = {
      ...formData,
      reservationStatus: "CANCELED",
    };

    dispatch(postReservationPropertyAnswer(token, propertyId, updatedFormData));
  };

  const filteredReservations = showPendingOnly
    ? reservationListProperty.filter(
        (reservation) => reservation.reservationStatus === "PENDING"
      )
    : reservationListProperty;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4 border-top pt-2">
        <h3 className="fw-bold  ">Appointment requests</h3>
        <Button
          variant="primary"
          onClick={() => setShowPendingOnly((prev) => !prev)}
        >
          {showPendingOnly ? "Show All" : "Show Pending Only"}
        </Button>
      </div>
      <Row className="fw-bold mb-1">
        <Col>Applicant</Col>
        <Col>Date</Col>
        <Col>Time</Col>
        <Col>Status</Col>
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
          filteredReservations &&
          filteredReservations.map((reservation) => (
            <Col key={reservation.id} className="shadow rounded-3 p-3">
              <Row>
                <Col className="d-flex align-items-center">
                  <img
                    src={reservation.user.avatar}
                    alt="owner avatar"
                    width="50"
                    height="50"
                    className="rounded-circle"
                  />
                  <small className="ms-2">
                    {reservation.user.name} {reservation.user.surname}
                  </small>
                </Col>
                <Col className="d-flex align-items-center">
                  {reservation.reservationDate}
                </Col>
                <Col className="d-flex align-items-center">
                  {reservation.time}
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
                    {reservation.reservationStatus.replace(/_/g, " ")}
                  </span>
                </Col>
                <Col
                  className="d-flex align-items-center justify-content-center "
                  xs={1}
                >
                  {reservation.reservationStatus !== "ACCEPTED" && (
                    <i
                      className="bi bi-check-circle text-success iconBtn fs-5 "
                      onClick={() => handleReservationAccept()}
                    ></i>
                  )}
                  {reservation.reservationStatus !== "ACCEPTED" && (
                    <i
                      className="bi bi-x-circle iconBtn text-danger fs-5 "
                      onClick={() => handleReservationReject()}
                    ></i>
                  )}
                  {reservation.reservationStatus === "ACCEPTED" && (
                    <Button
                      variant="outline-danger"
                      className="rounded-5"
                      onClick={() => handleReservationCancel()}
                    >
                      Cancel
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default ReservationsProperty;
