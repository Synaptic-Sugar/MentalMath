const bcrypt = require('bcrypt');
const db = require('../models/models.js');
// const jwt = require('jsonwebtoken');

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
  // in this query add in the username and hash(not password)
  // const insertQuery = 'INSERT INTO users ( _id, 'users."username"', 'users."password"' ) VALUES ( DEFAULT, $1, $2 )';
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

  const verifyQuery = '...';
  db.query(verifyQuery)
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
  const selectAllQuery = 'SELECT * FROM UsersTable;';
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

userController.getOneUser = (req, res, next) => {
  const id = req.params.id;
  const getOneQuery = '';
  db.query(getOneQuery)
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

module.exports = userController;