const express = require('express');
const bodyParser = require("body-parser");
const CONSTANTS = require("./constants");
const httpProxy = require('express-http-proxy')
var cors = require('cors')

const authServerProxy = httpProxy('http://'+CONSTANTS.AUTH_CONTAINER_HOSTNAME + ':' + CONSTANTS.AUTH_PORT);
const dashboardServerProxy = httpProxy('http://'+CONSTANTS.DASHBOARD_CONTAINER_HOSTNAME + ':' + CONSTANTS.DASHBOARD_PORT);

const app = express();
app.use(cors())
app.use(express.json()) 
const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.json());

// Auth service requests
router.post('/login', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.post('/payment', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.post('/signup', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.get('/profile', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.post('/updateprofile', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.post('/updateprofile/resetpasswd', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.post('/updateprofile/genpasswd', (req, res,next) => {
    authServerProxy(req,res,next);  
});

router.post('/auth/google', (req, res,next) => {
    authServerProxy(req,res,next);  
});

// Dashboard service requests
router.get('/cities', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/movies/theater/:theaterId', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/movies/city/:cityName', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/movies/zip/:zipcode', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/theaters/', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/theaters/city/:cityname', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/theaters/zip/:zipcode', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/theaters/movie/:movieId', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/bookings', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/bookings/customerInfo', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/gettheaterinfo', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.get('/bookings', (req, res,next) => {
    dashboardServerProxy(req,res,next);
});

router.get('/bookings/customerInfo', (req, res,next) => {
    dashboardServerProxy(req,res,next);
});

app.use("/", router);

app.get("/ping", (req, res) => {
    res.json({
      ping: "pokemon"
    });
  });

  let server;
  if(process.env.NODE_ENV!=='test'){
    server = app.listen(CONSTANTS.APP_PORT, () => console.log(`Listening on port ${CONSTANTS.APP_PORT}`));
  }else{
    server = app.listen(0, () => console.log(`Listening on port 0`));
  }
 

module.exports = { app, server };