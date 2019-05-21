const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Game = sequelize.import('../models/game');
// const validateSession = require('../middleware/validate-session');

//Get all
router.get('/viewgames', (req, res) => {
   Game.findAll()
       .then(games => res.status(200).json(games))
       .catch(err => res.status(500).json({ error : err}))
});

router.post('/addgame', (req, res) => {
   const newGame = {
       name : req.body.name,
       cover: req.body.cover,
       rating : req.body.rating,
       platform: req.body.platform,
       genre : req.body.genre,
       contentrating : req.body.contentrating,
       description : req.body.description,
       owner: req.user.id
   }




   Game.create(newGame)
       .then(game => res.status(200).json(game))
       .catch(err => res.status(500).json({ error : err}))
});


// Broken Code Challenge (Solved)

router.get('/games/:name', (req, res) => {
    Game.findOne({where: { name: req.params.name }})
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json({error: err}))
});


router.put('/editgame/:name', (req, res) => {
    Game.update(req.body, {where: { name: req.params.name }})
    .then(game => res.status(200).json(game))
    .catch(err => res.status(500).json({ error: err}))
});

router.delete('/xgame/:name', (req, res) => {
    Game.destroy({ where : { name : req.params.name }})
    .then(recChanged => res.status(200).json(recChanged))
    .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;
