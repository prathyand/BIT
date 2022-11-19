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

        const address = "amqp://" + rabbitmq_host + ":" + rabbitmq_port;
        // const address = "amqp://guest:guest@" + rabbitmq_host + ":" + rabbitmq_port

        try {
            // if user is logged in, use JWT for their userID and insert (same step as authenticating token)
            const booking = new Booking();
            try{
                booking.user_id = userid
            } catch {
                booking.user_id = ""
            }
            booking.email=email;
            booking.theater_id =theater_id;
            booking.theater_name =theater_name;
            booking.movie_id =movie_id;
            booking.movie_name =movie_name;
            booking.price =price;
            booking.seats =seats;
            const result = await booking.save();
            const booking_id = result._id; //attempting to get booking id

            // need to update number of seats left in showing
            console.log("hello")
            console.log(address)
            
            const message = {
                "email": email,
                "booking_id": booking_id,
                "moviename": movie_name,
                "theater": theater_name,
                "seats": seats,
                "price": price
            }

            amqp.connect(address, (err, conn) => {
                if (err){
                    console.log(err)
                    // res.status(500).send("Error in connecting to rabbitmq agent");
                } 
                console.log("inside connect")

                conn.createChannel((err1, channel) => {
                    if (err1){
                        console.log(err1)
                        // res.status(500).send("Error in creating rabbitmq channel");
                    } 

                    console.log("inside create channel")


                    channel.assertQueue(queue, {
                        durable: true
                    });
                    const payload = JSON.stringify(message)
                    channel.sendToQueue(queue, Buffer.from(payload));
                    console.log("sent message to %s", queue);
                });
                // setTimeout(function() { conn.close()}, 500);
                conn.close();
            });

            res.status(200).json(message);
            // save user to DB
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving (trying to connect to rabbitmq)");
        }
    });

module.exports = {
    getBookings,
    bookMovie
}