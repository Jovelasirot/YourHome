import { Button, Col, Container, Row } from "react-bootstrap";
import SinglePost from "./SinglePost";
import MainFilters from "./MainFilters";

const HomePage = () => {
  return (
    <Container fluid className="">
      <Row className="px-5 pb-5 mb-5 border-bottom ">
        <MainFilters />
      </Row>
      <SinglePost />
    </Container>
  );
};

export default HomePage;
