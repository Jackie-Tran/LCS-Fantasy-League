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
        type: [String],
        required: true
    },
    activePros: {
        type: [String],
        required: true
    },
});

module.exports = mongoose.leagues.model('League', LeagueSchema);