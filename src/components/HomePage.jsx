import { Button, Col, Container, Row } from "react-bootstrap";
import SinglePost from "./SinglePost";
import MainFilers from "./MainFilters";

const HomePage = () => {
  return (
    <Container fluid>
      <Row className="px-5 py-5 mb-5 border-bottom ">
        <MainFilers />
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
