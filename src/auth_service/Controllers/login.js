const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const CONSTANTS = require("../constants");
const User = require("../Models/User");

const dotenv = require('dotenv');
dotenv.config();


const login = async (req, res) => {
  
      // const { email, password } = req.body;
      const {isEmail,password} = req.body;
      try {
        let user;
        if(isEmail){
          const {email}  = req.body;
          user = await User.findOne({
            'user_email':email
          });
        }else{
          const {cellphone_no}  = req.body;
          // console.log(cellphone_no)
          if(!(!cellphone_no || cellphone_no.length === 0 || !cellphone_no.trim())){ //make sure that cellphone_no is not empty
            user = await User.findOne({
              'cellphone_no':cellphone_no
            });
          }
        }
        
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
            userid:user.userid,
            usertype:user.usertype
        };
  
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET, {
                expiresIn: '72000s'
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
  ;


  module.exports = {login};