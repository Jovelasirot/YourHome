import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProperties } from "../../redux/actions/actions";

const MainFilers = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [filters, setFilters] = useState({
    city: "",
    minPrice: "",
    maxPrice: "600000",
    minBedrooms: "",
    minBathrooms: "",
    minArea: "",
    propertyStatus: "",
    propertyType: "",
  });

  const handleFilterChange = () => {
    if (token) {
      dispatch(getProperties(token, filters));
    }
  };

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <>
      <Row>
        <Col xs={12}>
          <h1>Filters:</h1>
        </Col>
        <Col xs={12} md={3} xl={2} className="mt-3">
          <p className="mb-0">City:</p>
          <input
            className="form-control"
            value={filters.city}
            onChange={(e) => handleInputChange(e, "city")}
          />
        </Col>
        <Col xs={12} md={3} xl={2} className="mt-3">
          <p className="mb-0">Property type:</p>
          <Form.Select
            className="form-select"
            aria-label="Property Type"
            value={filters.propertyType}
            onChange={(e) => handleInputChange(e, "propertyType")}
          >
            <option value="">Select type</option>
            <option value="HOUSE">HOUSE</option>
            <option value="APARTMENT">APARTMENT</option>
            <option value="CONDO">CONDO</option>
            <option value="LAND">LAND</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3} xl={1} className="mt-3">
          <p className="mb-0">Bedrooms:</p>
          <input
            className="form-control"
            value={filters.minBedrooms}
            onChange={(e) => handleInputChange(e, "minBedrooms")}
          />
        </Col>
        <Col xs={12} md={3} xl={1} className="mt-3">
          <p className="mb-0">Area:</p>
          <input
            className="form-control"
            value={filters.minArea}
            onChange={(e) => handleInputChange(e, "minArea")}
          />
        </Col>
        <Col xs={12} md={3} xl={2} className="mt-3">
          <p className="mb-0">Interior status:</p>
          <Form.Select
            className="form-select"
            aria-label="Property Status"
            value={filters.propertyStatus}
            onChange={(e) => handleInputChange(e, "propertyStatus")}
          >
            <option value="">Select Status</option>
            <option value="NEW">NEW</option>
            <option value="RESTORED">RESTORED</option>
            <option value="TO_BE_RESTORED">TO BE RESTORED</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4} xl={4} className="mt-3">
          <p className="mb-0">Price range:</p>
          <input
            className="form-control"
            value={filters.minPrice}
            onChange={(e) => handleInputChange(e, "minPrice")}
          />
        </Col>
        <Col xs={12} className="mt-3">
          <Button onClick={handleFilterChange}>Apply Filters</Button>
        </Col>
      </Row>
    </>
  );
};

export default MainFilers;
