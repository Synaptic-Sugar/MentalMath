const keys = require('dotenv').config();
const { Pool, Client } = require('pg');
const pg = require('pg');
// const keys = require('../../.env');

// const pool = new Pool ({
//   connectionString: PG_URI
// });
// module.exports = {
//   query: (text, params, callback) => {
//     console.log(‘Query requested: ’, text);
//   }
module.exports = {
  query: async (text, params, callback) => {
    console.log('query requested: ', text);
    const client = new Client(process.env.PG_URI);
    await client.connect();
    const now = await client.query(text, params, callback);
    await client.end();
    console.log('From Model :', now);
    return now;
  }
};