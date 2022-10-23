const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    DB_HOSTS: process.env.DB_HOSTS || 'localhost:27017',
    DB_DATABASE_AUTH: process.env.DB_DATABASE || 'authDB',
    APP_PORT: process.env.APP_PORT || 3001,
    frontend_google_clientID: process.env.GCLIENT_ID || " ",
}