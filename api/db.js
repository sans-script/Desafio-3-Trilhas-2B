const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões seguras no Render
  },
  // Para desenvolvimento local, descomente a linha abaixo e comente a linha acima
  // ssl: false,
});

module.exports = pool;
