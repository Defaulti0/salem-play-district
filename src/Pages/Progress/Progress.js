import "../../index.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import Stamp from "../../Components/Stamp/Stamp";


export default function Progress() {
  const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            const user = auth.currentUser;
            if (!user) return;

            // Point directly to the document using the user's UID
            const docRef = doc(db, "UserProgress", user.uid);
    
            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProgress(docSnap.data());
                } else {
                    console.log("No such document!");
                    setProgress(null); // Or initial state
                }
            } catch (error) {
                console.error("Permission error:", error);
            }
        };
    
        fetchProgress();
    }, []);
  
    return (
        <div>
            <Container className="homeContainer">
                <Row style={{ margin: "2rem" }} className="text-center">
                    <h1 style={{ marginBottom: "2rem" }}>Progress</h1>
                </Row>
                <Row>
                    {progress.map(item => (
                        <Stamp key={item} style={{ marginBottom: "1rem" }}>
                            <p>Location: {item.location}</p>
                            <p>Visited: {item.visited ? "Yes" : "No"}</p>
                        </Stamp>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
