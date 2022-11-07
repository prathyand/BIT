const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./dbconnect");
const CONSTANTS = require("./constants");
citiesrouter = require('./Routes/cities');
moviesrouter = require('./Routes/movies');
theatersrouter = require('./Routes/theaters');

const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(bodyParser.json());

  app.use("/cities",citiesrouter);
  app.use("/movies",moviesrouter);
  app.use("/theaters",theatersrouter);

  app.get("/ping", (req, res) => {
    res.json({
      ping: "pokemon"
    });
  });

  const server = app.listen(CONSTANTS.APP_PORT, () => {
    console.log(`Server is running at port ${CONSTANTS.APP_PORT}`);
    if (process.env.NODE_ENV != 'test') {
      connectDB();
    }
  });

  module.exports = { app, server };