const express = require('express');
const router = express.Router();
const ProPlayer = require('../models/ProPlayer');

router.get('/', (req, res) => {
    res.send('League of Legends Player Route');
});

// Create player
router.post('/', (req, res, next) => {
    let player = new ProPlayer(req.body);
    player.save((err) => {
        if (err) return res.json(err);
        return res.json(player);
    });
});

// Get player
router.get('/:id', (req, res, next) => {
    ProPlayer.findById(req.params.id, (err, player) => {
        if (!player) return res.sendStatus(404);
        if (err) return res.json(err);
        if (player) return res.json(player);
    });
});

// Update player
router.patch('/:id/', (req, res, next) => {
    ProPlayer.findById(req.params.id, (err, player) => {
        if (!player) return res.sendStatus(404);
        if (err) return res.json(err);

        // Check request body for which fields to update
        if (req.body.firstName) player.firstName = req.body.firstName;
        if (req.body.lastName) player.lastName = req.body.lastName;
        if (req.body.nationality) player.nationality = req.body.nationality;
        if (req.body.team) player.team = req.body.team;
        if (req.body.ign) player.ign = req.body.ign;
        if (req.body.role) player.role = req.body.role;

        // Push the update to the database
        player.save();
        return res.json(player);
    });
});

// Delete player
router.delete('/:id', (req, res, next) => {
    ProPlayer.findByIdAndDelete(req.params.id, (err, player) => {
        if (!player) return res.sendStatus(404);
        if (err) return res.json(err);
        if (player) return res.json(player);
    });
});


module.exports = router;