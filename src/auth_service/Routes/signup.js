const express = require("express");

const router = express.Router();

const {
    signup
} = require("../Controllers/signup")

router.post("/", signup)

module.exports = router;