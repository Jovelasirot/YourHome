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
import { useDispatch } from "react-redux";
import { sellProperty } from "../../redux/actions/actions";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";

const SellForm = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    address: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    propertyType: "",
    propertyStatus: "",
    description: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [previewImgs, setPreviewImgs] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price <= 0) {
      alert("Price can be less than zero");
    } else {
      dispatch(sellProperty(token, formData, selectedFiles));
      navigate("/profile");
    }
  };

  const isMdScreen = useMediaQuery({ minWidth: 768 });

  const isFormComplete = () => {
    return (
      formData.country !== "" &&
      formData.city !== "" &&
      formData.address !== "" &&
      formData.bedrooms !== "" &&
      formData.bathrooms !== "" &&
      formData.propertyType !== "" &&
      formData.propertyStatus !== "" &&
      formData.description !== "" &&
      selectedFiles.length > 0
    );
  };

  const countryOptions = [
    { value: "Austria", label: "Austria" },
    { value: "Belgium", label: "Belgium" },
    { value: "Canada", label: "Canada" },
    { value: "Denmark", label: "Denmark" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Germany", label: "Germany" },
    { value: "Greece", label: "Greece" },
    { value: "Italy", label: "Italy" },
    { value: "Monaco", label: "Monaco" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "Norway", label: "Norway" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "San Marino", label: "San Marino" },
    { value: "Spain", label: "Spain" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
  ];

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.value });
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newSelectedFiles = [...selectedFiles];
    const newPreviews = [...previewImgs];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newSelectedFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }
    setSelectedFiles(newSelectedFiles);
    setPreviewImgs(newPreviews);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImgs.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewImgs(updatedPreviews);
  };

  const maxChars = 255;
  const charsRemaining = maxChars - formData.description.length;

  return (
    <Container>
      <Row className={isMdScreen ? "vh-100 align-items-center" : "vh-100 mt-5"}>
        <Col>
          <Card className="py-5 bg-secondary shadow border-0   px-5">
            <Col>
              <Link to="/homepage" className="text-decoration-none ">
                <i className="bi bi bi-arrow-left iconBtn fs-3"></i>
              </Link>
            </Col>
            <Card.Body>
              <Card.Title className="fs-3 fw-light border-bottom">
                <span className="fw-bold text-primary">Sell Your home </span>
                with us
              </Card.Title>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Group className="mb-3" controlId="country">
                      <Form.Label>Country:</Form.Label>
                      <Select
                        placeholder="Country..."
                        options={countryOptions}
                        onChange={handleCountryChange}
                        className="w-100"
                        required
                      />
                    </Form.Group>
                    <Form.Label>City:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.city}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.address}
                      required
                    />
                  </Form.Group>
                  <Row xs={1} md={2}>
                    <Col>
                      <Form.Group className="mb-3" controlId="bedrooms">
                        <Form.Label>Bedrooms:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Bedrooms"
                          className="w-100"
                          onChange={handleChange}
                          value={formData.bedrooms}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="bathrooms">
                        <Form.Label>Bathrooms:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Bathrooms"
                          className="w-100"
                          onChange={handleChange}
                          value={formData.bathrooms}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row xs={1} md={2}>
                    <Col>
                      <Form.Group className="mb-3" controlId="propertyStatus">
                        <p className="mb-0">Interior status:</p>
                        <Form.Select
                          className="form-select rounded-4"
                          aria-label="Property Status"
                          value={formData.propertyStatus}
                          onChange={handleChange}
                        >
                          <option value="">Select Status</option>
                          <option value="NEW">New</option>
                          <option value="RESTORED">Restored</option>
                          <option value="TO_BE_RESTORED">To be restored</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="propertyType">
                        <p className="mb-0">Property type:</p>
                        <Form.Select
                          variant="primary"
                          className="form-select  rounded-4"
                          aria-label="Property Type"
                          value={formData.propertyType}
                          onChange={handleChange}
                        >
                          <option value="">Select type</option>
                          <option value="HOUSE">House</option>
                          <option value="APARTMENT">Apartement</option>
                          <option value="CONDO">Condo</option>
                          <option value="LAND">Land</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control
                      placeholder="Price"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.price}
                      required
                      type="number"
                    />
                  </Form.Group>
                  <Button onClick={() => setShowModal(true)}>Add images</Button>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Describe the property"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.description}
                      required
                      maxlength={maxChars}
                      style={{ height: "200px", resize: "none" }}
                    />
                    <small>{charsRemaining} characters remaining</small>
                  </Form.Group>
                </Form>
              </Card.Text>

              <Button
                variant="primary w-100"
                type="submit"
                onClick={handleSubmit}
                disabled={!isFormComplete()}
              >
                Post property
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton className="bg-secondary">
          <Modal.Title>Add Images</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary">
          <Form.Group controlId="image">
            <div className="d-flex align-items-center justify-content-center">
              <div>
                <span>
                  {previewImgs.length > 0 ? "Add images" : "Select images"}
                </span>
              </div>
              <label htmlFor="upload-photo">
                <i className="bi bi-image fs-5 text-muted iconBtn"></i>
              </label>
            </div>
            <input
              type="file"
              id="upload-photo"
              onChange={handleFileChange}
              className="d-none"
              multiple
            />
            <div className="d-flex justify-content-center flex-wrap">
              {previewImgs.map((preview, index) => (
                <div key={index} className="m-2 sell-img ">
                  <img
                    src={preview}
                    alt={`Preview image ${index + 1}`}
                    style={{ maxWidth: "350px", maxHeight: "250px" }}
                    className={`img-fluid border  ${
                      index === 0 ? "border-primary-subtle" : ""
                    }`}
                  />
                  <i
                    className="bi bi-trash heartIcon-fav-section btn-sell-del text-danger fs-5 border border-light bg-opacity-50  bg-light"
                    onClick={() => handleRemoveImage(index)}
                  ></i>
                  {index === 0 ? (
                    <p className="text-center mb-0 ">Thumbnail picture</p>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
            {previewImgs.length > 0 && (
              <div className="d-flex justify-content-center ">
                <label htmlFor="upload-photo">
                  <i
                    className="bi bi-plus fs-4 heartIcon border text-dark"
                    onChange={handleFileChange}
                  ></i>
                </label>
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-secondary">
          <Button variant="success" onClick={() => setShowModal(false)}>
            {previewImgs.length > 1
              ? "Save select images"
              : "Save selecte image"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SellForm;
