import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getProfile, postImage } from "../../redux/actions/actions";
import ProfileDxTopSection from "./ProfileDxTopSection";

const Profile = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const profile = useSelector((state) => state.profile.content);
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    if (token) {
      dispatch(getProfile(token));
    }
  }, [dispatch, token]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModal = () => {
    setShowModal(true);
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
              <Card id="profileRetangle" className="">
                <Card.Img
                  variant="top"
                  src={profile.avatar}
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                  className="mt-5 rounded-circle"
                  alt="profile picture"
                />
                <div className="ms-auto">
                  <i
                    className="bi bi-pencil-square text-end iconBtn"
                    onClick={(e) => handleModal()}
                  ></i>
                </div>
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

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton className="bg-secondary ">
              <Modal.Title>Change profile image</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-secondary rounded-bottom-2">
              <Row className="flex-column align-items-center">
                <Col>
                  <Form.Group className="mb-3" controlId="image">
                    <div className="d-flex align-items-center justify-content-center ">
                      <span className="fs-5">Select image</span>
                      <label htmlFor="upload-photo">
                        <i className="bi bi-image ms-3 fs-5 text-muted iconBtn"></i>
                      </label>
                      <input
                        type="file"
                        id="upload-photo"
                        onChange={handleFileChange}
                        className="d-none"
                      />
                    </div>
                  </Form.Group>
                </Col>
                {previewImg && (
                  <Col className="text-center">
                    <p className="border-top pt-2">Preview profile picture:</p>
                    <img
                      src={previewImg}
                      style={{
                        width: "200px",
                        height: "200px",
                        margin: "auto",
                      }}
                      className="rounded-circle"
                      alt="profile picture"
                    />
                  </Col>
                )}
                <Col className="mt-4">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleSubmit}
                    disabled={!previewImg}
                  >
                    Save new image
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Col>
        <Col>
          <ProfileDxTopSection />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
