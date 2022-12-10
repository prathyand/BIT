import Card from "react-bootstrap/Card";
// import CardGroup from 'react-bootstrap/CardGroup';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { useContext, useCallback, useEffect, useState, useRef } from "react";
import Request from "../../contexts/Request";
import constants from "../../constants";
import classes from "./MovieBooking.module.css";
import AuthContext from "../../contexts/AuthContext";

const MovieBooking = (props) => {
  const movie = props.params.title;
  const poster = props.params.poster_path;
  const descr = props.params.overview;
  const movieId = props.params._id;
  const request = useContext(Request);
  const authContext = useContext(AuthContext);
  const [theatres, setTheatres] = useState([]);
  const [shows, setShows] = useState([]);
  const numSeats = [1, 2, 3, 4, 5, 6];
  const theatre = useRef();
  const show = useRef();
  const userMail = useRef();
  const userFname = useRef();
  const userLname = useRef();
  const movieDate = useRef();
  const seats = useRef(1);
  const [movieBooked, setMovieBooked] = useState("");
  const [showTime, setShowTime] = useState("");
  const [validated, setValidated] = useState(false);
  const [showDate, setDate] = useState("");
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [nseats, setSeats] = useState("");
  const [seatNumbersChosen, setSeatsChosen] = useState("");
  const [price, setPrice] = useState("");
  const [edit, setEdit] = useState(true);
  const [showSummary, setShowSumary] = useState(false);
  const [location,setLocation] = useState()
  const [address,setAddress] = useState()
  const columnsSeats = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "",
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
  ];
  const rowSeats = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [seatNums, setSeatProps] = useState({});
  const isLoggedin = authContext.isLoggedIn;
  // eslint-disable-next-line
  const [seatElements, setSeatElements] = useState({});
  let selectedSeat = [];
  let selectedSeatElement = {};
  let bookingDetails = {};
  const proceedSummary = (event) => {
    event.preventDefault();
    let tempSeats = seats.current.value;
    setMovieBooked(movie);
    setSelectedTheatre(theatre.current.value);
    setShowTime(show.current.value);
    setSeats(tempSeats);
    setSeatsChosen(selectedSeat);
    setPrice("$" + (10 * tempSeats).toString());
    setSeatElements(selectedSeatElement);
    setShowSumary(true);
    setEdit(false);
    setDate(movieDate.current.value);
    bookingDetails = {
      email: "test@test.com",
      theater_id: theatre.current.selectedOptions[0].getAttribute("id"),
      theater_name: theatre.current.value,
      movie_id: movieId,
      movie_name: movie,
      price: "$" + (10 * tempSeats).toString(),
      seats: tempSeats,
      booking_time: show.current.value,
      booking_date: movieDate.current.value,
      seatIDs: selectedSeat,
      location: location,
      address: address
    };
    authContext.setBookingDetails(bookingDetails);
  };
  const editBooking = (event) => {
    setEdit(event.target.checked);
  };
  const getShows = (event) => {
    event.preventDefault();
    let tempName = theatre.current.value;
    for (let i = 0; i < theatres.length; i++) {
      if (theatres[i].theater === tempName) {
        setShows(theatres[i].shows);
        setLocation(theatres[i].position)
      }
    }
  };
  const fetchMovieTheatres = useCallback(() => {
    let getMovies = request.getRequest(constants.REQUEST.MOVIE_TS, {
      movieId: movieId,
    });
    getMovies.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          let theaterData = data.theaterList;
          let tempTheater = [];
          for (let i = 0; i < theaterData.length; i++) {
            let theatreName = theaterData[i].name;
            let shows = [];
            let show = theaterData[i].showings.movies;
            for (let j = 0; j < show.length; j++) {
              if (show[j].id === movieId) {
                let timings = show[j].timings;
                for (let k = 0; k < timings.length; k++) {
                  shows.push(timings[k].time);
                }
              }
            }
            tempTheater.push({
              id: theaterData[i]._id,
              theater: theatreName,
              shows: shows,
              address: theaterData[i].address,
              position:{
                lat:theaterData[i].lat,
                lng:theaterData[i].long,
              }
            });
            if(i===0){
              setLocation({
                lat:theaterData[i].lat,
                lng:theaterData[i].long
              })
              setAddress(theaterData[i].address)
            }
          }
          setTheatres(tempTheater);
          setShows(tempTheater[0].shows);
        });
      } else {
        console.log(response);
      }
    });
  }, [request, movieId]);

  useEffect(() => {
    let bookedSeats = 60;
    let seatNums = {};
    let columnsSeats = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "",
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
    ];
    let rowSeats = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let i = 0; i < rowSeats.length; i++) {
      let rowSeating = [];
      for (let j = 0; j < columnsSeats.length; j++) {
        let seatNum = rowSeats[i] + String(columnsSeats[j]);
        let booked = false;
        if (bookedSeats > 0 && Math.floor(Math.random() * 2)) {
          booked = true;
          bookedSeats -= 1;
        }
        if (columnsSeats[j] === "") {
          rowSeating.push("");
        } else {
          rowSeating.push({
            seatNum: seatNum,
            isBooked: booked,
          });
        }
      }
      seatNums[rowSeats[i]] = rowSeating;
    }
    setSeatProps(seatNums);
  }, []);

  useEffect(() => {
    fetchMovieTheatres();
  }, [fetchMovieTheatres]);

  const handleSubmit = (event) => {
    const form = document.getElementById("userDets");
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
    setValidated(true);
  };

  const makePayment = (event) => {
    const form = document.getElementById("userDets");
    document.getElementById("userDetsSubmit") &&
      document.getElementById("userDetsSubmit").click();
    if (!isLoggedin && form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    let transactionId = Date.now();
    let data = {
      seats: nseats,
      transId: transactionId,
    };
    let payment = request.postRequest(constants.REQUEST.PAYMENT, data);
    payment.then((response) => {
      if (response.ok) {
        console.log(response);
        response.json().then((data) => {
          console.log(data);
          // window.open(data.redirect, "Payment Page", "width=800,height=800");
          bookingDetails = authContext.getBookingDetails();
          bookingDetails["transactionId"] = transactionId;
          if (!authContext.isLoggedIn) {
            bookingDetails["email"] = userMail.current.value;
            bookingDetails["fname"] = userFname.current.value;
            bookingDetails["lname"] = userLname.current.value;
          }
          authContext.setBookingDetails(bookingDetails);
          window.open(data.redirect, "_self");
        });
      } else {
        console.log(response);
      }
    });
  };

  const selectSeat = (event) => {
    event.preventDefault();
    let seat = event.target.getAttribute("value");
    if (!edit || !seat) {
      return;
    }
    //This is to build selectedSeat array and selectedSeatElement object for editing
    let table = document.getElementById("seatLayout");
    let tempSelectedSeats = table.getElementsByClassName(classes.selected);
    if (selectedSeat.length === 0 && tempSelectedSeats.length > 0) {
      for (let i = 0; i < tempSelectedSeats.length; i++) {
        let tempSeatElem = tempSelectedSeats[i];
        let tempSeat = tempSeatElem.getAttribute("value");
        selectedSeat.push(tempSeat);
        selectedSeatElement[tempSeat] = tempSeatElem;
      }
    }
    // End
    if (selectedSeat.length < parseInt(seats.current.value)) {
      if (selectedSeat.includes(seat)) {
        event.target.classList.remove(classes.selected);
        for (let i = 0; i < selectedSeat.length; i++) {
          if (selectedSeat[i] === seat) {
            selectedSeat.splice(i, 1);
          }
        }
        selectedSeatElement[seat] = "";
      } else {
        event.target.classList.add(classes.selected);
        selectedSeat.push(seat);
        selectedSeatElement[seat] = event.target;
      }
    } else {
      event.target.classList.add(classes.selected);
      selectedSeat.push(seat);
      selectedSeatElement[seat] = event.target;
      let removedSeat = selectedSeat.splice(0, 1);
      selectedSeatElement[removedSeat] &&
        selectedSeatElement[removedSeat].classList.remove(classes.selected);
      selectedSeatElement[removedSeat] = "";
    }
  };
  return (
    <section className={classes.bookbg} style={{ color: "wheat" }}>
      <h1
        style={{
          fontSize: "55px",
          color: "rgb(202, 202, 237)",
          paddingBottom: "12px",
          paddingTop: "12px",
          borderRadius: "35px",
          textAlign: "center",
          fontFamily: "Comic Sans MS, Comic Sans, cursive",
        }}
      >
        Movie Booking
      </h1>
      <Row>
        <Col xs={12} md={8}>
          <div>
            <Card style={{ background: "transparent" }}>
              <img alt="loading" className={classes.movImg} src={poster} />
              <Card.Body>
                <Card.Title
                  style={{ fontSize: "35px", color: "black" }}
                  className={classes.movTitle}
                >
                  {movie}
                </Card.Title>
                <Card.Text>{descr}</Card.Text>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2}>
                    Select the theatre
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      style={{ color: "black" }}
                      size="lg"
                      ref={theatre}
                      disabled={!edit}
                      onChange={getShows}
                    >
                      {theatres.map((option) => (
                        <option id={option.id}>{option.theater}</option>
                      ))}
                    </Form.Select>
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
                    Select the show time
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Select
                      style={{ color: "black" }}
                      size="lg"
                      ref={show}
                      disabled={!edit}
                    >
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
                    <Form.Select
                      style={{ color: "black" }}
                      size="lg"
                      ref={seats}
                      disabled={!edit}
                    >
                      {numSeats.map((seat) => (
                        <option>{seat}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <div className={classes.theater}>
                  <div className={classes.screen}>Screen This Side</div>
                  <table
                    style={{ color: "black" }}
                    className={classes.table}
                    id="seatLayout"
                  >
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
                          {seatNums &&
                            seatNums[row] &&
                            seatNums[row].map((seat) => (
                              <td
                                className={`${
                                  seat.isBooked ? classes.booked : classes.avail
                                }`}
                                onClick={selectSeat}
                                value={seat.seatNum}
                              >
                                {seat.seatNum}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
              <Card.Footer style={{ textAlign: "center" }}>
                <Button onClick={proceedSummary} disabled={!edit}>
                  Proceed to Summary
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </Col>
        <Col xs={6} md={4}>
          <Card style={{ background: "transparent" }}>
            <Card.Body>
              {!isLoggedin && (
                <>
                  <Card.Title>User Details</Card.Title>
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    id="userDets"
                  >
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label required>Email</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="inputtext"
                          ref={userMail}
                          required
                          disabled={!showSummary}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a email.
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="inputtext"
                          ref={userFname}
                          required
                          disabled={!showSummary}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a first name.
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="inputtext"
                          ref={userLname}
                          required
                          disabled={!showSummary}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter a last name.
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Button
                      type="submit"
                      id="userDetsSubmit"
                      style={{ visibility: "hidden" }}
                    ></Button>
                  </Form>
                </>
              )}
              <Card.Title>Booking Summary</Card.Title>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Movie Chosen</Form.Label>
                <Col sm={10}>
                  <Form.Control type="inputtext" value={movieBooked} disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Theatre Chosen</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="inputtext"
                    value={selectedTheatre}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Show Date</Form.Label>
                <Col sm={10}>
                  <Form.Control type="inputtext" value={showDate} disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Show Time</Form.Label>
                <Col sm={10}>
                  <Form.Control type="inputtext" value={showTime} disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Number of Seats</Form.Label>
                <Col sm={10}>
                  <Form.Control type="inputtext" value={nseats} disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Seat Numbers</Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="inputtext"
                    value={seatNumbersChosen}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label>Price for the tickets</Form.Label>
                <Col sm={10}>
                  <Form.Control type="inputtext" value={price} disabled />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Form.Check
                    label="Edit Booking"
                    value={edit}
                    checked={edit}
                    onChange={editBooking}
                    disabled={!showSummary}
                  />
                </Col>
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <Button
                disabled={!showSummary}
                type="submit"
                onClick={makePayment}
              >
                Proceed to Payment
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default MovieBooking;
