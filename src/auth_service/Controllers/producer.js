const amqp = require("amqplib/callback_api");
const CONSTANTS = require("../constants");

const publish_to_queue =((message)=>{

    const rabbitmq_host = CONSTANTS.RABBITMQ_HOST;
    const rabbitmq_port = CONSTANTS.RABBITMQ_PORT;
    const queue = CONSTANTS.RABBITMQ_QUEUE;


    const URI = "amqp://" + rabbitmq_host + ":" + rabbitmq_port;

    try {

        console.log("URI ",URI);

        amqp.connect(URI, (err, conn) => {
            if (err){
                console.log(err)
            } 
            console.log("inside connect")

            conn.createChannel((err1, channel) => {
                if (err1){
                    console.log(err1)
                } 

                console.log("inside create channel")


                channel.assertQueue(queue, {
                    durable: true
                });
                const payload = JSON.stringify(message)
                channel.sendToQueue(queue, Buffer.from(payload));
                console.log("sent message to %s", queue);
            });
            setTimeout(function() { conn.close()}, 500);
        });


    } catch (err) {
        console.log(err.message);
    }

});

module.exports = publish_to_queue;