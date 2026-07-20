<h1 align="center">
<br>
Bookstore Manager CLI
</h1>

<h3 align="center">
<img alt="github" src="https://img.shields.io/badge/GitHub-181717.svg?style=for-the-badge&logo=GitHub&logoColor=white"/>
<img alt="ts-node" src="https://img.shields.io/badge/tsnode-3178C6.svg?style=for-the-badge&logo=ts-node&logoColor=white"/>
<img alt="postgres" src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
<img alt="inquirer" src="https://img.shields.io/badge/Inquirer-F0DB4F.svg?style=for-the-badge&logo=Inquirer&logoColor=black"/>
<h3>

## Sobre o projeto

Aplicação executada via terminal para gerenciamento de uma livraria. O sistema permitirá administrar autores, livros, clientes e empréstimos. utilizando o PostgreSQL como mecanismo de persistência dos dados. Todas as funcionalidades foram implementadas utilizando Node.js e TypeScript, aplicando os princípios estudados durante o curso de desenvolvimento backend do SCTEC.

## Objetivo

O projeto tem como objetivo consolidar os principais conhecimentos desenvolvidos ao longo da formação do curso, proporcionando uma experiência próxima do desenvolvimento de um sistema corporativo de pequeno porte, no qual organização, qualidade de código, versionarnento e modelagem de dados são tão importantes quanto o funcionamento correto da aplicação.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Postgres
- Aiven
- Git
- GitHub

## Pré-requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js
- npm
- Git

## Configurar banco de dados
Escolha seu SGBD de preferência e crie uma nova database chamada `bookstore-manager`,
abra uma ferramenta de query, copie e cole o arquivo squema.sql na pasta database.

Crie um arquivo .env na raiz do diretório com base no .env.example.
Coloque as credenciais para conectar com o banco de dados no arquivo .env

A aplicação funciona por padrão com o serviço de banco de dados na nuvem [Aiven](https://aiven.io/).
Porém é necessário um arquivo ca.pem que é obtido nas opções de conexão da Aiven e que deverá ser colocado na raiz do projeto.

Como alternativa é possível rodar o programa com um SGBD local, passando a flag `local` ao rodar o programa.

## Como instalar
Copie e cole os códigos abaixo no terminal.

```bash
git clone git@github.com:ronateds/BookStore-Manager-CLI.git
cd BookStore-Manager-CLI
npm install
npm run build
```

## Como executar com a Aiven

```bash
npm run dev

ou

npm start
```

## Como executar com um banco de dados local

```bash
npm run dev local

ou

npm start local
```

## Estrutura do projeto

```
BOOKSTORE-MANAGER-CLI/
├── relatorios/
├── src/
│   ├── controllers/
│   │   ├── AutorController.ts
│   │   ├── ClienteController.ts
│   │   ├── EmprestimoController.ts
│   │   ├── LivroController.ts
│   │   └── RelatorioController.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── squema.sql
│   ├── menus/
│   │   ├── autorMenu.ts
│   │   ├── clienteMenu.ts
│   │   ├── emprestimoMenu.ts
│   │   ├── livroMenu.ts
│   │   └── relatorioMenu.ts
│   ├── models/
│   │   ├── Autor.ts
│   │   ├── Cliente.ts
│   │   ├── Emprestimo.ts
│   │   └── Livro.ts
│   ├── repositories/
│   │   ├── AutorRepository.ts
│   │   ├── ClienteRepository.ts
│   │   ├── CrudRepository.ts
│   │   ├── EmprestimoRepository.ts
│   │   ├── LivroRepository.ts
│   │   └── RelatorioRepository.ts
│   ├── services/
│   │   ├── AutorService.ts
│   │   ├── ClienteService.ts
│   │   ├── EmprestimoService.ts
│   │   ├── LivroService.ts
│   │   └── RelatorioService.ts
│   ├── utils/
│   │   ├── AppError.ts
│   │   ├── csvHelper.ts
│   │   ├── encerrar.ts
│   │   ├── formatters.ts
│   │   ├── csvHelper.ts
│   │   ├── menuHelper.ts
│   │   ├── tratarErro.ts
│   │   └── validators.ts
│   └── main.ts
├── .env
├── .env.example
├── .gitignore
├── ca.pem
├── ca.pem.example
├── package.json
├── README.md
└── tsconfig.json
```

## Funcionalidades

- Gerenciar autores, livros, clientes e empréstimos;
- Persistir informações em um banco de dados PostgreSQL;
- Gerar relatórios CSV a partir dos dados armazenados;

## Branches utilizadas

- main
- develop
- feat/autores
- feat/clientes
- feat/emprestimo
- feat/livros
- feat/relatorios
- docs/readme

## Autores

- ### Ronate dos Santos
- ### Willian Piccinin
