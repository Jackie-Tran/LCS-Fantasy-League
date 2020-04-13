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
    matchups: {
        type: [
            [
                {
                    username: { type: String, required: true },
                        score: 0,
                }

            ]
        ],
        required: true
    },
    draftStarted: {
        type: Boolean,
        required: true,
        default: true,
    },
    pickIndex: {
        type: Number,
        default: 0,
    },
    reversePick: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.leagues.model('League', LeagueSchema);