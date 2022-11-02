const mongoose = require('mongoose');
const connectDB = require("../dbconnect");
const Movie = require("../Models/Movies");
const fs = require('fs');
const axios = require('axios');


try{
    connectDB();
    var conn = mongoose.connection;
    let moviedata = JSON.parse(fs.readFileSync('moviedump.json')); 

    d={
      '12': 'Adventure',
      '14': 'Fantasy',
      '16': 'Animation',
      '18': 'Drama',
      '27': 'Horror',
      '28': 'Action',
      '35': 'Comedy',
      '36': 'History',
      '37': 'Western',
      '53': 'Thriller',
      '80': 'Crime',
      '99': 'Documentary',
      '878': 'Science Fiction',
      '9648': 'Mystery',
      '10402': 'Music',
      '10749': 'Romance',
      '10751': 'Family',
      '10752': 'War',
      '10770': 'TV Movie'
    };

    for(var i=0;i<moviedata.length;i++){
      for(var j=0;j<moviedata[i]['genre_ids'].length;j++){
        moviedata[i]['genre_ids'][j]=d[parseInt(moviedata[i]['genre_ids'][j]).toString()];
      }
    }

    const importData = async () => {
        try {
          await Movie.create(moviedata)
          console.log('data successfully imported')
          // to exit the process
          process.exit();

        } catch (error) {
          console.log('error', error);
          process.exit();
        }
      }

      importData();


}catch(err){
    console.log(err);
}

