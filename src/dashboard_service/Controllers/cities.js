const Theater = require("../Models/Theater");
const { json } = require("express");

// grabs all unique cities from Theater data table
const getCities = (async (req,res)=>{
    try{
        // grab all unique Theater['City'] from db
        const citiesList = await Theater.distinct('City');
        return res.status(200).json({'cities':citiesList});

    }catch(err){
        console.log(err);
        return res.status(400).send('Server Error!');
    }
});

module.exports = {
    getCities
}