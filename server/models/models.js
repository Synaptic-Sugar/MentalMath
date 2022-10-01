const { Pool, Client } = require('pg');
const pg = require('pg');

const PG_URI = 'postgres://sufbfcso:FGwsuHdibl3tUfJRwAwS83xh4RX-K3g3@heffalump.db.elephantsql.com/sufbfcso';

// const pool = new Pool ({
//   connectionString: PG_URI
// });

// module.exports = {
//   query: (text, params, callback) => {
//     console.log('Query requested: ', text);
    
//   }

module.exports = {
  query: async (text, params, callback) => {
    console.log('query requested: ', text);
    const client = new Client(PG_URI);
    await client.connect();
    const now = await client.query(text, params, callback);
    await client.end();
    console.log('From Model :', now);
    return now;
  }
};