const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const CONSTANTS = require("../constants");
const User = require("../Models/User");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')


const dotenv = require('dotenv');
dotenv.config();

const client = new OAuth2Client(process.env.frontend_google_clientID);

const {
  login
} = require("../Controllers/login")

router.post("/", login)

module.exports = router;