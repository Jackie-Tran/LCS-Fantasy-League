const express = require('express');
const router = express.Router();
const ProPlayer = require('../models/ProPlayer');

router.get('/', (req, res) => {
    res.send('League of Legends Player Route');
});

router.post('/', (req, res, next) => {
    let player = new ProPlayer(req.body);
    player.save((err) => {
        if (err) return res.json(err);
        return res.json(player);
    });
});

module.exports = router;