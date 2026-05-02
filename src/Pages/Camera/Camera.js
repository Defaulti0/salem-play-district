import "../../index.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Scanner } from '@yudiel/react-qr-scanner';
    
export default function Camera() {
    const handleScan = (detectedCodes) => {
        console.log('Detected codes:', detectedCodes);
        // detectedCodes is an array of IDetectedBarcode objects
        detectedCodes.forEach(code => {
            console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
        });
    };
    return (
    <div>
      <Container className="homeContainer">
        <Row style={{ margin: "2rem" }} className="text-center">
          <h1 style={{ marginBottom: "2rem" }}>Camera</h1>
          <Scanner
            onScan={handleScan}
            onError={(error) => console.error(error)}
            style={{ width: '100%', maxWidth: '500px', height: 'auto' }}
          />
        </Row>
      </Container>
    </div>
  );
}
