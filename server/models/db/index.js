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
