const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv/config');

// Import Endpoints
const proPlayersRoute = require('./routes/ProPlayerRoutes');
const leagueRoute = require('./routes/LeaugeRoutes');

app.use('/players', proPlayersRoute);
app.use('/leagues', leagueRoute);

// API Endpoints
app.get('/', (req, res, next) => {
    res.send('LOL Fantasy League');
});

// Starting the server
const http = require('http');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});
