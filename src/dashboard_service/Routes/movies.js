const express = require("express");
const router = express.Router();
const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");
const auth = require("../Middleware/auth");

// This api needs user authentication - a valid JWT 'token' header 

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
            // console.log(movieidSet);
            const moviesList = await Movie.find({ _id: { $in: Array.from(movieidSet)} });
            return res.status(200).json({movieidList:moviesList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Server Error!');
        }
});

module.exports = router;