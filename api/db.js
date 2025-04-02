const { Pool } = require('pg');

const pool = new Pool({
  user: 'trilhas_user',
  host: 'localhost',
  database: 'trilhas_db',
  password: 'trilhas_password',
  port: 5432,
});

module.exports = pool;