const express = require("express");
const router = express.Router();
const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");
const auth = require("../Middleware/auth");

const {getBookings} = require("../Controllers/bookings")

// return the list of all cities in the database
router.get('/', getBookings);

module.exports = router;
