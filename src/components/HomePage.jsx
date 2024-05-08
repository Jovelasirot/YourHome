import { Button, Col, Container, Row } from "react-bootstrap";
import SinglePost from "./SinglePost";

const HomePage = () => {
  return (
    <Container fluid>
      <Row className="px-5 py-5 mb-5 border-bottom">
        <h1>Filter:</h1>
        <Col>
          <p className="mb-0">Location:</p>
          <Button className="w-100">Milano</Button>
        </Col>
        <Col>
          <p className="mb-0">Property type:</p>
          <Button className="w-100">Condo</Button>
        </Col>
        <Col>
          <p className="mb-0">Bedrooms:</p>
          <Button className="w-100">2</Button>
        </Col>
        <Col>
          <p className="mb-0">Area:</p>
          <Button className="w-100">20 m</Button>
        </Col>
        <Col>
          <p className="mb-0">Interior status:</p>
          <Button className="w-100">New</Button>
        </Col>
        <Col>
          <p className="mb-0">Price range:</p>
          <Button className="w-100"> 450.000 - 650.000 $</Button>
        </Col>
      </Row>
      <Container>
        <Row xs={1} md={2} className="justify-content-center g-5">
          <SinglePost />
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
