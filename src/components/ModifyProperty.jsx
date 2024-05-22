import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProperty,
  getSingleProperty,
  modifyCurrentProperty,
} from "../../redux/actions/actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";

const ModifyProperty = () => {
  const token = localStorage.getItem("token");
  const { propertyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);

  const property = useSelector((state) => state.singleProperty.content);
  const isLoading = useSelector((state) => state.singleProperty.loading);

  const [formData, setFormData] = useState({
    country: "" || property.country,
    city: "" || property.city,
    address: "" || property.address,
    price: "" || property.price,
    area: "" || property.area,
    bedrooms: "" || property.bedrooms,
    bathrooms: "" || property.bathrooms,
    propertyType: "" || property.propertyType,
    propertyStatus: "" || property.propertyStatus,
    description: property?.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price <= 0) {
      alert("Price can be less than zero");
    } else {
      dispatch(modifyCurrentProperty(token, formData, propertyId));
      navigate("/homepage");
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
      formData.description !== ""
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
    setFormData({
      ...formData,
      country: selectedOption.value || initialCountryOption,
    });
  };

  const initialCountryIndex = countryOptions.findIndex(
    (option) => option.value === property.country
  );

  const initialCountryOption =
    countryOptions[initialCountryIndex > -1 ? initialCountryIndex : 0];

  const maxChars = 255;
  let charsRemaining = maxChars - formData.description.length;

  const handleModalConfirmation = (propertyId) => {
    setShowConfirmation(true);
    setPropertyToDelete(propertyId);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setPropertyToDelete(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteProperty(token, propertyToDelete));
    setShowConfirmation(false);
    setPropertyToDelete(null);
    navigate("/homepage");
  };

  return (
    <Container>
      <Row className={isMdScreen ? "align-items-center" : "mt-5"}>
        <Col>
          <Card
            className={
              isMdScreen
                ? " py-5 bg-secondary shadow border-0 px-5"
                : "py-2 bg-secondary shadow border-0 px-2"
            }
          >
            <Col>
              <Link to="/homepage" className="text-decoration-none ">
                <i className="bi bi bi-arrow-left iconBtn fs-3"></i>
              </Link>
            </Col>
            <Card.Body>
              <Card.Title className="fs-3 fw-light border-bottom">
                <span className="fw-bold text-primary">Modfiy property </span>
              </Card.Title>

              <Card.Text>
                <Carousel className="mb-2">
                  {property.images &&
                    property.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="w-100 "
                          src={image}
                          alt="Property image"
                          style={{ maxHeight: "500px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col xs={12} md={8}>
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
                    </Col>
                    <Col>
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
                    </Col>
                  </Row>

                  <Row xs={1} md={2}>
                    <Col>
                      <Form.Group className="mb-3" controlId="country">
                        <Form.Label>Country:</Form.Label>
                        <Select
                          placeholder="Country..."
                          defaultValue={initialCountryOption}
                          options={countryOptions}
                          onChange={handleCountryChange}
                          className="w-100"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="city">
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
                    </Col>
                  </Row>

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
                Update property
              </Button>
              <Button
                type="submit"
                className="w-100 mt-3 text-danger bg-secondary border-danger"
                onClick={() => handleModalConfirmation(property.id)}
              >
                Delete property
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Modal show={showConfirmation} onHide={handleCancelDelete}>
          <Modal.Header closeButton className="bg-secondary">
            <Modal.Title>Confirm delete</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondary d-flex flex-column align-items-center">
            <span>Are you sure you want to delete this real state?</span>

            <img
              src={property.images[0]}
              alt="property picture"
              width={"400 px"}
              height={"200 px"}
            />
          </Modal.Body>
          <Modal.Footer className="bg-secondary">
            <Button variant="success" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button
              variant="danger"
              className="text-light d-flex  align-items-center"
              onClick={handleDeleteConfirm}
            >
              Confrim
              <i className="bi bi-trash ms-1" />
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container>
  );
};

export default ModifyProperty;
