document.addEventListener("DOMContentLoaded", async () => {
  const cpf = localStorage.getItem("cpf"); // Recupera o CPF do localStorage

  if (!cpf) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/auth/index.html";
    return;
  }

  document.body.innerHTML = `
    <header class="bg-brand-blue text-white p-4 flex justify-between items-center gap-4">
      <h1 id="welcome-text" class="font-bold text-heading-2">Bem-Vindo Estranho!</h1>
      <img class="ml-auto w-44 hidden lg:flex" src="/assets/logo-trilhas-inova.svg" alt="" />
      <div class="flex justify-between items-center gap-4">
        <div class="flex gap-1 items-center mt-[4px]">
          <span class="text-sm">Tempo da sessão:</span>
          <span id="session-timer" class="text-sm">30:00</span>
        </div>
        <button id="logout-button" class="flex items-center cursor-pointer">
          <svg class="w-6 fill-white hover:fill-red-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_iconCarrier">
              <title>logout</title>
              <g id="logout">
                <path d="M3,5 C3,3.9000001 3.9000001,3 5,3 C5,3 7.66666667,3 13,3 L13,5 L5,5 L5,19 L13,19 L13,21 C7.66666667,21 5,21 5,21 C3.9000001,21 3,20.1000004 3,19 C3,9.6236114 3,5 3,5 Z M17.1757866,11 L14.6402527,8.46446609 L16.0544662,7.05025253 L21.0042137,12 L16.0544662,16.9497475 L14.6402527,15.5355339 L17.1757866,13 L10.5900002,13 L10.5900002,11 L17.1757866,11 Z"></path>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </header>
    <main>
      <div class="flex flex-col gap-2 p-4">
        <h1 class="text-heading-2 font-semibold">Inscrição no Programa Trilhas</h1>
        <p class="text-heading-4 text-secondary font-normal">
          Acompanhe a situação da sua inscrição no programa Trilhas Inova.
        </p>
      </div>
    </main>
  `;

  const welcomeText = document.getElementById("welcome-text");
  const timerElement = document.getElementById("session-timer");
  const logoutButton = document.getElementById("logout-button");
  // Use http://localhost:3000 no lugar de https://desafio-3-trilhas-2b.onrender.com para rodar localmente
  try {
    // Faz a requisição para buscar os dados de inscrição
    const sanitizedCpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    const response = await fetch(
      `https://desafio-3-trilhas-2b.onrender.com/api/inscricao/${sanitizedCpf}`
    );

    if (response.status === 404) {
      // Exibe a mensagem de "não inscrito"
      welcomeText.innerHTML = `Olá, ${cpf}!`;
      document.querySelector("main").innerHTML += `
        <section class="flex flex-col p-4 gap-4">
          <div class="flex flex-col">
            <label class="text-secondary font-normal text-[14px]">Situação da inscrição</label>
            <p class="border border-dashed rounded-lg h-12 px-4 flex items-center text-red-600 font-semibold">
              Não Inscrito
            </p>
          </div>
          <h2 class="text-heading-4 text-secondary font-normal">
            Você precisa realizar sua inscrição!
          </h2>
          <p class="text-heading-4 text-secondary font-normal">
            Para realizar sua inscrição, clique no botão abaixo.
          </p>
          <a href="/pages/form/index.html" class="bg-brand-blue text-white rounded-lg h-12 px-4 flex items-center justify-center font-semibold">
            Realizar Inscrição
          </a>
        </section>`;
    } else if (response.ok) {
      const inscricao = await response.json();

      if (inscricao && inscricao.inscrito) {
        const primeiroNome = inscricao.nome.split(" ")[0];
        welcomeText.innerHTML = `Olá, ${primeiroNome}!`;

        document.querySelector("main").innerHTML += `
          <section class="flex flex-col p-4 gap-4">
            <h2 class="font-semibold">Informações do participante</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="flex flex-col gap-1">
                <label class="text-secondary font-normal text-[14px]">Nome completo</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${inscricao.nome}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Data de nascimento</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${formatData(inscricao.data_nascimento)}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">CPF</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${formatCpf(inscricao.cpf)}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Sexo</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${inscricao.sexo}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">E-mail</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${inscricao.email}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Telefone</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${formatTelefone(inscricao.telefone)}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Endereço</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${inscricao.endereco.rua}, ${inscricao.endereco.numero} - ${
          inscricao.endereco.cidade
        }, ${inscricao.endereco.estado}, ${inscricao.endereco.cep}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Trilha de aprendizado</label>
                <p class="border border-stroke-default rounded-lg h-12 px-4 flex items-center">
                  ${inscricao.trilha || "Nenhuma trilha selecionada"}
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Situação da inscrição</label>
                <p class="border border-dashed rounded-lg h-12 px-4 flex items-center text-green-600 font-semibold">
                  Inscrito
                </p>
              </div>
              <div class="flex flex-col">
                <label class="text-secondary font-normal text-[14px]">Documentos</label>
                <div class="flex gap-2 w-full">
                  <a href="https://desafio-3-trilhas-2b.onrender.com/api/inscricao/${
                    inscricao.cpf
                  }/documento" class="w-full text-center justify-center border text-[12px] border-dashed rounded-lg h-12 px-4 flex items-center text-brand-blue">
                    Documento de Identidade
                  </a>
                  <a href="https://desafio-3-trilhas-2b.onrender.com/api/inscricao/${
                    inscricao.cpf
                  }/comprovante" class="w-full text-center justify-center border text-[12px] border-dashed rounded-lg h-12 px-4 flex items-center text-brand-blue">
                    Comprovante de Residência
                  </a>
                </div>
              </div>
            </div>
          </section>`;
      }
    } else {
      alert("Erro ao buscar dados de inscrição.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }

  // Timer de sessão
  let timer = 1800; // 30 minutos em segundos
  function updateTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    if (timer > 0) {
      timer--;
    } else {
      alert("Sessão expirada! Você será desconectado.");
      logout();
    }
  }

  function logout() {
    localStorage.removeItem("cpf");
    window.location.href = "/pages/auth/index.html";
  }

  setInterval(updateTimer, 1000);

  logoutButton.addEventListener("click", () => {
    logout();
    alert("Você foi desconectado.");
  });
});

// Função para formatar CPF
function formatCpf(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Função para formatar telefone
function formatTelefone(telefone) {
  return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

// Função para formatar data de nascimento
function formatData(data) {
  const date = new Date(data);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
