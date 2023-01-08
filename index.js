require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_URI;
const routes = require('./routes/routes');

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('connected', () => {
    console.log('Database connected');
});

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server started at ${3000}`);
});