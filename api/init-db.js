const pool = require("./db");

(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inscricoes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255),
        data_nascimento DATE,
        cpf VARCHAR(14) UNIQUE,
        sexo VARCHAR(20),
        email VARCHAR(255) UNIQUE NOT NULL,
        telefone VARCHAR(15),
        endereco JSONB,
        trilha VARCHAR(50),
        documento BYTEA,
        comprovante BYTEA,
        inscrito BOOLEAN DEFAULT FALSE
      );
    `);

    console.log("Tabelas criadas com sucesso!");
    process.exit(0);
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
    process.exit(1);
  }
})();
