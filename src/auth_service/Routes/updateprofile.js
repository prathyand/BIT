const express = require("express");
const router = express.Router();
const auth = require('../auth/auth');

const {
  updateProfile
} = require("../Controllers/updateprofile")

const {
  updatePasswd,genPassword
} = require("../Controllers/updatepasswd")


router.post("/", auth, updateProfile)
router.post("/resetpasswd", auth, updatePasswd)
router.post("/genpasswd",genPassword)

module.exports = router;