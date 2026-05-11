import "../../index.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import GeoLocation from "../GeoLocation/GeoLocation.js";
import { db, auth } from "../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

/*
    hard code doc id for qr code comparison and lat/long values for each location
        only db we really need is for user progress
*/

/*
    Put latitude and longitude of below locations in a .json file:
    1. The VR Center, Salem VA
    2. Thunder Valley, Salem VA
    3. Launch Pad, Salem VA
    4. The Skate Center, Salem VA    

    Update checkRange to grab lat/long from json file instead of firestore,
        based on the qr code's rawValue
    Then, check if the user's lat/long is within range of the qr code's lat/long
    If it is, update the respective variable for the location for the user
    in a different collecton "User Progress" (where doc id = user id)
    
    Get the current user's user ID, compare that with the "User Progress" documents
    to make sure we're updating the correct user's progress
    If the user has already visited the location, don't update the variable
    Show a modal to the user that they have visited the location or have received
     the stamp for visiting the location
    Go back to the home page after the modal is closed 
*/

// function to check if the user is within the range of the qr code
function checkRange(lat,lon,docid){
    const range = 0.0004;

    // get the current user's user ID
    const user = auth.currentUser;
    const userRef = doc(db, "UserProgress", user.uid);
    const userDoc = getDoc(userRef);
    
    // user data fields have an array of 4 booleans, the locations in the list below
    //  are hardcoded to match the order of the booleans in the user document
    //  from 0 to 3, in order to update the correct boolean when the user
    //  visits the location, if the boolean is true, the user has visited
    //  the location and should not be able to get another stamp
    
    // get the lat/long from the locations.json file
    // compare that with the user's lat/long to see if they are within range
    // if they are, update the respective variable for the location for the user in the "User Progress" collection

    // get the qr code's rawValue and store it in qrCode
    
    if (doc.exists) {
        const qrCodeData = doc.data();
        const locName = qrCodeData.name;
        const dblat = qrCodeData.geolocation.latitude;
        const dblon = qrCodeData.geolocation.longitude;

        const latDiff = Math.abs(lat - dblat);
        const lonDiff = Math.abs(lon - dblon);

        console.log(locName + ":");
        console.log("Lat/Long diff: " + latDiff, lonDiff);

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
}

export default function Camera() {

    const [detectedCodes, setDetectedCodes] = useState([]);

    const handleScan = (detectedCodes) => {

        // Get the qr code data and check the user's lat/lang with the database lat/lang
        // If the difference is less than 0.0004, update the respective variable for the location
        //  for the user
        console.log('Detected codes:', detectedCodes);
        // detectedCodes is an array of IDetectedBarcode objects
        detectedCodes.forEach(code => {
            console.log(`Format: ${code.format}, Value: ${code.rawValue}`);
        });
        checkRange(latitude,longitude,detectedCodes[0].rawValue);
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
