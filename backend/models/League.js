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
            username: { type: String, required: true },
            score: 0
        }],
        required: true
    },
    teams: {
        type: [[String]],
        required: true
    },
    draftStarted: {
        type: Boolean,
        required: true,
        default: false,
    }
});

module.exports = mongoose.leagues.model('League', LeagueSchema);