const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_HOSTS: process.env.DB_HOSTS || 'localhost:27017',
    DB_DATABASE: process.env.DB_DATABASE || 'serv_DB',
    APP_PORT: process.env.APP_PORT || 3002,
    TOKEN_SECRET:process.env.TOKEN_SECRET,
    RABBITMQ_HOST: process.env.RABBITMQ_HOST || 'localhost',
    RABBITMQ_PORT: process.env.RABBITMQ_PORT || '5672',
    RABBITMQ_QUEUE: process.env.RABBITMQ_QUEUE || 'email_worker_queue'
}