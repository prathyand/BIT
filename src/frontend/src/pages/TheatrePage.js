import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const TheatrePage = (props) => {
    const tempMovie = [{
        poster:"Incredibles_2.jpeg",
        title:"Incredibles 2",
        description:"Test Description"
    },
    {
        poster:"Inside_out.jpeg",
        title:"Inside Out",
        description:"Test Description"
    },
    {
        poster:"Moana.jpeg",
        title:"Moana",
        description:"Test Description"
    },
    {
        poster:"Raya.jpeg",
        title:"Raya The Last Dragon",
        description:"Test Description"
    },
    {
        poster:"Soul.jpeg",
        title:"Soul",
        description:"Test Description"
    }]
    const theatres = [{
        tname: "AMC11",
        shows: ["9AM","12PM","3PM","6PM","9PM"],
        movies: tempMovie
    },
    {
        tname: "AMC13",
        shows: ["9AM","12PM","3PM","6PM","9PM"],
        movies: tempMovie
    },
    {
        tname: "AMC15",
        shows: ["9AM","12PM","3PM","6PM","9PM"],
        movies: tempMovie
    }]
    const navigate = useNavigate();
    const bookMovieHandler = (event,movie,theatre) =>{
        navigate("/theatremovie",{state:{movie:movie,theatre:theatre}})
    } 

  // console.log(location)
  return (
    <Accordion>
    {theatres.map((theatre) => (    
    <Accordion.Item eventKey={theatre.tname}>
      <Accordion.Header>{theatre.tname}</Accordion.Header>
      <Accordion.Body>
    <Row xs={1} md={4} className="g-4">
      {theatre.movies.map((movie) => (
      <React.Fragment key={movie.title}>
        <Col>
          <Card>
            <Card.Img variant="top" src={movie.poster} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                {movie.description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              {/* <Button>BookM</Button> */}
              <Button onClick={(event) => bookMovieHandler(event, movie, theatre)}>Book Movie</Button>
              {/* <small className="text-muted">Last updated 3 mins ago</small> */}
            </Card.Footer>
          </Card>
        </Col>
      </React.Fragment>
      ))}
      <Col>
        <Card>
          <Card.Img variant="top" src="test.png" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img variant="top" src="test.png" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural lead-in
              to additional content. This content is a little bit longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
    </Accordion.Body>
    </Accordion.Item>
    ))}
    </Accordion>
  );
};

export default TheatrePage;