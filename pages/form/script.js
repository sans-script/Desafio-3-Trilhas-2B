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

// https://desafio-3-trilhas-2b.onrender.com para produção
// http://localhost:3000 para desenvolvimento
let BASE_URL = "https://desafio-3-trilhas-2b.onrender.com";

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

function updateIdFile() {
  updateFileInfo("documento", "file-info-identidade");
}

function updateResidenceProofFile() {
  updateFileInfo("comprovante", "file-info-comprovante");
}

document.querySelectorAll(".checkboxWrapper").forEach((wrapper) => {
  wrapper.addEventListener("click", function (e) {
    const checkbox = wrapper.querySelector("input[type='checkbox']");
    if (e.target === checkbox) {
      checkbox.checked = !checkbox.checked;
    } else {
      checkbox.checked = !checkbox.checked;
    }

    updateCheckboxUI(checkbox);

    const checkboxes = document.querySelectorAll(".customCheckbox");
    checkboxes.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
        updateCheckboxUI(otherCheckbox);
      }
    });
  });
});

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

updateSingleCheckboxUI();

singleWrapper.addEventListener("click", () => {
  termosCheckbox.checked = !termosCheckbox.checked;
  updateSingleCheckboxUI();
});

function updateSingleCheckboxUI() {
  if (termosCheckbox.checked) {
    singleUncheckedIcon.classList.add("hidden");
    singleCheckedIcon.classList.remove("hidden");
  } else {
    singleUncheckedIcon.classList.remove("hidden");
    singleCheckedIcon.classList.add("hidden");
  }
}

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

function removeErrorStyles(input, errorDiv) {
  errorDiv.classList.add("hidden");
  input.classList.remove(
    "border-stroke-highlight",
    "ring-[4px]",
    "ring-surface-secondary-8"
  );
  input.classList.add("border-stroke-default");
}

function addInputListeners(input, errorDiv) {
  input.addEventListener("input", () => removeErrorStyles(input, errorDiv));
  input.addEventListener("change", () => removeErrorStyles(input, errorDiv));
}

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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

emailInput.addEventListener("input", () => {
  if (!isValidEmail(emailInput.value.trim())) {
    addErrorStyles(emailInput, emailErrorDiv);
    emailErrorDiv.querySelector("span").textContent =
      "Por favor, insira um endereço de e-mail válido 📫";
  } else {
    removeErrorStyles(emailInput, emailErrorDiv);
  }
});

document.querySelector("form").addEventListener("submit", function (e) {
  let isValid = true;
  if (!nomeInput.value.trim()) {
    addErrorStyles(nomeInput, nomeErrorDiv);
    isValid = false;
  }
  if (!birthdateInput.value.trim()) {
    addErrorStyles(birthdateInput, birthdateErrorDiv);
    isValid = false;
  }
  if (!cpfInput.value.trim()) {
    addErrorStyles(cpfInput, cpfErrorDiv);
    isValid = false;
  }
  if (sexInput.value === "Selecionar") {
    addErrorStyles(sexInput, sexErrorDiv);
    isValid = false;
  }
  if (!emailInput.value.trim()) {
    addErrorStyles(emailInput, emailErrorDiv);
    isValid = false;
  }
  if (!phoneInput.value.trim()) {
    addErrorStyles(phoneInput, phoneErrorDiv);
    isValid = false;
  }
  if (!cepInput.value.trim()) {
    addErrorStyles(cepInput, adressErrorDiv, false);
    isValid = false;
  }
  if (!ruaInput.value.trim()) {
    addErrorStyles(ruaInput, adressErrorDiv, false);
    isValid = false;
  }
  if (!numeroInput.value.trim()) {
    addErrorStyles(numeroInput, adressErrorDiv, false);
    isValid = false;
  }
  if (!cidadeInput.value.trim()) {
    addErrorStyles(cidadeInput, adressErrorDiv, false);
    isValid = false;
  }
  if (!estadoInput.value.trim()) {
    addErrorStyles(estadoInput, adressErrorDiv, false);
    isValid = false;
  }
  if (!isValid) {
    adressErrorDiv.classList.remove("hidden");
    adressErrorDiv.classList.add("flex");
  } else {
    adressErrorDiv.classList.add("hidden");
  }
  if (!documentoInput.files.length) {
    fileIdErrorDiv.classList.remove("hidden");
    fileIdErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    fileIdErrorDiv.classList.add("hidden");
  }
  if (!comprovanteInput.files.length) {
    fileProofErrorDiv.classList.remove("hidden");
    fileProofErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    fileProofErrorDiv.classList.add("hidden");
  }
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
  if (!termosCheckbox.checked) {
    termosErrorDiv.classList.remove("hidden");
    termosErrorDiv.classList.add("flex");
    isValid = false;
  } else {
    termosErrorDiv.classList.add("hidden");
  }
  if (!isValid) {
    e.preventDefault();
  }
});

