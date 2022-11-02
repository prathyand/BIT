const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {
    getTheaters,
    getCityTheaters,
    getZipTheaters,
    getMoviesTheaters
} = require('../Controllers/theaters');


// grabs all unique theater names from Theater data table
router.get('/', auth, getTheaters)

// gets all theaters in a specific city
router.get('/city/:cityname', auth, getCityTheaters)

// grabs all theaters in a specific zip code
router.get('/zip/:zipcode', auth, getZipTheaters)

// grabs all theaters playing a movie (by movie id)
router.get('/movie/:movieId', auth, getMoviesTheaters)

module.exports = router;