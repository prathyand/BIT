import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useContext, useCallback, useEffect, useState } from "react";
import Request from "../contexts/Request";
import constants from "../constants";

const TheatrePage = (props) => {
  const request = useContext(Request);
  const navigate = useNavigate();
  const bookMovieHandler = (event, movie, theater) => {
    event.preventDefault();
    navigate("/theatremovie", { state: { movie: movie, theater: theater } });
  };
  const [theaters, setTheaters] = useState([]);
  const fetchTheaters = useCallback(() => {
    const fetchMovies = (theatersData) => {
      for (let i = 0; i < theatersData.length; i++) {
        let theaterData = theatersData[i];
        let theterId = theaterData._id;
        let getMovies = request.getRequest(constants.REQUEST.THEATERS_MOVIES, {
          theaterId: theterId,
        });
        getMovies.then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              // console.log(data.moviesList)
              theaterData.movies = data.moviesList;
              if (i === theatersData.length - 1) {
                setTheaters(theatersData);
              }
            });
          } else {
            console.log(response);
          }
        });
      }
    };
    let getTheaters = request.getRequest(constants.REQUEST.THEATERS);
    getTheaters.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          // console.log(data.theaterList)
          // setTheaters(data.theaterList)
          fetchMovies(data.theaterList);
        });
      } else {
        console.log(response);
      }
    });
  }, [request]);
  useEffect(() => {
    fetchTheaters();
  }, [fetchTheaters]);

  // console.log(location)
  return (
    <>
      <Accordion>
        {theaters.length > 1 &&
          theaters.map((theater) => (
            <React.Fragment key={theater._id}>
              <Accordion.Item eventKey={theater._id}>
                <Accordion.Header>{theater.name}</Accordion.Header>
                <Accordion.Body>
                  <Row xs={1} md={4} className="g-4">
                    {theater.movies &&
                      theater.movies.map((movie) => (
                        <React.Fragment key={movie.title}>
                          <Col>
                            <Card>
                              <Card.Img
                                variant="top"
                                src={movie.poster_path.endsWith("null") ? "backup_poster.svg": movie.poster_path }
                                width="300"
                                height="300"
                              />
                              <Card.Body
                                style={{
                                  minHeight: "150px",
                                  maxHeight: "150px",
                                  overflowY: "scroll",
                                }}
                              >
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.overview}</Card.Text>
                              </Card.Body>
                              <Card.Footer>
                                <Button
                                  onClick={(event) =>
                                    bookMovieHandler(event, movie, theater)
                                  }
                                >
                                  Book Movie
                                </Button>
                              </Card.Footer>
                            </Card>
                          </Col>
                        </React.Fragment>
                      ))}
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </React.Fragment>
          ))}
      </Accordion>
    </>
  );
};

export default TheatrePage;
