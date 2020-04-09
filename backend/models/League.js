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
            score: 0,
            team: { type: [String], required: true },
        }],
        required: true
    },
<<<<<<< HEAD
    teams: {
        type: [[String]],
        required: true
    },
    matchups:
    {
        type : [[String]],
        required: true
=======
    draftStarted: {
        type: Boolean,
        required: true,
        default: false,
    },
    pickIndex: {
        type: Number,
        default: 0,
    },
    reversePick: {
        type: Boolean,
        default: false,
>>>>>>> feature/draft
    }
});

module.exports = mongoose.leagues.model('League', LeagueSchema);