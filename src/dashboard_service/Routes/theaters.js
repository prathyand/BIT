const express = require("express");
const router = express.Router();

const {
    getTheaters,
    getCityTheaters,
    getZipTheaters,
    getMoviesTheaters
} = require('../Controllers/theaters');


// grabs all unique theater names from Theater data table
router.get('/', getTheaters)

// gets all theaters in a specific city
router.get('/city/:cityname', getCityTheaters)

// grabs all theaters in a specific zip code
router.get('/zip/:zipcode', getZipTheaters)

// grabs all theaters playing a movie (by movie id)
router.get('/movie/:movieId', getMoviesTheaters)

module.exports = router;