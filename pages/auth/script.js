const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const toggleLink = document.getElementById("toggle-link");
const formTitle = document.getElementById("form-title");
let isLogin = false;
// https://desafio-3-trilhas-2b.onrender.com para produção
// http://localhost:3000 para desenvolvimento
let BASE_URL = "https://desafio-3-trilhas-2b.onrender.com";
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
  if (cpf.length <= 9)
    return cpf.slice(0, 3) + "." + cpf.slice(3, 6) + "." + cpf.slice(6);
  return (
    cpf.slice(0, 3) +
    "." +
    cpf.slice(3, 6) +
    "." +
    cpf.slice(6, 9) +
    "-" +
    cpf.slice(9, 11)
  );
}

document.getElementById("register-cpf").addEventListener("input", (e) => {
  e.target.value = formatarCPF(e.target.value);
});

document.getElementById("login-cpf").addEventListener("input", (e) => {
  e.target.value = formatarCPF(e.target.value);
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let cpf = document.getElementById("register-cpf").value;
  const senha = document.getElementById("register-password").value;
  cpf = cpf.replace(/\D/g, "");
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Cadastro realizado com sucesso!");
      localStorage.setItem("cpf", cpf);
      toggleLink.click();
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let cpf = document.getElementById("login-cpf").value;
  const senha = document.getElementById("login-password").value;
  cpf = cpf.replace(/\D/g, "");

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf, senha }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Login realizado com sucesso!");
      localStorage.setItem("cpf", cpf);
      window.location.href = "/pages/home/index.html";
    } else {
      const error = await response.json();
      alert(error.error);
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }
});
