const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = {
  // Criar usuário
  async criar(nome, email, senha) {
    const senhaHash = await bcrypt.hash(senha, 12);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, senhaHash]
    );
    return result.insertId;
  },

  // Buscar por email
  async buscarPorEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  // Buscar por ID
  async buscarPorId(id) {
    const [rows] = await pool.execute(
      'SELECT id, nome, email, created_at, updated_at FROM usuarios WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Comparar senha
  async compararSenha(senhaDigitada, senhaHash) {
    return bcrypt.compare(senhaDigitada, senhaHash);
  }
};

module.exports = Usuario;
