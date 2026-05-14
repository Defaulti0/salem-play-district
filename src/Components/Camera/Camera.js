import "../../index.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import GeoLocation from "../GeoLocation/GeoLocation.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

export default function Camera() {
    const [ detrctedCodes, setDetectedCodes ] = useState([]);
    const { latitude, longitude } = GeoLocation();
    
    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState({ title: "", body: "" });

    // close modal and go to home page
    const handleClose = () => {
        setShowModal(false);
        window.location.href = "/";
    };

    const checkRange = (lat, lon, docid) => {
        const range = 0.0009;
        const locData = require("../../locations.json");

        if (locData.hasOwnProperty(docid)) {
            const qrCodeData = locData[docid];
            const locName = qrCodeData.name;
            const dblat = qrCodeData.lat;
            const dblon = qrCodeData.lng;

            const latDiff = Math.abs(lat - dblat);
            const lonDiff = Math.abs(lon - dblon);

            if (latDiff > range || lonDiff > range) {
                // Out of range logic
                setModalMessage({
                    title: "Too Far Away",
                    body: `You are not close enough to ${locName}. Please get closer and try again.`
                });
                setShowModal(true);
                
                return false;
            } else {
                // Within range logic
                setModalMessage({
                    title: "Success!",
                    body: `You have successfully checked in at ${locName}!`
                });
                setShowModal(true);
                return true;
            }
        } else {
            setModalMessage({
                title: "Unknown Code",
                body: "This QR code does not match any known locations."
            });
            setShowModal(true);
        }
    };

    const handleScan = async (codes) => {
        if (codes.length > 0) {
            setDetectedCodes(codes);
            const scannedValue = codes[0].rawValue;
            const isWithinRange = checkRange(latitude, longitude, scannedValue);

            if (isWithinRange) {
                const user = auth.currentUser;
                const docRef = doc(db, "UserProgress", user.uid);
                const docSnap = await getDoc(docRef);
                const locData = require("../../locations.json");
                const dbname = locData[scannedValue].dbname;

                if (!docSnap.exists() || !docSnap.data()[dbname]) {
                    setDoc(docRef, {
                        [dbname]: true
                    }, { merge: true });
                }
            }
        }
    };

    return (
        <div>
            <Container className="homeContainer">
                <Row className="text-center">
                    <h1>Camera</h1>
                </Row>
                <Row className="text-center align-items-center" style={{width: "75%", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Scanner
                        onScan={handleScan}
                        onError={(error) => console.error(error)}
                        components={{
                            onOff: true,
                            finder: true,
                        }}
                        style={{}}
                    />

                    {/* <p style={{ marginTop: "1rem" }}>
                        QR Code data: {detectedCodes.map((code) => code.rawValue).join(', ')}
                        </p>
                        <p>Latitude: {latitude}</p>
                        <p>Longitude: {longitude}</p> */}
                </Row>
                <Row>
                    <Col className="text-center">
                        <Button className="customButton" href="/">
                            Back to Home
                        </Button>
                    </Col>
                </Row>
            </Container>

            {/* Feedback Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalMessage.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
