const bcrypt = require('bcrypt');
const db = require('../models/models.js');
// const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');


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
      res.locals.username = username;
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
  const verifyQuery = 'SELECT * FROM UsersTable WHERE Username = $1';
  db.query(verifyQuery, [ username ])
    .then((user) => {
      if (!user) {
        res.redirect('/signup');
      } else {
        console.log('password to verify: ', password);
        console.log('user.rows: ', user.rows[0]);
        console.log('password to compare with in DB: ', user.rows[0].password);
        bcrypt.compare(password, user.rows[0].password)
          .then(result => {
            if (!result) {
              res.redirect('/signup');
            } else {
              res.locals.username = user.rows[0].username;
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
      res.locals.allUsers = docs.rows;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.getAllUsers: ERROR: ${err}`,
        message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
      });
    });
};

userController.getOneUser = (req, res, next) => {
  const username = req.params.username;
  console.log('user to logout: ', username);
  const getOneQuery = 'SELECT * FROM UsersTable WHERE username = $1';
  db.query(getOneQuery, [ username ])
    .then((docs) => {
      console.log('username from docs; ', docs.rows[0].username);
      res.locals.username = docs.rows[0].username;
      return next(); 
    })
    . catch(err => {
      return next({
        log: `userController.getOneUser: ERROR: ${err}`,
        message: { err: 'Error in userController.getOneUser. Check logs for details.' }
      });
    });
};

// Here we process oauth-callback 
userController.getAccessToken = async (req, res, next) => {
  let body;
  try{
    const { query: { code } } = req;
    body = {
      client_id : process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    };
  }
  catch(err){
    return next({
      log: `oauth-callback error: ERROR: ${err} `,
      message: {error: 'Error creating body for oAuth request, src: userController.getAccessToken()'}
    });
  }
  try{
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { accept: 'application/json'},
      body: JSON.stringify(body)
    });
    res.locals.token = await response.data.access_token;
    return next();
  }
  catch(err){
    return next({
      log: `userController.getAccessToken error: ERROR: ${err} `,
      message: {error: 'Error found in userController.getAccessToken. See logs for more details'}
    });
  }
};

// for oauth to get username from the token
userController.getUserData = async (req, res, next) => {
  const token = res.locals.token;
  try{
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: { Authorization: 'token' + token }
    });
    res.locals.userData = await response.data;
    return next();
  }
  catch(err){
    return next({
      log: `userController.getUserData error: ERROR: ${err} `,
      message: {error: 'Error found in userController.getUserData. See logs for more details'}
    });
  }
};

// for oauth protcol to check for user, if not present create user, otherwise login user (must return res.locals.username)
userController.createOrFindUser = (req, res, next) => {
  const { username } = res.userData;
  
};



// userController.updateUsername = (req, res, next) => {
//   const id = req.params.id;
//   const { username } = req.body;
//   console.log('username to change with id: ', username, id);
//   const getOneQuery = 'UPDATE UsersTable SET Username = $1 WHERE _id = $2;';
//   db.query(getOneQuery, [ username, id ])
//     .then((docs) => {
//       console.log('new username: ', docs.rows[0].username)
//       res.locals.newUsername = docs.rows[0].username;
//       return next(); 
//     })
//     . catch(err => {
//       return next({
//         log: `userController.getAllUsers: ERROR: ${err}`,
//         message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
//       });
//     });
// };

// userController.updatePassword = (req, res, next) => {
//   const id = req.params.id;
//   const { password } = req.body;

//   // gotta hash the password first! 
//   const hash = bcrypt.hashSync(password, 10);

//   const newPassQuery = 'UPDATE UsersTable SET Password = $1 WHERE _id = $2';
//   db.query(newPassQuery, [ hash, id ])
//     .then((docs) => {
//       res.locals.username = docs.rows[0].username;
//       return next(); 
//     })
//     . catch(err => {
//       return next({
//         log: `userController.getAllUsers: ERROR: ${err}`,
//         message: { err: 'Error in userController.getAllUsers. Check logs for details.' }
//       });
//     });
// };

module.exports = userController;