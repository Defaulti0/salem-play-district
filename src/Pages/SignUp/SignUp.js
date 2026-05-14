import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      const userRef = doc(db, "UserProgress", newUser.uid);

      await setDoc(userRef, {
        vrcenter: false,
        thundervalley: false,
        launchpad: false,
        skatecenter: false,
      });

      navigate('/');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <div className="home-container">
      <Container className="justify-content-center mt-3 mb-3">
      <Row className="justify-content-center mt-3 mb-3">
        <Row className="text-center">
          <h2>Sign Up</h2>
          {error && <div className="error-message">{error}</div>}
        </Row>
        
        <Row className="justify-content-center text-center">
          <Form onSubmit={handleSubmit}>
          <Row className="m-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Row>
          <Row className="m-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Row>
          <Row className="m-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Row>
          <Button disabled={loading} type="submit" className="customButton my-3">
            Sign Up
          </Button>
        </Form>
        <Row className="text-center">
          <Col>
            Already have an account? <Button className="customButton mx-auto" onClick={() => navigate('/SignIn')}>Log In</Button>
          </Col>
        </Row>
        </Row>
      </Row>
    </Container>
    </div>
  );
}

export default SignUp;