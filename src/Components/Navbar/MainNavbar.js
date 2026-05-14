import "../../index.css";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import SalemLogo from "../../Logos/salem-logo.jpg";

export default function MainNavbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/SignIn');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary customNavbar" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt=""
            src={SalemLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Salem's Play District
        </Navbar.Brand>

        {user ? (
          <Button className="customButton" onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
}
