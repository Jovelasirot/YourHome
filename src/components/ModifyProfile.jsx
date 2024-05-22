import { useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { modifyCurrentProfile, postImage } from "../../redux/actions/actions";
import { useMediaQuery } from "react-responsive";

const ModifyProfile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const profile = useSelector((state) => state.profile.content);
  const [selectedFile, setSelectedFile] = useState(null);
  const isMdScreen = useMediaQuery({ minWidth: 768 });
  const [previewImg, setPreviewImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "" || profile.name,
    surname: "" || profile.surname,
    email: "" || profile.email,
    phone: "" || profile.phone,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

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

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      email: formData.email === profile.email ? null : formData.email,
      phone: formData.phone === profile.phone ? null : formData.phone,
    };

    dispatch(modifyCurrentProfile(token, updatedFormData));

    setTimeout(() => {
      navigate("/profile");
    }, 1000);
  };

  const handleSubmitImage = (e) => {
    e.preventDefault();
    dispatch(postImage(token, selectedFile));
    handleModal();
    navigate("/profile");
  };

  return (
    <Container>
      <Row className={isMdScreen ? "vh-100 align-items-center" : ""}>
        <Col>
          <Card className="py-5 bg-secondary shadow border-0 px-5 pb-1">
            <Col>
              <Link to="/profile" className="text-decoration-none ">
                <i className="bi bi bi-arrow-left iconBtn fs-3"></i>
              </Link>
            </Col>
            <Card.Body>
              <Card.Title className="fs-3 fw-light  border-bottom">
                <span className="fw-bold text-primary">
                  Modify your profile
                  {profile.password}
                </span>
              </Card.Title>
              <Container>
                <Row>
                  <div
                    className={isMdScreen ? "border-end" : ""}
                    style={{
                      width: "250px",
                    }}
                  >
                    <Card.Text>
                      <Card.Img
                        variant="top"
                        src={profile.avatar}
                        style={{
                          width: "200px",
                          height: "200px",
                        }}
                        className="mt-5 rounded-circle"
                        alt="profile picture"
                      />
                      <div className="d-flex align-items-center justify-content-center">
                        <span>Replace</span>
                        <i
                          className="bi bi-pencil-square iconBtn"
                          onClick={(e) => handleModal()}
                        ></i>
                      </div>
                    </Card.Text>
                  </div>
                  <Col>
                    <Card.Text>
                      <Form>
                        <Form.Group className="mb-3" controlId="name">
                          <Form.Label>Name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            className="w-100"
                            onChange={handleChange}
                            value={formData.name}
                            required
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="surname">
                          <Form.Label>Surname:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Surname"
                            className="w-100"
                            onChange={handleChange}
                            value={formData.surname}
                            required
                          />
                        </Form.Group>
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
                      </Form>
                    </Card.Text>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className="justify-content-center mt-4">
                  <Button
                    variant="primary w-50"
                    type="submit"
                    onClick={handleSubmitForm}
                  >
                    Save changes
                  </Button>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
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
                  onClick={handleSubmitImage}
                  disabled={!previewImg}
                >
                  Save new image
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
};

export default ModifyProfile;
