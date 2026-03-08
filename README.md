# nestjs-auth-api

API de autenticação e gerenciamento construída com **NestJS**, **Prisma**, **PostgreSQL**, **Swagger** e **Docker**.

Este projeto fornece um backend completo para:

* Autenticação de usuários
* Gerenciamento de clientes
* Gerenciamento de produtos vinculados a clientes

A API utiliza **JWT para autenticação**, **validação com DTOs**, e **documentação automática via Swagger**.

---

# 🔹 Funcionalidades

## 🔐 Autenticação

* Registro de usuários (`POST /auth/register`)
* Login de usuários (`POST /auth/login`)
* Geração de **JWT Token**
* Hash de senha com **bcrypt**

---

## 👤 Usuários

* Listagem de usuários (`GET /users`)
* Atualização parcial (`PATCH /users/:id`)
* Exclusão de usuário (`DELETE /users/:id`)
* Prevenção de duplicidade de e-mail

---

## 👥 Clientes

Gerenciamento de clientes vinculados ao sistema.

* Criar cliente (`POST /clients`)
* Listar clientes (`GET /clients`)
* Buscar cliente por id (`GET /clients/:id`)
* Atualizar cliente (`PATCH /clients/:id`)
* Excluir cliente (`DELETE /clients/:id`)

---

## 📦 Produtos

Cada **cliente pode possuir múltiplos produtos**.

Relação:

```
Cliente 1:N Produtos
```

Endpoints disponíveis:

* Criar produto para um cliente
  `POST /clients/:clientId/products`

* Listar produtos de um cliente
  `GET /clients/:clientId/products`

* Atualizar produto
  `PATCH /products/:id`

* Excluir produto
  `DELETE /products/:id`

---

# 🔹 Tecnologias

* **NestJS** — Framework Node.js para aplicações escaláveis
* **Prisma ORM** — ORM moderno para banco de dados
* **PostgreSQL** — Banco de dados relacional
* **class-validator** — Validação de dados
* **bcrypt** — Hash de senhas
* **JWT** — Autenticação baseada em token
* **Swagger** — Documentação automática da API
* **Docker** — Containerização da aplicação

---

# 🔹 Estrutura da API

```
src
 ├── auth
 ├── users
 ├── clients
 ├── products
 ├── prisma
 └── main.ts
```

---

# 🔹 Banco de Dados

Modelos principais:

### User

```
User
- id
- name
- email
- password
- createdAt
- updatedAt
```

### Client

```
Client
- id
- name
- email
- phone
- active
- createdAt
- updatedAt
```

### Product

```
Product
- id
- name
- price
- clientId
- createdAt
- updatedAt
```

Relacionamento:

```
Client
 └── Product[]
```

---

# 🔹 Documentação da API

Após iniciar a aplicação:

Swagger disponível em:

```
http://localhost:3000/docs
```

---

# 🔹 Executando o Projeto

## 1️⃣ Pré-requisitos

* Docker
* Docker Compose
* Node.js (opcional)

---

# 🔹 Rodando com Docker

Clone o projeto:

```bash
git clone <url-do-repositorio>
cd nestjs-auth-api
```

Crie o arquivo `.env`:

```
DATABASE_URL="postgresql://usuario:senha@db:5432/nestjs_auth_api"
JWT_SECRET="supersecret"
```

Suba os containers:

```bash
docker-compose up -d --build
```

Execute migrations:

```bash
docker exec -it nestjs-auth-api_app_1 npx prisma migrate deploy
```

---

# 🔹 Acessos

API:

```
http://localhost:3000
```

Swagger:

```
http://localhost:3000/docs
```

---

# 🔹 Rodando sem Docker

Instale dependências:

```bash
npm install
```

Execute migrations:

```bash
npx prisma migrate deploy
```

Inicie a aplicação:

```bash
npm run start:dev
```

---

# 🔹 Próximas melhorias (roadmap)

* Paginação de clientes e produtos
* Busca por nome/email
* Soft delete
* Upload de imagens para produtos
* Testes automatizados (Jest)
* Rate limit para autenticação
* Logs estruturados

---

# 🔹 Licença

MIT
