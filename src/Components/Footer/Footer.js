import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "../../index.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <Container className="text-center">
        <Row>
          <Col sm={true}>
            <h4>
              <b>Working hours</b>
            </h4>
            <p>
              Monday - Saturday: 11 AM – 7 PM <br />
              Sunday: Closed
            </p>
          </Col>
          <Col sm={true}>
            <h4>
              <b>Contact us</b>
            </h4>
            <p>
              <a href="tel:+1-540-815-3213">(540) 815-3213</a>
              <br />
              <a href="mailto:vasubshack@gmail.com">vasubshack@gmail.com</a>
              <br />
              2107 Apperson Dr, Salem, VA 24153
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
