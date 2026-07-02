const express = require('express');
const router = express.Router();
const {
  listarProdutos,
  buscarProduto,
  criarProduto,
  atualizarProduto,
  deletarProduto
} = require('../controllers/produtoController');

const { proteger } = require('../middlewares/auth');

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Listar todos os produtos
 *     tags:
 *       - Produtos
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       500:
 *         description: Erro no servidor
 */
router.get('/', listarProdutos);

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:id', buscarProduto);

/**
 * @swagger
 * /api/produtos:
 *   post:
 *     summary: Criar novo produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Produto Exemplo
 *               descricao:
 *                 type: string
 *                 example: Descrição do produto
 *               preco:
 *                 type: number
 *                 example: 99.90
 *               categoria:
 *                 type: string
 *                 example: Eletrônicos
 *               estoque:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', proteger, criarProduto);

/**
 * @swagger
 * /api/produtos/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Produto Atualizado
 *               preco:
 *                 type: number
 *                 example: 149.90
 *               estoque:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.put('/:id', proteger, atualizarProduto);

/**
 * @swagger
 * /api/produtos/{id}:
 *   delete:
 *     summary: Deletar produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Produto não encontrado
 */
router.delete('/:id', proteger, deletarProduto);

module.exports = router;