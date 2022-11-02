const express = require("express");
const router = express.Router();
const Theater = require("../Models/Theater");
// no need for authentication middleware


// return the list of all cities in the database
router.get('/', 
    async (req,res)=>{
        
        try{
            // grab all unique Theater['City'] from db
            const citiesList = await Theater.distinct('City');
            return res.status(200).json({'cities':citiesList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Server Error!');
        }
});

module.exports = router;
