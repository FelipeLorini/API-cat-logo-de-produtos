const { pool } = require('../config/database');

const Cliente = {
  // Criar cliente
  async criar(nome, email, telefone, endereco) {
    const [result] = await pool.execute(
      'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)',
      [nome, email, telefone, endereco]
    );
    return result.insertId;
  },

  // Listar clientes
  async listar() {
    const [rows] = await pool.execute(
      'SELECT * FROM clientes ORDER BY nome'
    );
    return rows;
  },

  // Buscar por ID
  async buscarPorId(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM clientes WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Buscar por email
  async buscarPorEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM clientes WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  // Atualizar cliente
  async atualizar(id, nome, email, telefone, endereco) {
    const [result] = await pool.execute(
      'UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?',
      [nome, email, telefone, endereco, id]
    );
    return result.affectedRows > 0;
  },

  // Deletar cliente
  async deletar(id) {
    const [result] = await pool.execute(
      'DELETE FROM clientes WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = Cliente;