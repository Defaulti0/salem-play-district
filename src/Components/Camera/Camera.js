import "../../index.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import GeoLocation from "../GeoLocation/GeoLocation.js";
import { useRef } from "react";
import { db } from "../../firebase.js";
import { doc, updateDoc, deleteDoc, query } from "firebase/firestore";


// User scans qr code, get lat/long from current vars (latitude, longitude)
// Get dblat/dblong from db using the qr code data's rawValue as doc id
// Check if current lat/long is within range of the qr code's lat/long
// If it is, update the respective variable for the location for the user
//  in a different collecton "User Progress"
// Get the current user's user ID, compare that with the "User Progress" documents
//  to make sure we're updating the correct user's progress
// If the user has already visited the location, don't update the variable
// Show a modal to the user that they have visited the location or have received
//  the stamp for visiting the location
// Go back to the home page after the modal is closed

// const userRef = query(collection(db, "User Progress"), where("userId", "==", auth.currentUser.uid));
// const locationRef = query(collection(db, "qrcodes"));

// function to check if the user is within the range of the qr code
function checkRange(lat,lon,docid){
    const range = 0.0004;
    
    // get the lat/long from the firestore document (geolocation field) and store them in dblat and dblon
    const qrCodeRef = db.collection('qrcodes').doc(docid);
    qrCodeRef.get().then((doc) => {
        if (doc.exists) {
            const qrCodeData = doc.data();
            const dblat = qrCodeData.geolocation.latitude;
            const dblon = qrCodeData.geolocation.longitude;

            const latDiff = Math.abs(lat - dblat);
            const lonDiff = Math.abs(lon - dblon);

            console.log(latDiff,lonDiff);

            if (latDiff > range && lonDiff > range){
                console.log("Too far away");
                // show modal to user that they are too far from the location
                return false;
            } else {
                console.log("Within range");
                // show modal to user that they are at the location
                return true;
            }
        }
    });
}

export default function Camera() {

    const [detectedCodes, setDetectedCodes] = useState([]);
    const rangeCheck = useRef(false);

    const handleScan = (detectedCodes) => {

        // Get the qr code data and check the user's lat/lang with the database lat/lang
        // If the difference is less than 0.0004, update the respective variable for the location
        //  for the user
        console.log('Detected codes:', detectedCodes);
        // detectedCodes is an array of IDetectedBarcode objects
        detectedCodes.forEach(code => {
            console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
        });
        setDetectedCodes(detectedCodes);
    };

    const {latitude,longitude} = GeoLocation();

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

          {/* Display QR Code Data and Lat/Long */}
          <p style={{ marginTop: "1rem" }}>
            QR Code data: {detectedCodes.map((code) => code.rawValue).join(', ')}
          </p>
          <p>Latitude: {latitude}</p>
          <p>Longitude: {longitude}</p>
        </Row>
      </Container>
    </div>
  );
}
