import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { useRef, useState, useContext, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import Request from '../../contexts/Request';
import constants from '../../constants';
import classes from './MovieBooking.module.css';
import AuthContext from '../../contexts/AuthContext';

const TheatreMovieBooking = () => {
    const location = useLocation()
    const theaterData = location.state.theater
    const theaterName = theaterData.name
    const theaterId = theaterData._id
    const tlocation = {
        lat: theaterData.lat,
        lng: theaterData.long
    }
    const address = theaterData.address
    const movieData = location.state.movie
    const movie = movieData.title
    const movieId = movieData._id
    const poster = movieData.poster_path
    const descr = movieData.overview
    const options = []
    const authContext = useContext(AuthContext);
    for(let i=0; i< movieData.timings.length;i++){
        options.push(movieData.timings[i].time)
    }
    const numSeats = [1,2,3,4,5,6]
    const show = useRef(options[0])
    const seats = useRef(1)
    const userMail = useRef()
    const userFname = useRef()
    const userLname = useRef()
    const movieDate = useRef()
    const [movieBooked,setMovieBooked] = useState("")
    const [showTime, setShowTime] = useState("")
    const [theater, setTheater] = useState("")
    const [nseats,setSeats] = useState("")
    const [price, setPrice] = useState("")
    const [edit,setEdit] = useState(true)
    const [validated, setValidated] = useState(false);
    const [showSummary, setShowSumary] = useState(false)
    const [seatNumbersChosen,setSeatsChosen] = useState("")
    const request = useContext(Request);
    const isLoggedin = authContext.isLoggedIn
    let selectedSeat = []
    let selectedSeatElement = {}
    let bookingDetails = {}
    const columnsSeats = [1,2,3,4,5,6,7,8,9,"",10,11,12,13,14,15,16,17,18]
    const rowSeats = ["A","B","C","D","E","F","G","H","I","J"]
    const [seatNums,setSeatProps] = useState({})
    const proceedSummary = (event) => {
        event.preventDefault()
        // console.log(show.current.value,seats.current.value)
        let tempShow = show.current.value
        let tempSeats = seats.current.value
        setMovieBooked(movie)
        setTheater(theaterName)
        setShowTime(tempShow)
        setSeats(tempSeats)
        setPrice("$" + (10*tempSeats).toString())
        setShowSumary(true)
        setSeatsChosen(selectedSeat)
        setEdit(false)
        bookingDetails = {
            email:"test@test.com",
            theater_id:theaterId,
            theater_name:theaterName,
            movie_id:movieId,
            movie_name:movie,
            price:"$" + (10*tempSeats).toString(),
            seats:tempSeats,
            booking_time:show.current.value,
            booking_date:movieDate.current.value,
            seatIDs:selectedSeat,
            location: tlocation,
            address: address
        }
        authContext.setBookingDetails(bookingDetails)
    }
    const editBooking = (event) => {
        setEdit(event.target.checked)
    }

    const handleSubmit = (event) => {
        const form = document.getElementById("userDets");
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
            event.preventDefault()
        }
        setValidated(true);
    };

    const makePayment = (event) => {
        const form = document.getElementById("userDets");
        document.getElementById("userDetsSubmit") && document.getElementById("userDetsSubmit").click();
        if (!isLoggedin && form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return
        }
        event.preventDefault()
        let data = {
            seats:nseats
        }
        let transactionId = Date.now()
        let payment = request.postRequest(constants.REQUEST.PAYMENT,data)
        payment.then(response => {
            if(response.ok){
                console.log(response)
                response.json().then((data)=>{
                    console.log(data)
                    // window.open(data.redirect, "Payment Page", "width=800,height=800");
                    bookingDetails = authContext.getBookingDetails();
                    bookingDetails["transactionId"] = transactionId;
                    if(!authContext.isLoggedIn){
                        bookingDetails["email"] = userMail.current.value
                        bookingDetails["fname"] = userFname.current.value
                        bookingDetails["lname"] = userLname.current.value
                    }else{
                        bookingDetails["email"] = ""
                        bookingDetails["fname"] = ""
                        bookingDetails["lname"] = ""
                    }
                    authContext.setBookingDetails(bookingDetails)
                    window.open(data.redirect, "_self");
                })
            }else{
                console.log(response)
            }
        })
    }

    useEffect(()=>{
        let bookedSeats = 60
        let seatNums = {}
        let columnsSeats = [1,2,3,4,5,6,7,8,9,"",10,11,12,13,14,15,16,17,18]
        let rowSeats = ["A","B","C","D","E","F","G","H","I","J"]
        for(let i =0;i<rowSeats.length;i++){
            let rowSeating = []
            for(let j=0;j<columnsSeats.length;j++){
                let seatNum = rowSeats[i] + String(columnsSeats[j])
                let booked = false
                if(bookedSeats > 0 && Math.floor(Math.random()*2)){
                    booked = true;
                    bookedSeats -= 1 
                }
                if(columnsSeats[j] === ""){
                    rowSeating.push("")
                }else{
                    rowSeating.push({
                        seatNum:seatNum,
                        isBooked: booked
                    })
                }
            }
            seatNums[rowSeats[i]] = rowSeating
        }
        setSeatProps(seatNums)
    },[])

    const selectSeat = (event) => {
        event.preventDefault()
        let seat = event.target.getAttribute("value")
        if(!edit || !seat){
            return
        }
        //This is to build selectedSeat array and selectedSeatElement object for editing
        let table = document.getElementById("seatLayout")
        let tempSelectedSeats = table.getElementsByClassName(classes.selected)
        if(selectedSeat.length === 0 && tempSelectedSeats.length > 0){
            for(let i = 0;i < tempSelectedSeats.length;i++){
                let tempSeatElem = tempSelectedSeats[i]
                let tempSeat = tempSeatElem.getAttribute("value")
                selectedSeat.push(tempSeat)
                selectedSeatElement[tempSeat] = tempSeatElem
            }
        }
        // End
        if(selectedSeat.length < parseInt(seats.current.value) ){
            if(selectedSeat.includes(seat)){
                event.target.classList.remove(classes.selected)
                for(let i=0;i<selectedSeat.length;i++){
                    if(selectedSeat[i] === seat){
                        selectedSeat.splice(i,1)
                    }
                }
                selectedSeatElement[seat] = ""
            }else{
                event.target.classList.add(classes.selected)
                selectedSeat.push(seat)
                selectedSeatElement[seat] = event.target
            }
        }else{
            event.target.classList.add(classes.selected)
            selectedSeat.push(seat)
            selectedSeatElement[seat] = event.target
            let removedSeat = selectedSeat.splice(0,1)
            selectedSeatElement[removedSeat] && selectedSeatElement[removedSeat].classList.remove(classes.selected)
            selectedSeatElement[removedSeat] = ""
        }
    }
  return (
    <section>
      <h1 style={{paddingLeft:"1%"}}>Movie Booking</h1>
      <Row>
      <Col xs={12} md={8}>
      <div>
      <Card>
        <Card.Img variant="top" src={poster}  width="998px" height="400px"/>
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
                Theater Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={theaterName} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                Select the date
                </Form.Label>
                <Col sm={10}>
                <input type="date" ref={movieDate}></input>
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
            <div className={classes.theater}>
                <div className={classes.screen}>Screen This Side</div>
                <table className={classes.table} id="seatLayout">
                    <thead>
                        <tr>
                            <td></td>
                            {columnsSeats.map((column) => (
                                <td>{column}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowSeats.map((row) => (
                            <tr>
                                <td>{row}</td>
                                {seatNums && seatNums[row] && seatNums[row].map((seat) => (
                                    <td className={`${seat.isBooked ? classes.booked: ""}`} onClick={selectSeat} value={seat.seatNum}>{seat.seatNum}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
            {!isLoggedin && 
            <>
            <Card.Title>User Details</Card.Title>
            <Form noValidate validated={validated} onSubmit={handleSubmit} id="userDets">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label required>Email</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="inputtext" ref={userMail} required disabled={!showSummary}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="inputtext" ref={userFname} required disabled={!showSummary}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Col sm={10}>
                    <Form.Control type="inputtext" ref={userLname} required disabled={!showSummary}/>
                    </Col>
                </Form.Group>
                <Button type="submit" id="userDetsSubmit" style={{visibility:"hidden"}}></Button>
            </Form>
            </>
            }
          <Card.Title>Booking Summary</Card.Title>
          <Form.Group as={Row} className="mb-3">
                <Form.Label>Movie Chosen</Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={movieBooked} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label>
                Theater Chosen
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={theater} disabled/>
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
                Seat Numbers
                </Form.Label>
                <Col sm={10}>
                <Form.Control type="inputtext" value={seatNumbersChosen} disabled/>
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
              <Form.Check label="Edit Booking" value={edit} checked={edit} onChange={editBooking} disabled={!showSummary}/>
            </Col>
          </Form.Group>
        </Card.Body>
        <Card.Footer style={{textAlign:"center"}}>
            <Button disabled={!showSummary} onClick={makePayment}>Proceed to Payment</Button>
        </Card.Footer>
      </Card>
      </Col>
    </Row>
    </section>
  );
};

export default TheatreMovieBooking;