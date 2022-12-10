const Booking = require("../Models/Bookings");
const { connection } = require("mongoose");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const publish_to_queue = require("./producer");

const getBookings = (async (req, res) => {
    try{
        const bookings = await Booking.find({})
        return res.status(200).json({"bookings": bookings});
    } catch(err) {
        console.log(err)
        return res.status(400).json("Server Error! Couldn't get all bookings")
    }
});


const getCustomerInfo = (async (req,res)=>{
        try{
            // grab all movies for zip 'zipcode'
            const email = req.query.email
            const userID = req.query.userid
            // console.log(req.params['userid'])
            console.log(email)
            console.log(userID)
            let bookingsList = []

            if(email){
                bookingsList = await Booking.find({'email':email})
            }
            else if(userID){
                bookingsList = await Booking.find({'user_id':userID})
            }
            else {
                console.log("Both email and userID fields were empty when attempting to query booking info by email or userID");
                return res.status(400).send('Need to include email or userID in get request json body');
            }
            
            return res.status(200).json({bookingsList:bookingsList});

        }catch(err){
            console.log(err);
            return res.status(400).send('Couldnt find bookings by userID/email');
        }
});


const bookMovie = (async (req, res) => {
        // check for JWT token, make sure it's not expired
        const token = req.header("token");
        let userid="";
        let usertype="customer";
        if (token) {
            try {
                const decoded = jwt.verify(token, CONSTANTS.TOKEN_SECRET); 
                userid = decoded.userid;
                usertype = decoded.usertype;
            } catch (e) {
                console.error(e)
                res.status(500).send({message: "Invalid token"});
                return;
            }
        } 

        var today = new Date();
        var currDay = today.getDate();
        var currMonth = today.getMonth()+1;
        var currYear = today.getFullYear();

        let {
            fname,
            lname,
            email,
            theater_id,
            theater_name,
            movie_id,
            movie_name,
            price,
            seats,
            transactionId,
            booking_date,
            booking_time,
            seatIDs,
            paymentSuccess
        } = req.body; 
        
        const booking = new Booking();

        // get the current week
        const now = new Date();
        const onejan = new Date(now.getFullYear(), 0, 1);
        const weeknum = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
      

        booking.user_id = userid;
        booking.fname = fname;
        booking.lname = lname;
        booking.usertype=usertype;
        booking.email=email;
        booking.theater_id =theater_id;
        booking.theater_name =theater_name;
        booking.movie_id =movie_id;
        booking.movie_name =movie_name;
        booking.price =parseFloat(price.slice(1));
        booking.seats =seats;
        booking.transactionId=transactionId;
        booking.reservation_date=booking_date;
        booking.reservation_time=booking_time;
        booking.seatIDs=seatIDs.toString();
        booking.booking_year=currYear;
        booking.booking_month=currMonth;
        booking.booking_day=currDay;
        booking.booking_week=weeknum;
        booking.paymentSuccess=paymentSuccess;

        // save the record to the database regardless of the paymentSuccess status
        const result = await booking.save();
        const booking_id = result._id;
        
        // check if paymentSuccess is true
        if(paymentSuccess) {
            // publish the message to the notification queue
            const message = {
                "email": email,
                "fname": fname,
                "lname": lname,
                "booking_id": booking_id,
                "moviename": movie_name,
                "theater": theater_name,
                "seats": seats,
                "price": price,
                "reservation_date": booking_date,
                "reservation_time": booking_time,
                "seatIDs":seatIDs.toString()
            }

            // publish the message to the RabbitMQ queue for notification
            publish_to_queue(message);

            res.status(200).send({"message":"reservation created","details":message});

        }else{  
            res.status(200).send({"message":"reservation not created"});
        }

    });

module.exports = {
    getBookings,
    getCustomerInfo,
    bookMovie
}