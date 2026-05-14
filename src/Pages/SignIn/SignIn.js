import "../../index.css";
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError('Failed to log in. Please check your email and password.');
        }

        setLoading(false);
    }

    return (
        <div className="home-container">
            <Container className="justify-content-center mt-3 mb-3">
                <Row className="text-center">
                    <h2>Log In</h2>
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
                                placeholder="Enter password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Row>
                        <Button disabled={loading} type="submit" className="customButton my-3">
                            Log In
                        </Button>
                    </Form>
                </Row>
                
                <Row className="text-center">
                    <Col>
                        Need an account? <Button className="customButton mx-auto" onClick={() => navigate('/signup')}>Sign Up</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignIn;