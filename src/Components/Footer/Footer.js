import "../../index.css";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function Footer() {
  return (
    <footer className="Footer">
      <Container className="text-center">
        <Row>
          <p>© 2026 Salem's Play District</p>
          <p>Contact us <Button className="customButton" href="MAILTO:Salemsplaydistrict@gmail.com">here</Button> with any questions, concerns, or feedback</p>
        </Row>
      </Container>
    </footer>
  );
}
