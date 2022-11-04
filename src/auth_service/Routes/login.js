const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const CONSTANTS = require("../constants");
const User = require("../Models/User");
const router = express.Router();
const { OAuth2Client } = require('google-auth-library')


const dotenv = require('dotenv');
dotenv.config();

const client = new OAuth2Client(process.env.frontend_google_clientID);

router.post(
    "/",
    async (req, res) => {
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          'user_email':email
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
            userid:user.userid
        };
  
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET, {
                expiresIn: '3600s'
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );


  module.exports = router;