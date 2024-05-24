import React, { useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllProperties,
  getFavoriteList,
  updateFavoritesList,
} from "../../redux/actions/actions";
import { useMediaQuery } from "react-responsive";

const FavoriteSection = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const favoriteList = useSelector(
    (state) => state.favoriteList.content.favoritePropertyIds
  );
  const properties = useSelector(
    (state) => state.allProperties.content.content
  );
  const isXxlScreen = useMediaQuery({ minWidth: 1400 });

  useEffect(() => {
    if (token) {
      dispatch(getFavoriteList(token));
      dispatch(getAllProperties(token));
    }
  }, [dispatch, token]);

  const handleAddToFavorites = (token, propertyId) => {
    dispatch(updateFavoritesList(token, propertyId));
    dispatch(getFavoriteList(token));
  };

  if (!favoriteList || favoriteList.length === 0) {
    return (
      <div className={isXxlScreen ? " " : "vh-100 text-center"}>
        Your favorite properties will be shown here.
      </div>
    );
  }

  return (
    <Row xs={1} md={2} xl={3}>
      {favoriteList &&
        properties &&
        favoriteList.map((favoriteId) => {
          const favoriteProperty = properties.find(
            (property) => property.id === favoriteId
          );
          return (
            <Col key={favoriteId} className="g-4">
              <div className="favorite-thumbnail-wrapper">
                <img
                  src={favoriteProperty.images[0]}
                  alt="property picture"
                  className=" rounded-2 favorite-thumbnail  "
                />

                <Row className="overlay flex-column align-items-center">
                  <Col>
                    <Row>
                      <Col>
                        <div>
                          <i
                            className="bi bi-heart-fill fs-4 heartIcon-fav-section text-danger"
                            onClick={() =>
                              handleAddToFavorites(token, favoriteProperty.id)
                            }
                          />
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="d-flex">
                    <Col className="d-flex flex-column justify-content-end">
                      <Row className="flex-column">
                        <Col className="fw-bold">
                          {favoriteProperty.address}
                        </Col>
                        <Col>{favoriteProperty.country}</Col>
                      </Row>
                    </Col>
                    <Col className="d-flex flex-column justify-content-end text-end">
                      <Link to={`/property/details/${favoriteProperty.id}`}>
                        <Button variant="secondary">View more</Button>
                      </Link>
                    </Col>
                  </Col>
                </Row>
              </div>
            </Col>
          );
        })}
    </Row>
  );
};

export default FavoriteSection;
