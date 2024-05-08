import { Button, Col, Row } from "react-bootstrap";

const MainFilers = () => {
  return (
    <>
      <Row>
        <Col>
          <h1>Filter:</h1>
        </Col>
      </Row>
      <Row className="justify-content-between">
        <Col xs={12} md={2}>
          <p className="mb-0">Location:</p>
          <Button className="w-100">Milano</Button>
        </Col>
        <Col xs={12} md={2}>
          <p className="mb-0">Property type:</p>
          <Button className="w-100">Condo</Button>
        </Col>
        <Col xs={12} md={1}>
          <p className="mb-0">Bedrooms:</p>
          <Button className="w-100">2</Button>
        </Col>
        <Col xs={12} md={1}>
          <p className="mb-0">Area:</p>
          <Button className="w-100">20 m</Button>
        </Col>
        <Col xs={12} md={2}>
          <p className="mb-0">Interior status:</p>
          <Button className="w-100">New</Button>
        </Col>
        <Col xs={12} md={3}>
          <p className="mb-0">Price range:</p>
          <Button className="w-100"> 450.000 - 650.000 $</Button>
        </Col>
      </Row>
    </>
  );
};

export default MainFilers;
