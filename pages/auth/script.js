const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const toggleLink = document.getElementById("toggle-link");
const message = document.getElementById("message");
const formTitle = document.getElementById("form-title");
let isLogin = false; // Inicia com o formulário de cadastro ativo
document.title = "Registre-se! - Cadastro";
formTitle.innerText = "CADASTRE-SE";


toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    loginForm.classList.add("flex");
    toggleLink.innerText = "Não tem uma conta? Cadastrar";
    document.title = "Bem-vindo de Volta! - Login";
    formTitle.innerText = "BEM-VINDO DE VOLTA!";
    
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    toggleLink.innerText = "Já tem uma conta? Login";
    document.title = "Registre-se! - Cadastro";
    formTitle.innerText = "CADASTRE-SE";
  }
});

function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length <= 3) return cpf;
  if (cpf.length <= 6) return cpf.slice(0, 3) + "." + cpf.slice(3);
  if (cpf.length <= 9) return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6);
  return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6, 9) + "-" + cpf.slice(9, 11);
}

// Formatar CPF no formulário de cadastro
document.getElementById("register-cpf").addEventListener("input", (e) => {
  e.target.value = formatarCPF(e.target.value);
});

// Formatar CPF no formulário de login
document.getElementById("login-cpf").addEventListener("input", (e) => {
  e.target.value = formatarCPF(e.target.value);
});

function cadastrarUsuario(cpf, senha) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[cpf]) {
    message.innerText = "CPF já cadastrado.";
    message.style.color = "red";
  } else {
    users[cpf] = senha;
    localStorage.setItem("users", JSON.stringify(users));
    message.innerText = "Cadastro realizado com sucesso, você já pode fazer login agora.";
    message.style.color = "green";
    document.getElementById("register-cpf").value = "";
    document.getElementById("register-password").value = "";
  }
}

function verificarLogin(cpf, senha) {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (users[cpf] && users[cpf] === senha) {
    message.innerText = "Login realizado com sucesso!";
    message.style.color = "green";
  } else {
    message.innerText = "CPF ou senha incorretos.";
    message.style.color = "red";
  }
}

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cpf = document.getElementById("register-cpf").value;
  const senha = document.getElementById("register-password").value;
  cadastrarUsuario(cpf, senha);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cpf = document.getElementById("login-cpf").value;
  const senha = document.getElementById("login-password").value;
  verificarLogin(cpf, senha);
});