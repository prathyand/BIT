const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_HOSTS: process.env.DB_HOSTS || 'localhost:27017',
    DB_DATABASE_AUTH: process.env.DB_DATABASE || 'authDB',
    APP_PORT: process.env.APP_PORT || 3001,
    frontend_google_clientID: process.env.GCLIENT_ID || " ",
    environment: process.env.environment || 'docker',
    DB_REPLICASET: process.env.DB_REPLICASET,
    RABBITMQ_HOST: process.env.RABBITMQ_HOST || 'localhost',
    RABBITMQ_PORT: process.env.RABBITMQ_PORT || '5672',
    RABBITMQ_QUEUE: process.env.RABBITMQ_QUEUE || 'reset_password_queue',
    PREFS: process.env.PREFS
}