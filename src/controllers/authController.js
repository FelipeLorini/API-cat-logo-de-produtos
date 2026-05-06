const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};


const registro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

   
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
    }

    const usuario = await Usuario.create({ nome, email, senha });
    const token = gerarToken(usuario._id);

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {

    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ mensagem: mensagens.join(', ') });
    }
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};


const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    
    const usuario = await Usuario.findOne({ email }).select('+senha');
    if (!usuario || !(await usuario.compararSenha(senha))) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    }

    const token = gerarToken(usuario._id);

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

module.exports = { registro, login };
