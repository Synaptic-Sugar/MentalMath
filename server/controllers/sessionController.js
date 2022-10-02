const Session = require('../models/models.js');
// const session = require('express-session');

// sessionSchema = {
    //CookieId: {type: String, required: true, unique: true}
    // CreatedAt: {type: Date, expires: 30, default Date.now}
//}

const sessionController = {};

sessionController.isLoggedIn = (req, res, next) => {
  const cookieId = req.cookies.ssid;
  const sessionQuery = 'SELECT * FROM SessionTable WHERE CookieId = $1';
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
  const cookieId = res.locals.user._id.id;
  const addSessionQuery = 'INSERT INTO SessionTable ( CookieId, CreatedAt ) VALUES ( $1, DEFAULT )';
  Session.query(addSessionQuery, [ cookieId ])
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
  const cookieId = res.locals.user._id.id;
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
