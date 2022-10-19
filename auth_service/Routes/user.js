const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dotenv = require('dotenv');
const auth = require('../auth/auth');

const User = require("../Models/User");

dotenv.config();

// handle User signup
router.post(
    "/signup",
    async (req, res) => {
        const {
            email,
            password,
            first_name,
            last_name
        } = req.body;
        // console.log(email);
        try {
            let user = await User.findOne({
                'user_email':email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

         
            user = new User();
            
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.userid =  Math.floor(Math.random() * Date.now());
            user.user_email=email;
            user.first_name=first_name;
            user.last_name=last_name;
            
            await user.save();

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
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

//Handle User Login
router.post(
    "/login",
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

  // Handle GET to retrieve user profile
  router.get("/profile", auth, async (req, res) => {
    try {
      // console.log(req.userid);
      const user = await User.findOne({'userid':req.userid});

      const profilevector={};

      profilevector.first_name=user.first_name;
      profilevector.last_name=user.last_name;
      profilevector.user_email=user.user_email;
      profilevector.cellphone_no=user.cellphone_no || "";

      res.json(profilevector);
    } catch (e) {
      // console.log(e);
      res.send({ message: "Error in Fetching user" });
    }
  });

  // Handle POST to update user profile
  router.post(
    "/updateprofile",
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