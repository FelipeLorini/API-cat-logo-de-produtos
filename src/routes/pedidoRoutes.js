const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../middlewares/auth');

router.use(auth.proteger);

router.get('/', pedidoController.listarPedidos);
router.get('/:id', pedidoController.buscarPedido);
router.post('/', pedidoController.criarPedido);
router.put('/:id/status', pedidoController.atualizarStatus);
router.delete('/:id', pedidoController.deletarPedido);

module.exports = router;