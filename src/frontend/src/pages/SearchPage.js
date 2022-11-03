import {useLocation} from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const location = useLocation()
    const movie = location.state.movie
    const searchVal = location.state.searchVal
    const filteredData = movie.filter((item) => {
        const searchTerm = searchVal.toLowerCase();
        const movieName = item.title.toLowerCase();

        return (
            searchTerm &&
            movieName.startsWith(searchTerm)
        );
    })
    // console.log(filteredData)
    const count = filteredData.length;
    const navigate = useNavigate();
    const bookMovieHandler = (event,movie) =>{
        navigate("/movie",{state:{movie:movie}})
    } 
    return (
    <>
        <h1>Found {count} results</h1>
        <Row xs={1} md={4} className="g-4">
        {filteredData.map((movie) => (
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
        </Row>
    </>
    );
};

export default SearchPage;