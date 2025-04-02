const nomeInput = document.getElementById("nome");
const nomeErrorDiv = document.getElementById("nome-error");
const birthdateInput = document.getElementById("date");
const birthdateErrorDiv = document.getElementById("birthdate-error");
const cpfInput = document.getElementById("cpf");
const cpfErrorDiv = document.getElementById("cpf-error");
const sexInput = document.getElementById("sexo");
const sexErrorDiv = document.getElementById("sex-error");
const emailInput = document.getElementById("email");
const emailErrorDiv = document.getElementById("email-error");
const phoneInput = document.getElementById("phone");
const phoneErrorDiv = document.getElementById("phone-error");
const cepInput = document.getElementById("cep");
const ruaInput = document.querySelector("input[name='rua']");
const numeroInput = document.querySelector("input[name='numero-casa']");
const cidadeInput = document.querySelector("input[name='cidade']");
const estadoInput = document.querySelector("input[name='estado']");
const adressErrorDiv = document.getElementById("adress-error");
const documentoInput = document.getElementById("documento");
const fileIdErrorDiv = document.getElementById("file-id-error");
const comprovanteInput = document.getElementById("comprovante");
const fileProofErrorDiv = document.getElementById("file-proof-error");
const trilhasErrorDiv = document.getElementById("trilhas-error");
const termosCheckbox = document.getElementById("customCheckbox");
const termosErrorDiv = document.getElementById("termos-error");

const singleWrapper = document.getElementById("checkboxWrapper");
const singleUncheckedIcon = document.getElementById("uncheckedIcon");
const singleCheckedIcon = document.getElementById("checkedIcon");

const pages = document.querySelectorAll(".page");
const pageContainer = document.getElementById("pageContainer");
const formScroll = document.getElementById("formScroll");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const totalpages = pages.length;

let currentIndex = 0;

// Função para atualizar informações do arquivo
function updateFileInfo(inputId, infoDivId) {
  const input = document.getElementById(inputId);
  const fileInfoDiv = document.getElementById(infoDivId);
  fileInfoDiv.innerHTML = "";

  if (!input.files.length) return;

  const file = input.files[0];
  const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
  const isTooLarge = fileSizeMB > 2;

  fileInfoDiv.innerHTML = `
      ${
        isTooLarge
          ? `<img src="/assets/alert-circle.svg" alt="Erro Icon" class="w-5 h-5 mr-2">`
          : ""
      }
      <span class="${
        isTooLarge ? "text-red-600" : "text-secondary"
      } font-normal text-[14px] mt-1">
        ${
          isTooLarge
            ? `Oops! ${file.name} (${fileSizeMB}MB) é muito grande! Máximo: 2MB 😅`
            : `Arquivo selecionado: ${file.name} (${fileSizeMB} MB)`
        }
      </span>`;

  if (isTooLarge) input.value = "";
}

// Chamadas específicas para cada tipo de arquivo
function updateIdFile() {
  updateFileInfo("documento", "file-info-identidade");
}

function updateResidenceProofFile() {
  updateFileInfo("comprovante", "file-info-comprovante");
}

// Adiciona eventos de clique aos wrappers dos checkboxes
document.querySelectorAll(".checkboxWrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", function (e) {
    const checkbox = wrapper.querySelector("input[type='checkbox']");

    // Verifica se o clique foi no próprio checkbox
    if (e.target === checkbox) {
      checkbox.checked = !checkbox.checked;
    } else {
      checkbox.checked = !checkbox.checked;
    }

    updateCheckboxUI(checkbox);

    // Desmarca os outros checkboxes
    const checkboxes = document.querySelectorAll(".customCheckbox");
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
        updateCheckboxUI(otherCheckbox);
      }
    });
  });
});

// Adiciona eventos de mudança aos checkboxes
document.querySelectorAll(".customCheckbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const checkboxes = document.querySelectorAll(".customCheckbox");
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
        updateCheckboxUI(otherCheckbox);
      }
    });
    updateCheckboxUI(checkbox);
  });
});

// Atualiza a interface dos checkboxes
function updateCheckboxUI(checkbox) {
  const wrapper = checkbox.closest(".checkboxWrapper");
  const uncheckedIcon = wrapper.querySelector(".uncheckedIcon");
  const checkedIcon = wrapper.querySelector(".checkedIcon");

  if (checkbox.checked) {
    uncheckedIcon.classList.add("hidden");
    checkedIcon.classList.remove("hidden");
    wrapper.classList.remove("border-stroke-default");
    wrapper.classList.add("border-brand-dark");
  } else {
    uncheckedIcon.classList.remove("hidden");
    checkedIcon.classList.add("hidden");
    wrapper.classList.remove("border-brand-dark");
    wrapper.classList.add("border-stroke-default");
  }
}

