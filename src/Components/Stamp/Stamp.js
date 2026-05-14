import Card from 'react-bootstrap/Card';

export default function Stamp({ location, visited }) {
    return (
        <Card style={{height: "100%"}} className="mx-auto">
            <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                {visited && <Card.Img variant="bottom" className='mx-auto mt3 mb-3' style={{ "width": "10rem", "height": "auto" }} src={location.logo} />}
            </Card.Body>
        </Card>
    );
}