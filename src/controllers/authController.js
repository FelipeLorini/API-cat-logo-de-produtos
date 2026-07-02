const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const registro = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se usuário já existe
    const usuarioExiste = await Usuario.buscarPorEmail(email);
    if (usuarioExiste) {
      return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
    }

    // Cria usuário
    const id = await Usuario.criar(nome, email, senha);
    const token = gerarToken(id);

    res.status(201).json({
      mensagem: 'Usuário cadastrado com sucesso!',
      token,
      usuario: {
        id,
        nome,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    const usuario = await Usuario.buscarPorEmail(email);
    if (!usuario || !(await Usuario.compararSenha(senha, usuario.senha))) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos.' });
    }

    const token = gerarToken(usuario.id);

    res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
};

module.exports = { registro, login };
