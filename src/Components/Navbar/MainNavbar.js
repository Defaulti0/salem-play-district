import { Placeholder } from "react-bootstrap";
import "../../index.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary customNavbar" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={Placeholder}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Salem Play District
        </Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}
