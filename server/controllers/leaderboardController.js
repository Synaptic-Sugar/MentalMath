
const db = require('../models/models');
const leaderboardController = {};

//to create table we will run
//CREATE TABLE ScoresTable (Username VARCHAR(255), Score INT);

leaderboardController.getTopTen = (req, res, next) => {
  const text = `SELECT Username, Score FROM ScoresTable
  ORDER BY score desc
  FETCH first 10 rows ONLY;`;
  db.query(text)
    .then(data => {
      res.locals.topTen = data.rows;
      return next();})
    .catch((err)=> {
      return next({
        log: `error in getTopTen middleware: ${err}`,
        message: {err: 'error in getTopTen middleware'}
      });
    });
  
};

leaderboardController.addNewScore = (req, res, next) => {
  console.log("inside add new user");
  const text = 'INSERT INTO ScoresTable (_id, Username, Score) VALUES (DEFAULT, $1, $2)';
  db.query(text, [req.body.username, req.body.score])
    .then(data => {
      console.log('response from inserting score');
      console.log(data);
      return next();
    })
    .catch((err)=> {
      return next({
        log: `error in addNewScore middleware: ${err}`,
        message: {err: 'error in addNewScore middleware'}
      });
    });
};

leaderboardController.getPersonalScores = (req, res, next) => {
  const text = `SELECT Username, Score FROM ScoresTable WHERE Username=$1
  ORDER BY score desc
  FETCH first 10 rows ONLY;`;
  db.query(text, [req.params.username])
    .then(data => {
      console.log('response from getting personal scores');
      console.log(data);
      res.locals.personalScores = data.rows;
      return next();
    })
    .catch((err)=> {
      return next({
        log: `error in getPersonalScores middleware ${err}`,
        message: {err: 'error in getPersonalScores middleware'}
      });
    });
};

module.exports = leaderboardController;






// equipmentController.createEquipment =  (req, res, next) => {
//   const {  itemName, itemClass, rarity, cost, description, created_by, score } = req.body;
//   const text = `
//      INSERT INTO equipment(_id, name, item_class, rarity, cost, description, created_by, score) 
//      VALUES(DEFAULT, $1, $2, $3, $4, $5, $6, $7) 
//      Returning *
//      `;
//   const values = [ itemName, itemClass, rarity, cost, description, created_by, score ];
//   console.log(values);
//   db.query(text, values)
//     .then (data => {
//       console.log(res.locals);
//       res.locals.create = data.rows[0];
//       return next();
//     });
// };
