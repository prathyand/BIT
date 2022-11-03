import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';
import {useLocation} from 'react-router-dom';

const TheatreMovieBooking = () => {
    const location = useLocation()
    const theatreData = location.state.theatre
    const theatreName = theatreData.tname
    const movieData = location.state.movie
    const movie = movieData.title
    const poster = movieData.poster
    const descr = movieData.description
    const options = theatreData.shows
    const numSeats = [1,2,3,4,5,6]
    const show = useRef(options[0])
    const seats = useRef(1)
    const [movieBooked,setMovieBooked] = useState("")
    const [showTime, setShowTime] = useState("")
    const [theatre, setTheatre] = useState("")
    const [nseats,setSeats] = useState("")
    const [price, setPrice] = useState("")
    const [edit,setEdit] = useState(true)
    const [showSummary, setShowSumary] = useState(false)
    const proceedSummary = (event) => {
        event.preventDefault()
        // console.log(show.current.value,seats.current.value)
        let tempShow = show.current.value
        let tempSeats = seats.current.value
        setMovieBooked(movie)
        setTheatre(theatreName)
        setShowTime(tempShow)
        setSeats(tempSeats)
        setPrice("$" + (10*tempSeats).toString())
        setShowSumary(true)
        setEdit(false)
    }
    const editBooking = (event) => {
        setEdit(event.target.checked)
      }
  return (
    <section>
      <h1 style={{paddingLeft:"1%"}}>Movie Booking</h1>
      <Row>
      <Col xs={12} md={8}>
      <div>
      <Card>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
          <Card.Title>{movie}</Card.Title>
          <Card.Text>{descr}</Card.Text>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                    Movie Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={movie} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Theatre Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={theatreName} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Select show time
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={show} disabled={!edit} >
                        {options.map((option) => (
                            <option>{option}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Choose no of seats
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={seats} disabled={!edit}>
                        {numSeats.map((seat) => (
                            <option>{seat}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>
        </Card.Body>
        <Card.Footer style={{textAlign:"center"}}>
            <Button onClick={proceedSummary} disabled={!edit}>Proceed to Summary</Button>
        </Card.Footer>
      </Card>
      </div>
      </Col>
      <Col xs={6} md={4}>
      <Card>
        <Card.Body>
          <Card.Title>Booking Summary</Card.Title>
          <Form.Group as={Row} className="mb-3">
                <Form.Label>Movie Chosen</Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={movieBooked} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Theatre Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={theatre} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Show Time
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={showTime} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Number of Seats
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={nseats} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Price for the tickets
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={price} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Edit Booking" value={edit} onChange={editBooking} disabled={!showSummary}/>
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer style={{textAlign:"center"}}>
            <Button disabled={!showSummary}>Proceed to Payment</Button>
        </Card.Footer>
      </Card>
      </Col>
    </Row>
    </section>
  );
};

export default TheatreMovieBooking;