const fs = require('fs');
const path = require('path');
const express = require('express');

const userController = require('../controllers/usersController.js');

const router = express.Router();

router.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals.username);
});

router.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.username);
});

router.get('/secret/users', userController.getAllUsers, (req, res) => {
  res.status(200).json(res.locals.allUsers);
});

router.get('users/:id', userController.getOneUser, (req, res) => {
  res.status(200).json(res.locals.username);
});




module.exports = router;