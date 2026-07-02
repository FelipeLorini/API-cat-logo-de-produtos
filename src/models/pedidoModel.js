const { pool } = require('../config/database');

const Pedido = {
  // Criar pedido com itens
  async criar(cliente_id, itens) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // 1. Criar o pedido
      const [pedidoResult] = await connection.execute(
        'INSERT INTO pedidos (cliente_id, status, total) VALUES (?, ?, ?)',
        [cliente_id, 'pendente', 0]
      );
      const pedido_id = pedidoResult.insertId;

      // 2. Calcular total e inserir itens
      let total = 0;
      for (const item of itens) {
        const { produto_id, quantidade, preco_unitario } = item;
        const subtotal = quantidade * preco_unitario;
        total += subtotal;

        await connection.execute(
          `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario, subtotal) 
           VALUES (?, ?, ?, ?, ?)`,
          [pedido_id, produto_id, quantidade, preco_unitario, subtotal]
        );
      }

      // 3. Atualizar total do pedido
      await connection.execute(
        'UPDATE pedidos SET total = ? WHERE id = ?',
        [total, pedido_id]
      );

      await connection.commit();
      return pedido_id;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  // Listar todos os pedidos
  async listar() {
    const [rows] = await pool.execute(
      `SELECT p.*, c.nome as cliente_nome 
       FROM pedidos p
       LEFT JOIN clientes c ON p.cliente_id = c.id
       ORDER BY p.created_at DESC`
    );
    return rows;
  },

  // Buscar pedido por ID com itens
  async buscarPorId(id) {
    const [pedido] = await pool.execute(
      `SELECT p.*, c.nome as cliente_nome 
       FROM pedidos p
       LEFT JOIN clientes c ON p.cliente_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    if (pedido.length === 0) return null;

    const [itens] = await pool.execute(
      `SELECT i.*, pr.nome as produto_nome 
       FROM itens_pedido i
       LEFT JOIN produtos pr ON i.produto_id = pr.id
       WHERE i.pedido_id = ?`,
      [id]
    );

    return { ...pedido[0], itens };
  },

  // Buscar pedidos por cliente
  async buscarPorCliente(cliente_id) {
    const [rows] = await pool.execute(
      `SELECT * FROM pedidos WHERE cliente_id = ? ORDER BY created_at DESC`,
      [cliente_id]
    );
    return rows;
  },

  // Atualizar status do pedido
  async atualizarStatus(id, status) {
    const [result] = await pool.execute(
      'UPDATE pedidos SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows > 0;
  },

  // Deletar pedido (cancela)
  async deletar(id) {
    const [result] = await pool.execute(
      'DELETE FROM pedidos WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = Pedido;