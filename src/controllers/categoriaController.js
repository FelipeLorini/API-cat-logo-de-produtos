const Categoria = require('../models/categoriaModel');

// Listar categorias
const listar = async (req, res) => {
  try {
    const categorias = await Categoria.listar();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Buscar uma categoria
const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await Categoria.buscarPorId(id);
    
    if (!categoria) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }
    
    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Criar categoria
const criar = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    
    if (!nome) {
      return res.status(400).json({ mensagem: 'Nome é obrigatório' });
    }
    
    const id = await Categoria.criar(nome, descricao);
    res.status(201).json({ 
      mensagem: 'Categoria criada com sucesso!',
      id,
      nome,
      descricao
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Atualizar categoria
const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const existe = await Categoria.buscarPorId(id);
    if (!existe) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }
    
    const atualizado = await Categoria.atualizar(id, nome, descricao);
    res.json({ mensagem: 'Categoria atualizada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

// Deletar categoria
const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existe = await Categoria.buscarPorId(id);
    if (!existe) {
      return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }
    
    await Categoria.deletar(id);
    res.json({ mensagem: 'Categoria deletada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

module.exports = { listar, buscarPorId, criar, atualizar, deletar };