// Inicializa o estado do SVG baseado no checkbox
updateSingleCheckboxUI();

// Escuta o clique no wrapper do checkbox
singleWrapper.addEventListener("click", () => {
  termosCheckbox.checked = !termosCheckbox.checked;
  updateSingleCheckboxUI();
});

// Atualiza os SVGs com base no estado do checkbox
function updateSingleCheckboxUI() {
  if (termosCheckbox.checked) {
    singleUncheckedIcon.classList.add("hidden");
    singleCheckedIcon.classList.remove("hidden");
  } else {
    singleUncheckedIcon.classList.remove("hidden");
    singleCheckedIcon.classList.add("hidden");
  }
}

// Preenchimento automático da data
birthdateInput.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  if (value.length > 2 && value.length <= 4) {
    value = value.replace(/(\d{2})(\d+)/, "$1/$2");
  } else if (value.length > 4) {
    value = value.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
  }
  e.target.value = value;
});

// Preenchimento automático do CPF
cpfInput.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  if (value.length > 3 && value.length <= 6) {
    value = value.replace(/(\d{3})(\d+)/, "$1.$2");
  } else if (value.length > 6 && value.length <= 9) {
    value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  } else if (value.length > 9) {
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
  }
  e.target.value = value;
});

// Preenchimento automático do telefone
phoneInput.addEventListener("input", (e) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  if (value.length > 2 && value.length <= 7) {
    value = value.replace(/(\d{2})(\d+)/, "($1) $2");
  } else if (value.length > 7) {
    value = value.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
  }
  e.target.value = value;
});

// Adiciona estilos de erro aos inputs
function addErrorStyles(input, errorDiv, showError = true) {
  if (showError) {
    errorDiv.classList.remove("hidden");
    errorDiv.classList.add("flex");
  }
  input.classList.remove("border-stroke-default");
  input.classList.add(
    "border-stroke-highlight",
    "ring-[4px]",
    "ring-surface-secondary-8"
  );
}

// Remove estilos de erro dos inputs
function removeErrorStyles(input, errorDiv) {
  errorDiv.classList.add("hidden");
  input.classList.remove(
    "border-stroke-highlight",
    "ring-[4px]",
    "ring-surface-secondary-8"
  );
  input.classList.add("border-stroke-default");
}

// Adiciona listeners para remover os estilos de erro
function addInputListeners(input, errorDiv) {
  input.addEventListener("input", () => removeErrorStyles(input, errorDiv));
  input.addEventListener("change", () => removeErrorStyles(input, errorDiv));
}

// Adiciona os listeners para remover os estilos de erro
addInputListeners(nomeInput, nomeErrorDiv);
addInputListeners(birthdateInput, birthdateErrorDiv);
addInputListeners(cpfInput, cpfErrorDiv);
addInputListeners(sexInput, sexErrorDiv);
addInputListeners(emailInput, emailErrorDiv);
addInputListeners(phoneInput, phoneErrorDiv);
addInputListeners(cepInput, adressErrorDiv);
addInputListeners(ruaInput, adressErrorDiv);
addInputListeners(numeroInput, adressErrorDiv);
addInputListeners(cidadeInput, adressErrorDiv);
addInputListeners(estadoInput, adressErrorDiv);
addInputListeners(documentoInput, fileIdErrorDiv);
addInputListeners(comprovanteInput, fileProofErrorDiv);
addInputListeners(termosCheckbox, termosErrorDiv);

