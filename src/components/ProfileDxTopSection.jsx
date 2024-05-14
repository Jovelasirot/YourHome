import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavoriteSection from "./FavoriteSection";

const ProfileDxTopSection = () => {
  const [showFavorites, setShowFavorites] = useState(true);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <Row className="flex-column p-5">
      <Col className="d-flex">
        <div className="border-end ">
          <div className="me-3 btnProfile" onClick={toggleFavorites}>
            Favorites
          </div>
        </div>
        <div className="border-end ">
          <div className="mx-3">Your property</div>
        </div>
        <div>
          <div className="mx-3">Chat</div>
        </div>
      </Col>
      <Col className="mt-5">{showFavorites && <FavoriteSection />}</Col>
    </Row>
  );
};

export default ProfileDxTopSection;
