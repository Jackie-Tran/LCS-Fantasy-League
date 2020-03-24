const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// Get user by uid
router.get('/:uid', (req, res, next) => {
    admin.auth().getUser(req.params.uid).then(result => {
        let user = result.providerData[0].toJSON();
        delete user.providerId;
        return res.json(user);
    })
    .catch(err => {
        return res.status(400);
    });
});

module.exports = router;