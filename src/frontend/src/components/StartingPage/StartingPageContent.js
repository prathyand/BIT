import classes from "./StartingPageContent.module.css";
import Card from "react-bootstrap/Card";
// import CardGroup from 'react-bootstrap/CardGroup';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import context from 'react-bootstrap/esm/AccordionContext';
// import AuthContext from '../../contexts/AuthContext';
import { useContext, useCallback, useEffect, useState } from "react";
// import { useState } from 'react';
// import CONSTANTS from '../../constants';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React from "react";
import Request from "../../contexts/Request";
import constants from "../../constants";
import AuthContext from "../../contexts/AuthContext";

const StartingPageContent = () => {
  const navigate = useNavigate();
  const request = useContext(Request);
  const [movies, setMovies] = useState([]);
  const authContext = useContext(AuthContext);
  const bookMovieHandler = (event, movie) => {
    navigate("/movie", { state: { movie: movie } });
  };
  const fetchMovies = useCallback(() => {
    let getMovies = request.getRequest(constants.REQUEST.MOVIES);
    getMovies.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data.movieidList);
          setMovies(data.movieidList);
        });
      } else {
        console.log(response);
      }
    });
  }, [request]);
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const loginToken = localStorage.getItem(constants.AUTH_TOKEN_KEY);
    if (loginToken) {
      let getProfile = request.getRequest("/test", { token: loginToken });
      getProfile.then((response) => {
        if (response.ok) {
          authContext.login(loginToken);
        } else {
          localStorage.removeItem(constants.AUTH_TOKEN_KEY);
        }
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section
      style={{ backgroundColor: "#00004d", marginTop: "22px" }}
      className={classes.starting}
    >
      <Row xs={1} md={4} className="g-4">
        {movies.map((movie) => (
          <React.Fragment key={movie.title}>
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src={movie.poster_path.endsWith("null") ? "backup_poster.svg": movie.poster_path }
                  width="300"
                  height="300"
                  style={{backgroundColor:"antiquewhite"}}
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
                  <Button onClick={(event) => bookMovieHandler(event, movie)}>
                    Book Movie
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </section>
  );
};

export default StartingPageContent;
