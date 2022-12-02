const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");

const {
    getTheatersinfo
} = require('../Controllers/theateradmin');

router.get('/', auth,getTheatersinfo);

module.exports = router;