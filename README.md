## Descrição

Criação de um processo de inscrições por meio de um formulário estático. O formulário foi criado para agilizar o cadastro de candidatos, coletando dados de forma eficiente e segura. Ele resolve o problema de inscrições desorganizadas, oferecendo uma interface intuitiva, validação de campos e conformidade com a LGPD.

Este projeto utiliza as seguintes tecnologias:

- **HTML5**: Para a estruturação do conteúdo da página.

- **CSS3**: Para a estilização da página.

- **Tailwind CSS**: Um framework de CSS utilitário que permite estilizar páginas rapidamente usando classes pré-definidas. [Tailwind CSS Documentation](https://tailwindcss.com/docs/styling-with-utility-classes).

- **JavaScript**: Para adicionar interatividade à página.

- **Node.js**: Para gerenciar dependências e scripts de build.

- **npm**: Gerenciador de pacotes do Node.js para instalar e 
gerenciar dependências.

- **Git**: Para controle de versão e colaboração no código.

- **Live Server**: Extensão do Visual Studio Code para recarregar a página automaticamente durante o desenvolvimento.

O projeto seguirá o [design disponibilizado no Figma](https://www.figma.com/design/xMXycKv7AAwE7oVGJ1whpd/Desafio-2---Trilhas-2B?node-id=22-377&p=f&t=y4NR5blp1qxlMImV-0)

![desafio-2-trilhas-2-b vercel app_ (3)](https://github.com/user-attachments/assets/07824af1-2714-4467-8f00-064f162899c8)
Figura 1: Captura de tela do formulário, disponível em https://desafio-2-trilhas-2-b.vercel.app/.

![iphone](https://github.com/user-attachments/assets/0a94c59b-a751-48b4-be6e-5f9632f6d482)
Figura 2: O projeto também pode ser acessado em dispositivos móveis.

## Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório para o seu ambiente local:

   ```sh
   git clone https://github.com/sans-script/Desafio-2-Trilhas-2B.git
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd Desafio-2-Trilhas-2B
   ```
3. Instale as dependências do projeto:
   ```sh
   npm install
   ```

## Execução

Para iniciar o projeto, execute o seguinte comando:

```sh
npm start
```

> [!NOTE]  
> Este comando irá iniciar o Tailwind CLI em modo watch, compilando o arquivo `styles.css` para `dist/output.css` sempre que houver alterações.

## Visualização

Para visualizar a página, você pode utilizar a extensão Live Server no Visual Studio Code. Após instalar a extensão, clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

## Subindo Alterações

Para subir as alterações feitas no projeto, siga os passos abaixo:

> [!WARNING]
> Sempre execute o comando `git pull` antes de iniciar suas alterações para garantir que você está trabalhando com a versão mais recente do repositório remoto:

   ```sh
   git pull origin main
   ```

1. Adicione os arquivos alterados ao staging:

   ```sh
   git add .
   ```
2. Faça um commit das suas alterações:

   ```sh
   git commit -m "Descrição das alterações"
   ```
3. Envie as alterações para o repositório remoto:

   ```sh
   git push origin main
   ```
