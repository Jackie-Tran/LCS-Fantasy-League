const mongoose = require('../connection');

const ProStatsSchema = mongoose.Schema({
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

const TeamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stats: {
        type: [ProStatsSchema],
        default: []
    }

});

const MatchSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    team1: {
        type: TeamSchema,
        required: true,
    },
    team2: {
        type: TeamSchema,
        required: true,
    }
});

module.exports = mongoose.eSports.model('Match', MatchSchema);
