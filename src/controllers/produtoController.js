const Produto = require('../models/produtoModel');

// Listar produtos
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.listar();
    res.json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Buscar produto por ID
const buscarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.buscarPorId(id);
    
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    
    res.json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Criar produto
const criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, categoria_id, estoque } = req.body;
    
    if (!nome || !preco) {
      return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios' });
    }
    
    const id = await Produto.criar(nome, descricao, preco, categoria_id, estoque || 0);
    
    res.status(201).json({
      mensagem: 'Produto criado com sucesso!',
      id,
      nome,
      descricao,
      preco,
      categoria_id,
      estoque
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Atualizar produto
const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, categoria_id, estoque } = req.body;
    
    const existe = await Produto.buscarPorId(id);
    if (!existe) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    
    await Produto.atualizar(id, { nome, descricao, preco, categoria_id, estoque });
    res.json({ mensagem: 'Produto atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Deletar produto (soft delete)
const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existe = await Produto.buscarPorId(id);
    if (!existe) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    
    await Produto.deletar(id);
    res.json({ mensagem: 'Produto desativado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

module.exports = { 
  listarProdutos, 
  buscarProduto, 
  criarProduto, 
  atualizarProduto, 
  deletarProduto 
};