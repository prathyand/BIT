const CONSTANTS = require("./constants");
const mongoose = require("mongoose");

function connectAuthDB() {
  let MONGOURI;
  if(CONSTANTS.environment=='kubernetes'){
    MONGOURI = 'mongodb://' + CONSTANTS.DB_HOSTS + '/' + CONSTANTS.DB_DATABASE_AUTH+ '?replicaSet=' + CONSTANTS.DB_REPLICASET+ '&' + CONSTANTS.PREFS;
  }else{
    MONGOURI = 'mongodb://' + CONSTANTS.DB_HOSTS + '/' + CONSTANTS.DB_DATABASE_AUTH
  }
  mongoose
    .connect(MONGOURI, { useNewUrlParser: true })
    .catch((err) => {
      console.log("error in connecting to database : ", err);
      process.exit(1);
    });

  const conn = mongoose.connection;
  conn.on("connected", function () {
    console.log("database is connected successfully");
  });
  conn.on("disconnected", function () {
    console.log("database is disconnected successfully");
  });
  conn.on("error", console.error.bind(console, "connection error:"));
  return conn
}



module.exports = connectAuthDB;