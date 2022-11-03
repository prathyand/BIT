const express = require("express");
const router = express.Router();
const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");
const auth = require("../Middleware/auth");


const {
    getCitiesMovies,
    getTheatersMovies,
    getZipsMovies
} = require("../Controllers/movies");

// This api needs user authentication - a valid JWT 'token' header 

// sample usage: 
// get the list of all the movies for city 'Bloomington':
// GET http://dashboard_service:3002/movies/city/Bloomington
router.get('/city/:cityName',auth, getCitiesMovies);

// sample usage: 
// get the list of all the movies for theater 'theaterId':
// GET http://dashboard_service:3002/movies/theater/9d53b57f-9224-4de2-a65d-b062239dd72a
// Here, theaterId is: 9d53b57f-9224-4de2-a65d-b062239dd72a
router.get('/theater/:theaterId',auth, getTheatersMovies);


// sample usage: 
// get the list of all the movies for zip 'zipcode':
// GET http://dashboard_service:3002/movies/zip/46202
router.get('/zip/:zipcode',auth, getZipsMovies);

module.exports = router;