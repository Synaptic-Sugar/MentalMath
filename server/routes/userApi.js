const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

function logger (req, res, next) {
  console.log('entered post request');
  return next();
};

router.post('/signup', logger, userController.createUser, (req, res) => {
  return res.status(200).json(res.locals.username);
});

router.post('/login', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.username);
});

router.get('/secret/users', userController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.allUsers);
});

router.get('users/:id', userController.getOneUser, (req, res) => {
  return res.status(200).json(res.locals.username);
});

router.put('users/newPass/:id', userController.updateUsername, (req, res) => {
  return res.status(200).json(res.locals.newUsername);
});

router.put('users/newPass/:id', userController.updatePassword, (req, res) => {
  return res.status(200).json(`Password Updated for user: ${res.locals.username}`);
});


module.exports = router;