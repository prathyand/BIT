const express = require("express");
const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");

// This api needs user authentication - a valid JWT 'token' header 

// sample usage: 
// get the list of all the movies for city 'Bloomington':
// GET http://dashboard_service:3002/movies/city/Bloomington
const getCitiesMovies = (async (req,res)=>{
        try{
            // grab all movies for city 'cityName'
            const theaterlist = await Theater.find({'City':req.params['cityName']}).select({'showings.movies.id':1,'_id':0});
            const movieidSet = new Set()
            for(var i=0;i<theaterlist.length;i++){
                for(var j=0;j<theaterlist[i]['showings']['movies'].length;j++){
                    movieidSet.add(theaterlist[i]['showings']['movies'][j]['id']);
                }
            }
            
            const moviesList = await Movie.find({ _id: { $in: Array.from(movieidSet)} });
            return res.status(200).json({movieidList:moviesList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Server Error!');
        }
});

// sample usage: 
// get the list of all the movies for theater 'theaterId':
// GET http://dashboard_service:3002/movies/theater/9d53b57f-9224-4de2-a65d-b062239dd72a
// Here, theaterId is: 9d53b57f-9224-4de2-a65d-b062239dd72a
const getTheatersMovies = (async (req,res)=>{
        try{
            // grab the theater with theater id 'theaterId'
            let theater = await Theater.findById({'_id':req.params['theaterId']}).select({'showings.movies':1,'_id':0});
            theater=theater.toObject();

            const movieidSet = [];
          
            for(var j=0;j<theater['showings']['movies'].length;j++){
                movieidSet.push(theater['showings']['movies'][j]['id']);
            }
            
            let moviesList = await Movie.find({ _id: { $in: movieidSet} });

            moviesList=moviesList.map((item,ind)=>{
                item=item.toObject();
                item.timings=theater['showings']['movies'][ind]['timings'];
                return item;});

            return res.status(200).send({moviesList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Server Error!');
        }
});


// sample usage: 
// get the list of all the movies for zip 'zipcode':
// GET http://dashboard_service:3002/movies/zip/46202
const getZipsMovies = (async (req,res)=>{
        try{
            // grab all movies for zip 'zipcode'
            const theaterlist = await Theater.find({'Zip':req.params['zipcode']}).select({'showings.movies.id':1,'_id':0});
            const movieidSet = new Set();
            for(var i=0;i<theaterlist.length;i++){
                for(var j=0;j<theaterlist[i]['showings']['movies'].length;j++){
                    movieidSet.add(theaterlist[i]['showings']['movies'][j]['id']);
                }
            }
            
            const moviesList = await Movie.find({ _id: { $in: Array.from(movieidSet)} });
            return res.status(200).json({movieidList:moviesList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Server Error!');
        }
});

module.exports = {
    getCitiesMovies,
    getTheatersMovies,
    getZipsMovies
}