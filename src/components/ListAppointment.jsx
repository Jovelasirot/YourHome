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
    return <div className="vh-100">Your appointments will be shown here</div>;
  }

  return (
    <Container fluid>
      <Row className="flex-column gy-4 mt-2">
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
              <p>Date: {reservation.reservationDate}</p>
              <p>Time: {reservation.time}</p>
              <Row></Row>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};
export default ListAppointment;
