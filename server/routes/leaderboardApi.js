const express = require('express');
const controller = require('../controllers/leaderboardController.js');
const router = express.router();

router.get('/getTopTen', controller.getTopTen, (req, res) => {
  
});

router.post('/addNewScore');

router.get('/getPersonalScores');

module.exports = router;