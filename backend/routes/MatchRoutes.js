const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.get('/', (req, res) => {
    res.send('League of Legends Match Route');
});

// Create match
router.post('/', (req, res, next) => {
    let playerMatchStats = new Match(req.body);
    playerMatchStats.save((err) => {
        if (err) return res.json(err);
        return res.json(playerMatchStats);
    });
});


router.get('/:id', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return "stupid";
        return res.json(league.matchups);
    });
});


// Delete player
router.delete('/:id', (req, res, next) => {
    Match.findByIdAndDelete(req.params.id, (err, playerMatchStats) => {
        if (!playerMatchStats) return res.sendStatus(404);
        if (err) return res.json(err);
        if (playerMatchStats) return res.json(playerMatchStats);
    });
});


module.exports = router;
