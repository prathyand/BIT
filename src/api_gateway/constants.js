const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_HOSTS: process.env.DB_HOSTS || 'localhost:27017',
    DB_DATABASE_AUTH: process.env.DB_DATABASE || 'authDB',
    APP_PORT: process.env.APP_PORT || 3001,
    frontend_google_clientID: process.env.GCLIENT_ID || " ",
    AUTH_CONTAINER_HOSTNAME: process.env.CONTAINER_HOSTNAME || 'localhost',
    CONTAINER_PORT: process.env.CONTAINER_PORT || '5000',
    AUTH_PORT: process.env.AUTH_PORT || '3001',
    MDB_PORT: process.env.MDB_PORT || '27017',
}