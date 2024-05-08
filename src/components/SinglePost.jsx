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
  const loading = useSelector((state) => state.properties.loading);
  const properties = useSelector((state) => state.properties.content.content);

  if (!Array.isArray(properties) || properties.length === 0) {
    return <div>No properties to display.</div>;
  }

  return (
    <>
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
          <Col key={property.id}>
            <Card className="shadow">
              <div className="image-container">
                <img
                  src={property.images[0]}
                  alt="property picture"
                  className="card-thumbnail"
                />
              </div>
              <Card.Body className="mt-3">
                <div className="d-flex justify-content-between">
                  <Card.Title>{property.address}</Card.Title>
                  <Card.Title>
                    $ {Math.floor(parseInt(property.price) / 1000)} k
                  </Card.Title>
                </div>
                <Card.Text className="mt-3">{property.description}</Card.Text>
                <Row className="justify-content-between mt-5">
                  <Col>
                    <Button variant="primary" className="w-100">
                      View more
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="success" className="w-100">
                      Contant the seller
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </>
  );
};

export default SinglePost;
