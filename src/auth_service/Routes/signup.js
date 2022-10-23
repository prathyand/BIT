const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const CONSTANTS = require("../constants");
const User = require("../Models/User");
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post(
    "/",
    async (req, res) => {
        const {
            email,
            password,
            first_name,
            last_name,
            cellphone_no
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
            
            // encrypt the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // generate userid
            user.userid =  Math.floor(Math.random() * Date.now());

            user.user_email=email;
            user.first_name=first_name;
            user.last_name=last_name;
            user.cellphone_no=cellphone_no;
            // save user to DB
            await user.save();

            // prepare payload for JWT
            const payload = {
                userid:user.userid
            };
            // create a token and send it in response body
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

module.exports = router;