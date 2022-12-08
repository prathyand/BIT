const User = require("../Models/User");
const bcrypt = require("bcryptjs");


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
  }
;

module.exports = {updatePasswd};