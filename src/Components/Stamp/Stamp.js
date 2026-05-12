import Card from 'react-bootstrap/Card';

export default function Stamp({ location, visited }) {
    return (
        <Card style={{ width: '18rem', height: '18rem'}} className="mx-auto">
            <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Img variant="top" src={location.logo} />
                {visited && <Card.Text>Visited</Card.Text>}
            </Card.Body>
        </Card>
    );
}