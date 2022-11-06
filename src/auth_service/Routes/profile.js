const express = require("express");
const router = express.Router();
const auth = require('../auth/auth');

const {
  profile
} = require("../Controllers/profile")

router.get("/", auth, profile)
module.exports = router;