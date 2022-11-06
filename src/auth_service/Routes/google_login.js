const { OAuth2Client } = require('google-auth-library')
const CONSTANTS = require("../constants");
const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const client = new OAuth2Client(CONSTANTS.frontend_google_clientID);
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const {
    googleLogin
} = require("../Controllers/google_login")

router.post("/", googleLogin)

module.exports = router;