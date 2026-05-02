import "../../index.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export default function Footer() {
  return (
    <footer className="Footer">
      <Container className="text-center">
        <Row>
          <p>© 2026 Salem Play District</p>
        </Row>
      </Container>
    </footer>
  );
}