// Validação do formulário no envio
document.querySelector("form").addEventListener("submit", function (e) {
  let isValid = true;

  // Valida o campo nome
  if (!nomeInput.value.trim()) {
    addErrorStyles(nomeInput, nomeErrorDiv);
    isValid = false;
  }

  // Valida o campo data de nascimento
  if (!birthdateInput.value.trim()) {
    addErrorStyles(birthdateInput, birthdateErrorDiv);
    isValid = false;
  }

  // Valida o campo CPF
  if (!cpfInput.value.trim()) {
    addErrorStyles(cpfInput, cpfErrorDiv);
    isValid = false;
  }

  // Valida o campo sexo
  if (sexInput.value === "Selecionar") {
    addErrorStyles(sexInput, sexErrorDiv);
    isValid = false;
  }

  // Valida o campo email
  if (!emailInput.value.trim()) {
    addErrorStyles(emailInput, emailErrorDiv);
    isValid = false;
  }

  // Valida o campo telefone
  if (!phoneInput.value.trim()) {
    addErrorStyles(phoneInput, phoneErrorDiv);
    isValid = false;
  }

  // Valida o campo CEP
  if (!cepInput.value.trim()) {
    addErrorStyles(cepInput, adressErrorDiv, false);
    isValid = false;
  }

  // Valida o campo rua
  if (!ruaInput.value.trim()) {
    addErrorStyles(ruaInput, adressErrorDiv, false);
    isValid = false;
  }

  // Valida o campo número
  if (!numeroInput.value.trim()) {
    addErrorStyles(numeroInput, adressErrorDiv, false);
    isValid = false;
  }

  // Valida o campo cidade
  if (!cidadeInput.value.trim()) {
    addErrorStyles(cidadeInput, adressErrorDiv, false);
    isValid = false;
  }

  // Valida o campo estado
  if (!estadoInput.value.trim()) {
    addErrorStyles(estadoInput, adressErrorDiv, false);
    isValid = false;
  }

  // Exibe ou oculta o erro de endereço
  if (!isValid) {
    adressErrorDiv.classList.remove("hidden");
    adressErrorDiv.classList.add("flex");
  } else {
    adressErrorDiv.classList.add("hidden");
  }

  // Valida o campo documento
  if (!documentoInput.files.length) {
    fileIdErrorDiv.classList.remove("hidden");
    fileIdErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    fileIdErrorDiv.classList.add("hidden");
  }

  // Valida o campo comprovante
  if (!comprovanteInput.files.length) {
    fileProofErrorDiv.classList.remove("hidden");
    fileProofErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    fileProofErrorDiv.classList.add("hidden");
  }

  // Valida se pelo menos uma trilha foi selecionada
  const trilhasCheckboxes = document.querySelectorAll(
    ".checkboxWrapper input[type='checkbox']"
  );
  const isTrilhaSelected = Array.from(trilhasCheckboxes).some(
    (checkbox) => checkbox.checked
  );

  if (!isTrilhaSelected) {
    trilhasErrorDiv.classList.remove("hidden");
    trilhasErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    trilhasErrorDiv.classList.add("hidden");
  }

  // Valida se os termos foram aceitos
  if (!termosCheckbox.checked) {
    termosErrorDiv.classList.remove("hidden");
    termosErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    termosErrorDiv.classList.add("hidden");
  }

  // Impede o envio do formulário se houver erros
  if (!isValid) {
    e.preventDefault();
  }
});

function showpage(index) {
  if (index >= totalpages) {
    currentIndex = totalpages - 1; // Impede que vá além do último page
  } else if (index < 0) {
    currentIndex = 0; // Impede que vá antes do primeiro page
  }
  pageContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

  // Oculta ou exibe os botões
  if (currentIndex === 0) {
    prevBtn.classList.add("hidden"); // Oculta o botão "Prev" no primeiro page
  } else {
    prevBtn.classList.remove("hidden"); // Exibe o botão "Prev"
  }

  if (currentIndex === totalpages - 1) {
    nextBtn.classList.add("hidden"); // Oculta o botão "Next" no último page
  } else {
    nextBtn.classList.remove("hidden"); // Exibe o botão "Next"
  }
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  showpage(currentIndex);
  formScroll.scrollTo({ top: 0, behavior: "smooth" });
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  showpage(currentIndex);
  formScroll.scrollTo({ top: 0, behavior: "smooth" });
});

// Inicializa a página
showpage(currentIndex);

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const userId = localStorage.getItem("userId"); // Recupera o ID do usuário logado

  const data = {
    usuario_id: userId, // Vincula a inscrição ao usuário logado
    nome: formData.get("nome"),
    data_nascimento: formData.get("data-de-nascimento"),
    cpf: formData.get("cpf"),
    sexo: formData.get("sexo"),
    email: formData.get("email"),
    telefone: formData.get("numero"),
    endereco: {
      cep: formData.get("cep"),
      rua: formData.get("rua"),
      numero: formData.get("numero-casa"),
      cidade: formData.get("cidade"),
      estado: formData.get("estado"),
    },
    trilha: formData.get("customCheckboxGroup"),
    documento: formData.get("documento"),
    comprovante: formData.get("comprovante"),
  };

  try {
    const response = await fetch("http://localhost:3000/api/inscricao", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Inscrição realizada com sucesso!");
      window.location.href = "/pages/home/index.html";
    } else {
      const error = await response.json();
      alert(error.error || "Erro ao realizar inscrição.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar ao servidor.");
  }
});