function showpage(index) {
  if (index >= totalpages) {
    currentIndex = totalpages - 1;
  } else if (index < 0) {
    currentIndex = 0;
  }
  pageContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  if (currentIndex === 0) {
    prevBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
  }
  if (currentIndex === totalpages - 1) {
    nextBtn.classList.add("hidden");
  } else {
    nextBtn.classList.remove("hidden");
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

showpage(currentIndex);

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const documentoFile = formData.get("documento");
  const comprovanteFile = formData.get("comprovante");

  const documentoBase64 = documentoFile ? await toBase64(documentoFile) : null;
  const comprovanteBase64 = comprovanteFile
    ? await toBase64(comprovanteFile)
    : null;

  const data = {
    nome: formData.get("nome"),
    data_nascimento: formData.get("data-de-nascimento"),
    cpf: formData.get("cpf").replace(/\D/g, ""),
    sexo: formData.get("sexo"),
    email: formData.get("email"),
    telefone: formData.get("numero").replace(/\D/g, ""),
    endereco: {
      cep: formData.get("cep"),
      rua: formData.get("rua"),
      numero: formData.get("numero-casa"),
      cidade: formData.get("cidade"),
      estado: formData.get("estado"),
    },
    trilha: formData.get("customCheckboxGroup"),
    documento: documentoBase64,
    comprovante: comprovanteBase64,
  };

  try {
    const response = await fetch(`${BASE_URL}/api/inscricao`, {
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

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function loadFromLocalStorage(key) {
  return localStorage.getItem(key) || "";
}

nomeInput.value = loadFromLocalStorage("nome");
birthdateInput.value = loadFromLocalStorage("data-de-nascimento");
cpfInput.value = loadFromLocalStorage("cpf-form");
sexInput.value = loadFromLocalStorage("sexo");
emailInput.value = loadFromLocalStorage("email");
phoneInput.value = loadFromLocalStorage("numero");
cepInput.value = loadFromLocalStorage("cep");
ruaInput.value = loadFromLocalStorage("rua");
numeroInput.value = loadFromLocalStorage("numero-casa");
cidadeInput.value = loadFromLocalStorage("cidade");
estadoInput.value = loadFromLocalStorage("estado");

nomeInput.addEventListener("input", () =>
  saveToLocalStorage("nome", nomeInput.value)
);
birthdateInput.addEventListener("input", () =>
  saveToLocalStorage("data-de-nascimento", birthdateInput.value)
);
cpfInput.addEventListener("input", () =>
  saveToLocalStorage("cpf-form", cpfInput.value)
);
sexInput.addEventListener("change", () =>
  saveToLocalStorage("sexo", sexInput.value)
);
emailInput.addEventListener("input", () =>
  saveToLocalStorage("email", emailInput.value)
);
phoneInput.addEventListener("input", () =>
  saveToLocalStorage("numero", phoneInput.value)
);
cepInput.addEventListener("input", () =>
  saveToLocalStorage("cep", cepInput.value)
);
ruaInput.addEventListener("input", () =>
  saveToLocalStorage("rua", ruaInput.value)
);
numeroInput.addEventListener("input", () =>
  saveToLocalStorage("numero-casa", numeroInput.value)
);
cidadeInput.addEventListener("input", () =>
  saveToLocalStorage("cidade", cidadeInput.value)
);
estadoInput.addEventListener("input", () =>
  saveToLocalStorage("estado", estadoInput.value)
);

documentoInput.addEventListener("change", async () => {
  if (documentoInput.files.length > 0) {
    const file = documentoInput.files[0];
    try {
      const base64File = await toBase64(file);
      saveToLocalStorage(
        "documento",
        JSON.stringify({ name: file.name, data: base64File })
      );
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const fileInfoDiv = document.getElementById("file-info-identidade");
      fileInfoDiv.textContent = `Arquivo selecionado: ${file.name} (${fileSizeMB} MB)`;
    } catch (error) {
      console.error("Erro ao converter o arquivo para Base64:", error);
    }
  }
});

comprovanteInput.addEventListener("change", async () => {
  if (comprovanteInput.files.length > 0) {
    const file = comprovanteInput.files[0];
    try {
      const base64File = await toBase64(file);
      saveToLocalStorage(
        "comprovante",
        JSON.stringify({ name: file.name, data: base64File })
      );
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const fileInfoDiv = document.getElementById("file-info-comprovante");
      fileInfoDiv.textContent = `Arquivo selecionado: ${file.name} (${fileSizeMB} MB)`;
    } catch (error) {
      console.error("Erro ao converter o arquivo para Base64:", error);
    }
  }
});

const savedDocumento = loadFromLocalStorage("documento");
const savedComprovante = loadFromLocalStorage("comprovante");

if (savedDocumento) {
  const documentoData = JSON.parse(savedDocumento);
  const fileSizeMB = (
    (documentoData.data.length * 3) /
    4 /
    (1024 * 1024)
  ).toFixed(2);
  const fileInfoDiv = document.getElementById("file-info-identidade");
  fileInfoDiv.textContent = `Arquivo selecionado: ${documentoData.name} (${fileSizeMB} MB)`;
}

if (savedComprovante) {
  const comprovanteData = JSON.parse(savedComprovante);
  const fileSizeMB = (
    (comprovanteData.data.length * 3) /
    4 /
    (1024 * 1024)
  ).toFixed(2);
  const fileInfoDiv = document.getElementById("file-info-comprovante");
  fileInfoDiv.textContent = `Arquivo selecionado: ${comprovanteData.name} (${fileSizeMB} MB)`;
}

// Salvar estado do checkbox de termos
termosCheckbox.addEventListener("change", () => {
  saveToLocalStorage("termosAceito", termosCheckbox.checked);
});

// Salvar estado de todos os checkboxes das trilhas
document.querySelectorAll(".customCheckbox").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const trilhaselecionada = Array.from(
      document.querySelectorAll(".customCheckbox")
    ).map((checkbox) => ({
      value: checkbox.value,
      checked: checkbox.checked,
    }));
    console.log("Trilhas selecionadas:", trilhaselecionada);
    saveToLocalStorage("trilhaSelecionada", JSON.stringify(trilhaselecionada));
  });
});

const termosAceitos = loadFromLocalStorage("termosAceito") === "true";
termosCheckbox.checked = termosAceitos;
updateSingleCheckboxUI();

const trilhaselecionada = JSON.parse(
  loadFromLocalStorage("trilhaSelecionada") || "[]"
);
document.querySelectorAll(".customCheckbox").forEach((checkbox) => {
  const trilha = trilhaselecionada.find((t) => t.value === checkbox.value);
  checkbox.checked = trilha ? trilha.checked : false;
  updateCheckboxUI(checkbox);
});
