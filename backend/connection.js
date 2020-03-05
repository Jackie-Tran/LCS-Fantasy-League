// Creates the connections to all the mongo databases in our cluster
const mongoose = require('mongoose');

// Connections to databases
mongoose.eSports = mongoose.createConnection(process.env.ESPORTS_DB, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to eSports DB');
});

mongoose.leagues = mongoose.createConnection(process.env.LEAGUES_DB, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('Connected to leagues DB');
});

module.exports = mongoose;
