// const request = require('request');
const axios = require('axios')
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(express.json()) 
const CONSTANTS = require("./constants");
const constants = require('./constants');
const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// try making mathods async
const forward_auth_req = async (req, res, path) => {
    const outboundUrl = req.protocol + '://' + CONSTANTS.AUTH_CONTAINER_HOSTNAME + ':' + CONSTANTS.AUTH_PORT + path;
    
    // ****** for debugging, enable logs *********//
    // console.log("outbound url ",outboundUrl);
    // console.log("path ",path);
    // console.log("method ",req.method);
    // console.log("headers token ",JSON.parse(JSON.stringify(req.headers))['token']);

    try {
        const resp = await axios({
            method: req.method,
            url: outboundUrl,
            data: JSON.parse(JSON.stringify(req.body)),
            headers: {'Content-Type' : "application/json",
                'token':JSON.parse(JSON.stringify(req.headers))['token']}
        });

        console.log("response data is "+ JSON.stringify(resp.data));

        // sending back response to frontend
        res.status(resp.status).send(resp.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
        // sending back error to frontend
        res.status(err.response.status).send(err.response.data);
    }

}

app.use(bodyParser.json());

router.post('/login', async (req, res) => {
    forward_auth_req(req, res, "/login");  
});

router.post('/signup', async (req, res) => {
    forward_auth_req(req, res, "/signup");  
});

router.get('/profile', async (req, res) => {
    forward_auth_req(req, res, "/profile");  
});

router.post('/updateprofile', async (req, res) => {
    forward_auth_req(req, res, "/updateprofile");  
});

router.post('/auth/google', async (req, res) => {
    forward_auth_req(req, res, "/auth/google");  
});

app.use("/", router);


// app.use('/', router);
// console.log(process.env);
app.listen(constants.CONTAINER_PORT, () => console.log(`Listening on port ${constants.CONTAINER_PORT}`));