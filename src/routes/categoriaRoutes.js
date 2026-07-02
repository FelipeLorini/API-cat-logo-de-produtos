const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middlewares/auth');

// Todas as rotas de categoria exigem autenticação
router.use(auth.proteger);

router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.buscarPorId);
router.post('/', categoriaController.criar);
router.put('/:id', categoriaController.atualizar);
router.delete('/:id', categoriaController.deletar);

module.exports = router;