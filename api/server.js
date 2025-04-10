require("dotenv").config();

const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const cors = require("cors");
app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.post("/register", async (req, res) => {
  let { cpf, senha } = req.body;
  try {
    cpf = cpf.replace(/\D/g, "");
    console.log("Tentando cadastrar usuário com CPF:", cpf);
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE cpf = $1",
      [cpf]
    );
    if (userExists.rows.length > 0) {
      console.warn("CPF já cadastrado:", cpf);
      return res.status(400).json({ error: "CPF já cadastrado." });
    }
    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await pool.query(
      "INSERT INTO usuarios (cpf, senha) VALUES ($1, $2) RETURNING id, cpf",
      [cpf, hashedPassword]
    );
    console.log("Usuário cadastrado com sucesso:", newUser.rows[0]);
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
});

app.post("/login", async (req, res) => {
  let { cpf, senha } = req.body;
  try {
    cpf = cpf.replace(/\D/g, "");
    console.log("Tentando login com CPF:", cpf);
    const user = await pool.query("SELECT * FROM usuarios WHERE cpf = $1", [
      cpf,
    ]);
    if (user.rows.length === 0) {
      console.warn("Usuário não encontrado:", cpf);
      return res.status(400).json({ error: "CPF ou senha inválidos." });
    }
    const isPasswordValid = await bcrypt.compare(senha, user.rows[0].senha);
    if (!isPasswordValid) {
      console.warn("Senha inválida para o CPF:", cpf);
      return res.status(400).json({ error: "CPF ou senha inválidos." });
    }
    const inscricao = await pool.query(
      "SELECT * FROM inscricoes WHERE cpf = $1",
      [cpf]
    );
    console.log("Login realizado com sucesso para o CPF:", cpf);
    res.status(200).json({
      message: "Login realizado com sucesso!",
      user: user.rows[0],
      inscricao: inscricao.rows[0] || null,
    });
  } catch (err) {
    console.error("Erro ao realizar login:", err);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
});
app.post("/api/inscricao", async (req, res) => {
  let {
    nome,
    data_nascimento,
    cpf,
    sexo,
    email,
    telefone,
    endereco,
    trilha,
    documento,
    comprovante,
  } = req.body;

  try {
    cpf = cpf.replace(/\D/g, "");
    telefone = telefone.replace(/\D/g, "");
    console.log("Tentando salvar inscrição para o CPF:", cpf);
    const inscricaoExistente = await pool.query(
      "SELECT * FROM inscricoes WHERE cpf = $1",
      [cpf]
    );
    if (inscricaoExistente.rows.length > 0) {
      console.warn("CPF já cadastrado em uma inscrição:", cpf);
      return res
        .status(400)
        .json({ error: "CPF já cadastrado em uma inscrição." });
    }
    const [dia, mes, ano] = data_nascimento.split("/");
    const dataNascimentoFormatada = `${ano}-${mes}-${dia}`;

    const documentoBuffer = documento ? Buffer.from(documento, "base64") : null;
    const comprovanteBuffer = comprovante
      ? Buffer.from(comprovante, "base64")
      : null;

    const result = await pool.query(
      `INSERT INTO inscricoes 
        (nome, data_nascimento, cpf, sexo, email, telefone, endereco, trilha, documento, comprovante, inscrito)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
      [
        nome,
        dataNascimentoFormatada,
        cpf,
        sexo,
        email,
        telefone,
        endereco,
        trilha,
        documentoBuffer,
        comprovanteBuffer,
        true,
      ]
    );

    console.log("Inscrição salva com sucesso:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao salvar inscrição:", err);
    res.status(500).json({ error: "Erro ao salvar inscrição" });
  }
});

app.get("/api/inscricao/:cpf", async (req, res) => {
  const { cpf } = req.params;

  try {
    console.log("Buscando inscrição para o CPF:", cpf);
    const result = await pool.query("SELECT * FROM inscricoes WHERE cpf = $1", [
      cpf,
    ]);

    if (result.rows.length === 0) {
      console.warn("Nenhuma inscrição encontrada para o CPF:", cpf);
      return res.status(404).json(null);
    }

    console.log("Inscrição encontrada:", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar inscrição:", err);
    res.status(500).json({ error: "Erro ao buscar inscrição." });
  }
});

app.get("/api/inscricao/:cpf/documento", async (req, res) => {
  const { cpf } = req.params;

  try {
    const result = await pool.query(
      "SELECT documento FROM inscricoes WHERE cpf = $1",
      [cpf]
    );

    if (result.rows.length === 0 || !result.rows[0].documento) {
      return res.status(404).json({ error: "Documento não encontrado." });
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="documento_de_identidade.pdf"'
    );
    res.send(result.rows[0].documento);
  } catch (err) {
    console.error("Erro ao buscar documento:", err);
    res.status(500).json({ error: "Erro ao buscar documento de identidade." });
  }
});

app.get("/api/inscricao/:cpf/comprovante", async (req, res) => {
  const { cpf } = req.params;

  try {
    const result = await pool.query(
      "SELECT comprovante FROM inscricoes WHERE cpf = $1",
      [cpf]
    );

    if (result.rows.length === 0 || !result.rows[0].comprovante) {
      return res
        .status(404)
        .json({ error: "Comprovante de residência não encontrado." });
    }

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="comprovante_de_residência.pdf"'
    );
    res.send(result.rows[0].comprovante);
  } catch (err) {
    console.error("Erro ao buscar comprovante:", err);
    res.status(500).json({ error: "Erro ao buscar comprovante." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
