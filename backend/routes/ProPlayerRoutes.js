const express = require('express');
const router = express.Router();
const mongoose = require('../connection');
const ProPlayer = require('../models/ProPlayer');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOveride = require('method-override');

// Middleware
router.use(bodyParser.json());
router.use(methodOveride('_method'));

let gfs;

mongoose.eSports.once('open', () => {
    // Initialize Stream
    gfs = Grid(mongoose.eSports.db, mongoose.mongo);
    gfs.collection('proImages');
});

const storage = new GridFsStorage({
    url: process.env.ESPORTS_DB,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                //   const filename = buf.toString('hex') + path.extname(file.originalname);
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: 'proImages'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });


// Create player
router.post('/', (req, res, next) => {
    let player = new ProPlayer(req.body);
    player.save((err) => {
        if (err) return res.json(err);
        return res.json(player);
    });
});

// Upload Image
router.post('/images/upload', upload.single('file'), (req, res, next) => {
    console.log("uploading image")
    // TODO: check if file name already exists
    res.json({ file: req.file });
});

// Get all files
router.get('/files', (req, res, next) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length == 0) return res.status(404).send("No files exist");

        return res.json(files);
    })
});

// Get single files
router.get('/files/:ign', (req, res, next) => {
    gfs.files.findOne({ filename: req.params.ign + '.jpg' }, (err, file) => {
        if (!file || file.length == 0) return res.status(404).send("No file exist");
        return res.json(file);
    });
});

// Display image
router.get('/images/:ign', (req, res, next) => {
    gfs.files.findOne({ filename: req.params.ign + '.jpg' }, (err, file) => {
        if (!file || file.length == 0) return res.status(404).send("No file exist");
        let readstream = gfs.createReadStream({filename: file.filename});
        readstream.pipe(res);
    });
});

// Get All players
router.get('/all', (req, res, next) => {
    ProPlayer.find({}, (err, player) => {
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
    ProPlayer.find({ ign: req.params.ign }, (err, player) => {
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
    ProPlayer.find({ role: req.params.role }, (err, players) => {
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