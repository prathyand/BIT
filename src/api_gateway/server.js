// const Joi = require('joi');
const request = require('request');
var express = require('express');
var app = express();

app.use(express.json()) // allows for json parsing (adding a piece of middleware)
// const CONSTANTS = require("../../constants")
const port = process.env.PORT || 3000;


// const router = express.Router();
app.all('/*', (req, res, next) => {
    //console.log(req)
    const path = req.path
    const body = req.body
    const method = req.method
    console.log(path)
    console.log(body)
    console.log(method)

    // var response = request(path, )
    // res.send(response)

    const options = {
        url: 'https://www.reddit.com/r/funny.json',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        }
    }

    var response = request(options, (err, res, body) => {
        var json = JSON.parse(body);
        // console.log(response)
        console.log(json.kind)
        return json
    });
    console.log(response)
    res.send(response)

    console.log('done')
    next();
});

// app.use('/', router);
// console.log(process.env)
app.listen(port, () => console.log(`Listening on port ${port}`));