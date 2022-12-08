const express = require("express");
const router = express.Router();
const auth = require('../auth/auth');

const {
  updateProfile
} = require("../Controllers/updateprofile")

const {
  updatePasswd
} = require("../Controllers/updatepasswd")

router.post("/", auth, updateProfile)
router.post("/resetpasswd", auth, updatePasswd)

module.exports = router;