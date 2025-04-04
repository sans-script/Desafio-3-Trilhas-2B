const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//   user: 'trilhas_user',
//   host: 'localhost',
//   database: 'trilhas_db',
//   password: 'trilhas_password',
//   port: 5432,
// });

const pool = new Pool({
  user: process.env.PG_USER, // Usuário do banco de dados
  host: process.env.PG_HOST, // Host do banco de dados
  database: process.env.PG_DATABASE, // Nome do banco de dados
  password: process.env.PG_PASSWORD, // Senha do banco de dados
  port: process.env.PG_PORT || 5432, // Porta do banco de dados
  ssl: {
    rejectUnauthorized: false, // Necessário para conexões seguras no Render
  },
});

module.exports = pool;