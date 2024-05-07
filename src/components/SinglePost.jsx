import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SinglePost = () => {
  return (
    <Card id="signUpRectangle" className="py-5 px-5 ">
      <Card.Img
        variant="top"
        src=""
        style={{ width: "200px", height: "200px", margin: "auto" }}
        className="my-5"
      />
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title className="fs-3">
          Find or sell
          <span className="fw-bold text-primary"> Your Home</span>, easily with
          us
        </Card.Title>

        <Link to="/register" className="w-100 mt-3 ">
          <Button variant="primary w-100">Sign-up</Button>
        </Link>

        <Card.Text className="mt-2 text-light">
          Already have a register account, you can{" "}
          <Link to="/login">
            <span className="text-decoration-underline text-primary ">
              Log-In
            </span>
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
