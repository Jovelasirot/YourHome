import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProperties, getFavoriteList } from "../../redux/actions/actions";

const FavoriteSection = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const favoriteList = useSelector(
    (state) => state.favoriteList.content.favoritePropertyIds
  );
  const properties = useSelector(
    (state) => state.allProperties.content.content
  );

  useEffect(() => {
    if (token) {
      dispatch(getFavoriteList(token));
      dispatch(getAllProperties(token));
    }
  }, [dispatch, token]);

  return (
    <Card id="profileRectangle" className="py-5 px-5">
      <h3>Favorites</h3>
      <div className="d-flex flex-wrap">
        {favoriteList &&
          properties &&
          favoriteList.map((favoriteId) => {
            const favoriteProperty = properties.find(
              (property) => property.id === favoriteId
            );
            return (
              <Card key={favoriteId} className="m-2" style={{ width: "200px" }}>
                <Card.Img variant="top" src={favoriteProperty.images[0]} />
                <Card.Body>
                  <Card.Title>{favoriteProperty.title}</Card.Title>
                  <Button
                    as={Link}
                    to={`/property/${favoriteProperty.id}`}
                    variant="primary"
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </Card>
  );
};

export default FavoriteSection;
