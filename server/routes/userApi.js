const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const router = express.Router();
// const session = require('express-session');

function signupLogger (req, res, next) {
  console.log('entered crete user post request');
  return next();
}

function verifyLogger (req, res, next) {
  console.log('entered verify user post request');
  return next();
}

router.post('/signup',
  signupLogger,
  cookieController.setCookie,
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

// user logout (streach feature)
router.post('/logout',
  userController.verifyUser,
  sessionController.endSession,
  (req, res) => {
    // return res.status(200).json(res.locals.username);
    return res.redirect('/login');
});

// only for backend use to test server 
router.get('/secret/getUsers',
  userController.getAllUsers,
  (req, res) => {
    return res.status(200).json(res.locals.allUsers);
});

// only for backend use to test server
router.get('users/:id',
  userController.getOneUser,
  (req, res) => {
    return res.status(200).json(res.locals.username);
});

// update username (streach feature)
router.put('users/newName/:id',
  userController.updateUsername,
  (req, res) => {
    // return res.status(200).json(res.locals.newUsername);
    return res.redirect('/login');
});

// update password (streach feature)
router.put('users/newPass/:id',
  userController.updatePassword,
  (req, res) => {
    // return res.status(200).json(res.locals.username);
    return res.redirect('/login');
});


module.exports = router;