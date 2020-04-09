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
    Match.findById(req.params.id, (err, playerMatchStats) => {
        if (!playerMatchStats) return res.sendStatus(404);
        if (err) return res.json(err);
        if (playerMatchStats) return res.json(playerMatchStats);
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


// Update player
router.post('/:username/:kills/:assists/:deaths/:cs/:points', (req, res, next) => {

    Match.findOne({ username: req.params.username, kills: req.params.kills, assists: req.params.assists, deaths: req.params.deaths, cs: req.params.cs, points: req.params.points }, (err, stats) => {
        // Create new player if they are not already in the database
        if (!stats) {
            console.log("stats doesnt exist");
            let stats = new Match(req.body);
            stats.save((err) => {
                if (err) return res.json(err);
                return res.json(stats);
            });
        } else {
            // If the player DOES exist, just update the fields
            if (err) return res.json(err);
            Match.updateOne({ username: req.params.username, kills: req.params.kills, assists: req.params.assists, deaths: req.params.deaths, cs: req.params.cs, points: req.params.points }, req.body, (err, stats) => {
                if (err) return res.send(err);
                return res.json(stats);
            });
        }
    });


module.exports = router;
