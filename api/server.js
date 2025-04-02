const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

// Rota de cadastro
app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  try {
    console.log("Tentando cadastrar usuário com email:", email);

    // Verifica se o e-mail já está cadastrado
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );
    if (userExists.rows.length > 0) {
      console.warn("E-mail já cadastrado:", email);
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Insere o usuário no banco de dados
    const newUser = await pool.query(
      "INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email",
      [email, hashedPassword]
    );

    console.log("Usuário cadastrado com sucesso:", newUser.rows[0]);
    res.status(201).json({
      message: "Usuário cadastrado com sucesso!",
      user: newUser.rows[0], // Retorna o ID e o email do usuário
    });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
});

// Rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    console.log("Tentando login com email:", email);

    // Verifica se o usuário existe
    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      console.warn("Usuário não encontrado:", email);
      return res.status(400).json({ error: "E-mail ou senha inválidos." });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(senha, user.rows[0].senha);
    if (!isPasswordValid) {
      console.warn("Senha inválida para o email:", email);
      return res.status(400).json({ error: "E-mail ou senha inválidos." });
    }

    console.log("Login realizado com sucesso para o email:", email);
    res
      .status(200)
      .json({ message: "Login realizado com sucesso!", user: user.rows[0] });
  } catch (err) {
    console.error("Erro ao realizar login:", err);
    res.status(500).json({ error: "Erro ao realizar login." });
  }
});

// Rota para salvar os dados do formulário
app.post("/api/inscricao", async (req, res) => {
  const {
    usuario_id,
    nome,
    data_nascimento,
    cpf,
    sexo,
    email,
    telefone,
    endereco,
    trilha,
  } = req.body;

  try {
    console.log("Tentando salvar inscrição para o usuário ID:", usuario_id);

    // Verifica se o CPF já está vinculado a uma inscrição
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

    // Converte a data de DD/MM/YYYY para YYYY-MM-DD
    const [dia, mes, ano] = data_nascimento.split("/");
    const dataNascimentoFormatada = `${ano}-${mes}-${dia}`;

    const result = await pool.query(
      `INSERT INTO inscricoes 
        (usuario_id, nome, data_nascimento, cpf, sexo, email, telefone, endereco, trilha, inscrito)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *`,
      [
        usuario_id, // Vincula a inscrição ao usuário logado
        nome,
        dataNascimentoFormatada,
        cpf,
        sexo,
        email,
        telefone,
        endereco,
        trilha,
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

// Rota para buscar os dados de inscrição de um usuário
app.get("/api/inscricao/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;

  try {
    console.log("Buscando inscrição para o usuário ID:", usuario_id);

    // Busca a inscrição vinculada ao usuário
    const result = await pool.query(
      "SELECT * FROM inscricoes WHERE usuario_id = $1",
      [usuario_id]
    );

    if (result.rows.length === 0) {
      console.warn(
        "Nenhuma inscrição encontrada para o usuário ID:",
        usuario_id
      );
      // Retorna vazio se não houver inscrição
      return res.status(404).json(null);
    }

    console.log("Inscrição encontrada:", result.rows[0]);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar inscrição:", err);
    res.status(500).json({ error: "Erro ao buscar inscrição." });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
