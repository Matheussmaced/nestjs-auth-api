# nestjs-auth-api

API de autenticação e gerenciamento de usuários construída com **NestJS**, **Prisma**, **Swagger** e **Docker**.

Este projeto oferece endpoints para **registro de usuários**, **login**, **atualização** e **remoção** de usuários, com validação via **class-validator** e documentação automática via **Swagger**.

---

## 🔹 Funcionalidades

- Registro de usuários (`POST /users/register`)
- Login de usuários (`POST /users/login`)
- Atualização parcial de usuários (`PATCH /users/:id`)
- Listagem de usuários (`GET /users`)
- Exclusão de usuários (`DELETE /users/:id`)
- Validação de dados com **DTOs**
- Prevenção de duplicidade de e-mails
- Hash de senha com **bcrypt**
- Documentação de API com **Swagger** (`/docs`)

---

---

## 🔹 Tecnologias

- **NestJS**: Framework Node.js para backend escalável.
- **Prisma**: ORM para banco de dados.
- **class-validator**: Validação de dados.
- **bcrypt**: Hash de senhas.
- **Swagger**: Documentação automática de API.
- **Docker**: Contêiner para rodar API e banco de dados.

---

## 🔹 Executando o projeto

### 1️⃣ Pré-requisitos

- Docker e Docker Compose instalados
- Node.js (opcional, se quiser rodar local sem Docker)

---

### 2️⃣ Rodando com Docker

1. Clone o projeto:

```bash
git clone <url-do-projeto>
cd nestjs-auth-api

Crie o arquivo .env com as variáveis de ambiente necessárias:

DATABASE_URL="postgresql://usuario:senha@db:5432/nestjs_auth_api"

Suba os containers:

docker-compose up -d --build

Execute migrations (se estiver usando Prisma):

docker exec -it nestjs-auth-api_app_1 npx prisma migrate deploy

Isso criará as tabelas necessárias no banco de dados.

Acesse a API:

API: http://localhost:3000

Swagger: http://localhost:3000/docs

3️⃣ Rodando sem Docker (opcional)
npm install
npx prisma migrate deploy
npm run start:dev
