require('dotenv').config();

const express = require('express');
const request = require('request');

const app = express();
const API_URL = 'https://vrt-api-app.herokuapp.com/';

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
    next();
});

app.get('/api/blokken', (req, res) => {
    request(
        { url: `${API_URL}` },
        (error, response, body) => {
            if(error || response.statusCode !== 200) {
                return res.status(500).json({type: 'error', message: error.message});
            }
            res.json(JSON.parse(body));
        }
    );
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));