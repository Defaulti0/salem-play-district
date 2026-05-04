import "../../index.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import GeoLocation from "../GeoLocation/GeoLocation.js";
    
export default function Camera() {

    const [detectedCodes, setDetectedCodes] = useState([]);

    const handleScan = (detectedCodes) => {
        console.log('Detected codes:', detectedCodes);
        // detectedCodes is an array of IDetectedBarcode objects
        detectedCodes.forEach(code => {
            console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
        });
        setDetectedCodes(detectedCodes);
    };

    const { road, city } = GeoLocation();

    return (
    <div>
      <Container className="homeContainer">
        <Row style={{ margin: "2rem" }} className="text-center">
          <h1 style={{ marginBottom: "2rem" }}>Camera</h1>
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error(error)}
            components={{
              torch: true,
              onOff: true,
              finder: true,
            }}
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
          <p style={{ marginTop: "2rem" }}>
            QR Code data: {detectedCodes.map((code) => code.rawValue).join(', ')}
          </p>
          <p>City: {city}</p>
          <p>Road: {road}</p>
        </Row>
      </Container>
    </div>
  );
}
