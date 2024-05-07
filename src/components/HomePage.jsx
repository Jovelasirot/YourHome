import { Col, Container, Row } from "react-bootstrap";
import SinglePost from "./SinglePost";

const HomePage = () => {
  return (
    <Container className="">
      <Row>
        <Col>
          <SinglePost />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
