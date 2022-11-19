const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {
    getBookings,
    bookMovie
} = require("../Controllers/bookings");

// return the list of all cities in the database
router.get('/', getBookings);
router.post('/', bookMovie);

module.exports = router;
