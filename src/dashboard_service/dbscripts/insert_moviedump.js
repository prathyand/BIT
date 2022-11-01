const mongoose = require('mongoose');
const connectDB = require("../dbconnect");
const Movie = require("../Models/Movies");
const fs = require('fs');



try{
    connectDB();
    var conn = mongoose.connection;
    let moviedata = JSON.parse(fs.readFileSync('moviedump.json')); 

    const importData = async () => {
        try {
          await Movie.create(moviedata)
          console.log('data successfully imported')
          // to exit the process
          process.exit()
        } catch (error) {
          console.log('error', error)
        }
      }

      importData();


}catch(err){
    console.log(err);
}

