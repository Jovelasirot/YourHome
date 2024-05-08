import {
  Button,
  Card,
  Col,
  Container,
  Placeholder,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProperties } from "../../redux/actions/actions";
import { useEffect } from "react";

const SinglePost = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getProperties(token));
    }
  }, [dispatch, token]);

  const loading = useSelector((state) => state.properties.loading);
  const properties = useSelector((state) => state.properties.content.content);

  if (!Array.isArray(properties) || properties.length === 0) {
    return <div>No properties to display.</div>;
  }

  return (
    <Card id="signUpRectangle">
      {loading ? (
        <>
          {[...Array(3)].map((_, index) => (
            <div key={index} className="mb-3">
              <Placeholder xs={12} />
              <Placeholder xs={12} />
              <Placeholder xs={12} />
            </div>
          ))}
        </>
      ) : (
        properties.map((property) => (
          <Card key={property.id}>
            <Card.Body>
              <Card.Title>{property.address}</Card.Title>
              <Card.Text>
                Price: {property.price}, Area: {property.area} sqft
              </Card.Text>
              <Button variant="primary">Details</Button>
            </Card.Body>
          </Card>
        ))
      )}
    </Card>
  );
};

export default SinglePost;
