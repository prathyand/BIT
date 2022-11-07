const mongoose = require('mongoose');
const connectDB = require("../dbconnect");
const Theater = require("../Models/Theater");
const fs = require('fs');



try{
    (async () => {
        await connectDB();
    })();
    
    var conn = mongoose.connection;

    let theaterdata = JSON.parse(fs.readFileSync('theater_new.json')); 

    for(var i=0;i<theaterdata.length;i++){
        theaterdata[i]['showings']=theaterdata[i]['showings'][0];
        theaterdata[i]['Zip']=parseInt(theaterdata[i]['Zip']);
    }
    
    // for(var i=0;i<3;i++){
    //     console.log(theaterdata[i]['showings']['movies'][0]['timings']);
    // }

    const importData = async () => {
        try {
          await Theater.create(theaterdata)
          console.log('data successfully imported')
          // to exit the process
          process.exit()
        } catch (error) {
          console.log('error', error)
        }
      }

      importData();

      return;

}catch(err){
    console.log(err);
}

