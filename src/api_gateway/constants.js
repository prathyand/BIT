module.exports = {
    AUTH_CONTAINER_HOSTNAME: process.env.AUTH_CONTAINER_HOSTNAME || 'localhost',
    AUTH_PORT: process.env.AUTH_PORT || '3001',
    DASHBOARD_CONTAINER_HOSTNAME: process.env.DASHBOARD_CONTAINER_HOSTNAME || 'localhost',
    DASHBOARD_PORT: process.env.DASHBOARD_PORT || '3002',
    APP_PORT: process.env.APP_PORT || '5001',
}