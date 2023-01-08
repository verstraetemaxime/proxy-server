require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const API_URL = 'https://vrt-api-app.herokuapp.com/';

const myLimit = typeof(process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
console.log('Using limit: ', myLimit);

app.use(bodyParser.json({limit: myLimit}));

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow', req.header('access-control-request-headers'));

    if(req.method === 'OPTIONS') {
        res.send();
    } else {
        const targetURL = req.header('https://vrt-api-app.herokuapp.com/');
        if(!targetURL) {
            res.send(500, { error: 'There is no Target-Endpoint header in the request' });
            return;
        }

        request({ url: targetURL + req.url, method: req.method, json: req.body, headers: {'Authorization': req.header('Authorization')} },
        function (error, response, body) {
            if (error) {
                console.error('error: ' + response.statusCode)
            }
        }).pipe(res);
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));