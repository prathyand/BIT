const express = require("express");
const router = express.Router();
const Theater = require("../Models/Theater");
// no need for authentication middleware


const {getCities} = require("../Controllers/cities")

// return the list of all cities in the database
router.get('/', getCities);

module.exports = router;
