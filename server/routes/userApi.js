const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const router = express.Router();

function signupLogger (req, res, next) {
  console.log('entered crete user post request');
  return next();
};

function verifyLogger (req, res, next) {
  console.log('entered verify user post request');
  return next();
};

router.post('/signup',
  signupLogger,
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // return res.status(200).json(res.locals.username);
    return res.redirect('/playGame');
});

router.post('/login',
  verifyLogger,
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // return res.status(200).json(res.locals.username);
    return res.redirect('/playGame');
});

router.get('/secret/users',
  userController.getAllUsers,
  (req, res) => {
    return res.status(200).json(res.locals.allUsers);
});

router.get('users/:id',
  userController.getOneUser,
  (req, res) => {
    return res.status(200).json(res.locals.username);
});

router.put('users/newPass/:id',
  userController.updateUsername,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // return res.status(200).json(res.locals.newUsername);
    return res.redirect('/login');
});

router.put('users/newPass/:id',
  userController.updatePassword,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    // return res.status(200).json(res.locals.username);
    return res.redirect('/login');
});


module.exports = router;