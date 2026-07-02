const { pool } = require('../config/database');

const Categoria = {
  // Criar categoria
  async criar(nome, descricao) {
    const [result] = await pool.execute(
      'INSERT INTO categorias (nome, descricao) VALUES (?, ?)',
      [nome, descricao]
    );
    return result.insertId;
  },

  // Buscar todas as categorias
  async listar() {
    const [rows] = await pool.execute(
      'SELECT * FROM categorias ORDER BY nome'
    );
    return rows;
  },

  // Buscar por ID
  async buscarPorId(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM categorias WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // Atualizar categoria
  async atualizar(id, nome, descricao) {
    const [result] = await pool.execute(
      'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?',
      [nome, descricao, id]
    );
    return result.affectedRows > 0;
  },

  // Deletar categoria
  async deletar(id) {
    const [result] = await pool.execute(
      'DELETE FROM categorias WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = Categoria;