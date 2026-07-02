# API REST - Catalogo de Produtos

API REST desenvolvida com **Node.js**, **Express** e **MySQL** como atividade avaliativa da disciplina de desenvolvimento back-end.

## Estrutura do Projeto (MVC)
src/
├── config/
│ └── database.js # Configuracao da conexao com MySQL
├── controllers/
│ ├── authController.js # Logica de registro e login
│ ├── categoriaController.js
│ ├── produtoController.js
│ ├── clienteController.js
│ └── pedidoController.js
├── middlewares/
│ └── auth.js # Middleware de autenticacao JWT
├── models/
│ ├── usuarioModel.js
│ ├── categoriaModel.js
│ ├── produtoModel.js
│ ├── clienteModel.js
│ └── pedidoModel.js
├── routes/
│ ├── authRoutes.js
│ ├── categoriaRoutes.js
│ ├── produtoRoutes.js
│ ├── clienteRoutes.js
│ └── pedidoRoutes.js
├── app.js
└── server.js



## Como Rodar o Projeto

### Pre-requisitos

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/)

### Instalacao

```bash
# 1. Clone o repositorio
git clone https://github.com/seu-usuario/api-catalogo-produtos.git
cd api-catalogo-produtos

# 2. Instale as dependencias
npm install

# 3. Configure as variaveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configuracoes

# 4. Execute o script SQL para criar as tabelas
# Execute o arquivo database/script.sql no MySQL Workbench

# 5. Inicie o servidor
npm run dev     # modo desenvolvimento (com nodemon)
npm start       # modo producao
O servidor estara disponivel em http://localhost:3000.

Variaveis de Ambiente
Copie o arquivo .env.example para .env e preencha os valores:

Variavel	Descricao	Exemplo
DB_HOST	Host do MySQL	localhost
DB_USER	Usuario do MySQL	root
DB_PASSWORD	Senha do MySQL	suasenha
DB_NAME	Nome do banco de dados	loja
DB_PORT	Porta do MySQL	3306
JWT_SECRET	Chave secreta para assinar tokens	minha_chave_secreta_123
PORT	Porta do servidor	3000
Endpoints da API
Rota Publica
Metodo	Rota	Descricao
GET	/api/status	Retorna versao da API

{
  "versao": "2.0.0",
  "status": "online",
  "banco": "MySQL"
}
Autenticacao
Metodo	Rota	Descricao
POST	/api/register	Cadastra novo usuario
POST	/api/login	Realiza login
Registro – Body esperado:

{
  "nome": "Joao Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
Login – Body esperado:

{
  "email": "joao@email.com",
  "senha": "senha123"
}
Resposta de sucesso (ambos):

{
  "mensagem": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": { "id": 1, "nome": "Joao Silva", "email": "joao@email.com" }
}
Categorias
Todas as rotas de categorias requerem autenticacao.
Envie o token no header: Authorization: Bearer <seu_token>

Metodo	Rota	Descricao
GET	/api/categorias	Lista todas as categorias
GET	/api/categorias/:id	Busca uma categoria pelo ID
POST	/api/categorias	Cria uma nova categoria
PUT	/api/categorias/:id	Atualiza uma categoria
DELETE	/api/categorias/:id	Remove uma categoria
Criar / Atualizar Categoria – Body esperado:

{
  "nome": "Eletronicos",
  "descricao": "Produtos eletronicos em geral"
}
Produtos
Rotas de criacao, edicao e exclusao requerem autenticacao.
Envie o token no header: Authorization: Bearer <seu_token>

Metodo	Rota	Descricao
GET	/api/produtos	Lista todos os produtos
GET	/api/produtos/:id	Busca um produto pelo ID
POST	/api/produtos	Cria um novo produto
PUT	/api/produtos/:id	Atualiza um produto
DELETE	/api/produtos/:id	Remove um produto (soft delete)
Criar / Atualizar Produto – Body esperado:

{
  "nome": "Notebook Gamer",
  "descricao": "Processador i7, 16GB RAM, SSD 512GB",
  "preco": 4599.90,
  "categoria_id": 1,
  "estoque": 15
}
Clientes
Todas as rotas de clientes requerem autenticacao.
Envie o token no header: Authorization: Bearer <seu_token>

Metodo	Rota	Descricao
GET	/api/clientes	Lista todos os clientes
GET	/api/clientes/:id	Busca um cliente pelo ID
POST	/api/clientes	Cria um novo cliente
PUT	/api/clientes/:id	Atualiza um cliente
DELETE	/api/clientes/:id	Remove um cliente
Criar / Atualizar Cliente – Body esperado:

{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "telefone": "1199999999",
  "endereco": "Rua das Flores, 123"
}
Pedidos
Todas as rotas de pedidos requerem autenticacao.
Envie o token no header: Authorization: Bearer <seu_token>

Metodo	Rota	Descricao
GET	/api/pedidos	Lista todos os pedidos
GET	/api/pedidos/:id	Busca um pedido pelo ID
POST	/api/pedidos	Cria um novo pedido
PUT	/api/pedidos/:id/status	Atualiza status do pedido
DELETE	/api/pedidos/:id	Cancela um pedido
Criar Pedido – Body esperado:

{
  "cliente_id": 1,
  "itens": [
    {
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 4500.00
    }
  ]
}
Seguranca Implementada
BCrypt: senhas criptografadas antes de salvar no banco.

JWT: autenticacao stateless com tokens de acesso.

Prepared Statements: todas as queries SQL usam ? para prevenir SQL Injection.

Soft Delete: produtos nao sao apagados fisicamente, apenas marcados como inativos (ativo = 0).

Autenticacao Obrigatoria: todas as rotas de CRUD exigem token JWT valido.

Migracao: MongoDB -> MySQL
Este projeto foi migrado de MongoDB para MySQL, utilizando o driver mysql2 com suporte a Promises e Prepared Statements para seguranca contra SQL Injection.

Mudancas realizadas:
Substituicao do ODM Mongoose pelo driver mysql2

Criacao do banco de dados relacional com as tabelas: usuarios, categorias, produtos, clientes, pedidos e itens_pedido

Implementacao de Prepared Statements em todas as queries

Adaptacao dos models para utilizar SQL

Criacao dos CRUDS de categorias, clientes e pedidos

Rota publica /api/status para monitoramento

GitFlow Utilizado
text
main        -> versao estavel e em producao
develop     -> integracao das funcionalidades
  -> feature/configuracao-inicial
  -> feature/modelo-usuario
  -> feature/autenticacao-jwt
  -> feature/migracao-mysql
  -> feature/crud-categorias
  -> feature/crud-produtos
  -> feature/crud-clientes
  -> feature/crud-pedidos
  -> feature/documentacao
Exemplo de Teste com cURL

curl http://localhost:3000/api/status

curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Joao","email":"joao@email.com","senha":"senha123"}'

curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"senha123"}'

curl -X POST http://localhost:3000/api/categorias \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"nome":"Eletronicos","descricao":"Produtos eletronicos"}'

curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"nome":"Notebook","descricao":"Notebook i7","preco":4500,"categoria_id":1,"estoque":10}'


curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"nome":"Maria Silva","email":"maria@email.com","telefone":"1199999999","endereco":"Rua das Flores, 123"}'


curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"cliente_id":1,"itens":[{"produto_id":1,"quantidade":2,"preco_unitario":4500}]}'


curl -X GET http://localhost:3000/api/produtos \
  -H "Authorization: Bearer SEU_TOKEN"
Dependencias
Pacote	Finalidade
express	Framework web
mysql2	Driver para MySQL com Promises
bcryptjs	Criptografia de senhas
jsonwebtoken	Geracao e validacao de tokens JWT
dotenv	Carregamento de variaveis de ambiente
cors	Habilitar CORS
nodemon	Reinicializacao automatica em dev
