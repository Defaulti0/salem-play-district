import "../../index.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Stamp from "../Stamp/Stamp";
import launchpadStamp from "../../Logos/launchpad-logo.png";
import skatecenterStamp from "../../Logos/skatecenter-logo.png";
import thundervalleyStamp from "../../Logos/thundervalley-logo.png";
import vrcenterStamp from "../../Logos/vrcenter-logo.png";

export default function Progress() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
      const locationNames = {
        launchpad: "Launching Pad Trampoline Park & Family Fun Center",
        skatecenter: "Skate Center of Roanoke Valley",
        thundervalley: "Thunder Valley",
        vrcenter: "The VR Center"
      };

      const stampImages = {
        launchpad: launchpadStamp,
        skatecenter: skatecenterStamp,
        thundervalley: thundervalleyStamp,
        vrcenter: vrcenterStamp
      } 
      
      const fetchProgress = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "UserProgress", user.uid);

      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data(); 
          
          const formattedArray = Object.keys(data).map((key) => ({
            location: {
              name: locationNames[key] || key,
              logo: stampImages[key] || key,
            },
            visited: data[key]
          })).sort((a, b) => a.location.name.localeCompare(b.location.name));

          setProgress(formattedArray);
        } else {
          setProgress([]);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <Container className="homeContainer">
      <Row>
        <h1 className="text-center mt-2 mb-2">Progress</h1>
      </Row>
      <Row>
        {progress.map((item) => (
            <Col className="text-center mt-2 mb-2" xs={12} sm={6} md={4} lg={6} key={item.location.name}>
                <Stamp
                    key={item.location.name} 
                    location={item.location} 
                    visited={item.visited}   
                />
            </Col>
        ))}
      </Row>
    </Container>
  );
}