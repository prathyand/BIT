const express = require("express");
const router = express.Router();
const auth = require('../auth/auth');

const {
  payment
} = require("../Controllers/payments")

router.post("/", payment)
module.exports = router;