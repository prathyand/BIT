const mongoose = require('mongoose');


const bookingschema = mongoose.Schema({
    // _id: String,
    user_id: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    cellphone_no: {
        type: String,
        required: false
    },
    fname: String,
    lname: String,
    usertype: String,
    theater_id: String,
    theater_name: String,
    movie_id: String,
    movie_name: String,
    price: Number,
    seats: Number,
    transactionId: String,
    reservation_date: String,
    reservation_time: String,
    booking_year: String,
    booking_month: String,
    booking_week: String,
    booking_day: String,
    seatIDs: String,
    paymentSuccess: Boolean
});


const Booking = mongoose.model("booking", bookingschema);
module.exports = Booking;