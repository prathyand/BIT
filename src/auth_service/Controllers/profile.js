const User = require("../Models/User");

const profile = async (req, res) => {
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
  };

  module.exports = {profile};