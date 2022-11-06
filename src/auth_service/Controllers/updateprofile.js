const User = require("../Models/User");


const updateProfile = async (req, res) => {
      try {
        const user = await User.findOne({'userid':req.userid});
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });

        for (const property in req.body) {
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
  ;

  module.exports = {updateProfile};