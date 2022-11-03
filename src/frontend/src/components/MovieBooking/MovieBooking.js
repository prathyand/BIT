import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useRef, useState } from 'react';

const MovieBooking = (props) => {
    // console.log(props)
    const movie = props.params.title
    const poster = props.params.poster
    const descr = props.params.description
    const options = [{
        txt: "AMC11 @ 9AM"
    },
    {
        txt: "AMC11 @ 12PM"
    },
    {
        txt: "AMC11 @ 3PM"
    },
    {
        txt: "AMC11 @ 6PM"
    },
    {
        txt: "AMC11 @ 9PM"
    },
    {
        txt: "AMC13 @ 9AM"
    },
    {
        txt: "AMC13 @ 12PM"
    },
    {
        txt: "AMC13 @ 3PM"
    },
    {
        txt: "AMC13 @ 6PM"
    },
    {
        txt: "AMC13 @ 9PM"
    }]
    const numSeats = [1,2,3,4,5,6]
    const show = useRef(options[0].txt)
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
        setTheatre(tempShow.split("@")[0])
        setShowTime(tempShow.split("@")[1])
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
                Select the theatre and show time
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={show} disabled={!edit} >
                        {options.map((option) => (
                            <option>{option.txt}</option>
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

export default MovieBooking;