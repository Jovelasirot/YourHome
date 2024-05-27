import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getProfile,
  modifyCurrentProfile,
  postImage,
} from "../../redux/actions/actions";
import ProfileDxTopSection from "./ProfileDxTopSection";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalContactInfo, setShowModalContactInfo] = useState(false);
  const profile = useSelector((state) => state.profile.content);
  const isLoading = useSelector((state) => state.profile.loading);
  const token = localStorage.getItem("token");
  const isXxlScreen = useMediaQuery({ minWidth: 1400 });
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    surname: profile.surname,
    email: "" || profile.email,
    phone: "" || profile.phone,
  });

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
    setShowModal(!showModal);
  };

  const handleModalContact = () => {
    setShowModalContactInfo(!showModalContactInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postImage(token, selectedFile));
    handleModal();
  };

  const handleShowLogoutModal = () => {
    setShowLogoutModal(!showLogoutModal);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("email", profile.email);
    localStorage.removeItem("password");
    navigate("/");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      email: formData.email === profile.email ? null : formData.email,
      phone: formData.phone === profile.phone ? null : formData.phone,
    };

    dispatch(modifyCurrentProfile(token, updatedFormData));

    setTimeout(() => {
      handleModalContact();
      window.location.reload();
    }, 1000);
  };

  return (
    <Container fluid>
      <Row className={isXxlScreen ? "vh-100" : ""}>
        <Col xs={12} xxl={3} className={isXxlScreen ? "p-5" : "mt-3"}>
          <Row className="flex-column">
            <Col>
              <Card className="bg-secondary shadow border-light-subtle ">
                {isLoading ? (
                  <div className="d-flex justify-content-center mt-5">
                    <Spinner
                      animation="border"
                      role="status"
                      style={{
                        width: "200px",
                        height: "200px",
                        margin: "auto",
                      }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                ) : (
                  <Card.Img
                    variant="top"
                    src={profile.avatar}
                    style={{ width: "200px", height: "200px", margin: "auto" }}
                    className="mt-5 rounded-circle border border-primary"
                    alt="profile picture"
                  />
                )}
                <div className="ms-auto me-3 ">
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
                  <Link to="/profile/modify" className="w-100 mt-3 ">
                    <Button variant="primary w-100">Modify account</Button>
                  </Link>
                  <Card.Text className="mt-2 text-light">
                    <Card className="my-3">
                      <Card.Body className="bg-secondary rounded-1 shadow ">
                        <Card.Title className="border-bottom">
                          Contact info
                        </Card.Title>
                        <Card.Text>
                          <p className="border-bottom my-3">{profile.email}</p>
                          <p>{profile.phone}</p>
                        </Card.Text>
                        <Button
                          variant="primary"
                          onClick={(e) => handleModalContact()}
                        >
                          Update contact info
                        </Button>
                      </Card.Body>
                    </Card>
                  </Card.Text>
                  <Button
                    variant="danger"
                    className="w-100 text-light"
                    onClick={handleShowLogoutModal}
                  >
                    Logout <i className="bi bi-door-open"></i>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Modal show={showModal} onHide={() => handleModal()}>
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
                      className="rounded-circle border border-primary"
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

          <Modal
            show={showModalContactInfo}
            onHide={() => handleModalContact()}
            centered
          >
            <Modal.Header closeButton className="bg-secondary ">
              <Modal.Title>Update Contact info</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-secondary rounded-bottom-2">
              <Row className="flex-column align-items-center">
                <Col>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.email}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.phone}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col className="mt-4">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={handleSubmitForm}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>

          <Modal show={showLogoutModal} onHide={handleShowLogoutModal} centered>
            <Modal.Body className="d-flex flex-column p-4 bg-secondary rounded-3">
              <span className="fs-5"> Are you sure you want to log out?</span>
              <Row className="mt-3">
                <Col>
                  <Button
                    variant="success"
                    onClick={handleShowLogoutModal}
                    className="w-100"
                  >
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="danger"
                    onClick={handleConfirmLogout}
                    className="text-light w-100"
                  >
                    Confirm log out <i className="bi bi-door-open"></i>
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </Col>
        <Col xxl={9}>
          <ProfileDxTopSection />
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
