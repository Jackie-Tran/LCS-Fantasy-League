const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

router.get('/', (req, res) => {
    res.send('League of Legends Match Route');
});

// Create match
router.post('/createMatch', (req, res, next) => {
    let newMatch = new Match(req.body);
    // Matches are unique so check if the match already exists
    Match.findOne({ "date": req.body.date, "team1.name": req.body['team1.name'], "team2.name": req.body['team2.name'] }, (err, match) => {
        if (err) return res.json(err);
        if (match == null) {
            newMatch.save((err) => {
                if (err) return res.json(err);
                return res.json(newMatch);
            });
        } else {
            return res.status(409).send("Match already exists");
        }
    })
});

// Get match
router.get('/:id', (req, res, next) => {
    Match.findById(req.params.id, (err, match) => {
        if (err) return res.json(err);
        return res.json(match);
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

let isInStats = (stats, pro) => {
    for (let i = 0; i < stats.length; i++) {
        if (stats[i].name == pro.name) return true;
    }
    return false;
}
router.put('/:date/:team1/:team2/addProStats', (req, res, next) => {
    Match.findOne({ "date": req.params.date, "team1.name": req.params.team1, "team2.name": req.params.team2 }, (err, match) => {
        if (err) return res.json(err);
        if (match) {
            let stats = {
                name: req.body.name,
                kills: req.body.kills,
                deaths: req.body.deaths,
                assists: req.body.assists,
                cs: req.body.cs,
                points: req.body.points,
            };
            console.log(stats);
            if (req.body.team == req.params.team1) {
                if (!isInStats(match.team1.stats, req.body)) {
                    match.team1.stats.push(req.body);
                    match.save();
                } else {
                    return res.status(409).send(req.body.name + " was already recoreded in this game.");
                }
            } else {
                if (!isInStats(match.team2.stats, req.body)) {
                    match.team2.stats.push(req.body);
                    match.save();
                } else {
                    return res.status(409).send(req.body.name + " was already recoreded in this game.");
                }
            }
            return res.json(match);
        }
        return res.status(404).send("Match wasn't found");
    });
});

// Update stats
router.put('/:username/:kills/:assists/:deaths/:cs/:points', (req, res, next) => {

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
  });


module.exports = router;
