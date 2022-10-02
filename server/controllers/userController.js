const bcrypt = require('bcrypt');
const db = require('../models/models.js');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const userController = {};

userController.createUser = (req, res, next) => {
  const { username, password } =  req.body;
  console.log('New User: ', username, password);
  if (!username || !password){
    return next('Missing username or password in userController.creatUser');
  }

  // hash password before adding to database 
  const hash = bcrypt.hashSync(password, 10);
  console.log('New User with hashed pass: ', username, hash);
  // in this query add in the username and hash (not password)
  const insertQuery = 'INSERT INTO UsersTable ( _id, Username, Password ) VALUES ( DEFAULT, $1, $2 )';
  db.query(insertQuery, [ username, hash ] )
    // after added to database, report back (with only username for privacy)
    .then((doc) => {
      res.locals.username = doc.username;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.createUser: ERROR: ${err}`,
        message: { err: 'Error in userController.createUser. Check logs for details.' }
      });
    });
};

userController.verifyUser = (req, res, next) => {
  const { username, password } =  req.body;
  console.log('User to verify: ', username, password);
  if (!username || !password){
    return next('Missing username or password in userController.verifyUser');
  }

  const verifyQuery = 'SELECT * FROM UserTable WHERE Username = $1';
  db.query(verifyQuery, [ username ])
    .then((user) => {
      if (!user) {
        res.redirect('/signup');
      } else {
        bcrypt.compare(password, user.password)
          .then(result => {
            if (!result) {
              res.redirect('/signup');
            } else {
              res.locals.username = user.username;
              return next();
            }
          });
      }
    })
    . catch(err => {
      return next({
        log: `userController.verifyUser: ERROR: ${err}`,
        message: { err: 'Error in userController.verfiyUser. Check logs for details.' }
      });
    });
};

userController.getAllUsers = (req, res, next) => {
  const selectAllQuery = 'SELECT * FROM UsersTable';
  db.query(selectAllQuery)
    .then((docs) => {
      res.locals.allUsers = docs;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.getAllUsers: ERROR: ${err}`,
        message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
      });
    });
};

// Here we process oauth-callback 
userController.getAccessToken = (req, res, next) => {
  const { query: { code } } = req;
  const body = {
    client_id : process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json'} };
  router.post('https://github.com/login/oauth/access_token', body, opts)
    .then( res => res.data.access_token)
    .then( token => {
      console.log('my token: ', token);
      res.locals.token = token;
      return next();
    })
    .catch (err => {
      return next({
        log: `oauth-callback error: ERROR: ${err} `,
        message: {error: 'Error found in oauth-callback. See logs for more details'}
      });
    });
};

userController.getOneUser = (req, res, next) => {
  const id = req.params.id;
  const getOneQuery = 'SELECT * FROM UsersTable WHERE _id = $1';
  db.query(getOneQuery, [ id ])
    .then((docs) => {
      res.locals.username = docs.username;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.getAllUsers: ERROR: ${err}`,
        message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
      });
    });
};

userController.updateUsername = (req, res, next) => {
  const id = req.params.id;
  const { username } = req.body;
  const getOneQuery = 'UPDATE UsersTable SET Username = $1 WHERE _id = $2;';
  db.query(getOneQuery, [ username, id ])
    .then((docs) => {
      res.locals.newUsername = docs.username;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.getAllUsers: ERROR: ${err}`,
        message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
      });
    });
};

userController.updatePassword = (req, res, next) => {
  const id = req.params.id;
  const { password } = req.body;

  // gotta hash the password first! 
  const hash = bcrypt.hashSync(password, 10);

  const newPassQuery = 'UPDATE UsersTable SET Password = $1 WHERE _id = $2';
  db.query(newPassQuery, [ hash, id ])
    .then((docs) => {
      res.locals.username = docs;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.getAllUsers: ERROR: ${err}`,
        message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
      });
    });
};

module.exports = userController;