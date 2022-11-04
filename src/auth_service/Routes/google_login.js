const { OAuth2Client } = require('google-auth-library')
const CONSTANTS = require("../constants");
const express = require("express");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const client = new OAuth2Client(CONSTANTS.frontend_google_clientID);
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post(
    "/",
    async (req, res) => {
    const { idToken }  = req.body
      try{
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: CONSTANTS.frontend_google_clientID
        });

        const { name, email, picture } = ticket.getPayload();  

        let user = await User.findOne({
            'user_email':email
        }); 

        // register the user if not exists
        if(!user){
            user = new User();
            // encrypt the randomly generated password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(Math.floor(Math.random() * Date.now()).toString(), salt);

            // generate userid
            user.userid =  Math.floor(Math.random() * Date.now());

            user.user_email=email;
            user.first_name=name;
            user.last_name=" ";
            user.cellphone_no=" ";
            // save user to DB
            await user.save();
        }
        
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
  
      }catch(e){
        console.log(e);
        res.status(500).json({
            message: "Server Error"
          });
      }

    }
  );

  module.exports = router;