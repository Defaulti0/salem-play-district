import "../../index.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

// Get the current user's user ID, compare that with the "User Progress" documents
//  to make sure we're updating the correct user's progress


export default function Progress() {
  return (
    <div>
      <Container className="homeContainer">
        <Row style={{ margin: "2rem" }} className="text-center">
          <h1 style={{ marginBottom: "2rem" }}>Progress</h1>
        </Row>
        <Row>
            <p>Progress per location will go here</p>
        </Row>
      </Container>
    </div>
  );
}
