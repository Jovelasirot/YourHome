import { Col, Container, Row } from "react-bootstrap";
import Logo from "../assets/Img/LogoForma.svg";
import { useEffect, useState } from "react";

const AboutUs = () => {
  const [showingBuy, setShowingBuy] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowingBuy((prev) => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Container className="d-flex flex-column  align-items-center ">
      <Col className="fadein fs-1">
        <div
          style={{ marginBottom: "300px", marginTop: "300px" }}
          className="text-center"
        >
          <img
            src={Logo}
            alt="logo"
            className="img-fluid"
            style={{
              width: "500px",
              height: "500px",
              margin: "auto",
            }}
          />
          <div className="container">
            <div className="phrase">
              <span className={`text ${showingBuy ? "show" : "hide"}`}>
                {showingBuy ? "Buy" : "Sell"}
              </span>
              <span>
                <span className="ms-2 fw-bold">your home</span>, simply with us
              </span>
            </div>
          </div>
          <p className="invisible">
            ‎ ‎ ‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎ ‎‎
            ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎
          </p>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, rem,
          mollitia nesciunt molestiae voluptas eius quas architecto quis
          sapiente deserunt qui voluptate nobis dolore placeat obcaecati soluta
          ex. Dolorem, magnam!
        </p>
      </Col>
    </Container>
  );
};
export default AboutUs;
