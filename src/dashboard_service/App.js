const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const connectDB = require("./dbconnect");
const CONSTANTS = require("./constants");
citiesrouter = require('./Routes/cities');
moviesrouter = require('./Routes/movies');
theatersrouter = require('./Routes/theaters');
bookingsrouter = require('./Routes/bookings');

const app = express();

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(bodyParser.json());

  app.use("/cities",citiesrouter);
  app.use("/movies",moviesrouter);
  app.use("/theaters",theatersrouter);
  app.use("/bookings",bookingsrouter);


  app.get("/ping", (req, res) => {
    res.json({
      ping: "pokemon"
    });
  });

  let server;
  if (process.env.NODE_ENV != 'test') {
    server = app.listen(CONSTANTS.APP_PORT, () => {
      console.log(`Server is running at port ${CONSTANTS.APP_PORT}`);
      connectDB();
    });
  }else{
    server = app.listen(0, () => console.log(`Listening on port 0`));
  } 
  module.exports = { app, server };