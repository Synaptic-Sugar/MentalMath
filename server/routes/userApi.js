const express = require('express');
const userController = require('../controllers/userController.js');
const sessionController = require('../controllers/sessionController.js');
const cookieController = require('../controllers/cookieController.js');
const router = express.Router();
// const session = require('express-session');

function signupLogger (req, res, next) {
  console.log('Signup logger: entered crete user post request');
  return next();
}

function verifyLogger (req, res, next) {
  console.log('verify logger: entered verify user post request');
  return next();
}

router.post('/signup',
  signupLogger,
  cookieController.setCookie,
  userController.createUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json(res.locals.username);
    // return res.redirect('/playGame');
});

router.post('/login',
  verifyLogger,
  userController.verifyUser,
  sessionController.startSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json(res.locals.username);
});

// user logout (streach feature)
router.post('/logout/:username',
  userController.getOneUser,
  sessionController.endSession,
  cookieController.deleteSSIDCookie,
  (req, res) => {
    return res.status(200).json('Session ended: logged out');
});

// only for backend use to test server 
router.get('/secret/getUsers',
  userController.getAllUsers,
  (req, res) => {
    return res.status(200).json(res.locals.allUsers);
});

// to navigate to github to login with OAuth
router.get('/auth', (req, res) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});

// to navigate to github to login with OAuth
router.get('/oauth-callback',
  userController.getAccessToken,
  userController.getUserData,
  // userController.createOrFindUser,// need to build this
  // sessionController.startSessionAuth,
  // cookieController.setSSIDCookieAuth,
  (req, res) => {
    return res.status(200).json(res.locals.token);
});

// only for backend use to test server
router.get('/users/:username',
  userController.getOneUser,
  (req, res) => {
    return res.status(200).json(res.locals.username);
});

// // update username (streach feature)
// router.put('/newName/:id',
//   userController.updateUsername,
//   (req, res) => {
//     // return res.status(200).json(res.locals.newUsername);
//     return res.redirect('/login');
// });

// // update password (streach feature)
// router.put('/newPass/:id',
//   userController.updatePassword,
//   (req, res) => {
//     // return res.status(200).json(res.locals.username);
//     return res.redirect('/login');
// });


module.exports = router;