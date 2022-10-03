const Session = require('../models/models.js');
// const bcrypt = require('bcrypt');
// const session = require('express-session');

// CREATE TABLE SessionTable ("_id" serial, CookieId varchar(255) NOT NULL, CreatedAt timestamp DEFAULT current_timestamp, CONSTRAINT "SessionTable_pk" PRIMARY KEY ("_id"));

//CookieId: {type: String, required: true, unique: true}
// CreatedAt: {type: Date, expires: 30, default Date.now}n

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  const sessionQuery = 'SELECT * FROM SessionTable2 WHERE CookieId = $1';
  Session.query(sessionQuery, [ cookieId ])
    .then((docs) => {
      if (!docs) {
        // no session found, redirect to signup
        res.redirect('/signup');
      } else {
        // session found
        return next();
      }
    })
    . catch(err => {
      return next({
        log: `sessionController.isLoggedIn: ERROR: ${err}`,
        message: { err: 'Error in sessionController.isLoggedIn. Check logs for details.' }
      });
    });
};

sessionController.startSession = (req, res, next) => {
  const id = res.locals.username;
  console.log('id: ', id);
  // bcrypt the username
  const addSessionQuery = 'INSERT INTO SessionTable2 ( _id, CookieId, CreatedAt ) VALUES ( DEFAULT, $1, DEFAULT )';
  Session.query(addSessionQuery, [ id ])
    .then((docs) => {
      if (!docs) {
        // no session found, redirect to signup
        res.redirect('/signup');
      } else {
        // session found
        // add to the response the bycrpyted username 
        return next();
      }
    })
    . catch(err => {
      return next({
        log: `sessionController.startSession: ERROR: ${err}`,
        message: { err: 'Error in sessionController.startSession. Check logs for details.' }
      });
    });
};

sessionController.startSessionAuth = (req, res, next) => {
  const id = res.locals.token;
  const addSessionQuery = 'INSERT INTO SessionTable2 ( CookieId, CreatedAt ) VALUES ( $1, DEFAULT )';
  Session.query(addSessionQuery, [ id ])
    .then((docs) => {
      if (!docs) {
        // no session found, redirect to signup
        res.redirect('/signup');
      } else {
        // session found
        return next();
      }
    })
    . catch(err => {
      return next({
        log: `sessionController.startSession: ERROR: ${err}`,
        message: { err: 'Error in sessionController.startSession. Check logs for details.' }
      });
    });
};

sessionController.endSession = (req, res, next) => {
  const cookieId = res.locals.username;
  const deleteSessionQuery = 'DELETE FROM SessionTable WHERE CookieId = $1';
  Session.query(deleteSessionQuery, [ cookieId ])
    .then((docs) => { 
      res.locals.status = 'logged out';
      return next();
    })
    . catch(err => {
      return next({
        log: `sessionController.endSession: ERROR: ${err}`,
        message: { err: 'Error in sessionController.endSession. Check logs for details.' }
      });
    });
};

module.exports = sessionController;
