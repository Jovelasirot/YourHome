import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavoriteSection from "./FavoriteSection";
import ChatSection from "./ChatSection";
import PersonalPropertySection from "./PersonalPropertySection";
import { useMediaQuery } from "react-responsive";

const ProfileDxTopSection = () => {
  const [activeSection, setActiveSection] = useState("favorites");
  const handleToggle = (section) => {
    setActiveSection(section);
  };
  const isXxlScreen = useMediaQuery({ minWidth: 1400 });

  return (
    <Row className="flex-column mt-5 ">
      <Col
        className={`d-flex ${
          isXxlScreen ? "" : "justify-content-center align-items-center"
        }`}
      >
        <div className="border-end">
          <div
            className={`mx-3 btnProfile text-center ${
              activeSection === "favorites" ? "bg-primary text-light" : ""
            }`}
            onClick={() => handleToggle("favorites")}
          >
            Favorites
          </div>
        </div>
        <div className="border-end ">
          <div
            className={`mx-3 btnProfile text-center  ${
              activeSection === "property" ? "bg-primary text-light" : ""
            }`}
            onClick={() => handleToggle("property")}
          >
            Your real state
          </div>
        </div>
        <div>
          <div
            className={`mx-3 btnProfile text-center ${
              activeSection === "chat" ? "bg-primary text-light" : ""
            }`}
            onClick={() => handleToggle("chat")}
          >
            Chat
          </div>
        </div>
      </Col>
      <Col className="mt-2">
        {" "}
        {activeSection === "favorites" && <FavoriteSection />}
        {activeSection === "property" && <PersonalPropertySection />}
        {activeSection === "chat" && <ChatSection />}
      </Col>
    </Row>
  );
};

export default ProfileDxTopSection;
