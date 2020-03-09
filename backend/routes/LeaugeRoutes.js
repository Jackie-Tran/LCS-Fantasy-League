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
    // TODO: Should check if player id exists in db
    League.updateOne({ _id: req.params.id }, { "$addToSet": {"players": req.body.playerId} }, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Add pro
router.put('/:id/addPro', (req, res, next) => {
    // TODO: Should check if player id exists in db
    League.updateOne({ _id: req.params.id }, { "$addToSet": {"activePros": req.body.proId} }, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Update max players
router.put('/:id/maxPlayers', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, req.body, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Remove player
router.delete('/:id/removePlayer/:playerId', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, { "$pull": {"players": req.params.playerId} }, {multi: true}, (err, league) => {
        if (err) return res.json(err);
        return res.json(league);
    });
});

// Remove pro
router.delete('/:id/removePro/:proId', (req, res, next) => {
    League.updateOne({ _id: req.params.id }, { "$pull": {"activePros": req.params.proId} }, {multi: true}, (err, league) => {
        if (err) return res.json(err);
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

module.exports = router;