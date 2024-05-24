import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../redux/actions/actions";
import Select from "react-select";

const MainFilters = () => {
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
          country: "",
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

  const handleModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    if (parseFloat(minPrice) >= parseFloat(maxPrice)) {
      alert("Minimum price should be less than maximum price");
    } else {
      const updatedFilters = {
        ...filters,
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
      setFilters(updatedFilters);
      setShowModal(false);
      setSafePrice(true);
      setFilters(updatedFilters);
      localStorage.setItem("filters", JSON.stringify(updatedFilters));
    }
  };

  const [priceRange, setPriceRange] = useState("");
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);

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

  useEffect(() => {
    setIsPriceValid(minPrice !== "" && maxPrice !== "");
  }, [minPrice, maxPrice]);

  return (
    <>
      <Row className="pt-3">
        <Col xs={12}>
          <h1 className="mb-0">Filters:</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={3} xl={2}>
          <p className="mb-0">City:</p>
          <input
            className="form-control bg-primary border text-light"
            value={filters.city}
            onChange={(e) => handleInputChange(e, "city")}
          />
        </Col>
        <Col xs={12} md={2} xl={1}>
          <p className="mb-0">Country:</p>
          <Form.Select
            className="form-select bg-primary rounded-4 text-light"
            aria-label="Country"
            value={filters.country}
            onChange={(e) => handleInputChange(e, "country")}
          >
            <option value="">Select country</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3} xl={1}>
          <p className="mb-0">Min bedrooms:</p>
          <input
            className="form-control bg-primary  text-light"
            value={filters.minBedrooms}
            onChange={(e) => handleInputChange(e, "minBedrooms")}
          />
        </Col>
        <Col xs={12} md={3} xl={1} className="">
          <p className="mb-0">Min bathrooms:</p>
          <input
            className="form-control bg-primary  text-light"
            value={filters.minBathrooms}
            onChange={(e) => handleInputChange(e, "minBathrooms")}
          />
        </Col>
        <Col xs={12} md={3} xl={1}>
          <p className="mb-0">Min m²:</p>
          <input
            className="form-control bg-primary  text-light"
            value={filters.minArea}
            onChange={(e) => handleInputChange(e, "minArea")}
          />
        </Col>
        <Col xs={12} md={3} xl={2}>
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
        <Col xs={12} md={3} xl={2}>
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
        <Col xs={12} md={4} xl={2}>
          <p className="mb-0">Price range:</p>
          <input
            className="form-control bg-primary  text-light"
            onClick={(e) => handleModal()}
            value={priceRange}
          />
        </Col>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton className="bg-secondary ">
            <Modal.Title>Price range</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-secondary rounded-bottom-2">
            <Row className="flex-column">
              <Col>
                Minimum price:
                <input
                  className="form-control bg-secondary "
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </Col>
              <Col className="my-3">
                Maximum price:
                <input
                  className="form-control bg-secondary "
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
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

export default MainFilters;
