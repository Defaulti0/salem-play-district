import Card from 'react-bootstrap/Card';

// Show location name, and logo on bootstrap card
// If visited is true, add stamp, otherwise show card with no stamp

// Get user progress from firestore based on user auth id

export default function Stamp({ location, visited }) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Img variant="top" src={location.logo} />
                {visited && <Card.Text>Visited</Card.Text>}
            </Card.Body>
        </Card>
    );
}