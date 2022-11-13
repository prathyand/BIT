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
    theater_id: String,
    theater_name: String,
    movie_id: String,
    movie_title: String,
    price: Number,
    seats: Number,
});


const Booking = mongoose.model("booking", bookingschema)