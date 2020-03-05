const mongoose = require('../connection');

const ProPlayerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    otherName: {
        type: String,
        require: false
    },
    nationality: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    ign: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
});

module.exports = mongoose.eSports.model('ProPlayer', ProPlayerSchema);