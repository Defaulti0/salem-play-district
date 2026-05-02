import "../../index.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";


// TODO

// If user is logged in, show scan button to open the camera and scan qr code for a stamp
// If user is not logged in, show sign up / log in button to sign up or log in to save progress
// Show button to view current progress towards completion

export default function Home() {
  return (
    <div>
      <Container className="justify-content-center mt-3 mb-3">

        <Row className="text-center">
          <h1>Scan a qr code to receive a stamp</h1>
          <p>
            Collect 4 stamps to receive a discount on your next purchase!
          </p>
        </Row>

        <Row>
          <Col className="text-end">
            <Button className="customButton" href="/camera">
              Scan QR Code
            </Button>
          </Col>
          <Col className="text-start">
            <Button className="customButton" href="/progress">
              View Progress
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
