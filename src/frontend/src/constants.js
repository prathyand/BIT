// import * as dotenv from "dotenv"
// dotenv.config()
// import express from 'express'

// const dotenv = require('dotenv');
// dotenv.config();

module.exports = {
    GATEWAY1: process.env.GATEWAY1 || 'localhost',
    GATEWAY1_PORT: process.env.GATEWAY1_PORT || 5001,
    DOMAIN: process.env.FEDOMAIN || 'localhost',
    FE_PORT: process.env.FEPORT || 3000,
    CLIENT_ID: process.env.CLIENT_ID || "624148654388-pep2rsbqfuscb5mibsh16l3fv1hhlp7e.apps.googleusercontent.com",
    GOOGLE_EP: "/auth/google",
    EMAIL_LOGIN_EP: "/login",
    SIGNUP_EP: "/signup",
    PROFILE_EP: "/profile",
    UPDATE_PROFILE_EP: "/updateprofile"
}
