import {useLocation} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Request from '../contexts/Request';
import constants from '../constants';
import { useContext, useEffect, useState } from 'react';

const SearchPage = () => {
    const request = useContext(Request);
    const location = useLocation()
    const movie = location.state.movie
    const searchVal = location.state.searchVal
    const theaters = location.state.theaters
    const criteria = location.state.searchCriteria
    const [theaterMovies, setTheaterMovies] = useState([])
    // let theaterMovies;
    const navigate = useNavigate();
    let filteredData;
    if(criteria === "movie"){
        filteredData = movie.filter((item) => {
            const searchTerm = searchVal.toLowerCase();
            const movieName = item.title.toLowerCase();

            return (
                searchTerm &&
                movieName.startsWith(searchTerm)
            );
        })
    }else if(criteria === "theater"){
        filteredData = theaters.filter((item) => {
            const searchTerm = searchVal.toLowerCase();
            const theterName = item.name.toLowerCase();
            return (
                searchTerm &&
                theterName.startsWith(searchTerm)
            );
            })
    }

    const fetchMoviesforTheaters = () => {
        for(let i=0;i<filteredData.length;i++){
            let theater = filteredData[i]
            let theterId = theater._id
            let getMovies = request.getRequest(constants.REQUEST.THEATERS_MOVIES,{theaterId:theterId});
            getMovies.then(response => {
                if(response.ok){
                    response.json().then((data)=>{
                        // console.log(data.moviesList)
                        theater.movies = data.moviesList
                        filteredData[i] = theater
                        if(i === filteredData.length-1){
                            setTheaterMovies(filteredData)
                            // theaterMovies = filteredData
                        }
                    })
                }else{
                    console.log(response)
                }
            });
        }
    }

    useEffect(()=>{
        criteria === "theater" && fetchMoviesforTheaters()
        // eslint-disable-next-line
    },[])

    const bookMovieHandler = (event,movie, theater) =>{
        if(criteria === "movie"){
            navigate("/movie",{state:{movie:movie}})
        }else if(criteria === "theater"){
            navigate("/theatremovie",{state:{movie:movie,theater:theater,}})
        }
    }
    // console.log(filteredData)
    const count = filteredData.length; 
    return (
    <>
        <h1>Found {count} results</h1>
        { criteria === "movie" && 
            <Row xs={1} md={4} className="g-4">
            {filteredData.map((movie) => (
            <React.Fragment key={movie.title}>
                <Col>
                <Card>
                    <Card.Img variant="top" src={movie.poster_path} width="300" height="300"/>
                    <Card.Body style={{minHeight:"150px", maxHeight:"150px",overflowY:"scroll"}}>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>
                            {movie.overview}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={(event) => bookMovieHandler(event,movie)}>Book Movie</Button>
                    </Card.Footer>
                </Card>
                </Col>
            </React.Fragment>
            ))}
            </Row>
        }
        { criteria === "theater" && 
            <Accordion>
            {theaterMovies.map((theater) => (
            <React.Fragment key={theater._id}>   
            <Accordion.Item eventKey={theater._id}>
                <Accordion.Header>{theater.name}</Accordion.Header>
                <Accordion.Body>
                    <Row xs={1} md={4} className="g-4">
                        {theater.movies && theater.movies.map((movie) => (
                            <React.Fragment key={movie.title}>
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={movie.poster_path} width="300" height="300"/>
                                        <Card.Body style={{minHeight:"150px", maxHeight:"150px",overflowY:"scroll"}}>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>
                                                {movie.overview}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button onClick={(event) => bookMovieHandler(event, movie, theater)}>Book Movie</Button>
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
        }

    </>
    );
};

export default SearchPage;