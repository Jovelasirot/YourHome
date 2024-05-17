import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getFavoriteList,
  getProperties,
  getSingleProperty,
  updateFavoritesList,
} from "../../redux/actions/actions";
import { useEffect } from "react";

const SinglePost = () => {
  const loading = useSelector((state) => state.properties.loading);
  const properties = useSelector((state) => state.properties.content.content);
  const favoriteList = useSelector(
    (state) => state.favoriteList.content.favoritePropertyIds
  );
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getFavoriteList(token));
    }
  }, [dispatch, token]);

  const handleAddToFavorites = (token, propertyId) => {
    dispatch(updateFavoritesList(token, propertyId));
    dispatch(getFavoriteList(token));
  };

  if (!Array.isArray(properties) || properties.length === 0) {
    return <div>No properties to display.</div>;
  }

  return (
    <Container className={properties.length <= 2 ? "vh-100" : ""}>
      <Row xs={1} md={2} className="justify-content-center g-5">
        {loading ? (
          <Col className="text-center">
            <Spinner animation="grow" variant="primary" />
          </Col>
        ) : (
          properties.map((property) => (
            <Col key={property.id}>
              <Card className="shadow bg-secondary">
                <div className="image-container">
                  <img
                    src={property.images[0]}
                    alt="property picture"
                    className="card-thumbnail"
                  />
                </div>
                <Card.Body className="mt-3">
                  <Row className="justify-content-between">
                    <Col className="d-flex ">
                      <Card.Title>
                        {property.address}
                        <p className="fw-light fs-6">{property.country}</p>
                      </Card.Title>
                    </Col>
                    <Col>
                      <Card.Title className="text-end">
                        € {Math.floor(parseInt(property.price) / 1000)} k
                        <p className="fw-light fs-6">
                          Area: {property.area} m²
                        </p>
                      </Card.Title>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-end  ">
                    {favoriteList && favoriteList.includes(property.id) ? (
                      <i
                        className="bi bi-heart-fill fs-4 heartIcon text-danger"
                        onClick={() => handleAddToFavorites(token, property.id)}
                      />
                    ) : (
                      <i
                        className="bi bi-heart fs-4 heartIcon"
                        onClick={() => handleAddToFavorites(token, property.id)}
                      />
                    )}
                  </div>
                  <Row>
                    <Card.Text className="mt-2 px-2 ">
                      {property.description}
                    </Card.Text>
                    <Row className="justify-content-between mt-5">
                      <Col>
                        <Link to={`/homepage/details/${property.id}`}>
                          <Button variant="primary" className="w-100">
                            View more
                          </Button>
                        </Link>
                      </Col>
                      <Col>
                        <Button variant="success" className="w-100">
                          Contant the seller
                        </Button>
                      </Col>
                    </Row>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SinglePost;
