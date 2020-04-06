const mongoose = require('../connection');

const LeagueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    players: {
        type: [{
            uid: { type: String, required: true },
            score: 0
        }],
        required: true
    },
    teams: {
        type: [[String]],
        required: true
    },
    matchups:
    {
        type : [[String]],
        required: true
    }
});

module.exports = mongoose.leagues.model('League', LeagueSchema);