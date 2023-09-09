# Boas vindas ao DEVinventary

<strong>👨‍💻 Sobre o projeto</strong>

Este projeto foi desenvolvido com o objetivo de realizar precificação de produtos de forma massiva, utilizando apenas um arquivo CSV com o código do produto e o preço. O mesmo foi desenvolvido utilizando as seguintes tecnologias:

- Sequelize
- Node
- Express
- React
- Typescript
- MySQL

# 🔰 Executando o projeto

### 🔑 Instalando as dependencias base

Entre na pasta do projeto e execute o comando abaixo para instalar as dependências que vamos precisar para preparar o front e o back.

```sh
npm install
```

Agora, entre na pasta `backend` e crie um arquivo chamado `.env`, lá você irá definir as variáveis de ambiente que serão utilizadas para realizar a conexão com o MySQL.

Feito isso, retorne para a raíz do projeto e execute o comando abaixo para instalar preparar o ambiente de execução

```sh
npm run dev:prestart
```

**Atenção:** O comando acima, além de instalar o front e o back, irá criar e popular o banco de dados utilizando os dados que foi adicionado no arquivo `.env`, existe um arquivo chamado `.env.example` que deve ser utilizado como base

### 🔐 Executando o projeto

Agora, para executar o projeto basta rodar o comando abaixo

```sh
npm run dev
```

O comando acima executará os dois ambientes, back e front.

### 📦 Parando a execução

Para para a execução dos dois ambientes, basta utilizar o comando:

```sh
npm stop
```

### 🐳 Resetando o banco de dados:

Caso queira resetar o banco de dados, execute o comando:

```sh
npm run db:reset
```

O passo acima irá apagar e repopular o banco de dados.
