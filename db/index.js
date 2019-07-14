const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "wayfarer",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,

});

pool.on('connect', () => console.log('connected to the db'));

const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        password VARCHAR(128) NOT NULLL,
        created_date TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'WAT'),
        modified_date TIMESTAMP WITHOUT TIME ZONE,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
    
}

module.exports = {
  createUserTable,
};

require('make-runnable');