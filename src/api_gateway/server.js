// const request = require('request');
const axios = require('axios')
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json()) 
const CONSTANTS = require("./constants");
const router = express.Router();

const httpProxy = require('express-http-proxy')

const authServerProxy = httpProxy('http://'+CONSTANTS.AUTH_CONTAINER_HOSTNAME + ':' + CONSTANTS.AUTH_PORT);
const dashboardServerProxy = httpProxy('http://'+CONSTANTS.DASHBOARD_CONTAINER_HOSTNAME + ':' + CONSTANTS.DASHBOARD_PORT);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(bodyParser.json());

router.post('/login', (req, res,next) => {
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

router.post('/auth/google', (req, res,next) => {
    authServerProxy(req,res,next);  
});

app.get('/theaters/movie/:movieId', (req, res,next) => {
    authServerProxy(req,res,next);  
});



router.post('/cities', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/movies/theater/:theaterId', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/movies/city/:cityName', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/movies/zip/:zipcode', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/theaters/', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/theaters/city/:cityname', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/theaters/zip/:zipcode', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

router.post('/theaters/movie/:movieId', (req, res,next) => {
    dashboardServerProxy(req,res,next);  
});

app.use("/", router);


app.listen(CONSTANTS.APP_PORT, () => console.log(`Listening on port ${CONSTANTS.APP_PORT}`));