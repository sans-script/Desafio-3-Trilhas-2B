# Plataforma de Inscrições 

## Descrição

Este projeto consiste em um sistema de inscrições e cadastro para candidatos, desenvolvido com o objetivo de agilizar e organizar o processo de cadastro. Ele oferece uma interface intuitiva para os usuários, validação de campos para garantir a integridade dos dados e conformidade com a LGPD. O sistema permite que os candidatos realizem login, preencham um formulário de inscrição e acompanhem o status de sua inscrição.

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **HTML5**: Para a estruturação do conteúdo da página.
- **CSS3**: Para a estilização da página.
- **Tailwind CSS**: Framework utilitário para estilização rápida.
- **JavaScript**: Para adicionar interatividade e lógica ao sistema.
- **Node.js**: Para gerenciar dependências e scripts de build.
- **npm**: Gerenciador de pacotes do Node.js.
- **Express**: Framework para criação de APIs.
- **PostgreSQL**: Banco de dados relacional para armazenamento de informações.
- **Docker**: Para containerização do banco de dados.
- **dotenv**: Para gerenciamento de variáveis de ambiente.
- **bcrypt**: Para criptografia de senhas.
- **CORS**: Para controle de acesso entre origens.
- **Git**: Para controle de versão e colaboração no código.
- **Live Server**: Extensão do Visual Studio Code para recarregar a página automaticamente durante o desenvolvimento.

## Funcionalidades Existentes

1. **Login e Cadastro de Usuário**:

   - Usuários podem realizar login ou criar uma conta caso ainda não possuam.
   - Após o login, o usuário é redirecionado para a página inicial.

2. **Formulário de Inscrição**:

   - O formulário coleta informações necessárias para a inscrição no programa.

3. **Exibição de Dados na Página Inicial**:

   - Após o envio do formulário, os dados do candidato são exibidos na página inicial, incluindo o status de inscrição.

4. **Armazenamento Seguro**:

   - As senhas dos usuários são armazenadas de forma criptografada no banco de dados.

5. **API para Gerenciamento de Inscrições**:
   - Endpoints para cadastro, login e gerenciamento de inscrições.

## Como Rodar Localmente

Para executar o projeto em sua máquina local, siga os passos necessários caso o deploy do servidor e/ou do banco de dados na Render venha a ser cancelado pela plataforma. 

> [!NOTE] 
> Certifique-se de verificar o arquivo `env.example` para criar corretamente o seu `.env`. Além disso, ajuste a variável `CORS_ORIGIN` para que corresponda à URL onde o frontend está sendo executado na sua máquina, evitando possíveis problemas com bloqueio de CORS.

### Pré-requisitos

- **Node.js** (versão 14 ou superior) instalado.
  
- **npm** (gerenciador de pacotes do Node.js).
  
- **Docker** (para rodar o banco de dados PostgreSQL).

### Passos

1. **Clone o repositório**:

   ```sh
   git clone https://github.com/sans-script/Desafio-3-Trilhas-2B.git
   ```

2. **Navegue até o diretório do projeto**:

   ```sh
   cd Desafio-3-Trilhas-2B
   ```

3. **Instale as dependências**:

   ```sh
   npm install
   ```

4. **Configure o banco de dados**:

   - Certifique-se de que o Docker está instalado e em execução.

   - Suba o banco de dados com o comando:
     
     ```sh
     docker-compose up -d
     ```
     
   - Inicialize as tabelas do banco de dados:
     ```sh
     node api/init-db.js
     ```



5. **Inicie o servidor**:

   ```sh
   node api/server.js
   ```

> [!CAUTION]  
> Execute o comando acima diretamente da sua home peloamordedeus, não entre na pasta api com o comando `cd api` e execute comandos diretamente na pasta que não vai funcionar. Use `node api/nome-do-arquivo.js`. Isso garante que o `.env` seja carregado.

6. **Inicie o projeto**:

   ```sh
   npm start
   ```

> [!TIP]
> Este comando inicia o Tailwind CLI em modo watch, compilando o arquivo `styles.css` para `dist/output.css` sempre que houver alterações nos arquivos. Use `npm run build` para gerar o arquivo sem o modo --watch. 

7. **Visualize o projeto**:
   
   - Utilize a extensão **Live Server** no Visual Studio Code.
  
   - Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

## Contribuição

Para contribuir com o projeto, siga os passos abaixo:

1. Certifique-se de estar com a versão mais recente do repositório:

   ```sh
   git pull origin main
   ```

2. Faça suas alterações e adicione os arquivos ao staging:

   ```sh
   git add .
   ```

3. Realize um commit descrevendo as alterações:

   ```sh
   git commit -m "Descrição das alterações"
   ```

4. Envie as alterações para o repositório remoto:
   ```sh
   git push origin main
   ```
