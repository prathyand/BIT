const express = require("express");
const router = express.Router();
const auth = require('../auth/auth');

const {
  updateProfile
} = require("../Controllers/updateprofile")

router.post("/", auth, updateProfile)

module.exports = router;