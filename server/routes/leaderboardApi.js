const express = require('express');
const controller = require('../controllers/leaderboardController.js');
const router = express.Router();

router.get('/getTopTen', controller.getTopTen, (req, res) => {return res.status(200).json(res.locals.topTen);
});

router.post('/addNewScore', controller.addNewScore, (req, res) => {
  return res.sendStatus(200);
});

router.get('/getPersonalScores/:username', controller.getPersonalScores, (req, res) => {
  return res.status(200).json(res.locals.personalScores);
});

module.exports = router;