const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv/config');

// API Endpoints
app.get('/', (req, res, next) => {
    res.send('LOL Fantasy League');
});

// Connect to MongoDb
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to MongoDb');
});


// Starting the server
const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
