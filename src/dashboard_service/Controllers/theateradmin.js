const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");

const getTheatersinfo = (async (req,res)=>{
    try{
        const {userid} = req.body;
        const theaterobject = await Theater.findById(userid).exec();
        res.status(200).send({theaterobject});

    }catch(err){
        console.log(err);
        return res.status(400).send('Server Error!');
    }
});


module.exports = {
    getTheatersinfo
}