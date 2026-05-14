import "../../index.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import Progress from '../../Components/Progress/Progress';

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);



  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="home-container">
        <Container className="mt-3 mb-2">
            <Row className="text-center">
                <h1>Welcome!</h1>
                <h4>You are logged in as: <b>{currentUser.email}</b></h4>
                <p style={{
                    fontSize: '17px'
                }}>
                    Scan a valid QR code to receive a stamp. Collect all stamps to receive a discount on your next purchase!
                </p>
            </Row>

            <Row>
                <Col className="text-center">
                    <Button className="customButton" href="/camera">
                        Scan QR Code
                    </Button>
                </Col>
            </Row>
        
            <Row>
                <Progress></Progress>
            </Row>    
        </Container>
    </div>
  );
}

export default Home;
