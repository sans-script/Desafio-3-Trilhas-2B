document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  console.log("Retrieved userId from localStorage:", userId); // Debugging log

  if (!userId) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "/pages/auth/index.html";
    return;
  }

  try {
    // Faz a requisição para buscar os dados de inscrição
    const response = await fetch(
      `http://localhost:3000/api/inscricao/${userId}`
    );
    console.log("API response status:", response.status); // Debugging log

    if (response.ok) {
      const inscricao = await response.json();
      console.log("Inscrição data:", inscricao); // Debugging log

    if (inscricao) {
      // Exibe todos os dados da inscrição
      document.body.innerHTML = `
              <h1>Bem-vindo, ${inscricao.nome}</h1>
              <p>Situação: ${
                inscricao.inscrito ? "Inscrito" : "Não inscrito"
              }</p>
              <p>Trilha: ${
                inscricao.trilha || "Nenhuma trilha selecionada"
              }</p>
              <p>Data de Nascimento: ${inscricao.data_nascimento}</p>
              <p>CPF: ${inscricao.cpf}</p>
              <p>Sexo: ${inscricao.sexo}</p>
              <p>Email: ${inscricao.email}</p>
              <p>Telefone: ${inscricao.telefone}</p>
              <p>Endereço:</p>
              <ul>
                <li>CEP: ${inscricao.endereco.cep}</li>
                <li>Rua: ${inscricao.endereco.rua}</li>
                <li>Número: ${inscricao.endereco.numero}</li>
                <li>Cidade: ${inscricao.endereco.cidade}</li>
                <li>Estado: ${inscricao.endereco.estado}</li>
              </ul>
            `;
    } else {
        // Exibe o aviso de "não inscrito"
        document.body.innerHTML = `
                    <h1>Bem-vindo!</h1>
                    <p>Você ainda não preencheu seus dados de inscrição.</p>
                    <a href="/pages/form/index.html">Preencher formulário</a>
                `;
      }
    } else if (response.status === 404) {
      alert("Dados de inscrição não encontrados para o usuário.");
    } else {
      alert(`Erro ao buscar dados de inscrição. Status: ${response.status}`);
    }
  } catch (err) {
    console.error("Erro ao conectar ao servidor:", err); // Improved error logging
    alert(
      "Erro ao conectar ao servidor. Verifique o console para mais detalhes."
    );
  }
});
