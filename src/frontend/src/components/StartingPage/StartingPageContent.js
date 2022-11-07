import classes from './StartingPageContent.module.css';
import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import context from 'react-bootstrap/esm/AccordionContext';
// import AuthContext from '../../contexts/AuthContext';
// import { useContext, useCallback, useState, useEffect } from 'react';
// import { useState } from 'react';
// import CONSTANTS from '../../constants';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React from 'react';

// const domainName = "http://" + CONSTANTS.GATEWAY1 + ":" + CONSTANTS.GATEWAY1_PORT;

const StartingPageContent = () => {
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
  const navigate = useNavigate();
  const bookMovieHandler = (event,movie) =>{
    navigate("/movie",{state:{movie:movie}})
  } 
  // const ctxt = useContext(AuthContext)
  // const [movies,setMovies] = useState([])
  // setMovies(tempMovie) 
  // const fetchMovies = useCallback(() => {
  //   fetch(
  //   domainName+"/movies",{
  //     method : "POST",
  //     body : JSON.stringify(
  //     {
  //       location: ctxt.location
  //     }),
  //     headers:
  //     {
  //       token : ctxt.token
  //     }
  //   }
  // ).then(response => {
  //       if(response.ok){
  //           response.json().then((data)=>{
  //               // console.log(data)
  //               // setData(data)
  //               setMovies(data)
  //           })
  //           // console.log(context)
  //           // this.props.navigation.navigate('./', {replace:true})
  //       }else{
  //           console.log(response)
  //       }
  //   });
  // },[]);// eslint-disable-line react-hooks/exhaustive-deps
  
  // useEffect(()=>{
  //   fetchMovies()
  // },[fetchMovies])

  return (
    <section className={classes.starting}>
    <Row xs={1} md={4} className="g-4">
      {tempMovie.map((movie) => (
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
              <Button onClick={(event) => bookMovieHandler(event,movie)}>Book Movie</Button>
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
  </section>
  );
};

export default StartingPageContent;
