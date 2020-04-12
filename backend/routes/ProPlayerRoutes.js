const express = require('express');
const router = express.Router();
const ProPlayer = require('../models/ProPlayer');

// Create player
router.post('/', (req, res, next) => {
    let player = new ProPlayer(req.body);
    player.save((err) => {
        if (err) return res.json(err);
        return res.json(player);
    });
});

// Get All players
router.get('/all', (req, res, next) => {
    ProPlayer.find( {}, (err, player) => {
        if (!player) return res.sendStatus(404);
        if (err) return res.json(err);
        if (player) return res.json(player);
    });
});
// Get player by id
router.get('/getById/:id', (req, res, next) => {
    ProPlayer.findById(req.params.id, (err, player) => {
        if (!player) return res.sendStatus(404);
        if (err) return res.json(err);
        if (player) return res.json(player);
    });
});

// Get player by ign
router.get('/getByIgn/:ign', (req, res, next) => {
    ProPlayer.find({ign: req.params.ign}, (err, player) => {
        if (!player) return res.sendStatus(404);
        if (err) return res.json(err);
        if (player) return res.json(player);
    });
});
// Get player by role
router.get('/getByRole/:role', (req, res, next) => {
    // Check for valid role (top, jungler, mid, bot, support)
    let role = req.params.role;
    if (role != 'top' && role != 'jungler' && role != 'mid' && role != 'bot' && role != 'support') {
        return res.status(400).send("Not a valid role. Valid roles are 'top', 'jungler', 'mid', 'bot', and 'support'.");
    }
    ProPlayer.find( {role: req.params.role}, (err, players) => {
        if (!players) return res.sendStatus(404);
        if (err) return res.json(err);
        if (players) return res.json(players);
    });
});


// Update player
router.put('/:firstName/:lastName/:ign', (req, res, next) => {
    
    ProPlayer.findOne({ firstName: req.params.firstName, lastName: req.params.lastName, ign: req.params.ign }, (err, player) => {
        // Create new player if they are not already in the database
        if (!player) {
            console.log("player doesnt exist");
            let player = new ProPlayer(req.body);
            player.save((err) => {
                if (err) return res.json(err);
                return res.json(player);
            });
        } else {
            // If the player DOES exist, just update the fields
            if (err) return res.json(err);
            ProPlayer.updateOne({ firstName: req.params.firstName, lastName: req.params.lastName, ign: req.params.ign }, req.body, (err, player) => {
                if (err) return res.send(err);
                return res.json(player);
            });
        }
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