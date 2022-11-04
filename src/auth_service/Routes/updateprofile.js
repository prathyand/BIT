const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const CONSTANTS = require("../constants");
const User = require("../Models/User");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const auth = require('../auth/auth');

const {
  updateProfile
} = require("../Controllers/updateprofile")

router.post("/", auth, updateProfile)

module.exports = router;