import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProfile, postImage } from "../../redux/actions/actions";
import ProfileDxTopSection from "./ProfileDxTopSection";

const Profile = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const profile = useSelector((state) => state.profile.content);
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postImage(token, selectedFile));
  };

  return (
    <Container fluid className="vh-100">
      <Row>
        <Col lg={2}>
          <Row className="flex-column g-5 p-5">
            <Col>
              <Card id="profileRetangle" className="py-5 px-5">
                <Card.Img
                  variant="top"
                  src={profile.avatar}
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                  className="mt-5 rounded-circle"
                  alt="profile picture"
                />
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Upload Image</Form.Label>
                  <input type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                  Img
                </Button>
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title className="fs-3 text-center">
                    {profile.name} {profile.surname}
                    <p className="fs-6 fw-light mt-4">
                      <i className="bi bi-geo-alt me-2"></i>
                      {profile.country}
                    </p>
                  </Card.Title>
                  <Link to="/register" className="w-100 mt-3 ">
                    <Button variant="primary w-100">Modify account</Button>
                  </Link>
                  <Card.Text className="mt-2 text-light">
                    <Card className="mt-3">
                      <Card.Body>
                        <Card.Title className="border-bottom">
                          Contact info
                        </Card.Title>
                        <Card.Text>
                          <p className="border-bottom my-3">{profile.email}</p>
                          <p>{profile.email}</p>
                        </Card.Text>
                        <Button variant="primary">Update contact info</Button>
                      </Card.Body>
                    </Card>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <ProfileDxTopSection />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
