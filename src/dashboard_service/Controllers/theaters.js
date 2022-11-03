const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");
const { json } = require("express");

// grabs all unique theater names from Theater data table
const getTheaters = (async (req, res) => {
    try{
        const theatersList = await Theater.find().select({'name':1, '_id':1});
        return res.status(200).json({theaters: theatersList});

    } catch(err) {
        console.log(err);
        return res.status(400).send('Server Error!');
    }
});

// gets all theaters in a specific city
const getCityTheaters = (async (req, res) => {
    try {
        const city = req.params.cityname
        // this query might need to look more like the one found in ../Routers/movies.js
        const theaterList = await Theater.find({'City':city})
        return res.status(200).json({theaterList: theaterList})
    } catch (err) {
        console.log(err);
        return res.status(400).send("Server Error!")
    }
})


// grabs all theaters in a specific zip code
const getZipTheaters = (async (req, res) => {
    try {
        const zip = req.params.zipcode
        // maybe this should return the entire table instead of just the distinct names? Ask Shanthan maybe
        const theaterList = await Theater.find({'Zip':zip})
        return res.status(200).json({theaterList: theaterList})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Server Error!");
    }
});

// grabs all theaters playing a movie (by movie id)
const getMoviesTheaters = (async (req, res) => {
    try {
        const movieId = req.params.movieId
        // maybe this should return the entire table instead of just the distinct names? Ask Shanthan maybe
        const theaterList = await Theater.find({"showings.movies.id": movieId})


        return res.status(200).json({theaterList: theaterList})
    } catch (err) {
        console.log(err)
        return res.status(400).send("Server Error!");
    }
});

module.exports = {
    getTheaters,
    getCityTheaters,
    getZipTheaters,
    getMoviesTheaters
}