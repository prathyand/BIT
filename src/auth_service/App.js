const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./dbconnect");
// const user = require("./Routes/user");
const loginRoute =require("./Routes/login");
const signupRoute =require("./Routes/signup");
const profileRoute =require("./Routes/profile");
const updateprofileRoute =require("./Routes/updateprofile");
const gloginRoute =require("./Routes/google_login");


const app = express();
const CONSTANTS = require("./constants");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(bodyParser.json()) ;
  app.use("/login", loginRoute);
  app.use("/signup", signupRoute);
  app.use("/profile", profileRoute);
  app.use("/updateprofile", updateprofileRoute);
  app.use("/auth/google", updateprofileRoute);
  

  const server = app.listen(CONSTANTS.APP_PORT, () => {
    console.log(`Server is running at port ${CONSTANTS.APP_PORT}`);
      connectDB();
  });