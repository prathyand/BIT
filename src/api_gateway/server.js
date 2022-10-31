const request = require('request');
var express = require('express');
const bodyParser = require("body-parser");
var app = express();
app.use(express.json()) 
const CONSTANTS = require("./constants")

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

function forward_auth_req(req, res, path) {
    const outboundUrl = req.protocol + '://' + CONSTANTS.CONTAINER_HOSTNAME + ':' + CONSTANTS.AUTH_PORT + path
    const body = req.body
    const method = req.method
    const headers = req.headers

    var options = {
        url: outboundUrl,
        method: method,
        headers: headers,
        body: body,
        json: true,
    }


    request(options, (err, res2, body) => {
        // console.log(res2)
        console.log(options)
        if (!err && res.statusCode == 200) {
            res.send(res2)
        }
        else {
            //console.log(err)
            console.log('error block triggered')
            res.status(400).json({
                message: "incorrect http request"
            })
        }
    });
}


app.use("/login", (req, res) => {
    console.log(req.body)
    forward_auth_req(req, res, "/login");
});

app.use("/signup", (req, res) => {
    forward_auth_req(req, res, "/signup");
});

app.use("/profile", (req, res) => {
    forward_auth_req(req, res, "/profile");
});

app.use("/updateprofile", (req, res) => {
    forward_auth_req(req, res, "updateprofile");
});

app.use("/auth/google", (req, res) => {
    forward_auth_req(req, res, "/auth/google");
});


// app.use('/', router);
// console.log(process.env);
port = 5000
app.listen(port, () => console.log(`Listening on port ${port}`));