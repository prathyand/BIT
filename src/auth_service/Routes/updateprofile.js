const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const CONSTANTS = require("../constants");
const User = require("../Models/User");
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();
const auth = require('../auth/auth');

router.post(
    "/",
    auth,
    async (req, res) => {
   
      try {
        const user = await User.findOne({'userid':req.userid});
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });

        for (const property in req.body) {
          // console.log(`${property}: ${req.body[property]}`);
          user[property]=req.body[property];
        }

        await user.save();

        const profilevector={};

        profilevector.first_name=user.first_name;
        profilevector.last_name=user.last_name;
        profilevector.user_email=user.user_email;
        profilevector.cellphone_no=user.cellphone_no || "";
        res.status(200).json({
          message: profilevector
        });
  
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

  module.exports = router;