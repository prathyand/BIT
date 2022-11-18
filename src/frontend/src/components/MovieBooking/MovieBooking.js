import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useContext, useCallback, useEffect, useState,useRef } from 'react';
import Request from '../../contexts/Request';
import constants from '../../constants';
import AuthContext from '../../contexts/AuthContext';
import { Navigate } from "react-router-dom";

const MovieBooking = (props) => {
    // console.log(props)
    const movie = props.params.title
    const poster = props.params.poster_path
    // const backgroundImage = url(poster)
    const descr = props.params.overview
    const movieId = props.params._id
    const request = useContext(Request);
    const [theatres, setTheatres] = useState([]);
    const [shows, setShows] = useState([])
    const numSeats = [1,2,3,4,5,6]
    const theatre = useRef()
    const show = useRef()
    const seats = useRef(1)
    const [movieBooked,setMovieBooked] = useState("")
    const [showTime, setShowTime] = useState("")
    const [selectedTheatre, setSelectedTheatre] = useState("")
    const [nseats,setSeats] = useState("")
    const [price, setPrice] = useState("")
    const [edit,setEdit] = useState(true)
    const [showSummary, setShowSumary] = useState(false)
    const authContext = useContext(AuthContext)
    const isLoggedIn = authContext.isLoggedIn
    const proceedSummary = (event) => {
        event.preventDefault()
        let tempSeats = seats.current.value
        setMovieBooked(movie)
        setSelectedTheatre(theatre.current.value)
        setShowTime(show.current.value)
        setSeats(tempSeats)
        setPrice("$" + (10*tempSeats).toString())
        setShowSumary(true)
        setEdit(false)
    }
    const editBooking = (event) => {
        setEdit(event.target.checked)
    }
    const getShows = (event) => {
        event.preventDefault()
        let tempName = theatre.current.value
        for(let i=0;i<theatres.length;i++){
            if(theatres[i].theater === tempName){
                setShows(theatres[i].shows)
            }
        }
    }
    const fetchMovieTheatres = useCallback(() => {
        let getMovies = request.getRequest(constants.REQUEST.MOVIE_TS, {movieId:movieId});
        getMovies.then(response => {
            if(response.ok){
                response.json().then((data)=>{
                  console.log(data)
                  let theaterData = data.theaterList
                  let tempTheater = []
                  for(let i = 0; i < theaterData.length; i++){
                    let theatreName = theaterData[i].name
                    let shows = [];
                    let show = theaterData[i].showings.movies
                    for(let j = 0; j < show.length; j++){
                        if(show[j].id === movieId){
                            let timings = show[j].timings
                            for(let k = 0;k<timings.length;k++){
                                shows.push(timings[k].time)
                            }
                        }
                    }
                    tempTheater.push({
                        id: theaterData[i]._id,
                        theater: theatreName,
                        shows: shows
                    });
                  }
                  setTheatres(tempTheater)
                  setShows(tempTheater[0].shows)
                })
            }else{
                console.log(response)
            }
        });
    },[request,movieId]);

    useEffect(()=>{
        fetchMovieTheatres()
    },[fetchMovieTheatres])
  return (
    <section>
    {!isLoggedIn && <Navigate to="/auth"/>}
    {isLoggedIn && 
        <>
      <h1 style={{paddingLeft:"1%"}}>Movie Booking</h1>
      <Row>
      <Col xs={12} md={8}>
      <div>
      <Card style={{background:"transparent"}}>
        <Card.Img variant="top" src={poster}/>
        <Card.Body>
          <Card.Title>{movie}</Card.Title>
          <Card.Text>{descr}</Card.Text>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Select the theatre
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={theatre} disabled={!edit} onChange={getShows}>
                        {theatres.map((option) => (
                            <option>{option.theater}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Select the show time
                </Form.Label>
                <Col sm={10}>
                    <Form.Select size="lg" ref={show} disabled={!edit} >
                        {shows.map((option) => (
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
      <Card style={{background:"transparent"}}>
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
                <Form.Control type="inputtext" value={selectedTheatre} disabled/>
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
    </>
    }
    </section>
  );
};

export default MovieBooking;