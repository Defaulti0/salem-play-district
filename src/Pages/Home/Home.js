import "../../index.css";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Stack from 'react-bootstrap/Stack';
import Stamp from '../../Components/Stamp/Stamp';

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

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/SignIn');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="home-container">
        <Container className="justify-content-center mt-3 mb-3">

         <Row className="text-center">
           <h1>Welcome to Your Dashboard!</h1>
           <p>You are logged in as: {currentUser.email}</p>
           <br/>
           <h2>Scan a qr code to receive a stamp</h2>
           <p>
             Collect 4 stamps to receive a discount on your next purchase!
           </p>
         </Row>
         <Row>
           <Col className="text-end">
             <Button className="customButton" href="/camera">
               Scan QR Code
             </Button>
           </Col>
           <Col className="text-start">
             <Button className="customButton" href="/progress">
               View Progress
             </Button>

             {/* TO-DO: Change this to a component and show currenet user progress after grabbing */}
             {/* the current user's data from firestore based on user auth id */}
             {/* <Stack direction="horizontal" gap={3}>
               <Stamp></Stamp>
             </Stack> */}
           </Col>
         </Row>
         
         <Row className="justify-content-center mt-3 mb-3">
          <Col className="text-center">
            <Button onClick={handleLogout} className="customButton">
              Log Out
            </Button>
          </Col>
         </Row>
        </Container>
    </div>
  );
}

export default Home;

// TODO

// If user is logged in, show scan button to open the camera and scan qr code for a stamp
// If user is not logged in, show sign up / log in button to sign up or log in to save progress
// Show button to view current progress towards completion

// export default function Home() {
//   return (
//     <div>
//       <Container className="justify-content-center mt-3 mb-3">

//         <Row className="text-center">
//           <h1>Scan a qr code to receive a stamp</h1>
//           <p>
//             Collect 4 stamps to receive a discount on your next purchase!
//           </p>
//         </Row>

//         <Row>
//           <Col className="text-end">
//             <Button className="customButton" href="/camera">
//               Scan QR Code
//             </Button>
//           </Col>
//           <Col className="text-start">
//             <Button className="customButton" href="/progress">
//               View Progress
//             </Button>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
