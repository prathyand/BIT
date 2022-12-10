const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const publish_to_queue = require("./producer");


const updatePasswd = async (req, res) => {
    try {
      const user = await User.findOne({'userid':req.userid});
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });
      
      const {password}  = req.body;

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      res.status(200).json({
        message: "password updated!"
      });

    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  };


  const genPassword = async (req, res) => {
    try {
      const {email} = req.body
      const user = await User.findOne({'user_email':email});

      if (!user){ 
        return res.status(400).json({message: "User Not Exist, invalid email"});
      }
        
      var characters = 'abcdefghijklmnoqrstuvwxyz0123456789?<>!"£$%^&*()-+./';
      var results = '';
      var length = characters.length;
   
      function randomPassword() {
        var check = 2;
        for (i=0; i<=13; i++) {
        var mix = characters.charAt(Math.floor(Math.random() * length));     
        if (mix.match(/[a-z]/i) && check>0) {
          mix =  mix.toUpperCase();
          check --;
        }
          var newString = results += mix;
        }
        return newString;
      }
      
      let passwd = randomPassword();
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(passwd, salt);

      await user.save();

      const message = {
        "email": email,
        "password": passwd
      }

      publish_to_queue(message)

      res.status(200).json({
        message: "password updated!"
      });

    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  };

module.exports = {updatePasswd,genPassword};