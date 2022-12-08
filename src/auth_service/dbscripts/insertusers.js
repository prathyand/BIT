const mongoose = require('mongoose');
const connectDB = require("../dbconnect");
const User = require("../Models/User");
const fs = require('fs');
const bcrypt = require("bcryptjs");

try{

    connectDB();
    const importData = async () => {
        let theaterdata = JSON.parse(fs.readFileSync('theater_new.json')); 
        let itr2=0;
        for(var i=0;i<theaterdata.length;i++){
            user = new User();

            // user._id=mongoose.Types.ObjectId(theaterdata[i]['_id']);
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash("password", salt);
            user.userid=theaterdata[i]['_id'];
            user.usertype='adHoc';
            user.first_name = theaterdata[i]['name'];
            user.last_name = "";
            user.user_email=theaterdata[i]['email'];
            user.cellphone_no = theaterdata[i]['phone'];

            await user.save();
            itr2+=1;
            if(itr2%100==0){
                console.log("saved ",itr2);
                
            }
        }
    }

    importData();
    
    const importData2 = async () => {
        const salt = await bcrypt.genSalt(10);
        console.log("starting process");
        let theaterdata = JSON.parse(fs.readFileSync('user.json')); 
        let itr=0;
        
        for(var i=0;i<theaterdata.length;i++){
            user = new User();
            
            // user._id=mongoose.Types.ObjectId(theaterdata[i]['_id']);
            
            
            
            user.password = await bcrypt.hash("password", salt);
            
            user.userid=theaterdata[i]['userid'];
            user.usertype=theaterdata[i]['usertype'];
            user.first_name = theaterdata[i]['first_name'];
            user.last_name = theaterdata[i]['last_name'];
            
            user.user_email=theaterdata[i]['user_email'];
            user.cellphone_no = theaterdata[i]['cellphone_no'];
            
            await user.save();
            itr+=1;
            if(itr%100==0){
                console.log("saved ",itr);
                if(itr===1000){
                    process.exit();
                }
            }
            
        }
    }

    importData2();

    // process.exit();

}catch(err){
    console.log(err);
    process.exit();
}