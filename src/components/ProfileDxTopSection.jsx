import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavoriteSection from "./FavoriteSection";
import ChatSection from "./ChatSection";
import PersonalPropertySection from "./PersonalPropertySection";

const ProfileDxTopSection = () => {
  const [showFavorites, setShowFavorites] = useState(true);
  const [showProperty, setShowProperty] = useState(true);
  const [showChat, setShowChat] = useState(true);

  const [activeSection, setActiveSection] = useState("favorites");
  const handleToggle = (section) => {
    setActiveSection(section);
  };

  return (
    <Row className="flex-column p-5">
      <Col className="d-flex">
        <div className="border-end ">
          <div
            className={`mx-3 btnProfile ${
              activeSection === "favorites" ? "bg-primary text-light" : ""
            }`}
            onClick={() => handleToggle("favorites")}
          >
            Favorites
          </div>
        </div>
        <div className="border-end ">
          <div
            className={`mx-3 btnProfile ${
              activeSection === "property" ? "bg-primary text-light" : ""
            }`}
            onClick={() => handleToggle("property")}
          >
            Your real state
          </div>
        </div>
        <div>
          <div
            className={`mx-3 btnProfile ${
              activeSection === "chat" ? "bg-primary text-light" : ""
            }`}
            onClick={() => handleToggle("chat")}
          >
            Chat
          </div>
        </div>
      </Col>
      <Col className="mt-2 vh-100">
        {" "}
        {activeSection === "favorites" && <FavoriteSection />}
        {activeSection === "property" && <PersonalPropertySection />}
        {activeSection === "chat" && <ChatSection />}
      </Col>
    </Row>
  );
};

export default ProfileDxTopSection;
