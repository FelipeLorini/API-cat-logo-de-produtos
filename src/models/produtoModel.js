const { pool } = require('../config/database');

const Produto = {
  // Criar produto
  async criar(nome, descricao, preco, categoria_id, estoque) {
    const [result] = await pool.execute(
      `INSERT INTO produtos (nome, descricao, preco, categoria_id, estoque) 
       VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao, preco, categoria_id, estoque]
    );
    return result.insertId;
  },

  // Listar todos os produtos
  async listar() {
    const [rows] = await pool.execute(
      `SELECT p.*, c.nome as categoria_nome 
       FROM produtos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.ativo = 1
       ORDER BY p.nome`
    );
    return rows;
  },

  // Buscar produto por ID
  async buscarPorId(id) {
    const [rows] = await pool.execute(
      `SELECT p.*, c.nome as categoria_nome 
       FROM produtos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = ? AND p.ativo = 1`,
      [id]
    );
    return rows[0];
  },

  // Atualizar produto
  async atualizar(id, dados) {
    const { nome, descricao, preco, categoria_id, estoque } = dados;
    const [result] = await pool.execute(
      `UPDATE produtos 
       SET nome = ?, descricao = ?, preco = ?, categoria_id = ?, estoque = ?
       WHERE id = ?`,
      [nome, descricao, preco, categoria_id, estoque, id]
    );
    return result.affectedRows > 0;
  },

  // Deletar (soft delete - desativa)
  async deletar(id) {
    const [result] = await pool.execute(
      'UPDATE produtos SET ativo = 0 WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  },

  // Buscar por categoria
  async buscarPorCategoria(categoriaId) {
    const [rows] = await pool.execute(
      `SELECT p.*, c.nome as categoria_nome 
       FROM produtos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.categoria_id = ? AND p.ativo = 1`,
      [categoriaId]
    );
    return rows;
  }
};

module.exports = Produto;