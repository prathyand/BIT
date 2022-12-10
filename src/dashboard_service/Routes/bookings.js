const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {
    getBookings,
    getCustomerInfo,
    bookMovie
} = require("../Controllers/bookings");

router.get('/', getBookings);
router.get('/customerInfo', getCustomerInfo);
router.post('/', bookMovie);

module.exports = router;
