const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./dbconnect");
const CONSTANTS = require("./constants");
citiesrouter = require('./Routes/cities');
moviesrouter = require('./Routes/movies');

const app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  app.use(bodyParser.json());

  app.use("/cities",citiesrouter);
  app.use("/movies",moviesrouter);

  const server = app.listen(CONSTANTS.APP_PORT, () => {
    console.log(`Server is running at port ${CONSTANTS.APP_PORT}`);
      connectDB();
  });