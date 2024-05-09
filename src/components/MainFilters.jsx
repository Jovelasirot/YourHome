import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getProperties } from "../../redux/actions/actions";

const MainFilers = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [showModal, setShowModal] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [safePrice, setSafePrice] = useState(false);
  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("filters");
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          city: "",
          minPrice: "",
          maxPrice: "",
          minBedrooms: "",
          minBathrooms: "",
          minArea: "",
          propertyStatus: "" || null,
          propertyType: "" || null,
        };
  });

  useEffect(() => {
    setIsPriceValid(filters.minPrice !== "" && filters.maxPrice !== "");
  }, [filters.minPrice, filters.maxPrice]);

  const handleInputChange = (event, key) => {
    const { value } = event.target;
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  useEffect(() => {
    if ((token && filters.city !== "") || safePrice) {
      dispatch(getProperties(token, filters));
      const range = `${formatPrice(filters.minPrice)} - ${formatPrice(
        filters.maxPrice
      )} €`;
      setPriceRange(range);
    }
  }, [dispatch, token, filters, safePrice]);

  const hadnleModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    if (parseFloat(filters.minPrice) >= parseFloat(filters.maxPrice)) {
      alert("Minimum price should be less than maximum price");
    } else {
      setShowModal(false);
      setSafePrice(true);
    }
  };

  const [priceRange, setPriceRange] = useState("");

  return (
    <>
      <Row>
        <Col xs={12}>
          <h1>Filters:</h1>
        </Col>
        <Col xs={12} md={3} xl={2} className="mt-3">
          <p className="mb-0">City:</p>
          <input
            className="form-control bg-primary border text-light"
            value={filters.city}
            onChange={(e) => handleInputChange(e, "city")}
          />
        </Col>
        <Col xs={12} md={3} xl={1} className="mt-3">
          <p className="mb-0">Bedrooms:</p>
          <input
            className="form-control bg-primary  text-light"
            value={filters.minBedrooms}
            onChange={(e) => handleInputChange(e, "minBedrooms")}
          />
        </Col>
        <Col xs={12} md={3} xl={1} className="mt-3">
          <p className="mb-0">Bathrooms:</p>
          <input
            className="form-control bg-primary  text-light"
            value={filters.minBathrooms}
            onChange={(e) => handleInputChange(e, "minBathrooms")}
          />
        </Col>
        <Col xs={12} md={3} xl={1} className="mt-3">
          <p className="mb-0">Area:</p>
          <input
            className="form-control bg-primary  text-light"
            value={filters.minArea}
            onChange={(e) => handleInputChange(e, "minArea")}
          />
        </Col>
        <Col xs={12} md={3} xl={2} className="mt-3">
          <p className="mb-0">Interior status:</p>
          <Form.Select
            className="form-select bg-primary rounded-4 text-light"
            aria-label="Property Status"
            value={filters.propertyStatus}
            onChange={(e) => handleInputChange(e, "propertyStatus")}
          >
            <option value="">Select Status</option>
            <option value="ALL">All</option>
            <option value="NEW">New</option>
            <option value="RESTORED">Restored</option>
            <option value="TO_BE_RESTORED">To be restored</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3} xl={2} className="mt-3">
          <p className="mb-0">Property type:</p>
          <Form.Select
            variant="primary"
            className="form-select bg-primary  rounded-4  text-light"
            aria-label="Property Type"
            value={filters.propertyType}
            onChange={(e) => handleInputChange(e, "propertyType")}
          >
            <option value="">Select type</option>
            <option value="ALL">All</option>
            <option value="HOUSE">House</option>
            <option value="APARTMENT">Apartement</option>
            <option value="CONDO">Condo</option>
            <option value="LAND">Land</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={4} xl={3} className="mt-3">
          <p className="mb-0">Price range:</p>
          <input
            className="form-control bg-primary  text-light"
            onClick={(e) => hadnleModal()}
            value={priceRange}
          />
        </Col>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Price range</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="flex-column">
              <Col>
                Minimum price:
                <input
                  className="form-control"
                  value={filters.minPrice}
                  onChange={(e) => handleInputChange(e, "minPrice")}
                />
              </Col>
              <Col className="my-3">
                Maximum price:
                <input
                  className="form-control"
                  value={filters.maxPrice}
                  onChange={(e) => handleInputChange(e, "maxPrice")}
                />
              </Col>
              <Col>
                <Button
                  className="w-100"
                  variant="primary"
                  onClick={() => handleHideModal()}
                  disabled={!isPriceValid}
                >
                  Save price
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
    </>
  );
};

export default MainFilers;
