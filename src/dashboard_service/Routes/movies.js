const express = require("express");
const router = express.Router();
const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");
const auth = require("../Middleware/auth");

// This api needs user authentication - a valid JWT 'token' header 

// sample usage: 
// get the list of all the movies for city 'Bloomington':
// GET http://dashboard_service:3002/movies/city/Bloomington
router.get('/city/:cityName',auth, 
    async (req,res)=>{
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
router.get('/theater/:theaterId',auth, 
    async (req,res)=>{
        try{
            // grab all movies for theater 'theaterId'
            const movieList = await Theater.find({'_id':req.params['theaterId']}).select({'showings.movies':1,'_id':0});
            // console.log(movieList[0]['showings']['movies']);
            const movieidSet = []
            // console.log(movieList);
            for(var j=0;j<movieList[0]['showings']['movies'].length;j++){
                movieidSet.push(movieList[0]['showings']['movies'][j]['id']);
            }
            
            const moviesList = await Movie.find({ _id: { $in: movieidSet} });
            for(var i=0;i<movieidSet.length;i++){
                moviesList[i]["timings"]=Array.from(movieList[0]['showings']['movies'][i]['timings']);
            }
            
            return res.status(200).json({movieidList:moviesList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Server Error!');
        }
});

module.exports = router;