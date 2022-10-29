const request = require('request');
var express = require('express');
var app = express();

app.use(express.json()) 
// const CONSTANTS = require("../../constants")
const port = process.env.PORT || 3000;


// const router = express.Router();
app.all('/*', (req, res, next) => {
    //console.log(req)
    const incoming_path = req.path
    const incoming_body = req.body
    const incoming_method = req.method
    const incoming_hostname = req.hostname
    const incoming_hostip = req.ip
    const incoming_protocol = req.protocol
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(path) // /
    console.log(body) // {}
    console.log(method) // GET
    console.log(req.protocol) //http
    console.log(req.ip) // ::1
    console.log(req.hostname)  // localhost
    console.log(req.baseUrl) // *blank*
    console.log(body)
    console.log(fullUrl)

    // var response = request(path, )
    // res.send(response)
    var options = {
        url: 'https://www.reddit.com/r/funny.json',
        method: incoming_method,
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        },
        json: true,
        body: incoming_body,
        time: true
    }
    var options = {
        url: 'https://www.reddit.com/r/funny.json',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        },
        json: true,
        body: 'hello world',
        time: true
    }

    request(options, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            console.log('success!')

            // var json = JSON.parse(body);
            // console.log(response)
            // console.log(json.kind)
            //return json
        }
        else {
            console.log(err)
            res.status(400).json({
                message: "incorrect http request"
            })
        }
    });

    console.log('done')
    next();
    
    // need to pick apart response from Docker microservices, to send info to front end container
    // var options = {
        // url: 'https://www.reddit.com/r/funny.json',
        // method: 'GET',
        // headers: {
            // 'Accept': 'application/json',
            // 'Accept-Charset': 'utf-8',
            // 'User-Agent': 'my-reddit-client'
        // },
        // json: true,
        // body: 'hello world',
        // time: true
    // }

    
    // var response = request(options, (err, res, body) => {
        // if (!err && res.statusCode == 200) {
            // console.log('success!')

            // // var json = JSON.parse(body);
            // // console.log(response)
            // // console.log(json.kind)
            // //return json
        // }
        // else {
            // console.log(err)
            // res.status(400).json({
                // message: "incorrect http request"
            // })
        // }
    // });
});

// app.use('/', router);
// console.log(process.env)
app.listen(port, () => console.log(`Listening on port ${port}`));