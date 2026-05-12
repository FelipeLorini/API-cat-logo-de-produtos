const express = require('express');
const router = express.Router();
const { listarProdutos, buscarProduto, criarProduto, atualizarProduto, deletarProduto } = require('../controllers/produtoController');
const { proteger } = require('../middlewares/auth');

router.get('/', listarProdutos);
router.get('/:id', buscarProduto);
router.post('/', proteger, criarProduto);
router.put('/:id', proteger, atualizarProduto);
router.delete('/:id', proteger, deletarProduto);

module.exports = router;