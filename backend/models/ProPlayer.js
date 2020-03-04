const mongoose = require('../connection');

const ProPlayerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    nationality: String,
    ign: String,
    role: String,
});

module.exports = mongoose.eSports.model('ProPlayer', ProPlayerSchema);