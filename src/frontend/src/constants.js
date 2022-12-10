// import * as dotenv from "dotenv"
// dotenv.config()
// import express from 'express'

// const dotenv = require('dotenv');
// dotenv.config();
let requestEndPoints = {
    GOOGLE_EP: "/auth/google",
    EMAIL_LOGIN_EP: "/login",
    SIGNUP_EP: "/signup",
    PROFILE_EP: "/profile",
    UPDATE_PROFILE_EP: "/updateprofile",
    MOVIES: "/movies/city/",
    THEATERS: "/theaters/city/",
    MOVIE_TS:"/theaters/movie/",
    CITIES: "/cities",
    THEATERS_MOVIES:"/movies/theater/",
    PAYMENT:"/payment",
    MOVIEZIP:"/movies/zip/",
    THEATERZIP:"/theaters/zip/",
    BOOKING:"/bookings",
    CHANGE_PASSWORD:"/updateprofile/resetpasswd",
    FORGOT_PASSWORD:"/updateprofile/genpasswd"
}

module.exports = {
    REACT_APP_GATEWAY: process.env.REACT_APP_GATEWAY || 'localhost',
    REACT_APP_GATEWAY_PORT: process.env.REACT_APP_GATEWAY_PORT || 5001,
    DOMAIN: process.env.FEDOMAIN || 'localhost',
    FE_PORT: process.env.FEPORT || 3000,
    CLIENT_ID: process.env.CLIENT_ID || "624148654388-pep2rsbqfuscb5mibsh16l3fv1hhlp7e.apps.googleusercontent.com",
    REQUEST: requestEndPoints,
    AUTH_TOKEN_KEY: "the_bit_token"
}