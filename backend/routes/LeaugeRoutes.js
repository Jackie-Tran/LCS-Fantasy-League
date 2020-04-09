const express = require('express');
const router = express.Router();
const League = require('../models/League');
/**
 * TODO: 
 * - Players cannot join the same league multiple times (ie. players array should not have duplicates)
 *   - same goes for activePros
 * - Need to assign activePros to the correct player's roster/team
 */

// Create league
router.post('/', (req, res, next) => {
    let league = new League(req.body);
    league.save((err) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Get league
router.get('/:id', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (!league) return res.sendStatus(404);
        if (err) return res.json(err);
        if (league) return res.json(league);
    });
});

// Get leagues
router.get('/', (req, res, next) => {
    League.find({}, (err, leagues) => {
        if (err) return res.json(err);
        return res.json(leagues);
    });
});

// Add player
router.put('/:id/addPlayer', (req, res, next) => {
    let player = {
        uid: req.body.uid,
        username: req.body.username,
        score: 0
    };
    League.findOne({ _id: req.params.id }, (err, league) => {
        if (err) return res.json(league);
        // Check if league is full
        if (league.players.length == league.maxPlayers) {
            return res.status(400).send("League is full");
        }
        // Check if player is already in the league
        for (let i = 0; i < league.players.length; i++) {
            if (league.players[i].uid == player.uid) {
                console.log('Player is already in this league');
                return res.status(409).send("Player is already in this league");
            }
        }
        // Add player to 'players' array
        League.updateOne({ _id: req.params.id }, { $addToSet: { "players": player } }, (err, league) => {
            if (err) return res.json(err);
            console.log('Adding player to league');
            return res.json(league);
        });
    });
});

// Remove player
router.put('/:id/removePlayer/:uid', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, { $pull: { "players": {"uid": req.params.uid} } }, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Get players in league
router.get('/:id/players', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        return res.json(league.players);
    });
});

// Add pro
router.put('/:id/:uid/addPro', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        // Check if pro is on a team already
        for (let i = 0; i < league.players.length; i++) {
            for (let j = 0; j < league.players[i].team.length; j++) {
                // Check if pro is on this player's team
                if (league.players[i].team[j] == req.body.pro) {
                    return res.status(403).send(req.body.pro + " is already on a team.");
                }
            }
        }
        // Find player and add pro
        for (let i = 0; i < league.players.length; i++) {
            if (league.players[i].uid == req.params.uid) {
                league.players[i].team.push(req.body.pro);
                break;
            }
        }
        league.save();
        res.json(league);
    });
    // League.updateOne({ _id: req.params.id }, { "$addToSet": { "players": { "" } } })
});

// Update max players
router.put('/:id/maxPlayers', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, req.body, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Remove pro
router.delete('/:id/:uid/removePro/:pro', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        for (let i = 0; i < league.players.length; i++) {
            // Remove pro
            let index = league.players[i].team.indexOf(req.params.pro);
            if (index > -1) {
                league.players[i].team.splice(index, 1);
            }
        }
        league.save();
        return res.json(league);
    });
});

// Delete league
router.delete('/:id', (req, res, next) => {
    League.findByIdAndDelete(req.params.id, (err, league) => {
        if (!league) return res.sendStatus(404);
        if (err) return res.json(err);
        if (league) return res.json(league);
    });
});

// Start Draft
router.patch('/:id/draft', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, { "$set": { "draftStarted": req.body.draftStarted } }, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Stop Draft
router.patch('/id/endDraft', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, { "$set": { "draftStarted": false } }, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

module.exports = router;