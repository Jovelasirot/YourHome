import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sellProperty } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Select from "react-select";

const SellForm = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price <= 0) {
      alert("Price can be less than zero");
    } else {
      dispatch(sellProperty(token, formData));
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
    setFormData({ ...formData, country: selectedOption.value });
  };

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
                <span className="invisble">
                  ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎
                  ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎
                </span>
              </Card.Title>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="city">
                    <Form.Group className="mb-3" controlId="country">
                      <Form.Label>Country</Form.Label>;
                      <Select
                        placeholder="Country..."
                        options={countryOptions}
                        onChange={handleCountryChange}
                        className="w-100"
                        required
                      />
                    </Form.Group>
                    <Form.Label>City</Form.Label>;
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
                    <Form.Label>Address</Form.Label>;
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
                        <Form.Label>Bedrooms</Form.Label>;
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
                        <Form.Label>Bathrooms</Form.Label>;
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
                    <Form.Label>Price</Form.Label>;
                    <Form.Control
                      placeholder="Price"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.price}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>;
                    <Form.Control
                      as="textarea"
                      placeholder="Describe the property"
                      className="w-100"
                      onChange={handleChange}
                      value={formData.description}
                      required
                      style={{ height: "200px", resize: "none" }}
                    />
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
    </Container>
  );
};

export default SellForm;
