const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    AUTH_CONTAINER_HOSTNAME: process.env.AUTH_CONTAINER_HOSTNAME || 'localhost',
    AUTH_PORT: process.env.AUTH_PORT || '3001',
    APP_PORT: process.env.APP_PORT || '5000',
}