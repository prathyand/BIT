const mongoose = require("mongoose");

const usermodelschema = mongoose.Schema({
  user_email: String,
  userid: String,
  usertype: String,
  password: String,
  first_name: String,
  last_name: String,
  cellphone_no:String
});
const User =mongoose.model("userinfo", usermodelschema);
module.exports = User;