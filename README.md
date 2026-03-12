# nestjs-auth-api

API de gerenciamento construída com **NestJS**, **Prisma**, **PostgreSQL**, **Swagger** e **Docker**.

O projeto evoluiu de uma simples API de autenticação para um **mini sistema de gestão**, permitindo controlar:

* Usuários
* Clientes
* Produtos
* Financeiro
* Transações

A API utiliza **JWT para autenticação**, **DTOs para validação**, **Swagger para documentação**, e **Prisma ORM para persistência de dados**.

---

# 🔹 Funcionalidades

## 🔐 Autenticação

Sistema completo de autenticação baseado em **JWT**.

Endpoints disponíveis:

* Registro de usuário
  `POST /auth/register`

* Login
  `POST /auth/login`

Após o login, o usuário recebe um **JWT Token** que deve ser enviado no header:

```
Authorization: Bearer TOKEN
```

---

# 👤 Usuários

Gerenciamento de usuários do sistema.

Endpoints:

* Listar usuários
  `GET /users`

* Atualizar usuário
  `PATCH /users/:id`

* Remover usuário
  `DELETE /users/:id`

Funcionalidades:

* Validação com DTO
* Prevenção de emails duplicados
* Senhas armazenadas com **bcrypt**

---

# 👥 Clientes

Usuários podem gerenciar múltiplos clientes.

Relação:

```
User 1:N Clients
```

Endpoints:

Criar cliente

```
POST /clients
```

Listar clientes

```
GET /clients
```

Buscar cliente por id

```
GET /clients/:id
```

Atualizar cliente

```
PATCH /clients/:id
```

Excluir cliente

```
DELETE /clients/:id
```

---

# 📦 Produtos

Cada cliente pode possuir múltiplos produtos ou serviços.

Relação:

```
Client 1:N Products
```

Endpoints:

Criar produto para cliente

```
POST /clients/:clientId/products
```

Listar produtos do cliente

```
GET /clients/:clientId/products
```

Atualizar produto

```
PATCH /products/:id
```

Excluir produto

```
DELETE /products/:id
```

---

# ✅ Conclusão de Produto

Produtos possuem um campo:

```
completed: boolean
```

Quando um produto é marcado como **concluído**, o sistema automaticamente:

1️⃣ Cria uma **transação financeira**
2️⃣ Atualiza o **saldo total da empresa**
3️⃣ Atualiza o **saldo mensal**

Exemplo:

```
PATCH /products/:id
```

Body:

```json
{
  "completed": true
}
```

Isso gera automaticamente:

```json
{
  "amount": 2000,
  "type": "INCOME",
  "description": "Pagamento do produto Website institucional"
}
```

---

# 💰 Financeiro

Cada usuário possui um controle financeiro próprio.

Campos principais:

```
Finance
- totalBalance
- monthlyBalance
```

Endpoints:

Criar financeiro

```
POST /finance
```

Consultar financeiro

```
GET /finance
```

---

# 💳 Transações

O sistema permite registrar transações financeiras manualmente.

Tipos:

```
INCOME  -> Entrada de dinheiro
EXPENSE -> Saída de dinheiro
```

Criar transação:

```
POST /finance/transactions
```

Exemplo:

```json
{
  "amount": 500,
  "type": "EXPENSE",
  "description": "Pagamento de servidor"
}
```

O sistema automaticamente:

* Atualiza o saldo total
* Atualiza o saldo mensal

---

# 🔹 Tecnologias

* **NestJS** — Framework Node.js escalável
* **Prisma ORM** — ORM moderno para banco de dados
* **PostgreSQL** — Banco relacional
* **JWT** — Autenticação baseada em token
* **class-validator** — Validação de dados
* **bcrypt** — Hash de senha
* **Swagger** — Documentação automática da API
* **Docker** — Containerização

---

# 🔹 Estrutura da Aplicação

```
src
 ├── auth
 ├── users
 ├── clients
 ├── products
 ├── finance
 ├── prisma
 └── main.ts
```

Cada módulo segue o padrão:

```
module
controller
service
dto
```

---

# 🔹 Banco de Dados

## User

```
User
- id
- name
- email
- password
- createdAt
```

---

## Client

```
Client
- id
- name
- email
- phone
- active
- userId
- createdAt
```

---

## Product

```
Product
- id
- name
- price
- active
- completed
- clientId
- createdAt
```

---

## Finance

```
Finance
- id
- totalBalance
- monthlyBalance
- userId
```

---

## Transaction

```
Transaction
- id
- amount
- type
- description
- financeId
- createdAt
```

---

# 🔹 Fluxo para Testar a API

Para testar completamente o sistema, siga este fluxo:

### 1️⃣ Registrar usuário

```
POST /auth/register
```

---

### 2️⃣ Fazer login

```
POST /auth/login
```

Copiar o **JWT Token** retornado.

---

### 3️⃣ Autorizar no Swagger

Clique em **Authorize** e adicione:

```
Bearer TOKEN
```

---

### 4️⃣ Criar financeiro

```
POST /finance
```

---

### 5️⃣ Criar cliente

```
POST /clients
```

---

### 6️⃣ Criar produto

```
POST /clients/:clientId/products
```

---

### 7️⃣ Concluir produto

```
PATCH /products/:id
```

Body:

```json
{
  "completed": true
}
```

---

### 8️⃣ Verificar financeiro

```
GET /finance
```

O saldo deve ser atualizado automaticamente.

---

# 🔹 Documentação da API

Swagger disponível em:

```
http://localhost:3000/docs
```

---

# 🔹 Executando o Projeto

## Pré-requisitos

* Docker
* Docker Compose
* Node.js (opcional)

---

# 🔹 Rodando com Docker

Clone o projeto:

```
git clone <url-do-repositorio>
cd nestjs-auth-api
```

Crie o arquivo `.env`

```
DATABASE_URL="postgresql://usuario:senha@db:5432/nestjs_auth_api"
JWT_SECRET="supersecret"
```

Suba os containers:

```
docker-compose up -d --build
```

Execute migrations:

```
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

```
npm install
```

Execute migrations:

```
npx prisma migrate deploy
```

Inicie a aplicação:

```
npm run start:dev
```

---

# 🔹 Roadmap

Próximas melhorias planejadas:

* Paginação de clientes e produtos
* Filtros por nome/email
* Soft delete
* Dashboard financeiro
* Gráficos de faturamento
* Upload de imagens para produtos
* Testes automatizados com Jest
* Rate limit para autenticação
* Logs estruturados
* Estrutura baseada em **DDD**

---

# 🔹 Licença

MIT
