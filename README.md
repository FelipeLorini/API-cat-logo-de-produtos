#  API REST – Catálogo de Produtos

API REST desenvolvida com **Node.js**, **Express** e **MongoDB** como atividade avaliativa da disciplina de desenvolvimento back-end.

##  Estrutura do Projeto (MVC)

```
src/
├── config/
│   └── database.js        # Configuração da conexão com o MongoDB
├── controllers/
│   ├── authController.js  # Lógica de registro e login
│   └── produtoController.js # Lógica do CRUD de produtos
├── middlewares/
│   └── auth.js            # Middleware de autenticação JWT
├── models/
│   ├── Usuario.js         # Schema do usuário
│   └── Produto.js         # Schema do produto
├── routes/
│   ├── authRoutes.js      # Rotas de autenticação
│   └── produtoRoutes.js   # Rotas de produtos
├── app.js                 # Configuração do Express
└── server.js              # Ponto de entrada da aplicação
```

##  Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) local **ou** uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/api-catalogo-produtos.git
cd api-catalogo-produtos

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# 4. Inicie o servidor
npm run dev     # modo desenvolvimento (com nodemon)
npm start       # modo produção
```

O servidor estará disponível em `http://localhost:3000`.

---

##  Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e preencha os valores:

| Variável         | Descrição                                         | Exemplo                              |
|------------------|---------------------------------------------------|--------------------------------------|
| `MONGODB_URI`    | String de conexão com o MongoDB                   | `mongodb://localhost:27017/catalogo` |
| `JWT_SECRET`     | Chave secreta para assinar os tokens JWT          | `minha_chave_secreta_123`            |
| `JWT_EXPIRES_IN` | Tempo de expiração do token                       | `7d`                                 |
| `PORT`           | Porta em que o servidor vai rodar                 | `3000`                               |
| `NODE_ENV`       | Ambiente de execução                              | `development`                        |

---

##  Endpoints da API

### Autenticação

| Método | Rota                   | Descrição             
|--------|------------------------|------------------------
| POST   | `/api/auth/registro`   | Cadastra novo usuário  
| POST   | `/api/auth/login`      | Realiza login          

#### Registro – Body esperado:
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

#### Login – Body esperado:
```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

#### Resposta de sucesso (ambos):
```json
{
  "mensagem": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { "id": "...", "nome": "João Silva", "email": "joao@email.com" }
}
```

---

### Produtos

> Rotas de **criação, edição e exclusão** requerem autenticação.  
> Envie o token no header: `Authorization: Bearer <seu_token>`

| Método | Rota               | Descrição                       
|--------|--------------------|---------------------------------
| GET    | `/api/produtos`    | Lista todos os produtos         
| GET    | `/api/produtos/:id`| Busca um produto pelo ID       
| POST   | `/api/produtos`    | Cria um novo produto           
| PUT    | `/api/produtos/:id`| Atualiza um produto             
| DELETE | `/api/produtos/:id`| Remove um produto (soft delete) 

#### Criar / Atualizar Produto – Body esperado:
```json
{
  "nome": "Notebook Gamer",
  "descricao": "Processador i7, 16GB RAM, SSD 512GB",
  "preco": 4599.90,
  "categoria": "eletronicos",
  "estoque": 15,
  "atributos": {
    "marca": "Dell",
    "garantia": "1 ano",
    "cor": "preto"
  }
}
```

#### Filtros disponíveis na listagem (`GET /api/produtos`):

| Query Param | Descrição                        | Exemplo                        |
|-------------|----------------------------------|--------------------------------|
| `categoria` | Filtra por categoria             | `?categoria=eletronicos`       |
| `busca`     | Busca textual em nome/descrição  | `?busca=notebook`              |
| `pagina`    | Número da página (padrão: 1)     | `?pagina=2`                    |
| `limite`    | Itens por página (padrão: 10)    | `?limite=5`                    |

---

##  Segurança Implementada

- **BCrypt**: senhas criptografadas com salt de 12 rounds antes de salvar no banco.
- **JWT**: autenticação stateless com tokens de acesso.
- **express-mongo-sanitize**: remove operadores `$` e `.` dos inputs, prevenindo **NoSQL Injection**.
- **Limitação de tamanho**: corpo das requisições limitado a 10kb.
- **Soft Delete**: produtos não são apagados fisicamente, apenas marcados como inativos.

---

##  GitFlow Utilizado

```
main        → versão estável e em produção
develop     → integração das funcionalidades
  └── feature/configuracao-inicial
  └── feature/modelo-usuario
  └── feature/autenticacao-jwt
  └── feature/modelo-produto
  └── feature/crud-produtos
  └── feature/documentacao
```

---

##  Exemplo de Teste com cURL

```bash
# 1. Registrar usuário
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{"nome":"João","email":"joao@email.com","senha":"senha123"}'

# 2. Fazer login (guarde o token retornado)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"senha123"}'

# 3. Criar produto (substitua SEU_TOKEN pelo token recebido)
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"nome":"Teclado Mecânico","descricao":"Switch Red","preco":299.90,"categoria":"eletronicos","estoque":50}'

# 4. Listar produtos
curl http://localhost:3000/api/produtos
```

---

##  Dependências

| Pacote                  | Finalidade                                      |
|-------------------------|-------------------------------------------------|
| `express`               | Framework web                                   |
| `mongoose`              | ODM para MongoDB                                |
| `bcryptjs`              | Criptografia de senhas                          |
| `jsonwebtoken`          | Geração e validação de tokens JWT               |
| `express-mongo-sanitize`| Proteção contra NoSQL Injection                 |
| `dotenv`                | Carregamento de variáveis de ambiente           |
| `nodemon`               | Reinicialização automática em desenvolvimento   |
