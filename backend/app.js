const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv/config');

const admin = require('firebase-admin');
//const serviceAccount = require("./serviceAccountKey");
// Firebase
//admin.initializeApp({
  //  credential: admin.credential.cert(serviceAccount),
   // databaseURL: "https://cookieproject-bb832.firebaseio.com"
//});

// Import Endpoints
const proPlayersRoute = require('./routes/ProPlayerRoutes');
const leagueRoute = require('./routes/LeaugeRoutes');
const userRoute = require('./routes/UserRoutes');

app.use('/players', proPlayersRoute);
app.use('/leagues', leagueRoute);
app.use('/users', userRoute);

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
