const Pedido = require('../models/pedidoModel');

const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.listar();
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const buscarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.buscarPorId(id);
    
    if (!pedido) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    }
    
    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const criarPedido = async (req, res) => {
  try {
    const { cliente_id, itens } = req.body;
    
    if (!cliente_id || !itens || itens.length === 0) {
      return res.status(400).json({ mensagem: 'Cliente e itens são obrigatórios' });
    }
    
    const id = await Pedido.criar(cliente_id, itens);
    res.status(201).json({
      mensagem: 'Pedido criado com sucesso!',
      pedido_id: id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const pedido = await Pedido.buscarPorId(id);
    if (!pedido) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    }
    
    await Pedido.atualizarStatus(id, status);
    res.json({ mensagem: 'Status atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const deletarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pedido = await Pedido.buscarPorId(id);
    if (!pedido) {
      return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    }
    
    await Pedido.deletar(id);
    res.json({ mensagem: 'Pedido cancelado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

module.exports = {
  listarPedidos,
  buscarPedido,
  criarPedido,
  atualizarStatus,
  deletarPedido
};