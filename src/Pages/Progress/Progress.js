import "../../index.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default function Progress() {
  return (
    <div>
      <Container className="homeContainer">
        <Row style={{ margin: "2rem" }} className="text-center">
          <h1 style={{ marginBottom: "2rem" }}>Progress</h1>
        </Row>
      </Container>
    </div>
  );
}
