const Booking = require("../Models/Bookings");
const amqp = require("amqplib/callback_api");
const { connection } = require("mongoose");
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants")

const getBookings = (async (req, res) => {
    try{
        const bookings = await Booking.find({})
        return res.status(200).json({"bookings": bookings});
    } catch(err) {
        console.log(err)
        return res.status(400).json("Server Error! Couldn't get all bookings")
    }
});

const bookMovie = (async (req, res) => {
        // check for JWT token, make sure it's not expired
        const token = req.header("token");
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.TOKEN_SECRET); //is this variable set?
                const userid = decoded.userid;
                // next
            } catch (e) {
                console.error(e)
                res.status(500).send({message: "Invalid token"})
            }
        } else {
            const userid = ""
        }

        const {
            email,
            theater_id,
            theater_name,
            movie_id,
            movie_name,
            price,
            seats
        } = req.body; // also need date, time from frontend
    
        const rabbitmq_host = CONSTANTS.RABBITMQ_HOST;
        const rabbitmq_port = CONSTANTS.RABBITMQ_PORT;
        const queue = CONSTANTS.RABBITMQ_QUEUE;

        const address = "amqp://" + rabbitmq_host + ":" + rabbitmq_port
        // const address = "amqp://guest:guest@" + rabbitmq_host + ":" + rabbitmq_port

        try {
            // if user is logged in, use JWT for their userID and insert (same step as authenticating token)
            const booking = new Booking();
            booking.user_id = userid
            booking.email=email;
            booking.theater_id =theater_id;
            booking.theater_name =theater_name;
            booking.movie_id =movie_id;
            booking.movie_name =movie_name;
            booking.price =price;
            booking.seats =seats;
            const res = await booking.save();
            const booking_id = res._id; //attempting to get booking id

            // need to update number of seats left in showing
            
            amqp.connect(address, (err, conn) => {
                if (err){
                    console.log(err)
                    res.status(500).send("Error in connecting to rabbitmq agent");
                } 

                conn.createChannel((err1, channel) => {
                    if (err1){
                        console.log(err)
                        res.status(500).send("Error in creating rabbitmq channel");
                    } 

                    var message = {
                        "email": email,
                        "booking_id": booking_id,
                        "movie_name": movie_name,
                        "theater_name": theater_name,
                        "seats": seats,
                        "price": price
                    }

                    channel.assertQueue(queue, {
                        durable: true
                    });
                    channel.sendToQueue(queue, Buffer.from(message));
                    console.log("sent message to %s", queue);
                });
            });

            // save user to DB
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    });

module.exports = {
    getBookings,
    bookMovie
}