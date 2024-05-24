import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfile, getSingleProperty } from "../../redux/actions/actions";
import { useMediaQuery } from "react-responsive";

const ReservationSection = () => {
  const { propertyId } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.profile.content);

  useEffect(() => {
    dispatch(getSingleProperty(token, propertyId));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const property = useSelector((state) => state.singleProperty.content);

  const isMdScreen = useMediaQuery({ minWidth: 768 });
  return (
    <Container>
      <Row>
        <Col>
          {property.address}
          <div>test</div>
        </Col>
      </Row>
    </Container>
  );
};
export default ReservationSection;
