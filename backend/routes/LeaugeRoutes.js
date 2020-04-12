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

//Update matchup Scores
router.put('/:id/updateScore', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return "stupid";
        for( let x=0;x<league.players.length; x++)
        {
            for( let y=0; y<league.matchups.length;y++)
            {
                if (league.players[x].username == league.matchups[y][0].username)
                {  
                    League.updateOne({ _id: req.params.id }, { $set: { "matchups.y.0.score": league.players[x].score} }, (err, league) => {
                        if (err) console.log("cant work1");
                    console.log('Adding player to league');
                    
                });

                }
                else if (league.players[x].username == league.matchups[y][1].username)
                {   
                    League.updateOne({ _id: req.params.id }, { $set: { "matchups.y.1.score": league.players[x].score} }, (err, league) => {
                        if (err) console.log("cant work2");
                    console.log('Adding player to league');
                    
                });

                }
            } 
        }
        return res.json(league);
        
    });
});

// Add Matchups
router.put('/:id/createMatchup', (req, res, next) => {

    let myArray = []
    // find League with players 
    League.findById(req.params.id, (err, league) => {
        // create Matchups 
        for (let i=0; i< league.players.length; i= i+2)
        {  let matchDetails = 
            {  match1: [],
                match2: []
            }
            let matchup1= {
                username: league.players[i].username,
                score: league.players[i].score
            };
            let matchup2= {
                username: league.players[i+1].username,
                score: league.players[i].score
            };
    
            myArray.push(matchup1,matchup2)
            League.updateOne({ _id: req.params.id }, { $addToSet: { "matchups": myArray } }, (err, league) => {
                if (err) return res.json(err);
                console.log('Adding player to league');
                return res.json(league);
            });
        }
    
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
router.get('/:id/:uid/player', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        return res.json(league.players);
    });
});
router.get('/:id/:player/specific', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        let back = [];
        if (err) return res.json(err);
        else 
        {   
            for (let i=0; i<league.players.length;i++)
            {
                if (league.players[i].username ===req.params.player)

                {
                    return res.json(league.players[i].team); 
                }
            }
        }
        return res.json(back);
    });
});

router.get('/:id/:uid/uid', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        let back = [];
        if (err) return res.json(err);
        else 
        {   
            for (let i=0; i<league.players.length;i++)
            {
                if (league.players[i].uid ===req.params.uid)

                {
                    return res.json(league.players[i].team); 
                }
            }
        }
        return res.json(back);
    });
});
// Get matchups in league
router.get('/:id/matchups', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return "stupid";
        return res.json(league.matchups);
    });
});


// Get pros in league
router.get('/:id/getPros', (req, res, next) => {
    let pros = [];
    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        league.players.forEach(player => {
            player.team.forEach(pro => {
                pros.push(pro);
            });
        });
        return res.json(pros);
    });
});

// Add pro
router.put('/:id/:uid/addPro', (req, res, next) => {

    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        // Check if its your turn
        let pickIndex = league.pickIndex;
        for (let i = 0; i < league.players.length; i++) {
            // Find the player trying to add the pro and check if their index is the pickIndex
            if (league.players[i].uid == req.params.uid) {
                if (i != pickIndex) {
                    return res.status(401).send("It is not your turn to draft yet.");
                } else {
                    break;
                }
            }
        }
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

        // Update pickIndex
        if (league.reversePick) {
            if (league.pickIndex == 0) {
                league.reversePick = false;
            } else {
                league.pickIndex--;
            }
        } else {
            if (league.pickIndex == league.players.length-1) {
                league.reversePick = true;
            } else {
                league.pickIndex++;
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
        if (league) 
        return res.json(league);
    });
});

let shuffle = (arr) => {
    let currentIndex = arr.length;
    let tempVal = 0, randIndex = 0;

    while (currentIndex !== 0) {
        randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        tempVal = arr[currentIndex];
        arr[currentIndex] = arr[randIndex];
        arr[randIndex] = tempVal;
    }

    return arr;
}

// Start/stop draft
router.patch('/:id/draft', (req, res, next) => {
    League.findById(req.params.id, (err, league) => {
        if (err) return res.json(err);
        league.draftStarted = req.body.draftStarted;
        // If we are starting thedraft, shuffle the pick order
        if (req.body.draftStarted == true) {
            league.players = shuffle(league.players);
        }
        league.save((err) => {
            if (err) return res.json(err);
            return res.json(league);
        });
    });
});

module.exports = router;
