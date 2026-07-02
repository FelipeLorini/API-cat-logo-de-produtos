const Cliente = require('../models/clienteModel');

const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.listar();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const buscarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.buscarPorId(id);
    
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    
    res.json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const criarCliente = async (req, res) => {
  try {
    const { nome, email, telefone, endereco } = req.body;
    
    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Nome e email são obrigatórios' });
    }
    
    const existe = await Cliente.buscarPorEmail(email);
    if (existe) {
      return res.status(409).json({ mensagem: 'Email já cadastrado' });
    }
    
    const id = await Cliente.criar(nome, email, telefone, endereco);
    res.status(201).json({
      mensagem: 'Cliente criado com sucesso!',
      id,
      nome,
      email,
      telefone,
      endereco
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;
    
    const existe = await Cliente.buscarPorId(id);
    if (!existe) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    
    await Cliente.atualizar(id, nome, email, telefone, endereco);
    res.json({ mensagem: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existe = await Cliente.buscarPorId(id);
    if (!existe) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    }
    
    await Cliente.deletar(id);
    res.json({ mensagem: 'Cliente deletado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor' });
  }
};

module.exports = {
  listarClientes,
  buscarCliente,
  criarCliente,
  atualizarCliente,
  deletarCliente
};

