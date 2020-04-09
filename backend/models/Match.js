const mongoose = require('../connection');

const MatchSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    kills: {
        type: Number,
        required: true
    },
    deaths: {
        type: Number,
        required: true
    },
    assists: {
        type: Number,
        required: true
    },
    cs: {
        type: Number,
        required: true
    },
    points: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.eSports.model('Match', MatchSchema);
